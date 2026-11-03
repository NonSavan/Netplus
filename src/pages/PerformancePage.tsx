import React from 'react';
import { Cpu, Server } from 'lucide-react';
import { useNMS } from '../context/NMSContext';

export const PerformancePage: React.FC = () => {
  const { devices, darkMode } = useNMS();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Device Performance & Telemetry</h2>
        <p className="text-sm text-slate-400">CPU utilization, RAM allocation, chassis temperature, and SNMP health metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((dev) => (
          <div key={dev.id} className={`p-6 rounded-2xl border space-y-4 ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center font-bold">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">{dev.name}</h4>
                  <span className="text-xs text-slate-400">{dev.model}</span>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                dev.status === 'online' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
              }`}>
                {dev.status}
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-400">CPU Utilization</span>
                  <span className={dev.cpuUsage > 75 ? 'text-amber-400 font-bold' : 'text-blue-400'}>{dev.cpuUsage}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${dev.cpuUsage > 75 ? 'bg-amber-500' : 'bg-blue-500'}`} style={{ width: `${dev.cpuUsage}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-400">Memory Utilization</span>
                  <span className="text-indigo-400">{dev.memoryUsage}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${dev.memoryUsage}%` }} />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Temperature: <strong className="text-emerald-400">{dev.temperature || 40}°C</strong></span>
              <span>Uptime: {dev.uptime.substring(0, 10)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
