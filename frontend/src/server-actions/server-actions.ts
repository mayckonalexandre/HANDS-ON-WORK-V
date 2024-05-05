"use server";

import { schemaUpdateProduct } from "@/app/(admin-routes)/admin/product/[id]/update";
import { nextAuthOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export type IResponse = {
  success: boolean;
  message: string;
};

export async function getProducts() {
  return await (
    await fetch("http://localhost/api/products", { cache: "no-cache" })
  ).json();
}

export async function getAllProducts() {
  const session = await getServerSession(nextAuthOptions);

  return await (
    await fetch("http://localhost/api/products/all", {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${session?.token}`,
        "Content-Type": "application/json",
      },
    })
  ).json();
}

export async function getBrands() {
  return await (
    await fetch("http://localhost/api/brands", { cache: "no-cache" })
  ).json();
}

export async function createNewBrand(data: {
  nome: string;
  ativo: string;
}): Promise<IResponse> {
  try {
    const session = await getServerSession(nextAuthOptions);
    const response = await fetch("http://localhost/api/brand", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify({
        nome: data.nome,
        ativo: data.ativo,
      }),
    });
    const res = await response.json();

    if (response.status != 201) return { success: false, message: res.message };

    revalidatePath("/");

    return {
      success: true,
      message: `Marca cadastrada com sucesso, ID: ${res}`,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Erro ao realizar a requisição." };
  }
}

export async function createNewProduct(data: FormData) {
  try {
    const session = await getServerSession(nextAuthOptions);
    const response = await fetch("http://localhost/api/product", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
      body: data,
    });

    const res = await response.json();

    if (response.status != 201) return { success: false, message: res.message };

    revalidatePath("/");

    return {
      success: true,
      message: `Produdo cadastrado com sucesso, ID: ${res.id}`,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Erro ao realizar a requisição." };
  }
}

export async function updateProduct(data: schemaUpdateProduct) {
  try {
    const session = await getServerSession(nextAuthOptions);
    const response = await fetch("http://localhost/api/product/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    revalidatePath("/");

    return { success: true, message: res.message };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Erro ao realizar a requisição." };
  }
}

export async function activeProduct(id: number) {
  try {
    const session = await getServerSession(nextAuthOptions);
    const response = await fetch(
      `http://localhost/api/product/active?id=${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
      }
    );

    const res = await response.json();

    revalidatePath("/");

    return { success: true, message: res.message };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Erro ao realizar a requisição." };
  }
}
