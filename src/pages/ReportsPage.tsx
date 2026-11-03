import React from 'react';
import { FileText, Download, Printer } from 'lucide-react';
import { useNMS } from '../context/NMSContext';

export const ReportsPage: React.FC = () => {
  const { darkMode, addToast } = useNMS();

  const reportCategories = [
    { title: 'Device Inventory Report', desc: 'Complete hardware inventory, serial numbers, firmware versions, and IP allocations.', type: 'PDF / CSV' },
    { title: 'Device Availability Report', desc: 'Uptime percentages, SLA compliance, and historical outage logs.', type: 'PDF' },
    { title: 'Interface Utilization Report', desc: 'Bandwidth utilization, error packet rates, and link status summary.', type: 'CSV' },
    { title: 'Network Traffic Aggregate Report', desc: 'Inbound/outbound traffic throughput trends across core trunk ports.', type: 'PDF / Excel' },
    { title: 'VLAN Configuration Audit', desc: 'Active 802.1Q VLAN assignments and trunk port configurations.', type: 'CSV' },
    { title: 'Alert & Incident History', desc: 'Logged SNMP traps, syslog alerts, and technician acknowledgement times.', type: 'PDF' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Network Management Reports</h2>
        <p className="text-sm text-slate-400">Generate executive summaries, SLA reports, and configuration audit documentation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportCategories.map((rep, idx) => (
          <div key={idx} className={`p-6 rounded-2xl border flex flex-col justify-between space-y-4 ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base">{rep.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{rep.desc}</p>
            </div>
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">{rep.type}</span>
              <button
                onClick={() => addToast(`Successfully generated ${rep.title}`, 'success')}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Generate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
