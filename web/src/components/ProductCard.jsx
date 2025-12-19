export const ProductCard = ({ produto, onEdit, onDelete }) => {
  return (
    <div className="relative p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-gray-800">{produto.nome}</h3>
      <p className="text-blue-600 font-semibold mt-2">R$ {produto.preco}</p>
      <p className="text-gray-500 text-sm">Estoque: {produto.quantidade}</p>

      {/* Botão Editar */}
      <button 
        onClick={() => onEdit(produto)}
        style={{ width: '40px', height: '40px', position: 'absolute', top: '16px', right: '64px' }}
        className="flex items-center justify-center bg-blue-50 text-blue-500 rounded-full hover:bg-blue-100 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
      </button>

      {/* Botão Deletar */}
      <button 
        onClick={() => onDelete(produto.id)}
        style={{ width: '40px', height: '40px', position: 'absolute', top: '16px', right: '16px' }}
        className="flex items-center justify-center bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
      </button>
    </div>
  );
};