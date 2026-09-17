import { useState } from 'react';
import { Zap, AlertTriangle, CheckCircle2, Shield, TrendingUp, Package, Clock, Building2 } from 'lucide-react';
import { projects } from '../data/projects';
import { companies } from '../data/companies';
import { assets } from '../data/assets';
import { materialsAudit } from '../data/materials';

interface Signal {
  type: string;
  icon: typeof AlertTriangle;
  title: string;
  description: string;
  evidence: string;
  related: string;
  score: number;
}

function analyzeProject(projectId: string): { signals: Signal[]; totalScore: number; priority: string } {
  const project = projects.find((p) => p.id === projectId);
  if (!project) return { signals: [], totalScore: 0, priority: 'none' };

  const signals: Signal[] = [];
  const company = companies.find((c) => c.id === project.contractorId);
  const costVariation = ((project.finalCost - project.originalCost) / project.originalCost) * 100;
  const fundsMismatch = project.fundsUtilized - project.progress;
  const relatedAsset = assets.find((a) => a.events.some((e) => e.projectId === project.id) && a.earlyReintervention);
  const projectMaterials = materialsAudit.filter((m) => m.projectId === project.id);
  const highDeviationMaterial = projectMaterials.find((m) => m.deviation > 15);

  // Cost variation > 10%
  if (costVariation > 10) {
    signals.push({
      type: 'cost-variation',
      icon: TrendingUp,
      title: 'Cost Variation',
      description: `Final projected cost is ${costVariation.toFixed(0)}% above the original contract.`,
      evidence: `Original: ₹${project.originalCost.toFixed(1)} Cr → Current: ₹${project.finalCost.toFixed(1)} Cr (variation: +${costVariation.toFixed(1)}%)`,
      related: `${project.name} (${project.id})`,
      score: 1,
    });
  }

  // Material price deviation > 15%
  if (highDeviationMaterial) {
    signals.push({
      type: 'material-price',
      icon: Package,
      title: 'Material Price Deviation',
      description: `Reported ${highDeviationMaterial.material.toLowerCase()} purchase is ${highDeviationMaterial.deviation.toFixed(0)}% above comparable reference purchases.`,
      evidence: `${highDeviationMaterial.material}: Reference ₹${highDeviationMaterial.referencePrice.toLocaleString()} ${highDeviationMaterial.unit} → Purchased ₹${highDeviationMaterial.purchasePrice.toLocaleString()} ${highDeviationMaterial.unit}`,
      related: `Supplier: ${highDeviationMaterial.supplier}`,
      score: 1,
    });
  }

  // Early re-intervention
  if (relatedAsset) {
    signals.push({
      type: 'early-reintervention',
      icon: Clock,
      title: 'Early Re-Intervention',
      description: `Related work on "${relatedAsset.name}" detected ${relatedAsset.reinterventionMonths} months after completion.`,
      evidence: `Asset ${relatedAsset.id} shows new work within ${relatedAsset.reinterventionMonths} months of the previous project.`,
      related: `Asset: ${relatedAsset.name}`,
      score: 2,
    });
  }

  // Progress/funds mismatch > 15%
  if (fundsMismatch > 15) {
    signals.push({
      type: 'progress-funds',
      icon: TrendingUp,
      title: 'Progress / Funds Mismatch',
      description: `${project.fundsUtilized}% of funds utilized while verified physical progress is ${project.progress}%.`,
      evidence: `Funds utilized: ${project.fundsUtilized}%, Physical progress: ${project.progress}% (gap: ${fundsMismatch}%)`,
      related: `${project.name} (${project.id})`,
      score: 2,
    });
  }

  // Vendor history
  if (company && company.lateProjects >= 2) {
    signals.push({
      type: 'vendor-history',
      icon: Building2,
      title: 'Vendor History Signal',
      description: `Contractor ${company.name} has ${company.lateProjects} late projects in their record.`,
      evidence: `${company.name}: ${company.projects} total projects, ${company.lateProjects} late, ${company.earlyInterventions} early interventions`,
      related: `Company: ${company.name} (${company.id})`,
      score: 1,
    });
  }

  const totalScore = signals.reduce((sum, s) => sum + s.score, 0);
  const priority = totalScore === 0 ? 'none' : totalScore <= 2 ? 'low' : totalScore <= 4 ? 'medium' : 'high';

  return { signals, totalScore, priority };
}

