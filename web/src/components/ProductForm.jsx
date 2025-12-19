export const ProductForm = ({ novoProduto, setNovoProduto, onSubmit, editandoId, onCancelar, categorias }) => {
  return (
    <form onSubmit={onSubmit} className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Input Nome */}
        <input 
          type="text" 
          placeholder="Nome do produto"
          className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={novoProduto.nome}
          onChange={(e) => setNovoProduto({...novoProduto, nome: e.target.value})}
          required
        />

        {/* SELECT DE CATEGORIAS */}
        <select 
          className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          value={novoProduto.categoria_id || ""}
          onChange={(e) => setNovoProduto({...novoProduto, categoria_id: e.target.value})}
        >
          <option value="">Sem categoria</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.nome}
            </option>
          ))}
        </select>

        <input 
          type="number" 
          placeholder="Preço"
          className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={novoProduto.preco}
          onChange={(e) => setNovoProduto({...novoProduto, preco: e.target.value})}
          required
        />

        <input 
          type="number" 
          placeholder="Quantidade"
          className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={novoProduto.quantidade}
          onChange={(e) => setNovoProduto({...novoProduto, quantidade: e.target.value})}
          required
        />
      </div>

      <div className="flex gap-2 mt-4">
        <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          {editandoId ? 'Atualizar Produto' : 'Cadastrar Produto'}
        </button>
        {editandoId && (
          <button type="button" onClick={onCancelar} className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};