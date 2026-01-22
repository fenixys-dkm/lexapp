import { useState } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Bar */}
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-x-3 group">
            <div className="flex-shrink-0">
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 32 32" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-navy dark:text-white"
              >
                <rect x="6" y="6" width="6" height="20" rx="2" fill="currentColor" />
                <rect x="6" y="22" width="18" height="4" rx="2" fill="currentColor" />
              </svg>
            </div>
            <span className="font-semibold text-[27px] tracking-[-0.04em] text-zinc-900 dark:text-white">
              LexApp
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-x-10">
            
            {/* Nav Links */}
            <div className="flex items-center gap-x-10 text-sm font-medium">
              <a href="#solutions" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Solutions</a>
              <a href="#services" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Services</a>
              <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
              <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-x-3">
              <button className="bg-navy hover:bg-navy/90 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
                Login
              </button>
            <button className="border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
              Sign up
            </button>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-x-3">
            <button 
              className="text-3xl text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
            <div className="flex flex-col gap-y-6 text-lg font-medium text-gray-700 dark:text-gray-300">
              <a href="#solutions" onClick={() => setIsOpen(false)}>Solutions</a>
              <a href="#services" onClick={() => setIsOpen(false)}>Services</a>
              <a href="#about" onClick={() => setIsOpen(false)}>About</a>
              <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
              
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button className="bg-navy text-white py-3 rounded-xl font-medium">
                  Login
                </button>
                <button className="border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white py-3 rounded-xl font-medium transition-colors">
                  Sign up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}