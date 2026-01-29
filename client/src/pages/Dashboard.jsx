import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import DashboardHome from './dashboard/DashboardHome'; // ← Only for fallback if needed

export default function Dashboard() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Dynamic page title based on current route
  const pageTitles = {
    '/dashboard': 'Dashboard',
    '/dashboard/legal_domain': 'Legal Domain',
    '/dashboard/legislation_hub': 'Legislation Hub',
    '/dashboard/notifications': 'Notifications',
    '/dashboard/resources': 'Resources',
    '/dashboard/settings': 'Settings',
  };

  const currentTitle = pageTitles[location.pathname] || 'LexApp';

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Bar */}
        <div className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-zinc-700 dark:text-zinc-300 p-1"
          >
            <Menu size={28} />
          </button>

          <div className="ml-4 md:ml-0 flex-1">
            <h1 className="font-semibold text-xl text-zinc-900 dark:text-white">
              {currentTitle}
            </h1>
          </div>

          <div className="hidden md:block text-sm text-zinc-500">
            {new Date().toLocaleDateString('en-GB', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 md:p-8">
            <Outlet />   {/* ← All sub-pages (including DashboardHome) render here */}
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}