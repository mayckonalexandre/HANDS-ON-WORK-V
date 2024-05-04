import "express-async-errors";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import morganBody from "morgan-body";
import { router } from "./route";
import { errorMiddleware } from "./middleware/error";
import { myDataSource } from "./config/db/db";

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const port = 80;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", router);
app.use(errorMiddleware);
morganBody(app, {
  noColors: true,
});

app.use("/image", express.static("public"));
app.use((req, res) =>
  res.status(404).json({ statusCode: 404, message: "Not Found" })
);

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
