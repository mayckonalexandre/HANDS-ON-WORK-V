import { getBrands, updateProduct } from "@/server-actions/server-actions";
import { UpdateProduct } from "./update";

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
      <UpdateProduct
        brands={brands}
        product={product}
        updateProduct={updateProduct}
      />
    </main>
  );
}
