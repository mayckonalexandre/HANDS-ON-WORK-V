"use client";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/button";
import { IBrands } from "@/type/brands";
import { IProducts } from "@/type/products";
import { useEffect } from "react";
import { IResponse } from "@/server-actions/server-actions";

interface IUpdateProductProps {
  product: IProducts;
  brands: IBrands[];
  updateProduct: (data: schemaUpdateProduct) => Promise<IResponse>;
}

const schemaUpdate = z.object({
  id: z.number(),
  nome: z.string().trim().min(1, { message: "O campo deve ser preenchido." }),
  descricao: z
    .string()
    .trim()
    .min(1, { message: "O campo deve ser preenchido." }),
  genero: z.string().trim().min(1, { message: "O campo deve ser preenchido." }),
  marca: z.string().trim().min(1, { message: "O campo deve ser preenchido." }),
  quantidade: z.string().trim().optional(),
  observacao: z.string().trim().optional(),
  ingredientes: z.string().trim().optional(),
  imagem: z.string().optional(),
  preco: z
    .string()
    .min(1, { message: "O campo deve ser preenchido." })
    .transform((value) => Number(value)),
  preco_promocional: z
    .string()
    .nullable()
    .optional()
    .transform((value) => (value ? Number(value) : null)),
  ativo: z.string(),
});

export type schemaUpdateProduct = z.infer<typeof schemaUpdate>;

export function UpdateProduct(props: IUpdateProductProps) {
  const { product, brands, updateProduct } = props;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<schemaUpdateProduct>({ resolver: zodResolver(schemaUpdate) });

  useEffect(() => {
    setValue("id", product.id);
    setValue("nome", product.nome);
    setValue("descricao", product.descricao);
    setValue("genero", product.genero);
    setValue("marca", product.marca);
    setValue("quantidade", product.quantidade);
    if (product.observacao) setValue("observacao", product.observacao);
    if (product.ingredientes) setValue("ingredientes", product.ingredientes);
    setValue("preco", product.preco);
    setValue("preco_promocional", product.preco_promocional);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = async (data: schemaUpdateProduct) => {
    const response = await updateProduct(data);

    alert(response.message);
    return;
  };

  return (
    <form
      className="border-2 col-span-3 rounded-lg p-2.5"
      onSubmit={handleSubmit(update)}
    >
      <h2 className="text-2xl font-semibold mb-4">Atualizar Produto</h2>

      <div className="flex flex-wrap gap-2.5">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nome
          </label>
          <input
            type="text"
            {...register("nome")}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />

          <span className="text-red-600">
            {errors.nome?.message?.toString()}
          </span>
        </div>

        <div className="mb-4 w-3/4">
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

        <div className="mb-4 flex flex-col">
          <label className="block text-sm font-medium text-gray-700">
            Marca
          </label>

          <select
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-ful"
            {...register("marca")}
          >
            {brands.map((brand) => (
              <option key={brand.id} value={brand.nome}>
                {brand.nome}
              </option>
            ))}
          </select>

          <span className="text-red-600">
            {errors.nome?.message?.toString()}
          </span>
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

        <div className="mb-4 w-3/4">
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
            Preço
          </label>
          <input
            type="text"
            {...register("preco")}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Exemplo: 2000.99 | 199.99"
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
            placeholder="Exemplo: 2000.99 | 199.99"
          />

          <span className="text-red-600">
            {errors.preco_promocional?.message?.toString()}
          </span>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Ativo
          </label>

          <select
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-ful"
            {...register("ativo")}
          >
            <option value="1">Sim</option>
            <option value="0">Não</option>
          </select>

          <span className="text-red-600">
            {errors.ativo?.message?.toString()}
          </span>
        </div>
      </div>

      <Button label="Atualizar" />
    </form>
  );
}
