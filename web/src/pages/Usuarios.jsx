import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';

export function Usuarios() {
  const { user } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ id: '', nome: '', email: '', senha: '', nivel: 'comum' });
  const [msg, setMsg] = useState({ type: '', text: '' });

  const carregarUsuarios = async () => {
    try {
      const response = await api.get('?route=usuarios');
      setUsuarios(response.data);
    } catch (err) {
      console.error("Erro ao carregar lista", err);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put('?route=usuarios', formData);
        setMsg({ type: 'success', text: 'Usuário atualizado!' });
      } else {
        await api.post('?route=usuarios', formData);
        setMsg({ type: 'success', text: 'Usuário cadastrado!' });
      }
      
      setFormData({ id: '', nome: '', email: '', senha: '', nivel: 'comum' });
      setIsEditing(false);
      carregarUsuarios();
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.error || 'Erro na operação.' });
    }
  };

  const handleEdit = (u) => {
    setIsEditing(true);
    setFormData({ ...u, senha: '' }); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir este usuário?")) {
      try {
        await api.delete(`?route=usuarios&id=${id}`);
        carregarUsuarios();
      } catch (err) {
        alert("Erro ao excluir. Verifique se você tem permissão.");
      }
    }
  };

  if (user?.nivel !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500">
        <span className="text-4xl mb-2">🚫</span>
        <p className="text-xl font-semibold">Acesso restrito para administradores.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Formulário */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {isEditing ? '✏️ Editando Usuário' : '🙎‍♂️ Novo Usuário'}
        </h2>
        
        {msg.text && (
          <div className={`p-3 mb-4 rounded text-sm ${msg.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {msg.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            placeholder="Nome Completo"
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.nome}
            onChange={e => setFormData({...formData, nome: e.target.value})}
            required
          />
          <input 
            type="email" placeholder="E-mail"
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            required
          />
          <input 
            type="password" 
            placeholder={isEditing ? "Nova senha (opcional)" : "Senha"}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.senha}
            onChange={e => setFormData({...formData, senha: e.target.value})}
            required={!isEditing} 
          />
          <select 
            className="border p-2 rounded bg-white"
            value={formData.nivel}
            onChange={e => setFormData({...formData, nivel: e.target.value})}
          >
            <option value="comum">Funcionário: Comum</option>
            <option value="admin">Administrador: Admin</option>
          </select>
          
          <div className="md:col-span-2 flex gap-2">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition-all">
              {isEditing ? 'Salvar Alterações' : 'Cadastrar Usuário'}
            </button>
            {isEditing && (
              <button 
                type="button" 
                onClick={() => {setIsEditing(false); setFormData({id:'', nome:'', email:'', senha:'', nivel:'comum'})}}
                className="px-4 py-2 bg-slate-200 text-slate-600 rounded font-bold hover:bg-slate-300"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-600 text-sm uppercase font-semibold">
              <th className="p-4">Nome / E-mail</th>
              <th className="p-4">Nível</th>
              <th className="p-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {usuarios.map(u => (
              <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="font-medium text-slate-800">{u.nome}</div>
                  <div className="text-xs text-slate-500">{u.email}</div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    u.nivel === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {u.nivel}
                  </span>
                </td>
                <td className="p-4 text-center space-x-3">
                  <button 
                    onClick={() => handleEdit(u)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(u.id)}
                    className="text-red-600 hover:text-red-800 font-medium text-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}