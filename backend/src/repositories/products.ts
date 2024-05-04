import { myDataSource } from "../config/db/db";
import { Produto } from "../entity/products";
import { IProductsRepository } from "./interface";

class ProductsRepository implements IProductsRepository {
  async getAll() {
    return await myDataSource.getRepository(Produto).find();
  }

  async getAllActiveProducts() {
    return await myDataSource
      .getRepository(Produto)
      .find({ where: { ativo: 1 } });
  }
}

export const productsRepository = new ProductsRepository();
