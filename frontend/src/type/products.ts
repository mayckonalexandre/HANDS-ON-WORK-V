export type IProducts = {
  id: number;
  nome: string;
  descricao: string;
  genero: string;
  marca: string;
  quantidade: string;
  observacao: string | null;
  ingredientes: string | null;
  imagem: string;
  preco: number;
  preco_promocional: number | null;
  ativo: number;
  cadastrado: string;
  alterado: string | null;
};
