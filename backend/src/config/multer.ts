import multer from "multer";

//config multer para salvar em memoria arquivos que vem na requisição
export const multerConfig = multer({ storage: multer.memoryStorage() });
