import React, { useState } from 'react';
import { Bell, CheckCircle, Search } from 'lucide-react';
import { useNMS } from '../context/NMSContext';

export const AlertsPage: React.FC = () => {
  const { alerts, acknowledgeAlert, resolveAlert, darkMode } = useNMS();
  const [filter, setFilter] = useState<'All' | 'Critical' | 'Warning' | 'Active'>('All');

  const filtered = alerts.filter((a) => {
    if (filter === 'Critical') return a.severity === 'Critical';
    if (filter === 'Warning') return a.severity === 'Warning';
    if (filter === 'Active') return a.status === 'Active';
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Alerts & Notifications</h2>
          <p className="text-sm text-slate-400">Real-time SNMP traps, syslog events, and hardware health alerts.</p>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-800/50 p-1 rounded-xl border border-slate-700">
          {(['All', 'Critical', 'Warning', 'Active'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === f ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className={`border-b text-xs font-bold uppercase ${darkMode ? 'border-slate-800 bg-slate-900 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-500'}`}>
              <th className="py-4 px-6">Severity</th>
              <th className="py-4 px-6">Title</th>
              <th className="py-4 px-6">Device</th>
              <th className="py-4 px-6">Description</th>
              <th className="py-4 px-6">Timestamp</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {filtered.map((a) => (
              <tr key={a.id} className="hover:bg-slate-800/40">
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                    a.severity === 'Critical' ? 'bg-rose-500/10 text-rose-400' : a.severity === 'Warning' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    {a.severity}
                  </span>
                </td>
                <td className="py-4 px-6 font-bold">{a.title}</td>
                <td className="py-4 px-6 font-mono text-xs">{a.device}</td>
                <td className="py-4 px-6 text-slate-300 max-w-xs truncate">{a.description}</td>
                <td className="py-4 px-6 text-xs text-slate-400">{a.timestamp}</td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    a.status === 'Active' ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {a.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {a.status === 'Active' && (
                      <button
                        onClick={() => acknowledgeAlert(a.id)}
                        className="px-3 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-semibold"
                      >
                        ACK
                      </button>
                    )}
                    <button
                      onClick={() => resolveAlert(a.id)}
                      className="px-3 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 text-xs font-semibold"
                    >
                      Resolve
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
