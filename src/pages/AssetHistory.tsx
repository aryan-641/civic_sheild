import { AlertTriangle, CheckCircle2, MapPin } from 'lucide-react';
import { assets } from '../data/assets';
import { Link } from 'react-router-dom';

export default function AssetHistory() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Asset History</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Tracking infrastructure assets across multiple projects and interventions</p>
      </div>

      <div className="space-y-6">
        {assets.map((asset) => (
          <div key={asset.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{asset.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    <MapPin className="w-3 h-3" /> {asset.location}
                  </div>
                </div>
                {asset.earlyReintervention ? (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400">
                    <AlertTriangle className="w-3 h-3" /> Early Re-Intervention
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400">
                    <CheckCircle2 className="w-3 h-3" /> Normal Timeline
                  </span>
                )}
              </div>
            </div>

            <div className="p-5">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
                <div className="space-y-5">
                  {asset.events.map((event, i) => (
                    <div key={i} className="flex items-start gap-4 relative">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 text-xs font-bold ${
                        i === asset.events.length - 1 && asset.earlyReintervention
                          ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400'
                          : 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400'
                      }`}>
                        {event.year}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{event.type}</span>
                          <span className="text-xs text-gray-400">₹{event.amount.toFixed(1)} Cr</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{event.description}</p>
                        <div className="text-xs mt-1">
                          <Link to={`/projects/${event.projectId}`} className="text-blue-600 dark:text-blue-400 hover:underline">{event.projectId}</Link>
                          <span className="text-gray-400"> · {event.contractor}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {asset.earlyReintervention && asset.reinterventionMonths && (
                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-amber-800 dark:text-amber-300">Early Re-Intervention Detected</div>
                      <div className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                        Related work detected {asset.reinterventionMonths} months after previous project completion.
                        This pattern warrants review to assess whether original work quality is a factor.
                      </div>
                      <div className="mt-2 text-xs text-amber-600 dark:text-amber-400 space-y-0.5">
                        <div>Previous: {asset.events[asset.events.length - 2]?.projectName}</div>
                        <div>New: {asset.events[asset.events.length - 1]?.projectName}</div>
                        <div>Time Elapsed: {asset.reinterventionMonths} months</div>
                        <div>Amount: ₹{asset.events[asset.events.length - 1]?.amount.toFixed(1)} Cr</div>
                        <div>Contractor: {asset.events[asset.events.length - 1]?.contractor}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
