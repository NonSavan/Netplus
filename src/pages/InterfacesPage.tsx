import React, { useState } from 'react';
import {
  Network,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sliders,
  Power,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  X
} from 'lucide-react';
import { useNMS } from '../context/NMSContext';
import { NetworkInterface } from '../types';

export const InterfacesPage: React.FC = () => {
  const { interfaces, updateInterfaceStatus, updateInterfaceVlan, updateInterfaceDescription, darkMode, addToast } = useNMS();
  const [selectedPort, setSelectedPort] = useState<NetworkInterface | null>(interfaces[0] || null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<'enable' | 'disable' | null>(null);

  // Edit form state in side panel
  const [editDesc, setEditDesc] = useState('');
  const [editVlan, setEditVlan] = useState(10);

  const handleSelectPort = (intf: NetworkInterface) => {
    setSelectedPort(intf);
    setEditDesc(intf.description);
    setEditVlan(intf.vlan);
  };

  const requestPortToggle = (action: 'enable' | 'disable') => {
    if (!selectedPort) return;
    if (selectedPort.isUplink && action === 'disable') {
      setShowConfirmModal(true);
      setPendingAction(action);
      return;
    }
    executePortToggle(action);
  };

  const executePortToggle = (action: 'enable' | 'disable') => {
    if (!selectedPort) return;
    const newAdminStatus = action === 'enable' ? 'up' : 'down';
    updateInterfaceStatus(selectedPort.id, newAdminStatus);
    setSelectedPort((prev) => (prev ? { ...prev, adminStatus: newAdminStatus, opStatus: newAdminStatus === 'up' ? 'connected' : 'disconnected' } : null));
    setShowConfirmModal(false);
  };

  const handleSaveConfig = () => {
    if (!selectedPort) return;
    updateInterfaceDescription(selectedPort.id, editDesc);
    updateInterfaceVlan(selectedPort.id, Number(editVlan));
    setSelectedPort((prev) => (prev ? { ...prev, description: editDesc, vlan: Number(editVlan) } : null));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Switch Port & Interface Management</h2>
        <p className="text-sm text-slate-400">
          Visual front-panel representation for Cisco Catalyst switches. Real-time link status and VLAN assignment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Graphical Switch Front Panel (Span 2) */}
        <div className={`lg:col-span-2 p-6 rounded-2xl border space-y-6 ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center justify-between pb-4 border-b border-slate-700">
            <div>
              <h3 className="font-bold text-base">CORE-SW-01 (Cisco Catalyst 9300-48P)</h3>
              <p className="text-xs text-slate-400">Chassis Slot 1 &bull; 24 Gigabit Ethernet RJ-45 Ports</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Connected</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-500" /> Down</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Error</span>
            </div>
          </div>

          {/* Graphical Front Panel Box */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
              <span>LED STATS / LINK ACTIVE</span>
              <span>SYSTEM READY</span>
            </div>

            {/* Ports Grid (1 to 24) */}
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-3">
              {interfaces.map((intf) => {
                const isSelected = selectedPort?.id === intf.id;
                const isConnected = intf.opStatus === 'connected';
                const hasError = intf.inputErrors > 0;
                return (
                  <button
                    key={intf.id}
                    onClick={() => handleSelectPort(intf)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all group relative ${
                      isSelected
                        ? 'border-blue-500 bg-blue-600/20 shadow-lg shadow-blue-500/30 ring-2 ring-blue-500'
                        : hasError
                        ? 'border-rose-500/50 bg-rose-950/20 hover:border-rose-500'
                        : isConnected
                        ? 'border-emerald-500/40 bg-emerald-950/20 hover:border-emerald-500'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${
                      isSelected
                        ? 'bg-blue-400 animate-ping'
                        : hasError
                        ? 'bg-rose-500'
                        : isConnected
                        ? 'bg-emerald-500'
                        : 'bg-slate-600'
                    }`} />
                    <span className="text-[11px] font-mono font-bold tracking-tight text-slate-200">
                      {intf.name.replace('Gi1/0/', 'Gi')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Port Detail & Action Side Panel */}
        <div className={`p-6 rounded-2xl border space-y-6 ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          {selectedPort ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div>
                  <h3 className="font-extrabold text-lg font-mono text-blue-400">{selectedPort.name}</h3>
                  <p className="text-xs text-slate-400">{selectedPort.deviceName}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                  selectedPort.opStatus === 'connected' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  {selectedPort.opStatus}
                </span>
              </div>

              {/* Port Info List */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Admin Status</span>
                  <strong className={selectedPort.adminStatus === 'up' ? 'text-emerald-400' : 'text-rose-400'}>
                    {selectedPort.adminStatus.toUpperCase()}
                  </strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Speed / Duplex</span>
                  <strong className="font-mono">{selectedPort.speed} / {selectedPort.duplex}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Assigned VLAN</span>
                  <strong className="text-blue-400">VLAN {selectedPort.vlan}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">MAC Address</span>
                  <strong className="font-mono">{selectedPort.macAddress}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Throughput (In / Out)</span>
                  <strong className="font-mono text-emerald-400">{selectedPort.inputTraffic} / {selectedPort.outputTraffic} Mbps</strong>
                </div>
                {selectedPort.isUplink && (
                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-300 font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    Uplink port connected to {selectedPort.neighborDevice}
                  </div>
                )}
              </div>

              {/* Port Configuration Form */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h4 className="font-bold text-sm">Quick Configuration</h4>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Port Description</label>
                  <input
                    type="text"
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl text-sm border ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Access VLAN</label>
                  <select
                    value={editVlan}
                    onChange={(e) => setEditVlan(Number(e.target.value))}
                    className={`w-full px-3 py-2 rounded-xl text-sm border ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
                  >
                    <option value={10}>VLAN 10 (CORP-USERS)</option>
                    <option value={20}>VLAN 20 (VOIP-PHONES)</option>
                    <option value={30}>VLAN 30 (GUEST-WIFI)</option>
                    <option value={100}>VLAN 100 (SERVERS-DMZ)</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={handleSaveConfig}
                    className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md"
                  >
                    Apply Config
                  </button>
                  {selectedPort.adminStatus === 'up' ? (
                    <button
                      onClick={() => requestPortToggle('disable')}
                      className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white font-semibold text-xs transition-colors"
                    >
                      Disable Port
                    </button>
                  ) : (
                    <button
                      onClick={() => requestPortToggle('enable')}
                      className="px-4 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white font-semibold text-xs transition-colors"
                    >
                      Enable Port
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400">
              Select an interface port from the front panel to view configuration and stats.
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal for Disabling Uplink */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className={`max-w-md w-full rounded-2xl border shadow-2xl p-6 space-y-4 ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center gap-3 text-amber-400">
              <AlertTriangle className="w-8 h-8 shrink-0" />
              <h3 className="font-extrabold text-lg">Warning: Uplink Disruption</h3>
            </div>
            <p className="text-sm text-slate-300">
              Port <strong className="font-mono text-slate-100">{selectedPort?.name}</strong> is detected as an active network uplink connected to <strong className="text-blue-400">{selectedPort?.neighborDevice}</strong>. Disabling this port will disrupt network segment routing.
            </p>
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => executePortToggle('disable')}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold shadow-lg shadow-rose-600/30"
              >
                Proceed & Disable
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
