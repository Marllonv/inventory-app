export const ProductForm = ({ novoProduto, setNovoProduto, onSubmit, editandoId, onCancelar }) => {
  return (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        {editandoId ? 'Editar Produto' : 'Novo Produto'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
          <input
            type="text"
            placeholder="Ex: Teclado Mecânico"
            value={novoProduto.nome}
            onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
          <input
            type="number"
            step="0.01"
            placeholder="0,00"
            value={novoProduto.preco}
            onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
          <input
            type="number"
            placeholder="0"
            value={novoProduto.quantidade}
            onChange={(e) => setNovoProduto({ ...novoProduto, quantidade: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          className={`flex-1 p-3 rounded-lg font-bold text-white transition-colors ${
            editandoId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {editandoId ? 'Salvar Alterações' : 'Cadastrar Produto'}
        </button>
        
        {editandoId && (
          <button
            type="button"
            onClick={onCancelar}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};