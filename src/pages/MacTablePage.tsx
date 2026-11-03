import React, { useState } from 'react';
import { Cpu, Search, Download } from 'lucide-react';
import { useNMS } from '../context/NMSContext';

export const MacTablePage: React.FC = () => {
  const { macTable, darkMode, addToast } = useNMS();
  const [query, setQuery] = useState('');

  const filtered = macTable.filter(
    (m) =>
      m.macAddress.toLowerCase().includes(query.toLowerCase()) ||
      m.vendor.toLowerCase().includes(query.toLowerCase()) ||
      m.device.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">MAC Address Table</h2>
          <p className="text-sm text-slate-400">Layer 2 forwarding table and OUI vendor lookup across active switch ports.</p>
        </div>
        <button
          onClick={() => addToast('MAC table exported to CSV successfully', 'success')}
          className={`px-4 py-2.5 rounded-xl border font-semibold text-sm transition-all flex items-center gap-2 ${
            darkMode ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Download className="w-4 h-4 text-blue-400" />
          Export CSV
        </button>
      </div>

      <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search MAC, vendor, device..."
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
              <th className="py-4 px-6">MAC Address</th>
              <th className="py-4 px-6">VLAN</th>
              <th className="py-4 px-6">Device</th>
              <th className="py-4 px-6">Interface</th>
              <th className="py-4 px-6">Vendor (OUI)</th>
              <th className="py-4 px-6">Last Seen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {filtered.map((m) => (
              <tr key={m.id} className="hover:bg-slate-800/40">
                <td className="py-4 px-6 font-mono font-bold text-xs text-blue-400">{m.macAddress}</td>
                <td className="py-4 px-6">VLAN {m.vlan}</td>
                <td className="py-4 px-6 font-semibold">{m.device}</td>
                <td className="py-4 px-6 font-mono text-xs">{m.interface}</td>
                <td className="py-4 px-6 text-slate-300">{m.vendor}</td>
                <td className="py-4 px-6 text-xs text-slate-400">{m.lastSeen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
