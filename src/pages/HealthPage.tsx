import React from 'react';
import { HeartPulse, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useNMS } from '../context/NMSContext';

export const HealthPage: React.FC = () => {
  const { devices, darkMode } = useNMS();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Network Health Overview</h2>
        <p className="text-sm text-slate-400">Global reachability, latency, packet loss, and infrastructure health score.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-2xl border flex items-center gap-5 ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <HeartPulse className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Overall Availability</span>
            <h3 className="text-3xl font-extrabold text-emerald-400 mt-1">98.57%</h3>
            <span className="text-xs text-slate-400">Past 30 days SLA</span>
          </div>
        </div>

        <div className={`p-6 rounded-2xl border flex items-center gap-5 ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Average Latency</span>
            <h3 className="text-3xl font-extrabold text-blue-400 mt-1">1.42 ms</h3>
            <span className="text-xs text-slate-400">ICMP echo probe</span>
          </div>
        </div>

        <div className={`p-6 rounded-2xl border flex items-center gap-5 ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Devices Requiring Attention</span>
            <h3 className="text-3xl font-extrabold text-amber-400 mt-1">2 Nodes</h3>
            <span className="text-xs text-amber-400">1 offline, 1 warning</span>
          </div>
        </div>
      </div>
    </div>
  );
};
