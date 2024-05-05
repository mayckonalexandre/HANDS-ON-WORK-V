import "express-async-errors";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import morganBody from "morgan-body";
import { router } from "./route";
import { errorMiddleware } from "./middleware/error";
import { myDataSource } from "./config/db/db";
import { CreateLogPath } from "./config/log-path";

//Inicia conexão com o banco de dados
myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const port = 80;

//variavel com a aplicação em express
const app = express();

//salvar os logs
morganBody(app, {
  noColors: true,
  stream: CreateLogPath(),
});

//exibe os logs no console
morganBody(app);

// Configuração do middleware para analisar solicitações com formato JSON
app.use(express.json());

// Configuração do middleware para analisar solicitações com dados codificados na URL (por exemplo, de formulários HTML)
app.use(express.urlencoded({ extended: true }));

// Configuração do middleware CORS para permitir solicitações de diferentes origens
app.use(cors());

// Roteamento para todas as solicitações que começam com '/api' usando o roteador 'router'
app.use("/api", router);

// Middleware de tratamento de erros personalizado para lidar com erros nas solicitações
app.use(errorMiddleware);

// Servir arquivos estáticos contidos no diretório 'public' para solicitações que começam com '/image'
app.use("/image", express.static("public"));

// Middleware para lidar com solicitações que não correspondem a nenhuma rota definida anteriormente, retornando um status 404 e uma mensagem JSON
app.use((req, res) =>
  res.status(404).json({ statusCode: 404, message: "Not Found" })
);

// Inicialização do servidor para escutar solicitações na porta especificada
app.listen(port, () => {
  console.log(
    "------------------------------------------------------------------------------------"
  );
  console.log("\n");
  console.log(`🚀 Server running on port ${port} !! 🚀`);
  console.log("\n");
  console.log(
    "------------------------------------------------------------------------------------"
  );
});