export default function AnomalyDetector() {
  const [selectedProject, setSelectedProject] = useState(projects[0].id);
  const [result, setResult] = useState<ReturnType<typeof analyzeProject> | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setResult(null);
    // Simulate brief analysis delay
    setTimeout(() => {
      setResult(analyzeProject(selectedProject));
      setAnalyzing(false);
    }, 800);
  };

  const selectedProjectData = projects.find((p) => p.id === selectedProject);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-500" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Anomaly Detector</h1>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Analyze projects for patterns requiring human review</p>
      </div>

      {/* Analysis Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Analyze a Project</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selectedProject}
            onChange={(e) => { setSelectedProject(e.target.value); setResult(null); }}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.id} — {p.name} ({p.contractor})
              </option>
            ))}
          </select>
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white font-bold rounded-lg transition-colors flex items-center gap-2 text-sm shadow-lg shadow-yellow-500/25"
          >
            <Zap className="w-4 h-4" />
            {analyzing ? 'ANALYZING...' : 'ANALYZE PROJECT'}
          </button>
        </div>
      </div>

      {/* Analyzing animation */}
      {analyzing && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-10 text-center">
          <div className="animate-pulse">
            <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Running anomaly detection rules...</p>
          </div>
        </div>
      )}

      {/* Results */}
      {result && !analyzing && (
        <div className="space-y-6">
          {/* Summary */}
          <div className={`rounded-xl border p-6 ${
            result.priority === 'high' ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800' :
            result.priority === 'medium' ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800' :
            result.priority === 'low' ? 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800' :
            'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
          }`}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {result.signals.length} Review Signal{result.signals.length !== 1 ? 's' : ''} Detected
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {selectedProjectData?.name} ({selectedProject})
                </p>
              </div>
              <div className="flex items-center gap-3">
                {result.priority === 'none' ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">No Significant Signals</span>
                  </div>
                ) : (
                  <>
                    <div className={`px-4 py-2 rounded-lg text-sm font-bold ${
                      result.priority === 'high' ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400' :
                      result.priority === 'medium' ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400' :
                      'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400'
                    }`}>
                      {result.priority === 'high' ? '🔴' : result.priority === 'medium' ? '🟡' : '🟢'} {result.priority.charAt(0).toUpperCase() + result.priority.slice(1)} Investigation Priority
                    </div>
                    <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Review Priority</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{result.totalScore} / 10</div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {result.priority !== 'none' && (
              <div className="mt-4 flex items-start gap-2 p-3 bg-white/50 dark:bg-gray-900/30 rounded-lg">
                <Shield className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  This classification indicates unusual patterns requiring human verification. It does not establish wrongdoing.
                </p>
              </div>
            )}
          </div>

          {/* Score Breakdown */}
          {result.signals.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Review Priority Score Breakdown</h3>
              <div className="space-y-2">
                {result.signals.map((s, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <s.icon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">{s.title}</span>
                    </div>
                    <span className="font-mono font-medium text-gray-900 dark:text-white">+{s.score}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between text-sm border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                  <span className="font-medium text-gray-900 dark:text-white">Total</span>
                  <span className="font-mono font-bold text-gray-900 dark:text-white">{result.totalScore} / 10</span>
                </div>
              </div>
            </div>
          )}

          {/* Signal Cards */}
          {result.signals.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {result.signals.map((signal, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center flex-shrink-0">
                      <signal.icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{signal.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{signal.description}</p>
                      <div className="mt-3 space-y-1">
                        <div className="text-xs">
                          <span className="text-gray-500 dark:text-gray-400">Evidence: </span>
                          <span className="text-gray-700 dark:text-gray-300">{signal.evidence}</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-500 dark:text-gray-400">Related: </span>
                          <span className="text-gray-700 dark:text-gray-300">{signal.related}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Clean project message */}
          {result.signals.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No Significant Review Signals Detected</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
                This project does not exhibit patterns that typically warrant additional review.
                Cost, materials, timeline, and contractor history are all within expected parameters.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
