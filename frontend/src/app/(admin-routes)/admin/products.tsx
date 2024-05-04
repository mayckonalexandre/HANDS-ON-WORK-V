"use client";

export function Products() {
  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded shadow-md">
      <h1 className="text-3xl font-bold mb-8">Cadastro de Novo Produto</h1>
      <form action="#" method="POST">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Nome do produto"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Preço
          </label>
          <input
            type="number"
            id="preco"
            name="preco"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Preço do produto"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Descrição
          </label>
          <textarea
            id="descricao"
            name="descricao"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Descrição do produto"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
}
