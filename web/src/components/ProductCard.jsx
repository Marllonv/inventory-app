export const ProductCard = ({ produto, onEdit, onDelete }) => {
  return (
    <div className="relative p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
      {/* Categoria */}
      <span className="inline-block px-2 py-0.5 mb-2 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-full border border-blue-100">
        {produto.categoria_nome || 'Sem Categoria'}
        </span>
      {/* Informações */}
      <div className="pr-24">
        <h3 className="text-xl font-bold text-gray-800 truncate">{produto.nome}</h3>
        <p className="text-blue-600 font-semibold mt-2">R$ {produto.preco}</p>
        <p className="text-gray-500 text-sm">Estoque: {produto.quantidade}</p>
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-2">
        {/* Botão Editar */}
        <button 
          onClick={() => onEdit(produto)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
        </button>

        {/* Botão Deletar */}
        <button 
          onClick={() => onDelete(produto.id)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
        </button>
      </div>
    </div>
  );
};