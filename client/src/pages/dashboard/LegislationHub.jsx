import { useState } from 'react';
import { Search, TestTube, Loader2, Bookmark, Play } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../../utils/api';

const SPARQL_QUERY = `
PREFIX cdm: <http://publications.europa.eu/ontology/cdm#>
PREFIX tdm: <http://publications.europa.eu/ontology/tdm#>

SELECT 
  ?item ?item_sameas ?manifestation ?expression ?work ?work_id

WHERE {
  ?item owl:sameAs ?item_sameas .
  ?item ?item_belongs_to_manifestation ?manifestation .
  ?manifestation cdm:manifestation_manifests_expression ?expression .
  ?expression cdm:expression_belongs_to_work ?work .
  ?work cdm:work_id ?work_id .

  FILTER (?item_sameas IN (
    <http://publications.europa.eu/resource/distribution/dir-eu-legal-act/xml/atto/dir-eu-legal-act_EN.xml>,
    <http://publications.europa.eu/resource/distribution/class-sum-leg/xml/atto/class-sum-leg_EN.xml>,
    <http://publications.europa.eu/resource/distribution/subject-matter/xml/atto/subject-matter_EN.xml>,
    <http://publications.europa.eu/resource/distribution/corporate-body-classification/xml/atto/corporate-body-classification_EN.xml>,
    <http://publications.europa.eu/resource/distribution/corporate-body/xml/atto/corporatebodies_EN.xml>,
    <http://publications.europa.eu/resource/distribution/country/xml/atto/countries_EN.xml>,
    <http://publications.europa.eu/resource/distribution/currency/xml/atto/currencies_EN.xml>,
    <http://publications.europa.eu/resource/distribution/language/xml/atto/languages_EN.xml>,
    <http://publications.europa.eu/resource/distribution/resource-type/xml/atto/resourcetypes_EN.xml>,
    <http://publications.europa.eu/resource/distribution/subdivision/xml/atto/subdivisions_EN.xml>,
    <http://publications.europa.eu/resource/distribution/legal-date/xml/cat/legal-date.xml>,
    <http://publications.europa.eu/resource/distribution/fd_300/xml/atto/FD_Table300_EN.xml>
  ))
}
LIMIT 10000
`;

export default function LegislationHub() {
  const [activeTab, setActiveTab] = useState('nal');
  const [nalData, setNalData] = useState(null);
  const [sparqlData, setSparqlData] = useState(null);
  const [loadingNal, setLoadingNal] = useState(false);
  const [loadingSparql, setLoadingSparql] = useState(false);
  const [errorNal, setErrorNal] = useState(null);
  const [errorSparql, setErrorSparql] = useState(null);

  const loadNalList = async () => {
    setLoadingNal(true);
    setErrorNal(null);
    try {
      const res = await api.get('/api/legislation/nal-list');
      setNalData(res.data);
      toast.success(`✅ NAL list loaded (${res.data.count || 0} entries)`);
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Failed to load NAL list';
      setErrorNal(msg);
      toast.error(msg);
    } finally {
      setLoadingNal(false);
    }
  };

  const runSparqlQuery = async () => {
    setLoadingSparql(true);
    setErrorSparql(null);
    try {
      const res = await api.post('/api/legislation/sparql', { query: SPARQL_QUERY });
      setSparqlData(res.data);
      toast.success(`✅ SPARQL query returned ${res.data.count} results`);
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'SPARQL request failed';
      setErrorSparql(msg);
      toast.error(msg);
    } finally {
      setLoadingSparql(false);
    }
  };

  const renderContent = () => {
    if (activeTab === 'nal') {
      return (
        <div>
          <button
            onClick={loadNalList}
            disabled={loadingNal}
            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 rounded-2xl hover:border-navy disabled:opacity-50 mb-6"
          >
            {loadingNal ? <Loader2 size={20} className="animate-spin" /> : <TestTube size={20} />}
            <span>{loadingNal ? 'Loading NAL List...' : 'Load NAL List'}</span>
          </button>

          {errorNal && <div className="p-4 bg-red-50 dark:bg-red-950 rounded-2xl text-red-700 mb-6">{errorNal}</div>}

          {nalData && (
            <div className=" rounded-3xl p-6 font-mono text-sm bg-zinc-200 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 overflow-auto max-h-[70vh]">
              <pre>{JSON.stringify(nalData, null, 2)}</pre>
            </div>
          )}
        </div>
      );
    }

    if (activeTab === 'test') {
      return (
        <div>
          <button
            onClick={runSparqlQuery}
            disabled={loadingSparql}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-medium mb-6 disabled:opacity-50"
          >
            {loadingSparql ? <Loader2 size={20} className="animate-spin" /> : <Play size={20} />}
            <span>{loadingSparql ? 'Running SPARQL...' : 'Run SPARQL Query'}</span>
          </button>

          {errorSparql && <div className="p-4 bg-red-50 dark:bg-red-950 rounded-2xl text-red-700 mb-6">{errorSparql}</div>}

          {sparqlData && sparqlData.results && (
            <div>
              <div className="text-sm text-zinc-500 mb-3">
                {sparqlData.count} results returned
              </div>
              <div className="overflow-x-auto rounded-3xl border border-zinc-200 dark:border-zinc-800">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-200">
                      {sparqlData.results.length > 0 && Object.keys(sparqlData.results[0]).map(key => (
                        <th key={key} className="px-4 py-3 text-left font-medium ">{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sparqlData.results.slice(0, 100).map((row, idx) => (
                      <tr key={idx} className="border-t hover:bg-zinc-50 dark:hover:bg-zinc-900 dark:text-zinc-300">
                        {Object.values(row).map((val, i) => (
                          <td key={i} className="px-4 py-3 font-mono text-xs break-all">
                            {val || '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Other tabs...
    if (activeTab === 'search') return <div>Search placeholder</div>;
    if (activeTab === 'saved') return <div>Saved placeholder</div>;
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-semibold tracking-tighter dark:text-zinc-300">Legislation Hub</h2>
          <p className="text-zinc-600 dark:text-zinc-400">Browse and search official legislation</p>
        </div>
      </div>

      {/* Notification-style Tabs */}
      <div className="flex gap-1 mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-px">
        {[
          { key: 'nal', label: 'NAL Lists' },
          { key: 'search', label: 'Search' },
          { key: 'saved', label: 'Saved' },
          { key: 'test', label: 'Test' }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-6 py-3 text-sm font-medium rounded-t-2xl transition-colors capitalize
              ${activeTab === key 
                ? 'bg-white dark:bg-zinc-900 border border-b-0 border-zinc-200 dark:border-zinc-800 dark:text-zinc-300 shadow-sm' 
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {renderContent()}
    </div>
  );
}