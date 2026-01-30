import { useState } from 'react';
import { User, Bell, Globe, Lock, Shield, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Settings() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'jurisdictions', label: 'Jurisdictions', icon: Globe },
    { id: 'security', label: 'Security', icon: Lock },
  ];

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-3xl font-semibold tracking-tighter dark:text-zinc-300">Settings</h2>
        <p className="text-zinc-600 dark:text-zinc-400">Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-zinc-200 dark:border-zinc-800 mb-10">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-4 text-sm font-medium border-b-2 transition-colors -mb-px
                ${activeTab === tab.id 
                  ? 'border-navy text-navy dark:text-zinc-300' 
                  : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="max-w-2xl">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8">
            <div className="flex gap-6 items-start">
              <div className="w-24 h-24 bg-zinc-200 dark:bg-zinc-700 rounded-3xl flex items-center justify-center text-4xl font-semibold dark:text-white">
                {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : '??'}
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1.5">FULL NAME</label>
                  <input type="text" defaultValue={user?.name || ''} className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-3 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1.5">EMAIL</label>
                  <input type="email" defaultValue={user?.email || ''} className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-3 dark:text-white" disabled />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1.5">COMPANY</label>
                  <input type="text" defaultValue={user?.company || ''} className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-3 dark:text-white" />
                </div>
                <button className="mt-4 bg-navy text-white px-8 py-3 rounded-2xl text-sm font-medium dark:hover:bg-zinc-800">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Placeholder content for other tabs */}
      {activeTab === 'notifications' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 max-w-2xl ">
          <h3 className="font-medium mb-6 dark:text-zinc-300">Notification Preferences</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center dark:text-zinc-400">
              <div>Daily regulatory digest</div>
              <div className="w-11 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex justify-between items-center dark:text-zinc-400">
              <div>Urgent compliance alerts</div>
              <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full relative cursor-pointer">
                <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'jurisdictions' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 max-w-2xl">
          <p className="text-zinc-500">Jurisdiction selection coming soon...</p>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 max-w-2xl space-y-8">
          
          {/* Change Password Section */}
          <div>
            <h3 className="font-medium mb-4 flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
              <Lock size={18} />
              Change Password
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              Update your password to keep your account secure
            </p>
            <button className="flex items-center border border-zinc-300 dark:border-zinc-700 px-6 py-3 rounded-2xl text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors dark:text-zinc-300">
              Update Password
            </button>
          </div>

          {/* Delete Account Section */}
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <h3 className="font-medium mb-3 flex items-center gap-2 text-red-600 dark:text-red-500">
              <Trash2 size={20} />
              Delete Account
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">
              Permanently remove your account and all associated data. This action cannot be undone.
            </p>
            {/* Compact, left-aligned button (not full width) */}
            <button className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-2xl transition-colors">
              Delete My Account
            </button>
            <p className="text-[10px] text-zinc-400 mt-3 text-center">
              This will delete your profile, settings, and all data
            </p>
          </div>
        </div>
      )}
    </div>
  );
}