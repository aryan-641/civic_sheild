import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { projects } from '../data/projects';
import { assets } from '../data/assets';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <div className="text-center py-10 text-gray-500">Project not found</div>;
  }

  const costVariation = ((project.finalCost - project.originalCost) / project.originalCost * 100);
  const fundsMismatch = project.fundsUtilized - project.progress;
  const relatedAsset = assets.find(a => a.events.some(e => e.projectId === project.id));

  return (
    <div className="space-y-6">
      <Link to="/projects" className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Projects
      </Link>

      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            project.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' :
            project.status === 'in-progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400' :
            'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400'
          }`}>{project.status}</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{project.id} · {project.location}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contract */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Contract Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Original Cost</span><span className="font-medium text-gray-900 dark:text-white">₹{project.originalCost.toFixed(1)} Cr</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Timeline</span><span className="font-medium text-gray-900 dark:text-white">{project.startDate} → {project.expectedEnd}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Contractor</span><Link to={`/companies/${project.contractorId}`} className="font-medium text-blue-600 dark:text-blue-400 hover:underline">{project.contractor}</Link></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Scope</span></div>
            <p className="text-gray-600 dark:text-gray-300 text-xs">{project.scope}</p>
          </div>
        </div>

        {/* Current Status */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Current Status</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500 dark:text-gray-400">Progress</span>
                <span className="font-medium text-gray-900 dark:text-white">{project.progress}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${project.progress}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500 dark:text-gray-400">Funds Utilized</span>
                <span className="font-medium text-gray-900 dark:text-white">{project.fundsUtilized}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${fundsMismatch > 15 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${project.fundsUtilized}%` }} />
              </div>
            </div>
            {fundsMismatch > 15 && (
              <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-red-700 dark:text-red-400">Review Signal</div>
                  <div className="text-xs text-red-600 dark:text-red-300">Funds utilization is significantly ahead of verified physical progress.</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cost */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Cost Analysis</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Original</span><span className="font-medium text-gray-900 dark:text-white">₹{project.originalCost.toFixed(1)} Cr</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Current/Projected</span><span className="font-medium text-gray-900 dark:text-white">₹{project.finalCost.toFixed(1)} Cr</span></div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Variation</span>
              <span className={`font-medium ${costVariation > 10 ? 'text-red-600 dark:text-red-400' : costVariation > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>
                {costVariation > 0 ? '+' : ''}{costVariation.toFixed(1)}%
              </span>
            </div>
          </div>
          {costVariation > 10 && (
            <div className="mt-3 flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-amber-700 dark:text-amber-300">Cost variation exceeds 10% threshold — verification recommended.</div>
            </div>
          )}
        </div>

        {/* Materials */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Materials</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 font-medium text-gray-500">Material</th>
                  <th className="text-left py-2 font-medium text-gray-500">Supplier</th>
                  <th className="text-right py-2 font-medium text-gray-500">Ref Price</th>
                  <th className="text-right py-2 font-medium text-gray-500">Purchase</th>
                  <th className="text-right py-2 font-medium text-gray-500">Diff</th>
                </tr>
              </thead>
              <tbody>
                {project.materials.map((m, i) => {
                  const diff = ((m.purchasePrice - m.referencePrice) / m.referencePrice * 100);
                  return (
                    <tr key={i} className="border-b border-gray-100 dark:border-gray-700/50">
                      <td className="py-2 text-gray-700 dark:text-gray-300">{m.material}</td>
                      <td className="py-2 text-gray-500 dark:text-gray-400">{m.supplier}</td>
                      <td className="text-right py-2 text-gray-500">₹{m.referencePrice.toLocaleString()}</td>
                      <td className="text-right py-2 text-gray-700 dark:text-gray-300">₹{m.purchasePrice.toLocaleString()}</td>
                      <td className={`text-right py-2 font-medium ${diff > 15 ? 'text-red-600 dark:text-red-400' : diff > 5 ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>
                        +{diff.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Project Timeline</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-4">
            {project.timeline.map((t, i) => (
              <div key={i} className="flex items-start gap-4 relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                  t.done ? 'bg-green-100 dark:bg-green-900/50' : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  {t.done ? <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" /> : <Clock className="w-4 h-4 text-gray-400" />}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{t.label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{t.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Asset Info */}
      {relatedAsset && relatedAsset.earlyReintervention && (
        <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300">Early Re-Intervention Detected</h3>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                Related work on asset "{relatedAsset.name}" detected {relatedAsset.reinterventionMonths} months after previous completion.
                This pattern may indicate quality concerns requiring verification.
              </p>
              <Link to="/assets" className="text-xs text-amber-600 dark:text-amber-300 hover:underline mt-2 inline-block">View Asset History →</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
