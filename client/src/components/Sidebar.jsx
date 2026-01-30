import { useNavigate, useLocation } from 'react-router-dom';   // ← Add useLocation
import { 
  Home, FileText, Bell, Layers, Search, BarChart3, Settings, LogOut, X, BookOpen, 
  Heart,
  Pen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';   // ← Add this import

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();        // ← Add this line
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Legal Domain', icon: Layers, path: '/dashboard/legal_domain' },
    { name: 'Favorites', icon: Heart, path: '/dashboard/favorites' },
    { name: 'Notifications', icon: Bell, path: '/dashboard/notifications' },
    { name: 'Resources', icon: BookOpen, path: '/dashboard/resources' },
    { name: 'Legislation Hub', icon: Search, path: '/dashboard/legislation_hub' },
    { name: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
    { name: 'Management', icon: Pen, path: '/dashboard/management' },
    { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleNavClick = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <div className={`
      fixed md:static inset-y-0 left-0 z-50 w-72 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800
      transform transition-transform duration-300 md:translate-x-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
          <div className="w-9 h-9 bg-navy rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">L</span>
          </div>
          <div>
            <div className="font-semibold text-xl tracking-tighter text-zinc-900 dark:text-white">LexApp</div>
            <div className="text-[10px] text-zinc-500 -mt-1">Compliance OS</div>
          </div>
          <button 
            onClick={onClose}
            className="md:hidden ml-auto text-zinc-500 hover:text-zinc-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-3 py-6">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-navy text-white' 
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                >
                  <item.icon size={20} />
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* User Section */}
        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800">
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-3xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-zinc-200 dark:bg-zinc-700 rounded-2xl flex items-center justify-center text-xl font-semibold">
                {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : '??'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-zinc-900 dark:text-white truncate">{user?.name}</div>
                <div className="text-zinc-500 dark:text-zinc-400 text-sm truncate">{user?.email}</div>
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <div className="mt-4 flex items-center justify-between px-1 py-1">
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {darkMode ? <Moon size={18} /> : <Sun size={18} />}
                <span>Dark mode</span>
            </div>
            <button
                onClick={toggleDarkMode}
                className="relative w-11 h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full transition-colors"
            >
                <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200 
                    ${darkMode ? 'translate-x-5 bg-amber-500' : ''}`}
                />
            </button>
            </div>

            <button
              onClick={handleLogout}
              className="mt-4 w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-700 dark:text-red-500 py-2.5 rounded-2xl hover:bg-red-50 dark:hover:bg-red-950/50 text-sm font-medium transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}