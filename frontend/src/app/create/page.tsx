"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";

const schemaChangePassword = z
  .object({
    nome: z.string().trim().min(1, { message: "O campo deve ser preenchido." }),
    email: z.string().email("Email inválido.").trim(),
    password: z
      .string()
      .trim()
      .min(5, { message: "Mínimo 5 digitos." })
      .refine((value) => /[A-Z]/.test(value), {
        message: "A senha deve conter pelo menos uma letra maiúscula.",
      })
      .refine((value) => /\d/.test(value), {
        message: "A senha deve conter pelo menos um número.",
      })
      .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: "A senha deve conter pelo menos um caractere especial.",
      }),
    confirmPassword: z.string().trim(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não coindidem.",
        path: ["confirmPassword"],
      });
    }
  });

type schema = z.infer<typeof schemaChangePassword>;

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schema>({ resolver: zodResolver(schemaChangePassword) });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const router = useRouter();

  async function formSubmit(data: schema) {
    try {
      const json = {
        nome: data.nome,
        email: data.email,
        password: data.password,
      };
      const response = await fetch("http://localhost/api/auth/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });

      if (response?.status != 201) {
        alert("Erro");
        return;
      }
      router.push("/admin");
    } catch (error) {
      console.log(error);
      alert("Erro ao realizar a requisição.");
      return;
    }
  }

  return (
    <main className="flex justify-center items-center h-screen w-full">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="w-full max-w-md shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
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
            Nome
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("nome")}
            type="text"
            placeholder="Seu nome"
          />
          <span className="text-red-600">
            {errors.nome?.message?.toString()}
          </span>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("email")}
            type="email"
            placeholder="Seu email"
          />
          <span className="text-red-600">
            {errors.email?.message?.toString()}
          </span>
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Senha
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            {...register("password")}
            type={showNewPassword ? "text" : "password"}
            placeholder="Sua senha"
          />
          <span className="text-red-600">
            {errors.password?.message?.toString()}
          </span>
          {showNewPassword ? (
            <Eye
              onClick={handleClickShowNewPassword}
              size={24}
              className="svg cursor-pointer right-2 z-20 top-9 absolute"
            />
          ) : (
            <EyeOff
              onClick={handleClickShowNewPassword}
              className="svg cursor-pointer right-2 z-20 top-9 absolute"
              size={24}
            />
          )}
        </div>

        <div className="mb-6 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirme sua senha
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirme sua senha"
          />
          <span className="text-red-600">
            {errors.confirmPassword?.message?.toString()}
          </span>
          {showConfirmPassword ? (
            <Eye
              onClick={handleClickShowConfirmPassword}
              size={24}
              className="svg cursor-pointer right-2 z-20 top-9 absolute"
            />
          ) : (
            <EyeOff
              onClick={handleClickShowConfirmPassword}
              className="svg cursor-pointer right-2 z-20 top-9 absolute"
              size={24}
            />
          )}
        </div>

        <div className="flex items-center justify-center">
          <Button label="Cadastrar" />
        </div>
      </form>
    </main>
  );
}
