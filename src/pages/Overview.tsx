import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Building2, FolderKanban, IndianRupee, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

const kpis = [
  { label: 'Companies', value: '12', icon: Building2, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950' },
  { label: 'Projects', value: '28', icon: FolderKanban, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950' },
  { label: 'Contract Value', value: '₹84.6 Cr', icon: IndianRupee, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-950' },
  { label: 'Funds Utilized', value: '₹67.2 Cr', icon: IndianRupee, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950' },
  { label: 'On-Time Projects', value: '18', icon: CheckCircle2, color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-950' },
  { label: 'Late Projects', value: '5', icon: Clock, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950' },
  { label: 'Review Signals', value: '7', icon: AlertTriangle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950' },
];

const completionData = [
  { name: 'Early', value: 5, fill: '#10b981' },
  { name: 'On Time', value: 13, fill: '#3b82f6' },
  { name: 'Late', value: 5, fill: '#f59e0b' },
  { name: 'Ongoing', value: 5, fill: '#8b5cf6' },
];

const fundsData = [
  { name: 'Allocated', value: 84.6 },
  { name: 'Utilized', value: 67.2 },
];

const costData = [
  { project: 'PRJ-1042', original: 5.0, final: 5.7 },
  { project: 'PRJ-1040', original: 6.2, final: 6.9 },
  { project: 'PRJ-1029', original: 4.2, final: 4.8 },
  { project: 'PRJ-1026', original: 3.4, final: 3.8 },
  { project: 'PRJ-1016', original: 2.6, final: 3.0 },
  { project: 'PRJ-1035', original: 3.2, final: 3.15 },
  { project: 'PRJ-1036', original: 4.8, final: 4.7 },
];

const signalData = [
  { name: 'Cost Variation', value: 5 },
  { name: 'Material Price', value: 2 },
  { name: 'Early Re-Intervention', value: 2 },
  { name: 'Progress/Funds', value: 2 },
];

const COLORS = ['#ef4444', '#f59e0b', '#8b5cf6', '#3b82f6'];

export default function Overview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Overview Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Public procurement monitoring and anomaly detection</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className={`${kpi.bg} rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50`}>
            <kpi.icon className={`w-5 h-5 ${kpi.color} mb-2`} />
            <div className="text-xl font-bold text-gray-900 dark:text-white">{kpi.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Project Completion Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={completionData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {completionData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Funds: Allocated vs Utilized (₹ Cr)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={fundsData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Contract Cost: Original vs Final (₹ Cr)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="project" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="original" fill="#3b82f6" name="Original" radius={[4, 4, 0, 0]} />
              <Bar dataKey="final" fill="#f59e0b" name="Final" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Review Signals Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={signalData} cx="50%" cy="50%" outerRadius={90} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {signalData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
