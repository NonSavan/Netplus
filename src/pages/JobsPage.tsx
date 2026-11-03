import React, { useState } from 'react';
import { Sliders, Plus, X } from 'lucide-react';
import { useNMS } from '../context/NMSContext';

export const JobsPage: React.FC = () => {
  const { jobs, addJob, cancelJob, darkMode } = useNMS();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ device: 'CORE-SW-01', operation: 'Configure VLAN Access', requestedBy: 'alex.morgan' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addJob({
      device: form.device,
      operation: form.operation,
      requestedBy: form.requestedBy,
      status: 'Pending',
      result: 'Job scheduled in queue'
    });
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Configuration Management Jobs</h2>
          <p className="text-sm text-slate-400">Scheduled and automated SSH/NETCONF script execution history.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Schedule Job
        </button>
      </div>

      <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className={`border-b text-xs font-bold uppercase ${darkMode ? 'border-slate-800 bg-slate-900 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-500'}`}>
              <th className="py-4 px-6">Job ID</th>
              <th className="py-4 px-6">Device</th>
              <th className="py-4 px-6">Operation</th>
              <th className="py-4 px-6">Requested By</th>
              <th className="py-4 px-6">Created At</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {jobs.map((j) => (
              <tr key={j.id} className="hover:bg-slate-800/40">
                <td className="py-4 px-6 font-mono font-bold text-blue-400">{j.jobId}</td>
                <td className="py-4 px-6 font-semibold">{j.device}</td>
                <td className="py-4 px-6">{j.operation}</td>
                <td className="py-4 px-6 text-slate-400 text-xs">{j.requestedBy}</td>
                <td className="py-4 px-6 text-xs text-slate-400">{j.createdAt}</td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    j.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : j.status === 'Pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {j.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right font-mono text-xs text-slate-300">{j.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className={`max-w-md w-full rounded-2xl border shadow-2xl p-6 ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-700 mb-4">
              <h3 className="text-lg font-bold">Schedule Configuration Job</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Target Device</label>
                <select
                  value={form.device}
                  onChange={(e) => setForm({ ...form, device: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
                >
                  <option value="CORE-SW-01">CORE-SW-01</option>
                  <option value="COR-RTR-01">COR-RTR-01</option>
                  <option value="ACCESS-SW-02">ACCESS-SW-02</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Operation</label>
                <select
                  value={form.operation}
                  onChange={(e) => setForm({ ...form, operation: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
                >
                  <option value="Configure VLAN Access">Configure VLAN Access</option>
                  <option value="Enable Interface Description">Enable Interface Description</option>
                  <option value="Update Device Configuration">Update Device Configuration</option>
                  <option value="Backup Running Config">Backup Running Config</option>
                </select>
              </div>
              <div className="pt-2 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-sm font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/30">
                  Run Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
