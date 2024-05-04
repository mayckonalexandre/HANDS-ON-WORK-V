import { NewProduct } from "./newProduct";
import { createNewBrand, createNewProduct, getBrands } from "@/server-actions/server-actions";
import { NewBrand } from "./newBrand";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const transformIdToNumber = Number(id);

  const [product, brands] = await Promise.all([
    (
      await fetch(`http://localhost/api/product?id=${transformIdToNumber}`, {
        cache: "no-cache",
      })
    ).json(),
    getBrands(),
  ]);

  return (
    <main className="flex flex-col p-2.5 gap-2.5">
      <div className="grid grid-cols-2 gap-2.5">
        <NewBrand create={createNewBrand} />
        <NewProduct product={product} brands={brands} create={createNewProduct} />
      </div>
    </main>
  );
}
