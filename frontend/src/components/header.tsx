"use client";

import { LogOut, UserRound } from "lucide-react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { User } from "next-auth";
import { GoToBack } from "./go-to-back";

interface IHeaderProps {
  user?: User;
}

export function Header(props: IHeaderProps) {
  const { user } = props;
  return (
    <header className="flex w-full p-2.5 justify-between items-center">
      <nav className="flex justify-between items-center w-full">
        <a href="/" className="relative w-[300px] h-[70px]">
          <Image src="/logo.png" alt="logo" fill className="rounded-lg" />
        </a>
        <div className="flex items-center gap-2.5">
          <GoToBack />
          <a
            href="/admin"
            className="flex items-center gap-2.5 border-2 rounded-lg cursor-pointer p-1.5 hover:bg-gray-300"
          >
            <UserRound /> {user && <span>Olá, {user.name}</span>}
          </a>
          {user && (
            <span
              title="Sair"
              onClick={() => signOut()}
              className="border-2 rounded-lg cursor-pointer p-1.5 hover:bg-gray-300"
            >
              <LogOut />
            </span>
          )}
        </div>
      </nav>
    </header>
  );
}
