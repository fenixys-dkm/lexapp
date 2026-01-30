import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // ← Updated to match your blueprint prefix
  headers: { 'Content-Type': 'application/json' },
});

// Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired token / unauthorized
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/'; // or use navigate('/login') if using router
    }
    return Promise.reject(error);
  }
);

export default api;