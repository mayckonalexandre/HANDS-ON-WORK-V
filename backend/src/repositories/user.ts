import { myDataSource } from "../config/db/db";
import { Usuario } from "../entity/user";
import { IUserRepository } from "./interface";

class UserRepostitory implements IUserRepository {
  async getUserById(id: number) {
    return await myDataSource
      .getRepository(Usuario)
      .findOneBy({ id, ativo: 1 });
  }

  async getUserByEmail(email: string) {
    return await myDataSource
      .getRepository(Usuario)
      .findOneBy({ email, ativo: 1 });
  }
}

export const userRepostitory = new UserRepostitory();
