import { useState } from 'react';
import { useAuth } from '../context/AuthContext';   // ← Use context

export default function SignUpModal({ isOpen, onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
  });
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //Don't refresh page
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log('Sign up attempt:', formData);
    try {
          const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              company: formData.company || null, // Optional field
              password: formData.password,
            }),
          });

          const data = await response.json();

          if (response.ok) {
            alert('Account created successfully! Please log in.');
            onSwitchToLogin(); // Switch to login modal after success
          } else {
            alert(data.error || 'Registration failed. Please try again.');
          }
        } catch (error) {
          console.error('Signup error:', error);
          alert('Could not connect to the server. Please check if the backend is running.');
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

        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-2">Create your account</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">Start your free trial of LexApp</p>

        <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Full Name - full width */}
        <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Full Name</label>
            <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition text-zinc-900 dark:text-white"
            placeholder="John Smith"
            required
            />
        </div>

        {/* Company Name - full width */}
        <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Company Name</label>
            <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition  text-zinc-900 dark:text-white"
            placeholder="Acme Financial"
            />
        </div>

        {/* Work Email - full width */}
        <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Work Email</label>
            <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition  text-zinc-900 dark:text-white"
            placeholder="john@company.com"
            required
            />
        </div>

        {/* Password fields side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Password</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition text-zinc-900 dark:text-white"
                placeholder="••••••••"
                required
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Confirm Password</label>
            <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition text-zinc-900 dark:text-white"
                placeholder="••••••••"
                required
            />
            </div>
        </div>

        <button
            type="submit"
            className="w-full bg-navy hover:bg-navy/90 text-white font-medium py-3.5 rounded-2xl transition-colors mt-2"
        >
            Create Account
        </button>
        </form>

        <div className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
        Already have an account?{' '}
        <button 
            onClick={onSwitchToLogin}   // ← make it functional
            className="text-blue-400 hover:text-blue-300 dark:text-blue-400 hover:underline transition-colors"
        >
            Sign in
        </button>
        </div>
      </div>
    </div>
  );
}