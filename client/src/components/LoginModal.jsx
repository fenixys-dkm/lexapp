import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LoginModal({ 
  isOpen, 
  onClose, 
  onSwitchToSignUp,
  onForgotPassword 
}) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Clear form when modal opens
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setPassword('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const user = await login(email, password);   // ← Uses axios from context

      toast.success('Login successful! Welcome back.', {
        position: "bottom-right",
        autoClose: 3000,
      });

      onClose();
      //navigate('/dashboard');   // ← Redirect to protected dashboard
    } catch (error) {
      console.error('Login error:', error);

      let errorMessage = 'Login failed. Please try again.';

      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const serverError = error.response.data?.error;

        if (status === 401) {
          errorMessage = serverError || 'Invalid email or password';
        } else if (status === 404) {
          errorMessage = 'Login service not found. Please check server configuration.';
        } else if (status === 400) {
          errorMessage = serverError || 'Invalid request';
        } else if (status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        } else {
          errorMessage = serverError || `Error: ${status}`;
        }
      } 
      else if (error.request) {
        // Request made but no response received (network/CORS issue)
        if (error.message.includes('CORS')) {
          errorMessage = 'CORS error: Unable to connect to server. Check backend CORS settings.';
        } else if (error.message.includes('Network')) {
          errorMessage = 'Network error: Cannot reach the server. Is the backend running?';
        } else {
          errorMessage = 'Cannot connect to server. Please check your internet connection.';
        }
      } 
      else {
        // Something else happened
        errorMessage = error.message || 'An unexpected error occurred';
      }

      setError(errorMessage);
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl w-full max-w-md p-8 relative" 
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 text-2xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-2">Welcome back</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">Sign in to your LexApp account</p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-2xl text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-white mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-colors dark:text-white"
              placeholder="john@company.com"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-white mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-colors dark:text-white"
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-navy hover:bg-navy/90 disabled:bg-navy/60 disabled:cursor-not-allowed text-white font-medium py-3.5 rounded-2xl transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⟳</span>
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-zinc-500">
          <button 
            onClick={onForgotPassword}
            className="text-blue-500 hover:text-blue-600 hover:underline"
          >
            Forgot password?
          </button>
          <span className="mx-2">·</span>
          <button 
            onClick={onSwitchToSignUp}
            className="text-blue-500 hover:text-blue-600 hover:underline"
          >
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
}