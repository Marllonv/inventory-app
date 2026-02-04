import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom'; // 1. Importar as ferramentas de rota
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Usuarios } from './pages/Usuarios'; // 2. Importar sua nova página
import { Navbar } from './components/Navbar';

function Router() {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!authenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/usuarios" element={<Usuarios />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router/>
    </AuthProvider>
  );
}