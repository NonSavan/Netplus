import React, { useState } from 'react';
import { Share2, Server, Globe, Shield, RefreshCw, ZoomIn, ZoomOut, Search, Radio } from 'lucide-react';
import { useNMS } from '../context/NMSContext';
import { useNavigate } from 'react-router-dom';

export const TopologyPage: React.FC = () => {
  const { devices, darkMode, addToast } = useNMS();
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Interactive Network Topology</h2>
          <p className="text-sm text-slate-400">
            LLDP and CDP discovered physical links and hierarchical routing graph.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-800/50 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setZoomLevel((z) => Math.max(50, z - 15))}
              className="p-2 text-slate-300 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 text-xs font-mono font-semibold">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
              className="p-2 text-slate-300 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => addToast('Topology links refreshed successfully', 'success')}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Rescan LLDP
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Topology Canvas (Span 3) */}
        <div className={`lg:col-span-3 p-8 rounded-2xl border relative overflow-hidden min-h-[550px] flex flex-col items-center justify-center ${
          darkMode ? 'bg-[#0b1329] border-slate-800' : 'bg-slate-100 border-slate-300'
        }`} style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center' }}>
          
          {/* Background grid effect */}
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

          {/* Core Router Node */}
          <div className="relative z-10 mb-12">
            <div
              onClick={() => setSelectedNode(devices[0])}
              className={`p-5 rounded-2xl border cursor-pointer transition-all hover:scale-105 flex items-center gap-4 shadow-2xl ${
                darkMode ? 'bg-[#0f172a] border-blue-500/50 ring-4 ring-blue-500/20' : 'bg-white border-blue-400 ring-4 ring-blue-400/20'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Core Backbone</span>
                <h4 className="font-extrabold text-base">{devices[0]?.name || 'COR-RTR-01'}</h4>
                <span className="text-xs font-mono text-slate-400">{devices[0]?.ipAddress}</span>
              </div>
            </div>
          </div>

          {/* Connecting Line 1 */}
          <div className="w-1 h-12 bg-blue-500/50 relative mb-4">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-blue-600 text-[10px] text-white font-mono">
              10Gbps Trunk
            </span>
          </div>

          {/* Core Switch Node */}
          <div className="relative z-10 mb-12">
            <div
              onClick={() => setSelectedNode(devices[1])}
              className={`p-5 rounded-2xl border cursor-pointer transition-all hover:scale-105 flex items-center gap-4 shadow-2xl ${
                darkMode ? 'bg-[#0f172a] border-emerald-500/50 ring-4 ring-emerald-500/20' : 'bg-white border-emerald-400 ring-4 ring-emerald-400/20'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-lg">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Core Switch</span>
                <h4 className="font-extrabold text-base">{devices[1]?.name || 'CORE-SW-01'}</h4>
                <span className="text-xs font-mono text-slate-400">{devices[1]?.ipAddress}</span>
              </div>
            </div>
          </div>

          {/* Branching Lines */}
          <div className="w-full max-w-xl flex justify-between px-12 mb-4">
            <div className="w-0.5 h-10 bg-slate-600" />
            <div className="w-0.5 h-10 bg-slate-600" />
            <div className="w-0.5 h-10 bg-slate-600" />
          </div>

          {/* Access Switches / Firewall Row */}
          <div className="relative z-10 grid grid-cols-3 gap-6 w-full max-w-2xl">
            {devices.slice(2, 5).map((dev) => (
              <div
                key={dev.id}
                onClick={() => setSelectedNode(dev)}
                className={`p-4 rounded-xl border cursor-pointer transition-all hover:scale-105 flex flex-col items-center text-center shadow-xl ${
                  darkMode ? 'bg-[#0f172a] border-slate-700' : 'bg-white border-slate-300'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center mb-2">
                  <Shield className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-sm truncate w-full">{dev.name}</h5>
                <span className="text-[11px] font-mono text-slate-400">{dev.ipAddress}</span>
                <span className={`mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  dev.status === 'online' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                }`}>
                  {dev.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Node Detail Side Panel */}
        <div className={`p-6 rounded-2xl border space-y-4 ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <h3 className="font-bold text-base pb-3 border-b border-slate-700">Selected Node Details</h3>
          {selectedNode ? (
            <div className="space-y-4 text-sm">
              <div>
                <span className="text-xs text-slate-400 block uppercase">Device Name</span>
                <strong className="text-base text-blue-400">{selectedNode.name}</strong>
              </div>
              <div>
                <span className="text-xs text-slate-400 block uppercase">Management IP</span>
                <strong className="font-mono">{selectedNode.ipAddress}</strong>
              </div>
              <div>
                <span className="text-xs text-slate-400 block uppercase">Vendor & Model</span>
                <strong>{selectedNode.vendor} {selectedNode.model}</strong>
              </div>
              <div>
                <span className="text-xs text-slate-400 block uppercase">Location</span>
                <span className="text-slate-300">{selectedNode.location}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="text-xs text-slate-400 block uppercase">CPU Usage</span>
                  <strong className="text-blue-400">{selectedNode.cpuUsage}%</strong>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block uppercase">Memory</span>
                  <strong className="text-indigo-400">{selectedNode.memoryUsage}%</strong>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-700">
                <button
                  onClick={() => navigate(`/network/devices/${selectedNode.id}`)}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30"
                >
                  View Full Profile &rarr;
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400 text-center py-20">
              Click any node in the topology map to inspect SNMP metrics and physical connections.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
