import React, { useState } from 'react';
import { Settings, Save } from 'lucide-react';
import { useNMS } from '../context/NMSContext';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, darkMode } = useNMS();
  const [form, setForm] = useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">System Settings & Configuration</h2>
        <p className="text-sm text-slate-400">Configure SNMP polling intervals, threshold alerts, and NMS engine parameters.</p>
      </div>

      <form onSubmit={handleSubmit} className={`p-6 rounded-2xl border space-y-6 ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">System Instance Name</label>
            <input
              type="text"
              value={form.systemName}
              onChange={(e) => setForm({ ...form, systemName: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">SNMP Polling Interval (Seconds)</label>
            <input
              type="number"
              value={form.pollingInterval}
              onChange={(e) => setForm({ ...form, pollingInterval: Number(e.target.value) })}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Device Timeout (Seconds)</label>
            <input
              type="number"
              value={form.deviceTimeout}
              onChange={(e) => setForm({ ...form, deviceTimeout: Number(e.target.value) })}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Monitoring Retention (Days)</label>
            <input
              type="number"
              value={form.monitoringRetention}
              onChange={(e) => setForm({ ...form, monitoringRetention: Number(e.target.value) })}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};
