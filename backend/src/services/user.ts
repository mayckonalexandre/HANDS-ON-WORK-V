import { ErrorCustom } from "../middleware/error";
import { IUserRepository } from "../repositories/interface";
import { IUsefulForAuthentication } from "./interfaces";

//Função para autenticar o usuario

export class user {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly usefulForAuthentication: IUsefulForAuthentication
  ) {}

  async authenticate(email: string, password: string) {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) throw new ErrorCustom("Credenciais inválidas.", 401);

    const validatePassword = this.usefulForAuthentication.comparePassword(
      password,
      user.password
    );

    if (!validatePassword) throw new ErrorCustom("Credenciais inválidas.", 401);

    const token = this.usefulForAuthentication.generateToken(
      { id: user.id },
      "7d"
    );
    return { id: user.id, name: user.nome, token, role: user.permissoes };
  }
}
