import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

//middleware para validar token em rotas protegidas
export async function checkToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Credenciais inválidas.", sucesso: false });
  }

  try {
    jwt.verify(token, `${process.env.SECRET}`);
    next();
  } catch (error) {
    return res.status(400).json({
      sucesso: false,
      message: "Token expirado.",
    });
  }
}
