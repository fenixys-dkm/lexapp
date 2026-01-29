import { useState, useRef, useEffect } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import LoginModal from './LoginModal';   // ← Add this line
import SignUpModal from './SignUpModal';   // ← Add this line
import ForgotPasswordModal from './ForgotPasswordModal';   // ← Add this line
import { useAuth } from '../context/AuthContext';  // ← Add this
import { getInitials } from '../utils/getInitials';  // ← Import the helper
import { toast } from 'react-toastify';           // ← Add this
import 'react-toastify/dist/ReactToastify.css';  // ← Add this (or import once in main file)


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);  // ← New state for dropdown

  const { user, isAuthenticated, logout } = useAuth();  // ← Use context here

  const dropdownRef = useRef(null);  // ← Add ref for outside click detection
  const initials = getInitials(user?.name);  // ← Compute initials

  const handleSwitchToLogin = () => {
    setShowSignUpModal(false);
    setShowLoginModal(true);
  };
  const handleSwitchToSignUp = () => {
    setShowLoginModal(false);
    setShowSignUpModal(true);
  };
  const handleOpenForgotPassword = () => {
    setShowLoginModal(false);
    setShowForgotPasswordModal(true);
  };

  // ← Add effect for handling clicks outside the dropdown
  useEffect(() => {
    if (!showDropdown) return;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = async () => {     // ← make it async if needed
    try {
      await logout();                    // if your logout is async (e.g. calls server)
      setShowDropdown(false);
      setIsOpen(false);

      toast.success('Logged out successfully', {
        position: "bottom-right",
        autoClose: 4000,
      });
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Failed to log out. Please try again.', {
        position: "bottom-right",
        autoClose: 4000,
      });
    }
  };

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

            {/* Auth Section - Updated with Avatar + Dropdown */}
            <div className="flex items-center gap-x-3 relative">
              {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>  {/* ← Attach ref here */}
                  <button 
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 min-w-[110px] bg-navy hover:bg-navy/70 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  >
                    <span className="text-sm text-zinc-900 dark:text-white hidden md:inline">Welcome, {initials}</span> {/* Shows initials on desktop for brevity */}
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-xl shadow-lg py-2 z-10">
                      <p className="px-4 py-2 text-sm text-zinc-900 dark:text-white">Logged in as {user.name}</p>

                      <button 
                        onClick={() => {
                          setShowDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm dark:text-gray-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors font-medium"
                      >
                        Enter App
                      </button>                      
                      <button 
                        onClick={handleLogout}   // ← changed
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => setShowLoginModal(true)}
                    className="min-w-[110px] bg-navy hover:bg-navy/70 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowSignUpModal(true)}
                    className="min-w-[110px] border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  >
                    Sign up
                  </button>
                </>
              )}
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
          <div className="mobile-menu md:hidden py-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
            <div className="flex flex-col gap-y-6 text-lg font-medium text-gray-700 dark:text-gray-300">
              <a href="#solutions" onClick={() => setIsOpen(false)}>Solutions</a>
              <a href="#services" onClick={() => setIsOpen(false)}>Services</a>
              <a href="#about" onClick={() => setIsOpen(false)}>About</a>
              <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
              
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                {isAuthenticated ? (
                  <>
                    <div className="text-center">
                      <p className="px-4 py-2 text-sm text-zinc-900 dark:text-white">Logged in as {user.name}</p>
                    </div>
                    <button 
                      //onClick={() => setShowLoginModal(true)}
                      className="min-w-full bg-navy text-white py-3 rounded-xl font-medium"
                    >
                      Enter App
                    </button>
                    <button 
                      onClick={handleLogout}   // ← changed
                      className="min-w-full bg-red-600 text-white py-3 rounded-xl font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => setShowLoginModal(true)}
                      className="min-w-full bg-navy text-white py-3 rounded-xl font-medium"
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => setShowSignUpModal(true)}
                      className="min-w-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white py-3 rounded-xl font-medium transition-colors"
                    >
                      Sign up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignUp={handleSwitchToSignUp}
        onForgotPassword={handleOpenForgotPassword}   // ← add this
      />
      <ForgotPasswordModal 
        isOpen={showForgotPasswordModal} 
        onClose={() => setShowForgotPasswordModal(false)}
        onBackToLogin={() => {
          setShowForgotPasswordModal(false);
          setShowLoginModal(true);
        }}
      />
      <SignUpModal 
        isOpen={showSignUpModal} 
        onClose={() => setShowSignUpModal(false)}
        onSwitchToLogin={handleSwitchToLogin}   // ← add this
      />
    </nav>
  );
}