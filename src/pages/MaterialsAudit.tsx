import { AlertTriangle, CheckCircle2, Search } from 'lucide-react';
import { materialsAudit } from '../data/materials';
import { useState } from 'react';

export default function MaterialsAudit() {
  const [search, setSearch] = useState('');

  const filtered = materialsAudit.filter((m) =>
    m.material.toLowerCase().includes(search.toLowerCase()) ||
    m.projectName.toLowerCase().includes(search.toLowerCase()) ||
    m.supplier.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Materials Audit</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Material procurement price comparison against reference prices</p>
        <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-medium bg-amber-50 dark:bg-amber-950/50 px-2 py-1 rounded inline-block">Price deviations are review signals, not proof of misuse</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search materials, projects, suppliers..."
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
                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-400">Project</th>
                <th className="text-left px-3 py-3 font-medium text-gray-600 dark:text-gray-400">Material</th>
                <th className="text-left px-3 py-3 font-medium text-gray-600 dark:text-gray-400">Supplier</th>
                <th className="text-center px-3 py-3 font-medium text-gray-600 dark:text-gray-400">Verified</th>
                <th className="text-right px-3 py-3 font-medium text-gray-600 dark:text-gray-400">Reference</th>
                <th className="text-right px-3 py-3 font-medium text-gray-600 dark:text-gray-400">Purchase</th>
                <th className="text-right px-3 py-3 font-medium text-gray-600 dark:text-gray-400">Deviation</th>
                <th className="text-center px-3 py-3 font-medium text-gray-600 dark:text-gray-400">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => (
                <tr key={i} className={`border-b border-gray-100 dark:border-gray-700/50 ${
                  m.deviation > 15 ? 'bg-red-50/50 dark:bg-red-950/20' : ''
                }`}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900 dark:text-white text-xs">{m.projectName}</div>
                    <div className="text-xs text-gray-400">{m.projectId}</div>
                  </td>
                  <td className="px-3 py-3 text-gray-700 dark:text-gray-300">{m.material}</td>
                  <td className="px-3 py-3 text-gray-500 dark:text-gray-400 text-xs">{m.supplier}</td>
                  <td className="text-center px-3 py-3">
                    {m.verifiedSupplier ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500 inline" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-500 inline" />
                    )}
                  </td>
                  <td className="text-right px-3 py-3 text-gray-500">₹{m.referencePrice.toLocaleString()}</td>
                  <td className="text-right px-3 py-3 text-gray-700 dark:text-gray-300">₹{m.purchasePrice.toLocaleString()}</td>
                  <td className="text-right px-3 py-3">
                    <span className={`font-medium ${
                      m.deviation > 15 ? 'text-red-600 dark:text-red-400' :
                      m.deviation > 8 ? 'text-amber-600 dark:text-amber-400' :
                      'text-green-600 dark:text-green-400'
                    }`}>
                      +{m.deviation.toFixed(1)}%
                    </span>
                    {m.deviation > 15 && (
                      <div className="text-xs text-red-500 dark:text-red-400 mt-0.5">Verification recommended</div>
                    )}
                  </td>
                  <td className="text-center px-3 py-3">
                    {m.invoiceVerified ? (
                      <span className="text-xs text-green-600 dark:text-green-400">Verified</span>
                    ) : (
                      <span className="text-xs text-amber-600 dark:text-amber-400">Pending</span>
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
