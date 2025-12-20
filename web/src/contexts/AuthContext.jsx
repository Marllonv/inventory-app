/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const recoveredUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (recoveredUser && token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        return JSON.parse(recoveredUser);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [user]);

  const login = async (email, senha) => {
    setLoading(true);
    try {
      const response = await api.post('?route=login', { email, senha });
      const { user: userData, token } = response.data;

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      
      setUser(userData);
      
      return { success: true };

    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.error || 'Não foi possível conectar ao servidor.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      authenticated: !!user, 
      user, 
      loading, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}