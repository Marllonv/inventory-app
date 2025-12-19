export const Header = ({ totalProdutos }) => {
  return (
    <header className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto border-b pb-6">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Stockly<span className="text-blue-600">.</span>
        </h1>
        <p className="text-gray-500">Gestão de Inventário Inteligente</p>
      </div>
      
      <div className="flex gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center min-w-[120px]">
          <span className="block text-2xl font-bold text-blue-600">{totalProdutos}</span>
          <span className="text-xs text-gray-400 uppercase font-semibold">Itens no Total</span>
        </div>
      </div>
    </header>
  );
};