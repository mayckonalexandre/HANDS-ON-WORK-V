import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const response = await fetch("http://localhost/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        if (!response.ok) return null;
        const data = await response.json();
        return {
          token: data.token,
          role: data.role,
          id: data.id,
          name: data.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as number;
        token.role = user.role;
        token.name = user.name;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.token = token.token as string;
        session.user = {
          id: token.id,
          role: token.role as string,
          name: token.name as string,
          token: token.token as string,
        };
      }
      return session;
    },
  },
};
