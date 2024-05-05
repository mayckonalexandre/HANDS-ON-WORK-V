import { Avaliacoes } from "../entity/assessments";
import { Marcas } from "../entity/brands";
import { Produto } from "../entity/products";
import { Usuario } from "../entity/user";

//Interfaces com as tipagens de cada class

export interface IUserRepository {
  getUserById: (id: number) => Promise<Usuario | null>;
  getUserByEmail: (email: string) => Promise<Usuario | null>;
}

export interface IProductsRepository {
  getAll: () => Promise<Produto[]>;
  getAllActiveProducts: () => Promise<Produto[]>;
}

export interface IBrandsRepository {
  getAll: () => Promise<Marcas[]>;
  getAllActiveBrands: () => Promise<Marcas[]>;
  getBrandsByProductId: (id: number) => Promise<Marcas | null>;
  create: (data: Marcas) => Promise<Marcas>;
  update: (data: Marcas) => Promise<Marcas>;
  delete: (id: number) => Promise<Marcas>;
}

export interface IAssessmentsRepository {
  getAll: () => Promise<Avaliacoes[]>;
  getAllActiveAssessments: () => Promise<Avaliacoes[]>;
}
