import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export function Navbar() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Deseja realmente sair?")) {
      logout();
      navigate('/'); 
    }
  };

  return (
    <nav className="bg-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <div className="flex items-center gap-8">
            <div className="hidden md:flex space-x-4">
              <Link to="/dashboard" className="hover:bg-slate-700 px-3 py-2 rounded-md text-sm font-medium transition-all">
                Produtos
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-slate-400">Logado como:</p>
              <p className="text-sm font-semibold">{user?.nome}</p>
            </div>
            
            <button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              Sair
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}