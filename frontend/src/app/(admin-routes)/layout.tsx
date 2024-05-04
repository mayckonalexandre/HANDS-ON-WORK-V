import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "@/config/auth";
import { Header } from "@/components/header";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(nextAuthOptions);
  if (!session) redirect("/login");
  if (!session.user.role.includes("admin")) redirect("/");

  return (
    <div className="flex flex-col gap-2.5 w-3/4 m-auto max-[1500px]:w-full">
      <Header user={session.user} />
      {children}
    </div>
  );
}
