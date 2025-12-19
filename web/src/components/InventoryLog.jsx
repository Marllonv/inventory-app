export function InventoryLog({ logs }) {
  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <h3 className="font-bold text-gray-700">Histórico de Movimentações</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Data</th>
              <th className="px-6 py-3">Produto</th>
              <th className="px-6 py-3">Tipo</th>
              <th className="px-6 py-3">Qtd. Anterior</th>
              <th className="px-6 py-3">Qtd. Nova</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-500">
                {log.data_movimentacao 
                    ? new Date(log.data_movimentacao.replace(/-/g, "/")).toLocaleString('pt-BR') 
                    : 'Data não disponível'}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{log.produto_nome}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    log.tipo === 'ENTRADA' ? 'bg-green-100 text-green-700' : 
                    log.tipo === 'SAIDA' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {log.tipo}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{log.quantidade_anterior}</td>
                <td className="px-6 py-4 font-bold text-gray-900">{log.quantidade_nova}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}