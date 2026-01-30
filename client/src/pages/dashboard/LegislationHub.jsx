import { Search } from 'lucide-react';

export default function LegislationHub() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-semibold tracking-tighter dark:text-zinc-300">Legislation Hub</h2>
          <p className="text-zinc-600 dark:text-zinc-400">Browse and search official legislation</p>
        </div>
        <div className="relative w-96">
          <Search className="absolute left-4 top-3.5 text-zinc-400" size={20} />
          <input
            type="text"
            className="w-full pl-11 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy"
            placeholder="Search regulations, directives, RTS..."
          />
        </div>
      </div>

      {/* Placeholder results grid */}
      <div className="space-y-4">
        {/* Repeat 4–5 cards with mock legislation */}
      </div>
    </div>
  );
}