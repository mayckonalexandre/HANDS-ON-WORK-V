import { getServerSession } from "next-auth";
import { Products } from "./products";
import { nextAuthOptions } from "@/config/auth";
import { getBrands, getProducts } from "@/server-actions/server-actions";
import { IProducts } from "@/type/products";
import { IBrands } from "@/type/brands";
import { Header } from "@/components/header";

export default async function Home() {
  const [products, brands]: [IProducts[], IBrands[]] = await Promise.all([
    getProducts(),
    getBrands(),
  ]);

  const session = await getServerSession(nextAuthOptions);

  return (
    <div className="flex flex-col gap-2.5 w-3/4 m-auto max-[1500px]:w-full">
      <Header user={session?.user} />
      <Products products={products} brands={brands} user={session?.user} />;
    </div>
  );
}
