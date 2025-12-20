import { useContext } from 'react';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
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
    <>
      <Navbar />
      <Dashboard />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router/>
    </AuthProvider>
  );
}