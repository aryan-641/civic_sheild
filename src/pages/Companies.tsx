import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, AlertTriangle, Building2 } from 'lucide-react';
import { companies } from '../data/companies';

export default function Companies() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Companies</h1>
        <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-medium bg-amber-50 dark:bg-amber-950/50 px-2 py-1 rounded inline-block">⚠ Synthetic Demo Data — Not Real Government Records</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-400">Company</th>
                <th className="text-center px-3 py-3 font-medium text-gray-600 dark:text-gray-400">Projects</th>
                <th className="text-right px-3 py-3 font-medium text-gray-600 dark:text-gray-400">Contract (₹ Cr)</th>
                <th className="text-center px-3 py-3 font-medium text-gray-600 dark:text-gray-400">On-time %</th>
                <th className="text-center px-3 py-3 font-medium text-gray-600 dark:text-gray-400">Early</th>
                <th className="text-center px-3 py-3 font-medium text-gray-600 dark:text-gray-400">Late</th>
                <th className="text-center px-3 py-3 font-medium text-gray-600 dark:text-gray-400">Re-Interventions</th>
                <th className="text-center px-3 py-3 font-medium text-gray-600 dark:text-gray-400">Bids</th>
                <th className="text-center px-3 py-3 font-medium text-gray-600 dark:text-gray-400">Signals</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => navigate(`/companies/${c.id}`)}
                  className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{c.name}</div>
                        <div className="text-xs text-gray-400">{c.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center px-3 py-3 text-gray-700 dark:text-gray-300">{c.projects}</td>
                  <td className="text-right px-3 py-3 text-gray-700 dark:text-gray-300">₹{c.contractValue.toFixed(1)}</td>
                  <td className="text-center px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      c.onTimePercent >= 80 ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' :
                      c.onTimePercent >= 60 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400' :
                      'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
                    }`}>{c.onTimePercent}%</span>
                  </td>
                  <td className="text-center px-3 py-3 text-green-600 dark:text-green-400">{c.earlyCompletions}</td>
                  <td className="text-center px-3 py-3 text-orange-600 dark:text-orange-400">{c.lateProjects}</td>
                  <td className="text-center px-3 py-3 text-gray-700 dark:text-gray-300">{c.earlyInterventions}</td>
                  <td className="text-center px-3 py-3 text-gray-700 dark:text-gray-300">{c.bidsSubmitted}</td>
                  <td className="text-center px-3 py-3">
                    {c.reviewSignals > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400">
                        <AlertTriangle className="w-3 h-3" />
                        {c.reviewSignals}
                      </span>
                    ) : (
                      <span className="text-green-600 dark:text-green-400 text-xs">—</span>
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
