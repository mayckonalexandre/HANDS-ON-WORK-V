export type IProducts = {
  id: number;
  nome: string;
  descricao: string;
  genero: string;
  categoria: string;
  marca: string;
  quantidade: string | null;
  observacao: string | null;
  ingredientes: string | null;
  imagem: string;
  validade: string | null;
  preco: number;
  preco_promocional: number | null;
  ativo: number;
  cadastrado: string;
  alterado: string | null;
};
