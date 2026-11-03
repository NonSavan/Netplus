import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Server,
  ArrowLeft,
  Activity,
  Network,
  Layers,
  Cpu,
  Share2,
  FileText,
  FileClock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Terminal,
  ShieldCheck,
  HardDrive
} from 'lucide-react';
import { useNMS } from '../context/NMSContext';

export const DeviceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { devices, interfaces, vlans, macTable, logs, darkMode, testConnectivity, addToast } = useNMS();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'interfaces' | 'vlans' | 'mac' | 'performance' | 'neighbors' | 'config' | 'logs'
  >('overview');

  const device = devices.find((d) => d.id === id) || devices[0];
  const deviceInterfaces = interfaces.filter((i) => i.deviceId === device.id || i.deviceName === device.name);
  const deviceLogs = logs.filter((l) => l.targetDevice === device.name);

  if (!device) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold">Device Not Found</h2>
        <button onClick={() => navigate('/network/devices')} className="px-4 py-2 bg-blue-600 text-white rounded-xl">
          Back to Devices
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Server },
    { id: 'interfaces', name: 'Interfaces', icon: Network },
    { id: 'vlans', name: 'VLANs', icon: Layers },
    { id: 'mac', name: 'MAC Addresses', icon: Cpu },
    { id: 'performance', name: 'Performance', icon: Activity },
    { id: 'neighbors', name: 'Neighbors (LLDP)', icon: Share2 },
    { id: 'config', name: 'Configuration', icon: FileText },
    { id: 'logs', name: 'Logs', icon: FileClock }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back Button */}
      <button
        onClick={() => navigate('/network/devices')}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Device Inventory
      </button>

      {/* Device Header Profile */}
      <div className={`p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-6 ${
        darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
            <Server className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-extrabold tracking-tight">{device.name}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1.5 ${
                device.status === 'online' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
              }`}>
                <span className={`w-2 h-2 rounded-full ${device.status === 'online' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                {device.status}
              </span>
            </div>
            <p className="text-sm font-mono text-slate-400 mt-1">
              IP: {device.ipAddress} &bull; {device.vendor} {device.model} &bull; {device.location}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => testConnectivity(device.id)}
            className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-200 text-sm font-semibold transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Test Connectivity
          </button>
          <button
            onClick={() => addToast(`Initiated backup config download for ${device.name}`, 'success')}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
          >
            <Terminal className="w-4 h-4" />
            Backup Config
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : darkMode
                  ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <span className="text-xs font-bold text-slate-400 uppercase">System Uptime</span>
              <h4 className="text-xl font-extrabold mt-2">{device.uptime}</h4>
              <p className="text-xs text-emerald-400 mt-1">Stable kernel execution</p>
            </div>
            <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <span className="text-xs font-bold text-slate-400 uppercase">CPU Utilization</span>
              <h4 className="text-xl font-extrabold mt-2 text-blue-400">{device.cpuUsage}%</h4>
              <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: `${device.cpuUsage}%` }} />
              </div>
            </div>
            <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <span className="text-xs font-bold text-slate-400 uppercase">Memory Utilization</span>
              <h4 className="text-xl font-extrabold mt-2 text-indigo-400">{device.memoryUsage}%</h4>
              <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${device.memoryUsage}%` }} />
              </div>
            </div>
            <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <span className="text-xs font-bold text-slate-400 uppercase">Active Interfaces</span>
              <h4 className="text-xl font-extrabold mt-2 text-emerald-400">{device.activeInterfaces} / {device.totalInterfaces}</h4>
              <p className="text-xs text-slate-400 mt-1">SNMP Polling Active</p>
            </div>

            <div className={`lg:col-span-4 p-6 rounded-2xl border ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <h3 className="text-lg font-bold mb-4">Hardware Specifications & SNMP Parameters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <span className="text-slate-400 block text-xs uppercase mb-1">Serial Number</span>
                  <strong className="font-mono">{device.serialNumber}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs uppercase mb-1">Firmware Version</span>
                  <strong className="font-mono">{device.firmware}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs uppercase mb-1">Chassis Temperature</span>
                  <strong className="text-emerald-400">{device.temperature || 40}°C (Optimal)</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs uppercase mb-1">SNMP Version</span>
                  <strong>{device.snmpVersion} (AuthPriv)</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs uppercase mb-1">SSH Username</span>
                  <strong className="font-mono">{device.sshUser}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs uppercase mb-1">Polling Protocol</span>
                  <strong>ICMP / SNMPv3 / NETCONF</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'interfaces' && (
          <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className={`border-b text-xs font-bold uppercase ${darkMode ? 'border-slate-800 bg-slate-900 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-500'}`}>
                  <th className="py-3.5 px-6">Interface</th>
                  <th className="py-3.5 px-6">Description</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Speed</th>
                  <th className="py-3.5 px-6">VLAN</th>
                  <th className="py-3.5 px-6">Traffic (In/Out)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {deviceInterfaces.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-slate-400">No mock interfaces bound to this device.</td>
                  </tr>
                ) : (
                  deviceInterfaces.map((intf) => (
                    <tr key={intf.id} className="hover:bg-slate-800/40">
                      <td className="py-3.5 px-6 font-bold font-mono">{intf.name}</td>
                      <td className="py-3.5 px-6 text-slate-300">{intf.description}</td>
                      <td className="py-3.5 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${intf.opStatus === 'connected' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                          {intf.opStatus.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 font-mono text-xs">{intf.speed}</td>
                      <td className="py-3.5 px-6">VLAN {intf.vlan}</td>
                      <td className="py-3.5 px-6 font-mono text-xs text-blue-400">{intf.inputTraffic} Mbps / {intf.outputTraffic} Mbps</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'vlans' && (
          <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className={`border-b text-xs font-bold uppercase ${darkMode ? 'border-slate-800 bg-slate-900 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-500'}`}>
                  <th className="py-3.5 px-6">VLAN ID</th>
                  <th className="py-3.5 px-6">Name</th>
                  <th className="py-3.5 px-6">Type</th>
                  <th className="py-3.5 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {vlans.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-6 font-bold font-mono text-blue-400">VLAN {v.vlanId}</td>
                    <td className="py-3.5 px-6 font-semibold">{v.name}</td>
                    <td className="py-3.5 px-6 text-xs">{v.type}</td>
                    <td className="py-3.5 px-6 text-emerald-400 font-semibold text-xs">{v.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'mac' && (
          <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className={`border-b text-xs font-bold uppercase ${darkMode ? 'border-slate-800 bg-slate-900 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-500'}`}>
                  <th className="py-3.5 px-6">MAC Address</th>
                  <th className="py-3.5 px-6">VLAN</th>
                  <th className="py-3.5 px-6">Interface</th>
                  <th className="py-3.5 px-6">Vendor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {macTable.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-6 font-mono font-bold text-xs">{m.macAddress}</td>
                    <td className="py-3.5 px-6">VLAN {m.vlan}</td>
                    <td className="py-3.5 px-6 font-mono">{m.interface}</td>
                    <td className="py-3.5 px-6 text-slate-400 text-xs">{m.vendor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h3 className="text-lg font-bold mb-4">Device CPU & Memory Historical Trends</h3>
            <div className="h-64 flex items-center justify-center border border-dashed border-slate-700 rounded-xl text-slate-400">
              Live telemetry charts for {device.name} (CPU: {device.cpuUsage}%, RAM: {device.memoryUsage}%)
            </div>
          </div>
        )}

        {activeTab === 'neighbors' && (
          <div className={`p-6 rounded-2xl border space-y-4 ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h3 className="text-lg font-bold">LLDP / CDP Discovered Neighbors</h3>
            <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-950/20 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-blue-300">COR-RTR-01 (GigabitEthernet 0/0/1)</h4>
                <p className="text-xs text-slate-400 mt-0.5">Discovered via Cisco Discovery Protocol (CDP)</p>
              </div>
              <span className="text-xs font-semibold text-emerald-400">Bi-directional Link Active</span>
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div className={`p-6 rounded-2xl border space-y-4 ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Running Configuration (Cached SNMP/SSH)</h3>
              <button
                onClick={() => addToast('Config exported to text file', 'success')}
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold"
              >
                Download Config
              </button>
            </div>
            <pre className={`p-4 rounded-xl font-mono text-xs overflow-x-auto ${darkMode ? 'bg-slate-950 text-emerald-400' : 'bg-slate-900 text-emerald-300'}`}>
{`!
version 17.6
service timestamps debug datetime msec
service timestamps log datetime msec
no service password-encryption
!
hostname ${device.name}
!
boot-start-marker
boot-end-marker
!
vlan 10
 name CORP-USERS
vlan 20
 name VOIP-PHONES
!
interface GigabitEthernet1/0/1
 description Workstation Port
 switchport access vlan 10
 switchport mode access
 spanning-tree portfast
!
ip default-gateway ${device.ipAddress}
end`}
            </pre>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className={`border-b text-xs font-bold uppercase ${darkMode ? 'border-slate-800 bg-slate-900 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-500'}`}>
                  <th className="py-3.5 px-6">Timestamp</th>
                  <th className="py-3.5 px-6">Action</th>
                  <th className="py-3.5 px-6">User</th>
                  <th className="py-3.5 px-6">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {deviceLogs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-slate-400">No audit logs recorded for this device.</td>
                  </tr>
                ) : (
                  deviceLogs.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-800/40">
                      <td className="py-3.5 px-6 font-mono text-xs">{l.timestamp}</td>
                      <td className="py-3.5 px-6 font-bold">{l.action}</td>
                      <td className="py-3.5 px-6 text-slate-400 text-xs">{l.user}</td>
                      <td className="py-3.5 px-6 text-emerald-400 font-semibold text-xs">{l.result}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
