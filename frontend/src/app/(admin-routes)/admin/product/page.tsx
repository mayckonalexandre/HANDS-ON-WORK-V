import { NewProduct } from "./newProduct";
import {
  createNewBrand,
  createNewProduct,
  getBrands,
} from "@/server-actions/server-actions";
import { NewBrand } from "./newBrand";

export default async function Page() {
  const brands = await getBrands();

  return (
    <main className="flex flex-col p-2.5 gap-2.5">
      <div className="grid grid-cols-4 gap-2.5">
        <NewBrand create={createNewBrand} />
        <NewProduct brands={brands} create={createNewProduct} />
      </div>
    </main>
  );
}
