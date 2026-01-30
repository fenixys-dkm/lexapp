import { useState, useEffect, useCallback } from 'react';
import { 
  Scale, Gavel, Shield, ShieldCheck, Lock, Cpu, Database, Layers, Building2,
  Briefcase, FileText, BookOpen, Landmark, Banknote, Globe, Zap, Server,
  Cloud, PieChart, TrendingUp, Plus, X, Trash2, Pencil
} from 'lucide-react';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  X: X,
  Trash2: Trash2,
  Pencil: Pencil
};
const availableColors = ["blue", "emerald", "amber", "orange", "rose", "violet", "indigo", "cyan", "teal", "slate", "zinc", "red", "yellow", "lime", "green", "purple", "fuchsia", "pink", "gray", "stone", "neutral"];


export default function LegalDomain() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [domainToDelete, setDomainToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [domainToEdit, setDomainToEdit] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon_name: 'Scale',
    color: 'blue'
  });
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


const fetchDomains = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/legal-domains/');   // remove ?is_standard=true
      setDomains(response.data);
    } catch (err) {
      setError('Failed to load regulatory domains');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDomains();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/api/legal-domains/', formData);

      // Success toast
      toast.success(`"${formData.title}" has been created successfully!`);

      // Close modal and reset form
      setIsModalOpen(false);
      setFormData({ 
        title: '', 
        description: '', 
        icon_name: 'Scale', 
        color: 'blue' 
      });

      // Refresh the list
      fetchDomains();

    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'Failed to create domain';
      toast.error(errorMsg);
    }
  };

  const handleDeleteClick = (domain) => {
    setDomainToDelete(domain);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = useCallback(async () => {
    if (!domainToDelete) return;

    try {
      await api.delete(`/api/legal-domains/${domainToDelete.id}`);
      toast.success(`"${domainToDelete.title}" has been deleted successfully`);
      setIsDeleteModalOpen(false);
      setDomainToDelete(null);
      fetchDomains();
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'Failed to delete domain';
      toast.error(errorMsg);
    }
  }, [domainToDelete, fetchDomains]);

  const handleEditClick = (domain) => {
    setDomainToEdit(domain);
    setFormData({
      title: domain.title,
      description: domain.description || '',
      icon_name: domain.icon_name,
      color: domain.color
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!domainToEdit) return;

    try {
      await api.put(`/api/legal-domains/${domainToEdit.id}`, formData);
      toast.success(`"${formData.title}" has been updated successfully`);
      setIsEditModalOpen(false);
      setDomainToEdit(null);
      // Reset form to default
      setFormData({ 
        title: '', 
        description: '', 
        icon_name: 'Scale', 
        color: 'blue' 
      });
      fetchDomains(); // refresh the list
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'Failed to update domain';
      toast.error(errorMsg);
    }
  };


  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;


return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Legal Domain</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">Select your primary regulatory focus areas</p>
        </div>
        <button
          onClick={() => {
            // Reset form to fresh/default values every time
            setFormData({
              title: '',
              description: '',
              icon_name: 'Scale',
              color: 'blue'
            });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-navy hover:bg-navy/90 text-white px-5 py-2.5 rounded-2xl font-medium"
        >
          <Plus size={20} />
          Add Custom Domain
        </button>
      </div>

      {/* Grid of domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {domains.map((domain) => {
          const IconComponent = iconComponents[domain.icon_name] || Layers;
          const style = domainColorStyles[domain.color] || domainColorStyles["blue"];
          const isCustom = !domain.is_standard;




          return (
            <div key={domain.id} className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-7 hover:border-navy hover:shadow-xl transition-all cursor-pointer">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${style.bg}`}>
                <IconComponent size={32} className={style.text} />
              </div>
              <h3 className="font-semibold text-xl mb-1 dark:text-zinc-300">{domain.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">{domain.description}</p>
              <div className="flex items-center justify-between">
                <div className="text-xs font-medium bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full dark:text-zinc-400">
                  {domain.regulations_count || domain.regulation_count || 0} regulations
                </div>
                <button className="text-navy dark:text-zinc-400 text-xs font-medium group-hover:underline">
                  Explore →
                </button>
              </div>
              {/* Action buttons - only for custom domains */}
              {isCustom && (
                <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditClick(domain)}
                    className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-xl transition-colors"
                    title="Edit domain"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(domain)}
                    className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-xl transition-colors"
                    title="Delete domain"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-lg mx-4">
            <div className="flex justify-between items-center p-6 border-b dark:border-zinc-800">
              <h2 className="text-xl font-semibold dark:text-zinc-300">Create Custom Legal Domain</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1.5 dark:text-zinc-300">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 border rounded-2xl dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:border-navy dark:text-white"
                  placeholder="e.g. Environmental Law"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5  dark:text-zinc-300">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border rounded-2xl dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:border-navy h-24 dark:text-white"
                  placeholder="Brief description of this legal domain..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 dark:text-zinc-300">Icon</label>
                  <select
                    value={formData.icon_name}
                    onChange={(e) => setFormData({...formData, icon_name: e.target.value})}
                    className="w-full px-4 py-3 border rounded-2xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                  >
                    {Object.keys(iconComponents).map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 dark:text-zinc-300">Color</label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                    className="w-full px-4 py-3 border rounded-2xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                  >
                    {availableColors.map(c => (
                      <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 border rounded-2xl font-medium dark:text-white hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-navy hover:bg-navy/70 text-white rounded-2xl font-medium"
                >
                  Create Domain
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && domainToDelete && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-sm mx-4">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-950 rounded-2xl mb-4">
                <Trash2 size={28} className="text-red-600" />
              </div>
              
              <h2 className="text-xl font-semibold text-center dark:text-zinc-300">Delete Domain</h2>
              <p className="text-center text-zinc-600 dark:text-zinc-400 mt-2">
                Are you sure you want to delete <span className="font-medium">"{domainToDelete.title}"</span>?<br/>
                This action cannot be undone.
              </p>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-3 border border-zinc-300 dark:border-zinc-700 rounded-2xl font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-medium"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Edit Modal */}
      {isEditModalOpen && domainToEdit && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-lg mx-4">
            <div className="flex justify-between items-center p-6 border-b dark:border-zinc-800">
              <h2 className="text-xl font-semibold dark:text-zinc-300">Edit Legal Domain</h2>
              <button 
                onClick={() => setIsEditModalOpen(false)} 
                className="text-zinc-400 hover:text-zinc-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1.5 dark:text-zinc-300">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 border rounded-2xl dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:border-navy dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5 dark:text-zinc-300">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border rounded-2xl dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:border-navy h-24 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 dark:text-zinc-300">Icon</label>
                  <select
                    value={formData.icon_name}
                    onChange={(e) => setFormData({...formData, icon_name: e.target.value})}
                    className="w-full px-4 py-3 border rounded-2xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                  >
                    {Object.keys(iconComponents).map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 dark:text-zinc-300">Color</label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                    className="w-full px-4 py-3 border rounded-2xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                  >
                    {availableColors.map(c => (
                      <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-3 border border-zinc-300 dark:border-zinc-700 rounded-2xl font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-navy hover:bg-navy/70 text-white rounded-2xl font-medium"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
