import { useEffect, useState } from 'react';
import { ProductCard, ProductForm, Header } from './components';
import api from './services/api';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [novoProduto, setNovoProduto] = useState({ nome: '', preco: '', quantidade: '' });
  const [editandoId, setEditandoId] = useState(null);

  // Buscar Dados
  const buscarDados = async () => {
    setCarregando(true);
    try {
      const response = await api.get('/');
      setProdutos(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setProdutos([]);
    } finally {
      setCarregando(false);
    }
  };

  // Cadastro e Edição
  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        // Update via PUT
        await api.put('/', { ...novoProduto, id: editandoId });
        alert("Atualizado com sucesso!");
      } else {
        // Cadastro via POST
        await api.post('/', novoProduto);
        alert("Cadastrado com sucesso!");
      }
      setNovoProduto({ nome: '', preco: '', quantidade: '' });
      setEditandoId(null);
      buscarDados();
    } catch (error) {
      console.error("Erro na operação:", error);
    }
  };

  // Exclusão
  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        // Exclusão via DELETE
        await api.delete(`/?id=${id}`);
        buscarDados(); 
      } catch (error) {
        console.error("Erro ao deletar:", error);
        alert("Não foi possível excluir o produto.");
      }
    }
  };

  // Preparar Update
  const handleUpdate = (produto) => {
    setEditandoId(produto.id);
    setNovoProduto({
      nome: produto.nome,
      preco: produto.preco,
      quantidade: produto.quantidade
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    buscarDados();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Header totalProdutos={produtos.length} />

      <ProductForm 
        novoProduto={novoProduto}
        setNovoProduto={setNovoProduto}
        onSubmit={handleCadastro}
        editandoId={editandoId}
        onCancelar={() => { 
          setEditandoId(null); 
          setNovoProduto({ nome: '', preco: '', quantidade: '' }); 
        }}
      />

      {carregando ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600 font-medium">Carregando estoque...</span>
        </div>
      ) : produtos.length === 0 ? (
        <div className="text-center py-20 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
          <p>Nenhum produto encontrado no estoque.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {produtos.map(produto => (
            <ProductCard 
              key={produto.id}
              produto={produto}
              onEdit={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;