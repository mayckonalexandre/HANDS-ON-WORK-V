export interface IUsefulForAuthentication {
  generateHashPassword: (password: string) => Promise<string>;
  comparePassword: (password: string, hash: string) => Promise<boolean>;
  generateToken: (payload: object, expiresIn: string) => string;
}