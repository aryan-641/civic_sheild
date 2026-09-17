import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Building2, FolderKanban, ShoppingCart,
  Package, History, Zap, Sun, Moon, Shield, Menu
} from 'lucide-react';
import Overview from './pages/Overview';
import Companies from './pages/Companies';
import CompanyProfile from './pages/CompanyProfile';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Procurement from './pages/Procurement';
import MaterialsAudit from './pages/MaterialsAudit';
import AssetHistory from './pages/AssetHistory';
import AnomalyDetector from './pages/AnomalyDetector';

const navItems = [
  { path: '/overview', label: 'Overview', icon: LayoutDashboard },
  { path: '/companies', label: 'Companies', icon: Building2 },
  { path: '/projects', label: 'Projects', icon: FolderKanban },
  { path: '/procurement', label: 'Procurement', icon: ShoppingCart },
  { path: '/materials', label: 'Materials Audit', icon: Package },
  { path: '/assets', label: 'Asset History', icon: History },
];

function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('civicshield-dark');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('civicshield-dark', String(dark));
  }, [dark]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40 flex flex-col transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-200 dark:border-gray-800">
            <Shield className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">CivicShield</h1>
              <p className="text-[10px] text-gray-400 -mt-0.5">Procurement Anomaly Detection</p>
            </div>
          </div>

          <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}

            {/* Anomaly Detector - highlighted */}
            <NavLink
              to="/anomaly-detector"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors mt-2 border ${
                  isActive
                    ? 'bg-yellow-50 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700'
                    : 'text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800'
                }`
              }
            >
              <Zap className="w-4 h-4" />
              ⚡ Anomaly Detector
            </NavLink>
          </nav>

          <div className="p-3 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setDark(!dark)}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {dark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Mobile header */}
          <div className="lg:hidden sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <Menu className="w-5 h-5" />
            </button>
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-bold text-gray-900 dark:text-white">CivicShield</span>
          </div>

          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl">
            <Routes>
              <Route path="/" element={<Navigate to="/overview" replace />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/companies/:id" element={<CompanyProfile />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/procurement" element={<Procurement />} />
              <Route path="/materials" element={<MaterialsAudit />} />
              <Route path="/assets" element={<AssetHistory />} />
              <Route path="/anomaly-detector" element={<AnomalyDetector />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
