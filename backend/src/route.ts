import { Router } from "express";
import { productsController } from "./controllers/products";
import { UserController } from "./controllers/user";
import { myDataSource } from "./config/db/db";
import { Marcas } from "./entity/brands";
import { Request, Response } from "express";
import z, { string } from "zod";
import { Usuario } from "./entity/user";
import moment from "moment";
import { usefulForAuthentication } from "./services/util";
import { multerConfig } from "./config/multer";
import path from "path";
import fs from "fs";
import { Produto } from "./entity/products";
import { ErrorCustom } from "./middleware/error";

export const router = Router();

const userController = new UserController();
const controllerProducts = new productsController();

router.post("/auth", userController.authenticate);

router.post("/auth/create", async (req: Request, res: Response) => {
  const schema = z.object({
    nome: z.string().trim(),
    email: z.string().email(),
    password: z.string().trim(),
  });

  const { nome, email, password } = schema.parse(req.body);

  const user = {
    nome,
    email,
    password: await usefulForAuthentication.generateHashPassword(password),
    ativo: 1,
    permissoes: "user",
    cadastrado: moment().format("YYYYMMDD - HH:mm"),
  };

  const newUser = await myDataSource.getRepository(Usuario).save(user);

  return res.status(201).json({ id: newUser.id });
});

router.post("/auth/record", async (req: Request, res: Response) => {
  const schemaRegisterUser = z.object({
    nome: z.string().trim(),
    email: z.string().email().trim(),
    password: z.string().trim(),
  });

  const { nome, email, password } = schemaRegisterUser.parse(req.body);

  const hashPassword = await usefulForAuthentication.generateHashPassword(
    password
  );

  const newUser = await myDataSource.getRepository(Usuario).save({
    nome,
    email,
    password: hashPassword,
    ativo: 1,
    permissoes: "user",
    cadastrado: moment().format("YYYYMMDD - HH:MM"),
  });

  return res.status(201).json({ id: newUser.id });
});

router.get("/products", controllerProducts.getAllProductsActive);

router.get("/products/all", async (req: Request, res: Response) => {
  const products = await myDataSource.getRepository(Produto).find();
  return res.status(200).json(products ?? null);
});

router.get("/product", async (req: Request, res: Response) => {
  const schema = z.object({
    id: z.string().trim(),
  });

  const { id } = schema.parse(req.query);

  const transformID = Number(id);

  if (typeof transformID != "number" && !Number.isInteger(transformID))
    throw new ErrorCustom("ID informado não é um número.", 400);

  const product = await myDataSource
    .getRepository(Produto)
    .findOne({ where: { id: transformID, ativo: 1 } });

  return res.status(200).json(product);
});

router.post(
  "/product",
  multerConfig.single("file"),
  async (req: Request, res: Response) => {
    const schema = z.object({
      nome: z
        .string()
        .trim()
        .min(1, { message: "O campo deve ser preenchido." }),
      descricao: z
        .string()
        .trim()
        .min(1, { message: "O campo deve ser preenchido." }),
      genero: z
        .string()
        .trim()
        .min(1, { message: "O campo deve ser preenchido." }),
      marca: z
        .string()
        .trim()
        .min(1, { message: "O campo deve ser preenchido." }),
      quantidade: z.string().trim().optional(),
      observacao: z.string().trim().optional(),
      ingredientes: z.string().trim().optional(),
      imagem: z.string().optional(),
      preco: z.string().transform((value) => Number(value)),
      preco_promocional: z
        .string()
        .optional()
        .transform((value) => (value ? Number(value) : null)),
      ativo: z.string().transform((value) => Number(value)),
      cadastrado: z
        .string()
        .optional()
        .transform(() => moment().format("YYYYMMDD - HH:mm")),
    });

    const product = schema.parse(req.body);
    const file: Express.Multer.File = req.file as Express.Multer.File;

    if (!file) {
      return res.status(400);
    }

    const dir = path.join(__dirname, "../public");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const filePath = path.join(dir, file.originalname);
    fs.writeFileSync(filePath, file.buffer);

    product.imagem = file.originalname;

    const newProduct = await myDataSource.getRepository(Produto).save(product);

    return res.status(201).json({ id: newProduct.id });
  }
);

router.put("/product", async (req: Request, res: Response) => {
  const schema = z.object({
    id: z.number(),
    nome: z.string().trim().min(1, { message: "O campo deve ser preenchido." }),
    descricao: z
      .string()
      .trim()
      .min(1, { message: "O campo deve ser preenchido." }),
    genero: z
      .string()
      .trim()
      .min(1, { message: "O campo deve ser preenchido." }),
    marca: z
      .string()
      .trim()
      .min(1, { message: "O campo deve ser preenchido." }),
    quantidade: z.string().trim().optional(),
    observacao: z.string().trim().optional(),
    ingredientes: z.string().trim().optional(),
    preco: z.number(),
    preco_promocional: z
      .number()
      .nullable()
      .optional()
      .transform((value) => (value ? Number(value) : null)),
    ativo: z.string().transform((value) => Number(value)),
    alteado: z
      .string()
      .optional()
      .transform(() => moment().format("YYYYMMDD - HH:mm")),
  });
  const { id, ...newData } = schema.parse(req.body);

  const productRepository = myDataSource.getRepository(Produto);

  const existingProduct = await productRepository.findOne({ where: { id } });

  if (!existingProduct) {
    return res.status(404).json({ message: "Produto não encontrado." });
  }

  productRepository.merge(existingProduct, newData);

  existingProduct.alterado = moment().format("YYYYMMDD - HH:mm");

  const updatedProduct = await productRepository.save(existingProduct);

  return res.status(200).json({ message: "Produto atualizado com sucesso." });
});

router.get("/brands", async (req: Request, res: Response) => {
  const brands = await myDataSource
    .getRepository(Marcas)
    .find({ where: { ativo: 1 } });
  return res.status(200).json(brands ?? null);
});

router.post("/brand", async (req: Request, res: Response) => {
  const schema = z.object({
    nome: z.string().trim().min(1, { message: "O campo deve ser preenchido." }),
    ativo: z.string().transform((value) => Number(value)),
    cadastrado: z
      .string()
      .optional()
      .transform(() => moment().format("YYYYMMDD - HH:mm")),
  });

  const data = schema.parse(req.body);

  const brand = await myDataSource.getRepository(Marcas).save(data);

  return res.status(201).json(brand.id);
});

router.put("/product/active", async (req: Request, res: Response) => {
  const schema = z.object({
    id: string()
      .trim()
      .transform((value) => Number(value)),
  });

  const { id } = schema.parse(req.query);

  const productRepository = myDataSource.getRepository(Produto);

  const product = await productRepository.findOneBy({ id });

  if (!product) return res.json({ message: "Produto não encontrado." });

  product.ativo = product.ativo === 1 ? 0 : 1;

  console.log(product.ativo);

  await productRepository.save(product);

  return res.status(200).json({
    message: `Produto alteado para ${
      product.ativo === 1 ? "Ativo" : "Desativado"
    }`,
  });
});
