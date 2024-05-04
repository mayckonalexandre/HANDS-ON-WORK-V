"use client";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const schemaLogin = z.object({
  email: z.string().email("Email inválido.").trim(),
  password: z
    .string()
    .trim()
    .refine((value) => value !== "", {
      message: "A senha deve ser preenchida.",
    }),
});

type schema = z.infer<typeof schemaLogin>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schema>({ resolver: zodResolver(schemaLogin) });
  const router = useRouter();

  const submit = async (data: schema) => {
    try {
      const { email, password } = data;
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.status === 401) {
        alert("Credenciais inválidas.");
        return;
      }
      location.reload();
    } catch (error) {
      console.error(error);
      alert("Erro ao realizar a requisição.");
    }
  };

  return (
    <main className="flex justify-center items-center h-screen w-full bg-gray-50">
      <form
        className="w-full max-w-md shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(submit)}
      >
        <div className="flex items-center gap-2.5 mb-4">
          <span
            onClick={() => router.back()}
            className="border-2 rounded-lg cursor-pointer p-1.5 hover:bg-gray-300"
          >
            <ArrowLeft />
          </span>
          <h1 className="text-2xl font-bold">Cadastre-se</h1>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("email")}
            type="text"
            placeholder="Seu email"
          />

          <span className="text-red-600">
            {errors.email?.message?.toString()}
          </span>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Senha
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("password")}
            type="password"
            placeholder="Sua senha"
          />
          <span className="text-red-600">
            {errors.password?.message?.toString()}
          </span>
        </div>

        <div className="flex items-center justify-center mb-4">
          <Button label="Login" />
        </div>

        <p className="text-center">
          Não possui uma conta ?
          <a className="text-blue-600 pl-2 hover:underline" href="/create">
            Clique aqui!
          </a>
        </p>
      </form>
    </main>
  );
}
