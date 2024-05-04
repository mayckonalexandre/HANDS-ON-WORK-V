import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUsefulForAuthentication } from "./interfaces";

class UsefulForAuthentication implements IUsefulForAuthentication {
  generateHashPassword = async (password: string) =>
    await bcrypt.hash(password, 10);
  comparePassword = async (password: string, hash: string) =>
    await bcrypt.compare(password, hash);
  generateToken = (payload: object, expiresIn: string) =>
    jwt.sign(payload, `${process.env.SECRET}`, { expiresIn });
}

export const usefulForAuthentication = new UsefulForAuthentication();