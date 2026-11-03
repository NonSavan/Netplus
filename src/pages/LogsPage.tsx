import React, { useState } from 'react';
import { FileClock, Search } from 'lucide-react';
import { useNMS } from '../context/NMSContext';

export const LogsPage: React.FC = () => {
  const { logs, darkMode } = useNMS();
  const [query, setQuery] = useState('');

  const filtered = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(query.toLowerCase()) ||
      l.user.toLowerCase().includes(query.toLowerCase()) ||
      l.targetDevice.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Audit & Activity Logs</h2>
        <p className="text-sm text-slate-400">Complete immutable record of operator actions, device changes, and SSH/SNMP events.</p>
      </div>

      <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search logs by action, user..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-xl text-sm border ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
          />
        </div>
      </div>

      <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className={`border-b text-xs font-bold uppercase ${darkMode ? 'border-slate-800 bg-slate-900 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-500'}`}>
              <th className="py-4 px-6">Timestamp</th>
              <th className="py-4 px-6">User / Principal</th>
              <th className="py-4 px-6">Action</th>
              <th className="py-4 px-6">Target Device</th>
              <th className="py-4 px-6">IP Address</th>
              <th className="py-4 px-6 text-right">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {filtered.map((l) => (
              <tr key={l.id} className="hover:bg-slate-800/40">
                <td className="py-4 px-6 font-mono text-xs">{l.timestamp}</td>
                <td className="py-4 px-6 font-semibold">{l.user}</td>
                <td className="py-4 px-6 font-bold">{l.action}</td>
                <td className="py-4 px-6 font-mono text-xs text-blue-400">{l.targetDevice}</td>
                <td className="py-4 px-6 font-mono text-xs text-slate-400">{l.ipAddress}</td>
                <td className="py-4 px-6 text-right">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    l.result === 'Success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {l.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
