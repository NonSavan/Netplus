import React, { useState } from 'react';
import { BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useNMS } from '../context/NMSContext';
import { Line } from 'react-chartjs-2';

export const TrafficPage: React.FC = () => {
  const { darkMode } = useNMS();
  const [timeRange, setTimeRange] = useState<'15m' | '1h' | '24h' | '7d'>('1h');

  const trafficChartData = {
    labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', 'Now'],
    datasets: [
      {
        label: 'Download (Gbps)',
        data: [2.1, 1.8, 3.2, 7.5, 9.8, 8.4, 6.2, 7.8],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Upload (Gbps)',
        data: [1.2, 1.0, 2.1, 4.8, 6.2, 5.1, 3.9, 4.8],
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
    plugins: { legend: { labels: { color: darkMode ? '#cbd5e1' : '#475569' } } },
    scales: {
      x: { grid: { color: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }, ticks: { color: darkMode ? '#94a3b8' : '#64748b' } },
      y: { grid: { color: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }, ticks: { color: darkMode ? '#94a3b8' : '#64748b' } }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Network Traffic Monitoring</h2>
          <p className="text-sm text-slate-400">Advanced bandwidth analytics, peak utilization rates, and throughput charts.</p>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-800/50 p-1 rounded-xl border border-slate-700">
          {(['15m', '1h', '24h', '7d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                timeRange === range ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className="text-xs font-bold text-slate-400 uppercase">Peak Bandwidth</span>
          <h3 className="text-2xl font-extrabold mt-2 text-blue-400">9.8 Gbps</h3>
          <span className="text-xs text-emerald-400 mt-1 flex items-center"><ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +12% vs yesterday</span>
        </div>
        <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className="text-xs font-bold text-slate-400 uppercase">Average Bandwidth</span>
          <h3 className="text-2xl font-extrabold mt-2 text-indigo-400">6.4 Gbps</h3>
          <span className="text-xs text-slate-400 mt-1">Normal load profile</span>
        </div>
        <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className="text-xs font-bold text-slate-400 uppercase">Total Volume (24h)</span>
          <h3 className="text-2xl font-extrabold mt-2 text-teal-400">48.2 TB</h3>
          <span className="text-xs text-slate-400 mt-1">Encrypted MPLS Trunk</span>
        </div>
        <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className="text-xs font-bold text-slate-400 uppercase">Packet Drop Rate</span>
          <h3 className="text-2xl font-extrabold mt-2 text-emerald-400">0.001%</h3>
          <span className="text-xs text-emerald-400 mt-1">Optimal QoS</span>
        </div>
      </div>

      <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <h3 className="text-lg font-bold mb-6">Real-Time Throughput Analytics</h3>
        <div className="h-80">
          <Line data={trafficChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};
