import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [novoProduto, setNovoProduto] = useState({ nome: '', preco: '', quantidade: '' });

  // Busca dados do Servidor
  const buscarDados = async () => {
    setCarregando(true);
    try {
      const response = await axios.get('http://localhost/inventory-app/api/produtos.php');
      if (Array.isArray(response.data)) {
        setProdutos(response.data);
      } else {
        setProdutos([]);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setProdutos([]);
    } finally {
      setCarregando(false);
    }
  };

  // Cadastro de Novo Produto
  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost/inventory-app/api/cadastrar_produto.php', novoProduto);
      alert("Cadastrado com sucesso!");
      setNovoProduto({ nome: '', preco: '', quantidade: '' });
      buscarDados(); 
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  // Exclusão de Produto
  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await axios.delete(`http://localhost/inventory-app/api/deletar_produto.php?id=${id}`);
        buscarDados(); 
      } catch (error) {
        console.error("Erro ao deletar:", error);
        alert("Não foi possível excluir o produto.");
      }
    }
  };

  useEffect(() => {
    buscarDados();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-blue-600">📦 Stockly</h1>
          <span className="text-sm text-gray-500 font-medium">Painel de Controle</span>
        </header>

        {/* Formulário */}
        <form 
          onSubmit={handleCadastro} 
          className="bg-white p-6 rounded-xl shadow-sm mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end border border-gray-100"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input 
              type="text" 
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={novoProduto.nome}
              onChange={(e) => setNovoProduto({...novoProduto, nome: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Preço</label>
            <input 
              type="number" 
              step="0.01" 
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={novoProduto.preco}
              onChange={(e) => setNovoProduto({...novoProduto, preco: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantidade</label>
            <input 
              type="number" 
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={novoProduto.quantidade}
              onChange={(e) => setNovoProduto({...novoProduto, quantidade: e.target.value})}
            />
          </div>
          <button 
            type="submit" 
            className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition font-bold shadow-md cursor-pointer"
          >
            Salvar Produto
          </button>
        </form>

        {/* Listagem */}
        {carregando ? (
          <p className="text-center text-gray-500 italic">Buscando estoque no servidor...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(produtos) && produtos.length > 0 ? (
              produtos.map(produto => (
                <div key={produto.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition relative group">
                  <button 
                      onClick={() => handleDelete(produto.id)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700 cursor-pointer bg-red-50 hover:bg-red-100 rounded-full transition-all flex items-center justify-center border border-red-100 shadow-sm"
                      style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px' }} // Força o botão a ser um círculo
                      title="Excluir produto"
                  > 
                      <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                          width="20"   // ATRIBUTO NATIVO: Força a largura
                          height="20"  // ATRIBUTO NATIVO: Força a altura
                      >
                          <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" 
                          />
                      </svg>
                  </button>

                  <h2 className="font-bold text-xl text-gray-800 pr-8">{produto.nome}</h2>
                  <p className="text-blue-500 font-semibold mt-1">R$ {parseFloat(produto.preco || 0).toFixed(2)}</p>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Qtd: {produto.quantidade}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${produto.quantidade > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {produto.quantidade > 0 ? 'Em estoque' : 'Esgotado'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400 italic py-10">Nenhum produto encontrado.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;