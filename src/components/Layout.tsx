import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Activity,
  LayoutDashboard,
  Server,
  Network,
  Share2,
  Layers,
  Cpu,
  BarChart3,
  HeartPulse,
  Sliders,
  Bell,
  FileText,
  Users,
  Shield,
  FileClock,
  Settings,
  Sun,
  Moon,
  Search,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Radio,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useNMS } from '../context/NMSContext';

export const Layout: React.FC = () => {
  const { darkMode, toggleDarkMode, alerts, toasts, removeToast } = useNMS();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const activeAlertsCount = alerts.filter((a) => a.status === 'Active').length;

  const navCategories = [
    {
      title: 'DASHBOARD',
      items: [{ name: 'Overview', path: '/', icon: LayoutDashboard }]
    },
    {
      title: 'NETWORK',
      items: [
        { name: 'Devices', path: '/network/devices', icon: Server },
        { name: 'Interfaces / Ports', path: '/network/interfaces', icon: Network },
        { name: 'Network Topology', path: '/network/topology', icon: Share2 },
        { name: 'VLAN Management', path: '/network/vlans', icon: Layers },
        { name: 'MAC Address Table', path: '/network/mac-table', icon: Cpu }
      ]
    },
    {
      title: 'MONITORING',
      items: [
        { name: 'Network Traffic', path: '/monitoring/traffic', icon: BarChart3 },
        { name: 'Device Performance', path: '/monitoring/performance', icon: Radio },
        { name: 'Network Health', path: '/monitoring/health', icon: HeartPulse }
      ]
    },
    {
      title: 'MANAGEMENT',
      items: [
        { name: 'Configuration Jobs', path: '/management/jobs', icon: Sliders },
        { name: 'Alerts & Notifications', path: '/management/alerts', icon: Bell },
        { name: 'Reports', path: '/management/reports', icon: FileText }
      ]
    },
    {
      title: 'ADMINISTRATION',
      items: [
        { name: 'Users', path: '/admin/users', icon: Users },
        { name: 'Roles & Permissions', path: '/admin/roles', icon: Shield },
        { name: 'Activity Logs', path: '/admin/logs', icon: FileClock },
        { name: 'System Settings', path: '/admin/settings', icon: Settings }
      ]
    }
  ];

  return (
    <div className={`h-screen overflow-hidden flex ${darkMode ? 'bg-[#0b1329] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-2xl border backdrop-blur-md transition-all animate-slide-up ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-200'
                : toast.type === 'error'
                ? 'bg-rose-950/90 border-rose-500/30 text-rose-200'
                : toast.type === 'warning'
                ? 'bg-amber-950/90 border-amber-500/30 text-amber-200'
                : 'bg-slate-900/90 border-slate-700 text-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
              {toast.type === 'error' && <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />}
              {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0" />}
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-200 transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Sidebar - Desktop */}
      <aside
        className={`hidden lg:flex flex-col border-r transition-all duration-300 z-30 ${
          darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
        } ${sidebarCollapsed ? 'w-20' : 'w-72'}`}
      >
        {/* Sidebar Header */}
        <div className={`flex items-center justify-between px-5 h-18 border-b ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                <Activity className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h1 className="font-bold tracking-wider text-base bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                  NetPulse
                </h1>
                <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
                  Enterprise NMS v4.2
                </span>
              </div>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="mx-auto w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
              <Activity className="w-6 h-6" />
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`p-1.5 rounded-lg border transition-colors ${
              darkMode ? 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
            } ${sidebarCollapsed ? 'mx-auto mt-2' : ''}`}
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {navCategories.map((cat, idx) => (
            <div key={idx} className="space-y-1">
              {!sidebarCollapsed && (
                <h6 className="px-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-2">
                  {cat.title}
                </h6>
              )}
              {cat.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    title={sidebarCollapsed ? item.name : undefined}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all group relative ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                        : darkMode
                        ? 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-blue-500'}`} />
                    {!sidebarCollapsed && <span className="truncate">{item.name}</span>}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>

        {/* Sidebar Footer Status */}
        {!sidebarCollapsed && (
          <div className={`p-4 border-t ${darkMode ? 'border-slate-800 bg-[#0d1527]' : 'border-slate-100 bg-slate-50'}`}>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">SNMP Poller</span>
              <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Active (60s)
              </span>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Sidebar Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-sm">
          <div className={`w-80 h-full flex flex-col p-4 shadow-2xl ${darkMode ? 'bg-[#0f172a]' : 'bg-white'}`}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="font-bold text-base">NetPulse NMS</h1>
                  <span className="text-[10px] text-slate-400">Enterprise Edition</span>
                </div>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-slate-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 space-y-6">
              {navCategories.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <h6 className="px-3 text-[11px] font-bold text-slate-400 uppercase mb-2">{cat.title}</h6>
                  {cat.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm ${
                          isActive ? 'bg-blue-600 text-white' : darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <Icon className="w-5 h-5 text-blue-500" />
                        <span>{item.name}</span>
                      </NavLink>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header
          className={`h-18 px-6 flex items-center justify-between border-b sticky top-0 z-20 backdrop-blur-md ${
            darkMode ? 'bg-[#0f172a]/90 border-slate-800' : 'bg-white/90 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-400">
              <span className="font-semibold text-slate-200">NetPulse</span>
              <span>/</span>
              <span className="capitalize text-blue-400 font-medium">
                {location.pathname === '/' ? 'Overview' : location.pathname.split('/').pop()?.replace('-', ' ')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Global Search */}
            <div className="relative hidden sm:block w-64 md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search devices, IPs, ports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery) {
                    navigate(`/network/devices?search=${encodeURIComponent(searchQuery)}`);
                  }
                }}
                className={`w-full pl-10 pr-4 py-2 rounded-xl text-sm border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-slate-900/80 border-slate-700 text-slate-100 placeholder-slate-500' : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            {/* Notifications Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2.5 rounded-xl border transition-colors ${
                  darkMode ? 'bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Bell className="w-5 h-5" />
                {activeAlertsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-600 text-white text-[11px] font-bold flex items-center justify-center shadow-md animate-pulse">
                    {activeAlertsCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div
                  className={`absolute right-0 mt-3 w-80 md:w-96 rounded-2xl shadow-2xl border p-4 z-50 ${
                    darkMode ? 'bg-[#0f172a] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-700 mb-3">
                    <h3 className="font-bold text-sm">Active Network Alerts</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 font-semibold">
                      {activeAlertsCount} Critical/Warning
                    </span>
                  </div>
                  <div className="space-y-2.5 max-h-72 overflow-y-auto">
                    {alerts.filter((a) => a.status === 'Active').length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-6">No active alerts. All systems healthy.</p>
                    ) : (
                      alerts
                        .filter((a) => a.status === 'Active')
                        .map((alert) => (
                          <div
                            key={alert.id}
                            className={`p-3 rounded-xl border text-xs space-y-1 ${
                              alert.severity === 'Critical'
                                ? 'bg-rose-950/30 border-rose-500/30 text-rose-200'
                                : 'bg-amber-950/30 border-amber-500/30 text-amber-200'
                            }`}
                          >
                            <div className="flex items-center justify-between font-bold">
                              <span>{alert.device}</span>
                              <span className="text-[10px]">{alert.timestamp.substring(11, 19)}</span>
                            </div>
                            <p className="font-medium text-slate-100">{alert.title}</p>
                            <p className="text-slate-300 line-clamp-2">{alert.description}</p>
                          </div>
                        ))
                    )}
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-700 text-center">
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                        navigate('/management/alerts');
                      }}
                      className="text-xs font-semibold text-blue-400 hover:underline"
                    >
                      View All Alerts & Notifications &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Dark / Light Mode Switch */}
            <button
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-xl border transition-colors ${
                darkMode ? 'bg-slate-900/60 border-slate-700 text-amber-400 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title="Toggle Dark/Light Mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>

            {/* Administrator Profile Menu */}
            <div className="flex items-center gap-3 pl-2 border-l border-slate-700">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
                AM
              </div>
              <div className="hidden xl:block">
                <p className="text-sm font-bold leading-none">Alex Morgan</p>
                <span className="text-[11px] text-blue-400 font-medium">Super Admin</span>
              </div>
              <button
                onClick={() => navigate('/admin/users')}
                className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
                title="Logout / User Profile"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content View */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
