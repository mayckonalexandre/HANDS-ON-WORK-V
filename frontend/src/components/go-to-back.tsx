"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function GoToBack() {
  const router = useRouter();
  return (
    <span
      title="Página anterior"
      onClick={() => router.back()}
      className="border-2 rounded-lg cursor-pointer p-1.5 hover:bg-gray-300"
    >
      <ArrowLeft />
    </span>
  );
}
