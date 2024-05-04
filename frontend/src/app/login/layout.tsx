import { nextAuthOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(nextAuthOptions);
  if (session) redirect("/admin");
  return <>{children}</>;
}
