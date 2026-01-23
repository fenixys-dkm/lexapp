import { useState } from 'react';

export default function ForgotPasswordModal({ isOpen, onClose, onBackToLogin }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));

    // TODO: Call your Flask endpoint: /api/auth/forgot-password
    console.log('Password reset requested for:', email);
    
    setStatus('success');
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

        {status === 'success' ? (
          // Success state
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-2xl flex items-center justify-center mb-6">
              ✅
            </div>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-2">Check your email</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8">
              If an account exists for <span className="font-medium text-zinc-900 dark:text-white">{email}</span>,<br />
              we’ve sent a password reset link.
            </p>
            <button
              onClick={onBackToLogin}
              className="text-navy hover:underline font-medium"
            >
              Back to login
            </button>
          </div>
        ) : (
          // Form state
          <>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-2">Forgot password?</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8">
              Enter your email address and we’ll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition"
                  placeholder="john@company.com"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-navy hover:bg-navy/70 disabled:opacity-70 text-white font-medium py-3.5 rounded-2xl transition-colors"
              >
                {status === 'loading' ? 'Sending reset link...' : 'Send reset link'}
              </button>
            </form>

            <div className="mt-8 text-center text-sm">
              <button 
                onClick={onBackToLogin}
                className="text-blue-400 hover:text-blue-300 dark:text-blue-400 hover:underline"
              >
                Back to login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}