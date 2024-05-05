import { Request, Response } from "express";
import z from "zod";
import { user } from "../services/user";
import { userRepostitory } from "../repositories/user";
import { usefulForAuthentication } from "../services/util";

//class para autenticação, valida os dados da requisição e passa para class para autenticação
export class UserController {
  async authenticate(req: Request, res: Response) {
    const schemaAuthenticate = z.object({
      email: z.string().email().trim(),
      password: z.string().trim(),
    });

    const { email, password } = schemaAuthenticate.parse(req.body);

    const auth = await new user(
      userRepostitory,
      usefulForAuthentication
    ).authenticate(email, password);

    return res.status(200).json(auth);
  }
}
