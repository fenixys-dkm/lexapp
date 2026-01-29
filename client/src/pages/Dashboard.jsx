import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu } from 'lucide-react';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isMainDashboard = location.pathname === '/dashboard';

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
              {isMainDashboard ? 'Dashboard' : 'LexApp'}
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
          {isMainDashboard ? (
            <div>
              <div className="mb-10">
                <h2 className="text-3xl font-semibold tracking-tighter text-zinc-900 dark:text-white">
                  Good afternoon, {user?.name?.split(' ')[0] || 'User'} 👋
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                  Here's what's happening with your regulatory landscape today.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-100 dark:border-zinc-800">
                    <div className="text-sm font-medium text-zinc-500">Active Alerts</div>
                    <div className="text-5xl font-semibold mt-4 text-amber-600">3</div>
                    <div className="text-sm text-zinc-500 mt-1">2 require attention</div>
                  </div>

                  <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-100 dark:border-zinc-800">
                    <div className="text-sm font-medium text-zinc-500">New Regulations</div>
                    <div className="text-5xl font-semibold mt-4">7</div>
                    <div className="text-sm text-zinc-500 mt-1">This week</div>
                  </div>

                  <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-100 dark:border-zinc-800">
                    <div className="text-sm font-medium text-zinc-500">Compliance Score</div>
                    <div className="text-5xl font-semibold mt-4 text-emerald-600">92%</div>
                    <div className="text-sm text-zinc-500 mt-1">↑ 3% from last month</div>
                  </div>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

