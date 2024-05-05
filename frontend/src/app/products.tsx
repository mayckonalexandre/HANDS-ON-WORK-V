"use client";

import { IBrands } from "@/type/brands";
import { IProducts } from "@/type/products";
import { LogOut, Search, UserRound, X } from "lucide-react";
import { User } from "next-auth";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { formattedPrice } from "./util";

interface IProductsProps {
  products: IProducts[];
  brands: IBrands[];
  user?: User;
}

export function Products(props: IProductsProps) {
  const { products, brands, user } = props;
  const [inputValue, setInputValue] = useState("");
  const [filtros, setFiltros] = useState<{ genero: string[]; marca: string[] }>(
    { genero: [], marca: [] }
  );

  const filter = (product: IProducts) => {
    const generoValue =
      filtros.genero.length > 0
        ? filtros.genero.some((value) =>
            value.toLowerCase().includes(product.genero.toLowerCase())
          )
        : true;

    const marcasValue =
      filtros.marca.length > 0
        ? filtros.marca.some((value) =>
            value.toLowerCase().includes(product.marca.toLowerCase())
          )
        : true;

    const valueInput = Object.values(product).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().trim().includes(inputValue.toLowerCase().trim())
    );

    return generoValue && marcasValue && valueInput;
  };

  const filtrar = (valor: string, campo: "genero" | "marca") => {
    setFiltros((prev) => {
      if (prev[campo].includes(valor)) {
        return {
          ...prev,
          [campo]: prev[campo].filter((opcao) => opcao !== valor),
        };
      } else {
        return {
          ...prev,
          [campo]: [...prev[campo], valor],
        };
      }
    });
  };

  const produtosFiltrados = products.filter(filter);

  const contemOpção = (value: string, options: "genero" | "marca") =>
    filtros[options].some((name) => name.toLowerCase() === value.toLowerCase());

  return (
    <>
      <main className="grid grid-cols-3 p-2.5 gap-2.5 max-[900px]:flex max-[900px]:flex-col">
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col gap-2.5 border-2 rounded-lg p-2.5">
            <h1 className="flex font-semibold text-xl">Perfumes Importados</h1>
            <p>
              Os melhores perfumes importados, perfumes femininos e masculinos
              pra quem gosta de destacar sua personalidade através de
              fragrâncias únicas.
            </p>
            <p>Variedade de marcas com a segurança de perfumes autênticos.</p>
          </div>

          <div className="relative flex items-center min-w-[400px] w-full">
            <input
              className="border-2 border-black p-2 rounded-lg min-w-[400px] w-full"
              onChange={(event) => setInputValue(event.target.value)}
              type="text"
              placeholder="O que procura hoje?"
            />
            <Search className="absolute right-0 flex items-center mr-2" />
          </div>

          <div className="flex flex-col gap-2.5 border-2 rounded-lg p-2.5">
            <h1 className="flex font-semibold text-xl">Categorias</h1>
            <ul className="flex flex-col gap-2.5">
              <li
                className={`hover:bg-gray-300 rounded-lg p-1.5 cursor-pointer relative ${
                  contemOpção("Masculino", "genero")
                    ? "bg-gray-300 rounded-lg"
                    : ""
                }`}
                onClick={() => filtrar("Masculino", "genero")}
              >
                Perfumes Masculinos{" "}
                {contemOpção("Masculino", "genero") && (
                  <X className="absolute flex justify-center items-center right-0 top-1.5 mr-2" />
                )}
              </li>
              <li
                className={`hover:bg-gray-300 rounded-lg p-1.5 cursor-pointer relative ${
                  contemOpção("Feminino", "genero")
                    ? "bg-gray-300 rounded-lg"
                    : ""
                }`}
                onClick={() => filtrar("Feminino", "genero")}
              >
                Perfumes Femininos
                {contemOpção("Feminino", "genero") && (
                  <X className="absolute flex justify-center items-center right-0 top-1.5 mr-2" />
                )}
              </li>
              <li
                className={`hover:bg-gray-300 rounded-lg p-1.5 cursor-pointer relative ${
                  contemOpção("Unissex", "genero")
                    ? "bg-gray-300 rounded-lg"
                    : ""
                }`}
                onClick={() => filtrar("Unissex", "genero")}
              >
                Perfumes Unissex{" "}
                {contemOpção("Unissex", "genero") && (
                  <X className="absolute flex justify-center items-center right-0 top-1.5 mr-2" />
                )}
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2.5 border-2 rounded-lg p-2.5">
            <h1 className="flex font-semibold text-xl">Marcas</h1>
            <ul className="flex flex-col gap-2.5">
              {brands &&
                brands.map((brand) => (
                  <li
                    key={brand.id}
                    className={`hover:bg-gray-300 rounded-lg p-1.5 cursor-pointer relative ${
                      contemOpção(brand.nome, "marca")
                        ? "bg-gray-300 rounded-lg"
                        : ""
                    }`}
                    onClick={() => filtrar(brand.nome, "marca")}
                  >
                    {brand.nome}{" "}
                    {contemOpção(brand.nome, "marca") && (
                      <X className="absolute flex justify-center items-center right-0 top-1.5 mr-2" />
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="col-span-2 flex flex-col gap-2.5">
          <div className="w-full relative h-[300px] max-[900px]:hidden">
            <Image src="/capa.png" alt="capa" fill className="rounded-lg" />
          </div>

          <div className="grid grid-cols-3 gap-2.5 max-[900px]:flex max-[900px]:flex-wrap">
            {produtosFiltrados &&
              produtosFiltrados.map((product) => (
                <div
                  className="flex flex-col gap-4 border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg"
                  key={product.id}
                >
                  <div className="relative w-full h-[300px]">
                    <Image
                      src={`http://localhost/image/${product.imagem}`}
                      alt={product.nome}
                      className="rounded-t-lg"
                      fill
                    />
                  </div>

                  <div className="p-4">
                    <p className="text-xl font-semibold">{product.nome}</p>
                    <p className="text-gray-600">{product.descricao}</p>
                    <div className="flex flex-col">
                      <div className="rating flex gap-1">
                        <input
                          type="radio"
                          id={`star5-${product.id}`}
                          name={`rating-${product.id}`}
                          value="5"
                        />
                        <label htmlFor={`star5-${product.id}`} title="5 stars">
                          &#9733;
                        </label>
                        <input
                          type="radio"
                          id={`star4-${product.id}`}
                          name={`rating-${product.id}`}
                          value="4"
                        />
                        <label htmlFor={`star4-${product.id}`} title="4 stars">
                          &#9733;
                        </label>
                        <input
                          type="radio"
                          id={`star3-${product.id}`}
                          name={`rating-${product.id}`}
                          value="3"
                        />
                        <label htmlFor={`star3-${product.id}`} title="3 stars">
                          &#9733;
                        </label>
                        <input
                          type="radio"
                          id={`star2-${product.id}`}
                          name={`rating-${product.id}`}
                          value="2"
                        />
                        <label htmlFor={`star2-${product.id}`} title="2 stars">
                          &#9733;
                        </label>
                        <input
                          type="radio"
                          id={`star1-${product.id}`}
                          name={`rating-${product.id}`}
                          value="1"
                        />
                        <label htmlFor={`star1-${product.id}`} title="1 star">
                          &#9733;
                        </label>
                      </div>

                      <div
                        className={`font-bold ${
                          product.preco_promocional ? "hidden" : ""
                        }`}
                      >
                        {formattedPrice(product.preco)}
                      </div>

                      {product.preco_promocional && (
                        <div className="flex gap-2.5 font-bold">
                          {formattedPrice(product.preco_promocional)}
                          <span className="line-through text-gray-500">
                            {formattedPrice(product.preco)}
                          </span>
                        </div>
                      )}

                      <a
                        className="mt-4 w-full block bg-black hover:bg-gray-900 text-white text-center py-2 rounded-md transition duration-300"
                        target="_blank"
                        href="https://wa.me/5547999999999?text=Gostaria%20de%20fazer%20um%20pedido"
                      >
                        Comprar
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {produtosFiltrados.length === 0 && (
            <div className="w-full flex items-center justify-center p2.5 mt-10">
              Nenhum produto encontrado.
            </div>
          )}
        </div>
      </main>
    </>
  );
}
