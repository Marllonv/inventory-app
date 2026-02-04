import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      await login(email, senha);
    } catch (err) {
      const mensagem = err.response?.data?.error || "Login ou Senha Inválidos";
      setErro(mensagem);
      alert(mensagem);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-slate-800"> Gestão de Inventário Inteligente </h1>

        {erro && (
          <div className="mb-4 p-3 bg-red-600 text-white rounded-lg text-sm font-medium shadow-md">
            ⚠️ {erro}
          </div>
        )}  

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" placeholder="E-mail" 
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={email} onChange={e => setEmail(e.target.value)}
          />
          <input 
            type="password" placeholder="Senha" 
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={senha} onChange={e => setSenha(e.target.value)}
          />
          <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition-all">
            Entrar no Sistema
          </button>
        </form>
      </div>
    </div>
  );
}