import { DataSource } from "typeorm";
import { Usuario } from "../../entity/user";
import { Produto } from "../../entity/products";
import { Marcas } from "../../entity/brands";
import { Avaliacoes } from "../../entity/assessments";

//Config para conexão com o banco de dados
export const myDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "teste123",
  database: "catalogo_perfumes",
  entities: [Usuario, Produto, Marcas, Avaliacoes],
  logging: false,
  synchronize: true,
});
