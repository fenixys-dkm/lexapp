import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load token & validate on app start
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      api.get('/me')
        .then((res) => {
          setUser(res.data);
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem('access_token');
          setIsAuthenticated(false);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const register = async (name, email, company = '', password) => {
    const res = await api.post('/register', {
      name,
      email,
      company,
      password,
    });

    // Auto-login after successful registration (best UX)
    const user = await login(email, password);
    return user;
  };

  const login = async (email, password) => {
    const res = await api.post('/login', { email, password });
    const { access_token, user } = res.data;

    localStorage.setItem('access_token', access_token);
    setUser(user);
    setIsAuthenticated(true);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,     // ← Add this
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};