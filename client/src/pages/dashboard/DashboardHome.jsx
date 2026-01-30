import { useAuth } from '../../context/AuthContext';
import { AlertTriangle, FileText, TrendingUp } from 'lucide-react';

export default function DashboardHome() {
  const { user } = useAuth();

  const firstName = user?.name?.split(' ')[0] || 'User';

  return (
    <div>
      {/* Greeting */}
      <div className="mb-10">
        <h2 className="text-3xl font-semibold tracking-tighter text-zinc-900 dark:text-white">
          Good afternoon, {firstName} 👋
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mt-1">
          Here's what's happening with your regulatory landscape today.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Active Alerts Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-100 dark:border-zinc-800 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-950 rounded-2xl flex items-center justify-center">
              <AlertTriangle className="text-amber-600" size={24} />
            </div>
            <div>
              <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Active Alerts</div>
              <div className="text-4xl font-semibold text-amber-600 mt-1">3</div>
            </div>
          </div>
          <div className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            2 require immediate attention
          </div>
          <div className="mt-4 text-xs text-amber-600 font-medium flex items-center gap-1 cursor-pointer hover:underline">
            View all alerts →
          </div>
        </div>

        {/* New Regulations Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-100 dark:border-zinc-800 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950 rounded-2xl flex items-center justify-center">
              <FileText className="text-blue-600" size={24} />
            </div>
            <div>
              <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">New Regulations</div>
              <div className="text-4xl font-semibold mt-1 dark:text-zinc-300">7</div>
            </div>
          </div>
          <div className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            Published this week
          </div>
          <div className="mt-4 text-xs text-blue-600 font-medium flex items-center gap-1 cursor-pointer hover:underline">
            Browse legislation →
          </div>
        </div>

        {/* Compliance Score Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-100 dark:border-zinc-800 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-950 rounded-2xl flex items-center justify-center">
              <TrendingUp className="text-emerald-600" size={24} />
            </div>
            <div>
              <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Compliance Score</div>
              <div className="text-4xl font-semibold text-emerald-600 mt-1">92%</div>
            </div>
          </div>
          <div className="mt-4 text-sm text-emerald-600 flex items-center gap-1">
            ↑ 3% from last month
          </div>
          <div className="mt-4 text-xs text-emerald-600 font-medium flex items-center gap-1 cursor-pointer hover:underline">
            View detailed report →
          </div>
        </div>
      </div>

      {/* Optional: Quick Links / Recent Activity Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Recent Activity</h3>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">Last 7 days</span>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-6 text-sm">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-2 h-2 mt-2 bg-emerald-500 rounded-full"></div>
              <div className="dark:text-zinc-300">
                <div>MiFID II - RTS 28 reporting obligation updated</div>
                <div className="text-zinc-500 dark:text-zinc-400 text-xs mt-0.5">2 hours ago</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-2 h-2 mt-2 bg-amber-500  rounded-full"></div>
              <div className="dark:text-zinc-300">
                <div>DORA - Digital Operational Resilience Act deadline approaching</div>
                <div className="text-zinc-500 dark:text-zinc-400 text-xs mt-0.5">Yesterday</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}