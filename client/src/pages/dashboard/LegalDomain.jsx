// src/pages/dashboard/LegalDomain.jsx
import { Layers, Building, Shield, Cpu, Lock, Database } from 'lucide-react';

export default function LegalDomain() {
  const domains = [
    {
      title: "Banking & Finance",
      description: "CRD, CRR, MiFID II, PSD2, BRRD",
      count: 28,
      icon: Layers,
      color: "blue"
    },
    {
      title: "Payments & Fintech",
      description: "PSD2, PSR, Open Banking, Instant Payments",
      count: 19,
      icon: Cpu,
      color: "emerald"
    },
    {
      title: "Data Protection",
      description: "GDPR, ePrivacy, Data Act, DGA",
      count: 14,
      icon: Shield,
      color: "amber"
    },
    {
      title: "Cybersecurity & DORA",
      description: "DORA, NIS2, Cybersecurity Act",
      count: 12,
      icon: Lock,
      color: "rose"
    },
    {
      title: "AI & Digital Services",
      description: "AI Act, DSA, DMA, Data Act",
      count: 9,
      icon: Cpu,
      color: "violet"
    },
    {
      title: "AML & Sanctions",
      description: "AMLD6, AML Regulation, Sanctions screening",
      count: 16,
      icon: Database,
      color: "slate"
    },
  ];

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-3xl font-semibold tracking-tighter text-zinc-900 dark:text-white">
          Legal Domain
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mt-1">
          Select your primary regulatory focus areas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {domains.map((domain) => {
          const Icon = domain.icon;
          return (
            <div
              key={domain.title}
              className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-7 hover:border-navy hover:shadow-xl transition-all cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-${domain.color}-100 dark:bg-${domain.color}-950`}>
                <Icon size={32} className={`text-${domain.color}-600`} />
              </div>
              <h3 className="font-semibold text-xl mb-1 dark:text-zinc-300">{domain.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">{domain.description}</p>
              <div className="flex items-center justify-between">
                <div className="text-xs font-medium bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full dark:text-zinc-400">
                  {domain.count} regulations
                </div>
                <div className="text-navy dark:text-zinc-400 text-xs font-medium group-hover:underline">Explore →</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}