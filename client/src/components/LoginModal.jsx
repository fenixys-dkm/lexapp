import { useState } from 'react';
import { useAuth } from '../context/AuthContext';   // Add this

export default function LoginModal({ 
  isOpen, 
  onClose, 
  onSwitchToSignUp,
  onForgotPassword   // ← New prop
}) {
  const { login } = useAuth();   // ← Use context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('INITIATED handleSubmit /api/auth/login');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.access_token, data.user);  // ← Call context login to update global state
        console.log('Logged in:', data.user);
        onClose();
        // TODO: redirect to dashboard or update global auth state
        alert('Login successful!');
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      alert('Could not connect to server');
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email & Password fields remain the same */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition"
              placeholder="john@company.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-navy hover:bg-navy/70 text-white font-medium py-3.5 rounded-2xl transition-colors"
          >
            Sign in
          </button>
        </form>

        {/* Forgot password link - now functional */}
        <div className="mt-8 text-center text-sm">
          <button 
            onClick={onForgotPassword}
            className="text-blue-400 hover:text-blue-300 dark:text-blue-400 hover:underline transition-colors"
          >
            Forgot password?
          </button>
          <span className="text-zinc-500 dark:text-zinc-600 mx-2">·</span>
          <button 
            onClick={onSwitchToSignUp}
            className="text-blue-400 hover:text-blue-300 dark:text-blue-400 hover:underline transition-colors"
          >
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
}