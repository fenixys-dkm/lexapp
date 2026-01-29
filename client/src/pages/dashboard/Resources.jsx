import { Search, Download, FileText, BookOpen, Video, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState('');

  const resources = [
    {
      id: 1,
      title: "GDPR Compliance Checklist 2026",
      type: "Checklist",
      category: "Data Protection",
      format: "PDF",
      size: "2.4 MB",
      updated: "Jan 15, 2026",
      icon: FileText
    },
    {
      id: 2,
      title: "DORA Implementation Guide",
      type: "Guide",
      category: "Operational Resilience",
      format: "PDF",
      size: "8.1 MB",
      updated: "Jan 20, 2026",
      icon: BookOpen
    },
    {
      id: 3,
      title: "MiFID II Best Execution Training",
      type: "Video",
      category: "Training",
      format: "Video",
      size: "24 min",
      updated: "Jan 10, 2026",
      icon: Video
    },
    {
      id: 4,
      title: "Regulatory Reporting Templates (Excel)",
      type: "Template",
      category: "Reporting",
      format: "XLSX",
      size: "1.2 MB",
      updated: "Jan 22, 2026",
      icon: FileText
    },
  ];

  const filteredResources = resources.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-semibold tracking-tighter">Resources</h2>
          <p className="text-zinc-600 dark:text-zinc-400">Guides, templates, and training materials</p>
        </div>
        <div className="relative w-80">
          <Search className="absolute left-4 top-3.5 text-zinc-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy placeholder-zinc-400"
            placeholder="Search resources..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((resource) => {
          const Icon = resource.icon;
          return (
            <div key={resource.id} className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 hover:shadow-lg transition-all">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Icon size={28} className="text-zinc-600 dark:text-zinc-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium">{resource.title}</div>
                      <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{resource.category} • {resource.type}</div>
                    </div>
                    <div className="text-xs text-zinc-500 whitespace-nowrap">{resource.updated}</div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="text-xs bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                      {resource.format}
                    </div>
                    <div className="text-xs text-zinc-500">{resource.size}</div>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-navy hover:bg-navy/90 text-white text-sm py-2.5 rounded-2xl transition-colors">
                      <Download size={18} />
                      Download
                    </button>
                    <button className="px-4 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800">
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <p className="text-zinc-500 text-sm">More resources coming soon</p>
      </div>
    </div>
  );
}