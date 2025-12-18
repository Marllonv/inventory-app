import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [novoProduto, setNovoProduto] = useState({ nome: '', preco: '', quantidade: '' });

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost/inventory-app/api/cadastrar_produto.php', novoProduto);
      alert("Cadastrado com sucesso!");
      setNovoProduto({ nome: '', preco: '', quantidade: '' });
      window.location.reload();
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  };

  useEffect(() => {
    axios.get('http://localhost/inventory-app/api/produtos.php')
      .then(response => {
        setProdutos(response.data); 
        setCarregando(false);      
      })
      .catch(error => {
        console.error("Erro ao buscar dados:", error);
        setCarregando(false);
      });
  }, []);

  return (
  <> {/* CONTAINER PRINCIPAL */}
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-blue-600">📦 Stockly</h1>
          <span className="text-sm text-gray-500 font-medium">Painel de Controle</span>
        </header>
        {/* FORMULÁRIO DE CADASTRO */}
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

        {/* LISTAGEM DE PRODUTOS */}
        {carregando ? (
          <p className="text-center text-gray-500 italic">Buscando estoque no servidor...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtos.length > 0 ? (
              produtos.map(produto => (
                <div key={produto.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
                  <h2 className="font-bold text-xl text-gray-800">{produto.nome}</h2>
                  <p className="text-blue-500 font-semibold mt-1">R$ {parseFloat(produto.preco).toFixed(2)}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Qtd: {produto.quantidade}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${produto.quantidade > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {produto.quantidade > 0 ? 'Em estoque' : 'Esgotado'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400 italic py-10">
                Nenhum produto encontrado. Adicione algo acima!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  </>
  );
}

export default App; 