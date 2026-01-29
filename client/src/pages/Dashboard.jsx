import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-tighter text-zinc-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-1">
              Welcome back, {user?.name || 'User'}
            </p>
          </div>
          <button
            onClick={logout}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-medium transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm">
          <p className="text-zinc-600 dark:text-zinc-400">
            This is your protected dashboard. Only logged-in users can see this page.
          </p>
          {user && (
            <div className="mt-6 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              {user.company && <p><strong>Company:</strong> {user.company}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;