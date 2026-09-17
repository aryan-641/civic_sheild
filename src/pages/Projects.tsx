import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, AlertTriangle, FolderKanban } from 'lucide-react';
import { projects } from '../data/projects';

export default function Projects() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const navigate = useNavigate();

  const filtered = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.contractor.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{projects.length} projects tracked</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects, IDs, contractors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
          <option value="delayed">Delayed</option>
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-400">Project</th>
                <th className="text-left px-3 py-3 font-medium text-gray-600 dark:text-gray-400">Contractor</th>
                <th className="text-left px-3 py-3 font-medium text-gray-600 dark:text-gray-400">Location</th>
                <th className="text-right px-3 py-3 font-medium text-gray-600 dark:text-gray-400">Contract (₹ Cr)</th>
                <th className="text-right px-3 py-3 font-medium text-gray-600 dark:text-gray-400">Final (₹ Cr)</th>
                <th className="text-center px-3 py-3 font-medium text-gray-600 dark:text-gray-400">Progress</th>
                <th className="text-center px-3 py-3 font-medium text-gray-600 dark:text-gray-400">Funds</th>
                <th className="text-center px-3 py-3 font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-center px-3 py-3 font-medium text-gray-600 dark:text-gray-400">Anomaly</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => navigate(`/projects/${p.id}`)}
                  className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FolderKanban className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{p.name}</div>
                        <div className="text-xs text-gray-400">{p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-gray-700 dark:text-gray-300">{p.contractor}</td>
                  <td className="px-3 py-3 text-gray-500 dark:text-gray-400 text-xs">{p.location}</td>
                  <td className="text-right px-3 py-3 text-gray-700 dark:text-gray-300">₹{p.contractValue.toFixed(1)}</td>
                  <td className="text-right px-3 py-3 text-gray-700 dark:text-gray-300">₹{p.finalCost.toFixed(1)}</td>
                  <td className="text-center px-3 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${p.progress}%` }} />
                      </div>
                      <span className="text-xs text-gray-500">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="text-center px-3 py-3 text-xs text-gray-500">{p.fundsUtilized}%</td>
                  <td className="text-center px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' :
                      p.status === 'in-progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400' :
                      'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400'
                    }`}>{p.status}</span>
                  </td>
                  <td className="text-center px-3 py-3">
                    {p.anomalyStatus !== 'none' ? (
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        p.anomalyStatus === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400' :
                        p.anomalyStatus === 'medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400' :
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400'
                      }`}>
                        <AlertTriangle className="w-3 h-3" />
                        {p.anomalyStatus}
                      </span>
                    ) : (
                      <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
