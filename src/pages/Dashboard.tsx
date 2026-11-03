import React, { useState } from 'react';
import {
  Server,
  CheckCircle,
  XCircle,
  Network,
  Activity,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  ShieldCheck,
  Cpu,
  Layers,
  Share2
} from 'lucide-react';
import { useNMS } from '../context/NMSContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const Dashboard: React.FC = () => {
  const { devices, interfaces, alerts, logs, darkMode } = useNMS();
  const [trafficTimeFilter, setTrafficTimeFilter] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const navigate = useNavigate();

  const totalDevices = devices.length;
  const onlineDevices = devices.filter((d) => d.status === 'online').length;
  const offlineDevices = devices.filter((d) => d.status === 'offline').length;
  const warningDevices = devices.filter((d) => d.status === 'warning').length;
  const totalInterfaces = interfaces.length + 120; // simulated total across all devices
  const activePorts = interfaces.filter((i) => i.opStatus === 'connected').length + 380;
  const criticalAlerts = alerts.filter((a) => a.severity === 'Critical' && a.status === 'Active').length;

  // Chart data for Network Traffic
  const trafficData = {
    labels: trafficTimeFilter === '1h' ? ['10m', '20m', '30m', '40m', '50m', 'Now'] : ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'Now'],
    datasets: [
      {
        label: 'Download Traffic (Gbps)',
        data: trafficTimeFilter === '1h' ? [1.2, 1.8, 2.4, 2.1, 3.2, 2.9] : [1.4, 1.1, 3.8, 8.9, 7.2, 6.4, 7.8],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Upload Traffic (Gbps)',
        data: trafficTimeFilter === '1h' ? [0.8, 1.1, 1.5, 1.3, 2.0, 1.9] : [0.9, 0.7, 2.2, 5.4, 4.8, 4.1, 4.9],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: darkMode ? '#cbd5e1' : '#475569', font: { family: 'Inter', size: 12 } }
      }
    },
    scales: {
      x: { grid: { color: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }, ticks: { color: darkMode ? '#94a3b8' : '#64748b' } },
      y: { grid: { color: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }, ticks: { color: darkMode ? '#94a3b8' : '#64748b' } }
    }
  };

  // Device Distribution Doughnut
  const distributionData = {
    labels: ['Cisco Switches', 'Routers', 'Access Points', 'Firewalls', 'Servers'],
    datasets: [
      {
        data: [4, 2, 3, 1, 2],
        backgroundColor: ['#3b82f6', '#6366f1', '#10b981', '#f59e0b', '#ec4899'],
        borderWidth: 0
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const, labels: { color: darkMode ? '#cbd5e1' : '#475569', boxWidth: 12, font: { size: 11 } } }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className={`p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        darkMode ? 'bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border-blue-500/20' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
      }`}>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h2 className="text-xl font-bold tracking-tight">Enterprise Network Operations Center (NOC)</h2>
          </div>
          <p className="text-sm text-slate-400">
            Monitoring 7 primary Cisco network nodes, 452 active switch ports, and real-time SNMPv3 telemetry.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/network/topology')}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Live Topology Map
          </button>
          <button
            onClick={() => navigate('/network/devices')}
            className={`px-4 py-2.5 rounded-xl border font-semibold text-sm transition-all ${
              darkMode ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Manage Devices
          </button>
        </div>
      </div>

      {/* Top Summary Cards (6 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        <div className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Devices</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400"><Server className="w-5 h-5" /></div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-extrabold">{totalDevices}</h3>
            <span className="text-xs font-semibold text-emerald-400 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 100% SLA
            </span>
          </div>
        </div>

        <div className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Online Devices</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400"><CheckCircle className="w-5 h-5" /></div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-extrabold text-emerald-400">{onlineDevices}</h3>
            <span className="text-xs font-semibold text-slate-400">Normal</span>
          </div>
        </div>

        <div className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Offline Devices</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400"><XCircle className="w-5 h-5" /></div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-extrabold text-rose-400">{offlineDevices}</h3>
            <span className="text-xs font-semibold text-rose-400 flex items-center">
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" /> Action Req
            </span>
          </div>
        </div>

        <div className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Interfaces</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400"><Network className="w-5 h-5" /></div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-extrabold">{totalInterfaces}</h3>
            <span className="text-xs font-semibold text-slate-400">SNMP Polled</span>
          </div>
        </div>

        <div className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Active Ports</span>
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400"><Activity className="w-5 h-5" /></div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-extrabold text-teal-400">{activePorts}</h3>
            <span className="text-xs font-semibold text-emerald-400">92% Linked</span>
          </div>
        </div>

        <div className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Critical Alerts</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400"><AlertTriangle className="w-5 h-5" /></div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-extrabold text-amber-400">{criticalAlerts}</h3>
            <span className="text-xs font-semibold text-amber-400">Pending ACK</span>
          </div>
        </div>
      </div>

      {/* Main Dashboard Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Network Traffic Chart (Span 2) */}
        <div className={`lg:col-span-2 p-6 rounded-2xl border ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold">Network Traffic Aggregate</h3>
              <p className="text-xs text-slate-400">Real-time throughput across core backbone interfaces</p>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/50 p-1 rounded-xl border border-slate-700">
              {(['1h', '24h', '7d', '30d'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTrafficTimeFilter(filter)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    trafficTimeFilter === filter ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {filter.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div className="h-72">
            <Line data={trafficData} options={chartOptions} />
          </div>
        </div>

        {/* Device Distribution */}
        <div className={`p-6 rounded-2xl border flex flex-col justify-between ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div>
            <h3 className="text-lg font-bold mb-1">Device Distribution</h3>
            <p className="text-xs text-slate-400">Hardware categories in inventory</p>
          </div>
          <div className="h-60 flex items-center justify-center my-4">
            <Doughnut data={distributionData} options={doughnutOptions} />
          </div>
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Total Hardware Nodes: <strong className="text-slate-200">{totalDevices}</strong></span>
            <span className="text-emerald-400 font-semibold">All Snmp Ok</span>
          </div>
        </div>
      </div>

      {/* Recent Activity & Recent Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Recent System Activity</h3>
            <button
              onClick={() => navigate('/admin/logs')}
              className="text-xs font-semibold text-blue-400 hover:underline"
            >
              View Audit Logs &rarr;
            </button>
          </div>
          <div className="space-y-4">
            {logs.slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-start gap-4 pb-4 border-b border-slate-800/60 last:border-0 last:pb-0">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold truncate">{log.action}</p>
                    <span className="text-[11px] text-slate-400">{log.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">Target: <strong className="text-slate-200">{log.targetDevice}</strong> by {log.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Recent Network Alerts</h3>
            <button
              onClick={() => navigate('/management/alerts')}
              className="text-xs font-semibold text-blue-400 hover:underline"
            >
              View All Alerts &rarr;
            </button>
          </div>
          <div className="space-y-3">
            {alerts.slice(0, 4).map((alert) => (
              <div
                key={alert.id}
                className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                  alert.severity === 'Critical'
                    ? 'bg-rose-950/25 border-rose-500/30 text-rose-200'
                    : alert.severity === 'Warning'
                    ? 'bg-amber-950/25 border-amber-500/30 text-amber-200'
                    : 'bg-blue-950/25 border-blue-500/30 text-blue-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-100 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${alert.severity === 'Critical' ? 'bg-rose-500' : alert.severity === 'Warning' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                    {alert.device} {alert.interface ? `(${alert.interface})` : ''}
                  </span>
                  <span className="text-[11px] opacity-75">{alert.timestamp.substring(11, 19)}</span>
                </div>
                <p className="font-medium">{alert.title}: <span className="opacity-95 font-normal">{alert.description}</span></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
