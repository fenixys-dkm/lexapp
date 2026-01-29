import { useState } from 'react';
import { Bell, Check, Clock, AlertTriangle, FileText } from 'lucide-react';

export default function Notifications() {
  const [activeTab, setActiveTab] = useState('all'); // all, unread, important

  const notifications = [
    {
      id: 1,
      title: "MiFID II RTS 28 - New reporting requirement",
      message: "Updated obligations effective from 1 March 2026",
      time: "2 hours ago",
      type: "urgent",
      read: false,
      icon: AlertTriangle
    },
    {
      id: 2,
      title: "DORA compliance deadline approaching",
      message: "Digital Operational Resilience Act - Phase 2 starts in 45 days",
      time: "Yesterday",
      type: "important",
      read: false,
      icon: Clock
    },
    {
      id: 3,
      title: "GDPR Article 30 - Record of processing activities",
      message: "New guidance published by the Danish Data Protection Agency",
      time: "3 days ago",
      type: "info",
      read: true,
      icon: FileText
    },
    // Add more as needed
  ];

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'unread') return !n.read;
    if (activeTab === 'important') return n.type === 'urgent' || n.type === 'important';
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-semibold tracking-tighter">Notifications</h2>
          <p className="text-zinc-600 dark:text-zinc-400">Stay updated on regulatory changes</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-sm">
          <Check size={18} />
          Mark all as read
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-px">
        {['all', 'unread', 'important'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium rounded-t-2xl transition-colors capitalize
              ${activeTab === tab 
                ? 'bg-white dark:bg-zinc-900 border border-b-0 border-zinc-200 dark:border-zinc-800' 
                : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filteredNotifications.map((notif) => {
          const Icon = notif.icon;
          return (
            <div key={notif.id} className={`flex gap-4 p-5 rounded-3xl border ${notif.read ? 'border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900' : 'border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/50'}`}>
              <div className={`w-11 h-11 rounded-2xl flex-shrink-0 flex items-center justify-center ${notif.type === 'urgent' ? 'bg-red-100 dark:bg-red-950' : 'bg-zinc-100 dark:bg-zinc-800'}`}>
                <Icon size={24} className={notif.type === 'urgent' ? 'text-red-600' : 'text-zinc-600 dark:text-zinc-400'} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{notif.title}</h3>
                  <span className="text-xs text-zinc-500 whitespace-nowrap">{notif.time}</span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{notif.message}</p>
                <div className="mt-3 flex gap-3">
                  <button className="text-xs px-3 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:bg-zinc-50">
                    View details
                  </button>
                  {!notif.read && (
                    <button className="text-xs px-3 py-1 text-emerald-600 hover:underline">Mark as read</button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}