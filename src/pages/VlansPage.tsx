import React, { useState } from 'react';
import { Layers, Plus, Trash2, Shield, X } from 'lucide-react';
import { useNMS } from '../context/NMSContext';

export const VlansPage: React.FC = () => {
  const { vlans, addVlan, deleteVlan, darkMode } = useNMS();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ vlanId: 50, name: 'NEW-VLAN', device: 'CORE-SW-01', type: 'Static' as any, status: 'Active' as any });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVlan({
      vlanId: Number(form.vlanId),
      name: form.name.toUpperCase(),
      device: form.device,
      assignedPortsCount: 4,
      type: form.type,
      status: form.status
    });
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">VLAN Management</h2>
          <p className="text-sm text-slate-400">Configure IEEE 802.1Q virtual local area networks across enterprise switches.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create VLAN
        </button>
      </div>

      <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className={`border-b text-xs font-bold uppercase ${darkMode ? 'border-slate-800 bg-slate-900 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-500'}`}>
              <th className="py-4 px-6">VLAN ID</th>
              <th className="py-4 px-6">VLAN Name</th>
              <th className="py-4 px-6">Target Device</th>
              <th className="py-4 px-6">Assigned Ports</th>
              <th className="py-4 px-6">Type</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {vlans.map((v) => (
              <tr key={v.id} className="hover:bg-slate-800/40">
                <td className="py-4 px-6 font-mono font-bold text-blue-400">VLAN {v.vlanId}</td>
                <td className="py-4 px-6 font-semibold">{v.name}</td>
                <td className="py-4 px-6 font-mono text-xs">{v.device}</td>
                <td className="py-4 px-6">{v.assignedPortsCount} ports</td>
                <td className="py-4 px-6">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400">
                    {v.type}
                  </span>
                </td>
                <td className="py-4 px-6 text-emerald-400 font-semibold text-xs">{v.status}</td>
                <td className="py-4 px-6 text-right">
                  <button
                    onClick={() => deleteVlan(v.id)}
                    className="p-2 rounded-lg bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className={`max-w-md w-full rounded-2xl border shadow-2xl p-6 ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-700 mb-4">
              <h3 className="text-lg font-bold">Create New VLAN</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">VLAN ID (1-4094)</label>
                <input
                  type="number"
                  min="1"
                  max="4094"
                  value={form.vlanId}
                  onChange={(e) => setForm({ ...form, vlanId: Number(e.target.value) })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">VLAN Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Target Switch</label>
                <select
                  value={form.device}
                  onChange={(e) => setForm({ ...form, device: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
                >
                  <option value="CORE-SW-01">CORE-SW-01</option>
                  <option value="DIST-SW-01">DIST-SW-01</option>
                  <option value="ACCESS-SW-02">ACCESS-SW-02</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">VLAN Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
                >
                  <option value="Static">Static</option>
                  <option value="Voice">Voice</option>
                  <option value="Management">Management</option>
                </select>
              </div>
              <div className="pt-2 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-sm font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/30">
                  Deploy VLAN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
