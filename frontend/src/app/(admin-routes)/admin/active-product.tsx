"use client";

import { IResponse } from "@/server-actions/server-actions";

interface IActiveProductProps {
  activeProduct: (id: number) => Promise<IResponse>;
  id: number;
  ativo: number;
}

export function ActiveProduct(props: IActiveProductProps) {
  const { activeProduct, id, ativo } = props;

  const active = async () => {
    const response = await activeProduct(id);
    alert(response.message);
  };

  return (
    <button
      onClick={active}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
    >
      {ativo === 1 ? "Desativar" : "Ativar"}
    </button>
  );
}
