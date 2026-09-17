import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react';
import { companies } from '../data/companies';
import { projects } from '../data/projects';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function CompanyProfile() {
  const { id } = useParams<{ id: string }>();
  const company = companies.find((c) => c.id === id);

  if (!company) {
    return <div className="text-center py-10 text-gray-500">Company not found</div>;
  }

  const companyProjects = projects.filter((p) => p.contractorId === id);
  const chartData = companyProjects.map((p) => ({
    name: p.id,
    original: p.originalCost,
    final: p.finalCost,
  }));

  const completedOnTime = companyProjects.filter((p) => p.completionStatus === 'on-time').length;
  const completedEarly = companyProjects.filter((p) => p.completionStatus === 'early').length;
  const completedLate = companyProjects.filter((p) => p.completionStatus === 'late').length;
  const noMajorCostVariation = companyProjects.filter((p) => Math.abs(p.finalCost - p.originalCost) / p.originalCost < 0.05).length;

  return (
    <div className="space-y-6">
      <Link to="/companies" className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Companies
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{company.name}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">{company.id}</p>
        <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-medium bg-amber-50 dark:bg-amber-950/50 px-2 py-1 rounded inline-block">⚠ Synthetic Demo Data</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { label: 'Projects Completed', value: companyProjects.filter(p => p.status === 'completed').length },
          { label: 'On Time', value: completedOnTime },
          { label: 'Early', value: completedEarly },
          { label: 'Late', value: completedLate },
          { label: 'Total Awarded (₹ Cr)', value: `₹${company.contractValue.toFixed(1)}` },
          { label: 'Total Utilized (₹ Cr)', value: `₹${company.totalUtilized.toFixed(1)}` },
          { label: 'Bids Submitted', value: company.bidsSubmitted },
          { label: 'Bids Won', value: company.bidsWon },
          { label: 'Early Interventions', value: company.earlyInterventions },
          { label: 'Review Signals', value: company.reviewSignals },
        ].map((item) => (
          <div key={item.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="text-xl font-bold text-gray-900 dark:text-white">{item.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Performance: Original vs Final Cost (₹ Cr)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="original" fill="#3b82f6" name="Original" radius={[4, 4, 0, 0]} />
            <Bar dataKey="final" fill="#f59e0b" name="Final" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Project History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <th className="text-left px-4 py-2 font-medium text-gray-600 dark:text-gray-400">Project</th>
                <th className="text-left px-3 py-2 font-medium text-gray-600 dark:text-gray-400">Name</th>
                <th className="text-right px-3 py-2 font-medium text-gray-600 dark:text-gray-400">Value (₹ Cr)</th>
                <th className="text-center px-3 py-2 font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-center px-3 py-2 font-medium text-gray-600 dark:text-gray-400">Anomaly</th>
              </tr>
            </thead>
            <tbody>
              {companyProjects.map((p) => (
                <tr key={p.id} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-4 py-2">
                    <Link to={`/projects/${p.id}`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">{p.id}</Link>
                  </td>
                  <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{p.name}</td>
                  <td className="text-right px-3 py-2 text-gray-700 dark:text-gray-300">₹{p.contractValue.toFixed(1)}</td>
                  <td className="text-center px-3 py-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' :
                      p.status === 'in-progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400' :
                      'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400'
                    }`}>{p.status}</span>
                  </td>
                  <td className="text-center px-3 py-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.anomalyStatus === 'none' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' :
                      p.anomalyStatus === 'low' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400' :
                      p.anomalyStatus === 'medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400' :
                      'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
                    }`}>{p.anomalyStatus}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Verified Performance Signals</h3>
        <div className="space-y-2">
          {completedOnTime > 0 && (
            <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
              <CheckCircle2 className="w-4 h-4" /> {completedOnTime} project{completedOnTime > 1 ? 's' : ''} completed on time
            </div>
          )}
          {noMajorCostVariation >= 2 && (
            <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
              <CheckCircle2 className="w-4 h-4" /> No major cost variation in last {Math.min(noMajorCostVariation, 3)} projects
            </div>
          )}
          {completedEarly > 0 && (
            <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
              <CheckCircle2 className="w-4 h-4" /> {completedEarly} project{completedEarly > 1 ? 's' : ''} completed ahead of schedule
            </div>
          )}
          {company.reviewSignals > 0 && (
            <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 mt-3">
              <AlertTriangle className="w-4 h-4" /> {company.reviewSignals} review signal{company.reviewSignals > 1 ? 's' : ''} require verification
            </div>
          )}
          {company.reviewSignals === 0 && company.lateProjects === 0 && (
            <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
              <CheckCircle2 className="w-4 h-4" /> Clean record — no review signals detected
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
