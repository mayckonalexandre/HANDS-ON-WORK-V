"use client";

import { IBrands } from "@/type/brands";
import { IProducts } from "@/type/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/button";
import { IResponse } from "@/server-actions/server-actions";

interface INewProduct {
  product: IProducts | null;
  brands: IBrands[];
  create: (data: FormData) => Promise<IResponse>;
}

const schemaNewProduct = z.object({
  nome: z.string().trim().min(1, { message: "O campo deve ser preenchido." }),
  descricao: z
    .string()
    .trim()
    .min(1, { message: "O campo deve ser preenchido." }),
  genero: z.string().trim().min(1, { message: "O campo deve ser preenchido." }),
  categoria: z
    .string()
    .trim()
    .min(1, { message: "O campo deve ser preenchido." }),
  marca: z.string().trim().min(1, { message: "O campo deve ser preenchido." }),
  quantidade: z.string().trim().optional(),
  observacao: z.string().trim().optional(),
  ingredientes: z.string().trim().optional(),
  validade: z.string().trim().optional(),
  imagem: z.string().optional(),
  preco: z.string().transform((value) => Number(value)),
  preco_promocional: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : null)),
  ativo: z.string(),
});

export type schemaNewProducts = z.infer<typeof schemaNewProduct>;

export function NewProduct(props: INewProduct) {
  const { product, brands, create } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaNewProducts>({ resolver: zodResolver(schemaNewProduct) });

  const [file, setFile] = useState<File | null>(null);

  const createNewProduct = async (data: schemaNewProducts) => {
    if (!file) {
      alert("Anexe a imagem.");
      return;
    }

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value.toString());
      }
    });

    formData.append("file", file);

    const response = await create(formData);

    alert(response.message);
    return;
  };

  return (
    <form
      className="border-2 rounded-lg p-2.5"
      onSubmit={handleSubmit(createNewProduct)}
    >
      <h2 className="text-2xl font-semibold mb-4">Novo Produto</h2>

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
        <label className="block text-sm font-medium text-gray-700">
          Descrição
        </label>
        <input
          type="text"
          {...register("descricao")}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />

        <span className="text-red-600">
          {errors.descricao?.message?.toString()}
        </span>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Genero
        </label>
        <input
          type="text"
          {...register("genero")}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />

        <span className="text-red-600">
          {errors.genero?.message?.toString()}
        </span>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Categoria
        </label>
        <input
          type="text"
          {...register("categoria")}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />

        <span className="text-red-600">
          {errors.categoria?.message?.toString()}
        </span>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Marca</label>
        <select
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          {...register("marca")}
        >
          {brands.map((brand) => (
            <option key={brand.id} value={brand.nome}>
              {brand.nome}
            </option>
          ))}
        </select>

        <span className="text-red-600">{errors.nome?.message?.toString()}</span>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Quantidade
        </label>
        <input
          type="text"
          {...register("quantidade")}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />

        <span className="text-red-600">
          {errors.quantidade?.message?.toString()}
        </span>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Observação
        </label>
        <input
          type="text"
          {...register("observacao")}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />

        <span className="text-red-600">
          {errors.observacao?.message?.toString()}
        </span>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Ingredientes
        </label>
        <input
          type="text"
          {...register("ingredientes")}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />

        <span className="text-red-600">
          {errors.ingredientes?.message?.toString()}
        </span>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Imagem
        </label>
        <input
          type="file"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          onChange={(event) =>
            setFile(event.target.files ? event.target.files[0] : null)
          }
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Validade
        </label>
        <input
          type="text"
          {...register("validade")}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />

        <span className="text-red-600">
          {errors.validade?.message?.toString()}
        </span>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Preço</label>
        <input
          type="text"
          {...register("preco")}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />

        <span className="text-red-600">
          {errors.preco?.message?.toString()}
        </span>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Preço Promocional
        </label>
        <input
          type="text"
          {...register("preco_promocional")}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />

        <span className="text-red-600">
          {errors.preco_promocional?.message?.toString()}
        </span>
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

      <Button label="Cadastrar Produto" />
    </form>
  );
}
