import { AlertTriangle } from 'lucide-react';
import { procurementData } from '../data/procurement';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function Procurement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Procurement Analysis</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Bid comparison and contract award analysis</p>
      </div>

      <div className="space-y-6">
        {procurementData.map((entry) => {
          const chartData = [
            { name: 'Estimated', value: entry.estimatedCost, fill: '#94a3b8' },
            ...entry.bids.map((b) => ({
              name: b.company.split(' ').slice(0, 2).join(' '),
              value: b.amount,
              fill: b.winner ? '#3b82f6' : '#e2e8f0',
            })),
            { name: 'Final Cost', value: entry.finalCost, fill: entry.signals.length > 0 ? '#f59e0b' : '#10b981' },
          ];

          return (
            <div key={entry.projectId} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">{entry.projectName}</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">{entry.projectId}</span>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={chartData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis type="number" tick={{ fontSize: 11 }} domain={[0, 'auto']} />
                        <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={100} />
                        <Tooltip formatter={(value: any) => [`₹${Number(value).toFixed(1)} Cr`, 'Amount']} />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                          {chartData.map((entry, index) => (
                            <Bar key={index} dataKey="value" fill={entry.fill} />
                          ))}
                        </Bar>
                        <ReferenceLine x={entry.estimatedCost} stroke="#94a3b8" strokeDasharray="3 3" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Estimated Cost</span><span className="text-gray-700 dark:text-gray-300">₹{entry.estimatedCost.toFixed(1)} Cr</span></div>
                      {entry.bids.map((b, i) => (
                        <div key={i} className="flex justify-between">
                          <span className={`${b.winner ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                            {b.company} {b.winner && '★'}
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">₹{b.amount.toFixed(1)} Cr</span>
                        </div>
                      ))}
                      <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Final Cost</span>
                        <span className={`font-medium ${entry.signals.length > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>₹{entry.finalCost.toFixed(1)} Cr</span>
                      </div>
                    </div>

                    {entry.signals.length > 0 && (
                      <div className="space-y-1">
                        {entry.signals.map((s, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
                            <AlertTriangle className="w-3 h-3 flex-shrink-0" /> {s}
                          </div>
                        ))}
                      </div>
                    )}

                    {entry.signals.length === 0 && (
                      <div className="text-xs text-green-600 dark:text-green-400">✓ No significant bid or cost anomalies</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
