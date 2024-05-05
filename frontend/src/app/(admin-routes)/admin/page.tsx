import { formattedPrice } from "@/app/util";
import {
  activeProduct,
  getAllProducts,
  getBrands,
} from "@/server-actions/server-actions";
import { IBrands } from "@/type/brands";
import { IProducts } from "@/type/products";
import moment from "moment";
import Image from "next/image";
import { ActiveProduct } from "./active-product";

export default async function Page() {
  const [products, brands]: [IProducts[], IBrands[]] = await Promise.all([
    getAllProducts(),
    getBrands(),
  ]);

  return (
    <main className="flex flex-col gap-2.5 border-2 rounded-lg w-full p-2.5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold mb-4">Admin Page</h1>
        <a
          href={`/admin/product`}
          className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Novo Produto
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-center py-2"></th>
              <th className="text-center py-2">Nome</th>
              <th className="text-center py-2">Descrição</th>
              <th className="text-center py-2">Valor</th>
              <th className="text-center py-2">Status</th>
              <th className="text-center py-2">Cadastro em</th>
              <th className="text-center py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr className="border-b border-gray-300" key={product.id}>
                <td className="text-center py-2">
                  <div className="relative w-[100px] h-[100px]">
                    <Image
                      src={`http://localhost/image/${product.imagem}`}
                      alt={product.nome}
                      fill
                      className="rounded-lg cursor-pointer"
                    />
                  </div>
                </td>
                <td className="text-center py-2">{product.nome}</td>
                <td className="text-center py-2">{product.descricao}</td>
                <td className="text-center py-2">
                  {formattedPrice(product.preco)}
                </td>
                <td className="text-center py-2">
                  {product.ativo === 1 ? "Ativo" : "Desativado"}
                </td>
                <td className="text-center py-2">
                  {moment(product.cadastrado, "YYYYMMDD - HH:mm").format(
                    "DD/MM/YYYY - HH:mm"
                  )}
                </td>
                <td className="text-center py-2">
                  <div className="flex items-center justify-center gap-2">
                    <a
                      href={`/admin/product/${product.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    >
                      Editar
                    </a>
                    <ActiveProduct
                      id={product.id}
                      ativo={product.ativo}
                      activeProduct={activeProduct}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
