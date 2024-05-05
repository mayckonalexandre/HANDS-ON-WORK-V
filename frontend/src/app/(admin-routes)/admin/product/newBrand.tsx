"use client";

import { Button } from "@/components/button";
import { IResponse } from "@/server-actions/server-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { revalidatePath } from "next/cache";
import { useForm } from "react-hook-form";
import z from "zod";

interface INewBrandProps {
  create: (data: { nome: string; ativo: string }) => Promise<IResponse>;
}

export function NewBrand(props: INewBrandProps) {
  const { create } = props;

  const schema = z.object({
    nome: z.string().trim().min(1, { message: "O campo deve ser preenchido." }),
    ativo: z.string(),
  });

  type schema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schema>({ resolver: zodResolver(schema) });

  const createNewBrand = async (data: schema) => {
    const response = await create(data);
    alert(response.message);
    return;
  };

  return (
    <form
      className="border-2 rounded-lg p-2.5"
      onSubmit={handleSubmit(createNewBrand)}
    >
      <h2 className="text-2xl font-semibold mb-4">Nova Marca</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          {...register("nome")}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />

        <span className="text-red-600">{errors.nome?.message?.toString()}</span>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Ativo</label>

        <select
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          {...register("ativo")}
        >
          <option value="1">Sim</option>
          <option value="0">Não</option>
        </select>

        <span className="text-red-600">
          {errors.ativo?.message?.toString()}
        </span>
      </div>

      <Button label="Cadastrar Marca" />
    </form>
  );
}
