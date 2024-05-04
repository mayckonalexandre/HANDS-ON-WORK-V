import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    token: string;
    user: User;
  }

  interface User {
    id: number;
    role: string;
    name: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
  }
}
