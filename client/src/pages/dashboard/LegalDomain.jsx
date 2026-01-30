import { useState, useEffect } from 'react';
import { 
  Scale,
  Gavel,
  Shield,
  ShieldCheck,
  Lock,
  Cpu,
  Database,
  Layers,
  Building2,
  Briefcase,
  FileText,
  BookOpen,
  Landmark,
  Banknote,
  Globe,
  Zap,
  Server,
  Cloud,
  PieChart,
  TrendingUp,
} from 'lucide-react';
import api from '../../utils/api';

const iconComponents = {
  Scale: Scale,
  Gavel: Gavel,
  Shield: Shield,
  ShieldCheck: ShieldCheck,
  Lock: Lock,
  Cpu: Cpu,
  Database: Database,
  Layers: Layers,
  Building2: Building2,
  Briefcase: Briefcase,
  FileText: FileText,
  BookOpen: BookOpen,
  Landmark: Landmark,
  Banknote: Banknote,
  Globe: Globe,
  Zap: Zap,
  Server: Server,
  Cloud: Cloud,
  PieChart: PieChart,
  TrendingUp: TrendingUp,
};



export default function LegalDomain() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Add this inside LegalDomain component (or at top level)
  const domainColorStyles = {
    "red":      { bg: "bg-red-100 dark:bg-red-950",     text: "text-red-600" },
    "orange":   { bg: "bg-orange-100 dark:bg-orange-950",     text: "text-orange-600" },
    "amber":    { bg: "bg-amber-100 dark:bg-amber-950",   text: "text-amber-600" },
    "yellow":   { bg: "bg-yellow-100 dark:bg-yellow-950",     text: "text-yellow-600" },
    "lime":     { bg: "bg-lime-100 dark:bg-lime-950",     text: "text-lime-600" },
    "green":    { bg: "bg-green-100 dark:bg-green-950",     text: "text-green-600" },
    "emerald":  { bg: "bg-emerald-100 dark:bg-emerald-950", text: "text-emerald-600" },
    "teal":     { bg: "bg-teal-100 dark:bg-teal-950", text: "text-teal-600" },
    "cyan":     { bg: "bg-cyan-100 dark:bg-cyan-950",     text: "text-cyan-600" },
    "sky":      { bg: "bg-sky-100 dark:bg-sky-950",       text: "text-sky-600" },
    "blue":     { bg: "bg-blue-100 dark:bg-blue-950",     text: "text-blue-600" },
    "indigo":   { bg: "bg-indigo-100 dark:bg-indigo-950", text: "text-indigo-600" },
    "violet":   { bg: "bg-violet-100 dark:bg-violet-950", text: "text-violet-600" },
    "purple":   { bg: "bg-purple-100 dark:bg-purple-950", text: "text-purple-600" },
    "fuchsia":  { bg: "bg-fuchsia-100 dark:bg-fuchsia-950", text: "text-fuchsia-600" },
    "pink":     { bg: "bg-pink-100 dark:bg-pink-950",     text: "text-pink-600" },
    "rose":     { bg: "bg-rose-100 dark:bg-rose-950",     text: "text-rose-600" },
    "slate":    { bg: "bg-slate-100 dark:bg-slate-950",   text: "text-slate-600" },
    "gray":     { bg: "bg-gray-100 dark:bg-gray-950",     text: "text-gray-600" },
    "zinc":     { bg: "bg-zinc-100 dark:bg-zinc-950",     text: "text-zinc-600" },
    "neutral":  { bg: "bg-neutral-100 dark:bg-neutral-950", text: "text-neutral-600" },
    "stone":    { bg: "bg-stone-100 dark:bg-stone-950",   text: "text-stone-600" },
  };


  useEffect(() => {
    const fetchLegalDomains = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/api/legal-domains/?is_standard=true');
        setDomains(response.data);
      } catch (err) {
        console.error('Failed to fetch legal domains:', err);
        setError('Failed to load regulatory domains. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLegalDomains();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading regulatory domains...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }



  return (
    <div>
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-white ">Legal Domain</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mt-2">Select your primary regulatory focus areas</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {domains.map((domain) => {
          const IconComponent = iconComponents[domain.icon_name] || Layers;
          const style = domainColorStyles[domain.color] || domainColorStyles["blue"];

          return (
            <div 
              key={domain.id || domain.slug} 
              className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-7 hover:border-navy dark:hover:border-zinc-500 hover:shadow-xl transition-all cursor-pointer"
            >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${style.bg}`}>
              <IconComponent size={32} className={style.text} />
            </div>
              <h3 className="font-semibold text-xl mb-1 dark:text-zinc-300">{domain.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">{domain.description}</p>
              <div className="flex items-center justify-between">
                <div className="text-xs font-medium bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full dark:text-zinc-400">
                  {domain.regulations_count || domain.regulation_count} regulations
                </div>
                <button className="text-navy dark:text-zinc-400 text-xs font-medium group-hover:underline">
                  Explore →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
