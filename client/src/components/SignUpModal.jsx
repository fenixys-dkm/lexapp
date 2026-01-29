import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SignUpModal({ 
  isOpen, 
  onClose, 
  onSwitchToLogin 
}) {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName('');
      setEmail('');
      setCompany('');
      setPassword('');
      setConfirmPassword('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const user = await register(name, email, company, password);

      toast.success('Account created successfully! Welcome to LexApp.', {
        position: "bottom-right",
        autoClose: 4000,
      });

      onClose();
      //navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);

      let message = 'Registration failed. Please try again.';

      if (err.response) {
        const status = err.response.status;
        const serverMsg = err.response.data?.error;

        if (status === 400) {
          message = serverMsg || 'Invalid input. Please check your details.';
        } else if (status === 409 || serverMsg?.toLowerCase().includes('already')) {
          message = 'An account with this email already exists.';
        } else if (status >= 500) {
          message = 'Server error. Please try again later.';
        } else {
          message = serverMsg || `Error: ${status}`;
        }
      } else if (err.request) {
        message = 'Cannot connect to server. Is the backend running?';
      } else {
        message = err.message || 'An unexpected error occurred';
      }

      setError(message);
      toast.error(message, { position: "bottom-right", autoClose: 6000 });
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
        <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 text-2xl">✕</button>

        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-2">Create account</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">Join LexApp to simplify regulatory compliance</p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-2xl text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy dark:text-white"
              placeholder="John Smith"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Work Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy dark:text-white"
              placeholder="john@company.com"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Company (optional)</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy dark:text-white"
              placeholder="Acme Financial"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy dark:text-white"
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy dark:text-white"
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-navy hover:bg-navy/90 disabled:bg-navy/60 text-white font-medium py-3.5 rounded-2xl transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⟳</span>
                Creating account...
              </>
            ) : (
              'Create account'
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-zinc-500">
          Already have an account?{' '}
          <button 
            onClick={onSwitchToLogin}
            className="text-blue-500 hover:text-blue-600 hover:underline font-medium"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}