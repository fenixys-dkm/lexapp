import { useState } from 'react';
import { Search, TestTube, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../../utils/api';

export default function LegislationHub() {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTestButton = async () => {
    setLoading(true);
    setError(null);
    setResponseData(null);

    try {
      const res = await api.get('/api/legislation/nal-list');
      setResponseData(res.data);
      toast.success(`✅ Successfully loaded NAL data (${res.data.count || 'N/A'} items)`);
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Failed to fetch NAL list';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-semibold tracking-tighter dark:text-zinc-300">Legislation Hub</h2>
          <p className="text-zinc-600 dark:text-zinc-400">Browse and search official legislation</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleTestButton}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl hover:border-navy transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin text-amber-600" />
            ) : (
              <TestTube size={20} className="text-amber-600" />
            )}
            <span className="font-medium">
              {loading ? 'Fetching NAL List...' : 'Test: Load NAL List'}
            </span>
          </button>

          <div className="relative w-96">
            <Search className="absolute left-4 top-3.5 text-zinc-400" size={20} />
            <input
              type="text"
              className="w-full pl-11 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy"
              placeholder="Search regulations..."
            />
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-2xl text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Raw JSON Response */}
      {responseData && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-zinc-700 dark:text-zinc-300">Raw API Response</h3>
            <div className="text-xs text-zinc-500">
              {JSON.stringify(responseData).length} characters
            </div>
          </div>
          <div className="bg-zinc-900 dark:bg-black rounded-3xl overflow-hidden border border-zinc-800">
            <pre className="p-6 text-sm text-zinc-200 overflow-auto max-h-[70vh] font-mono whitespace-pre-wrap">
              {JSON.stringify(responseData, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Placeholder when no data */}
      {!loading && !responseData && !error && (
        <div className="text-center py-20 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-3xl">
          <TestTube size={48} className="mx-auto text-zinc-400 mb-4" />
          <p className="text-zinc-500">Click "Test: Load NAL List" to fetch and display raw JSON response</p>
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-20">
          <Loader2 size={32} className="animate-spin text-zinc-400" />
        </div>
      )}
    </div>
  );
}