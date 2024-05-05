import { Request, Response } from "express";
import { productsRepository } from "../repositories/products";

//class para listar os produtos ativos
export class productsController {
  async getAllProductsActive(req: Request, res: Response) {
    const products = await productsRepository.getAllActiveProducts();
    return res.status(200).json(products ?? null);
  }
}