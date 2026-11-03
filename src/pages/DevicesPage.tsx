import React, { useState } from 'react';
import {
  Server,
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Radio,
  Eye,
  Trash2,
  RefreshCw,
  Cpu,
  Lock,
  X,
  Compass
} from 'lucide-react';
import { useNMS } from '../context/NMSContext';
import { NetworkDevice, Vendor, DeviceType, DeviceStatus } from '../types';
import { useNavigate } from 'react-router-dom';

export const DevicesPage: React.FC = () => {
  const { devices, addDevice, deleteDevice, testConnectivity, discoverDevice, darkMode, addToast } = useNMS();
  const [searchQuery, setSearchQuery] = useState('');
  const [vendorFilter, setVendorFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDiscoverModal, setShowDiscoverModal] = useState(false);
  const [discoverIp, setDiscoverIp] = useState('');
  const [isDiscovering, setIsDiscovering] = useState(false);

  // Add Device Form state
  const [formData, setFormData] = useState({
    name: '',
    ipAddress: '',
    vendor: 'Cisco' as Vendor,
    model: 'Catalyst 9300',
    deviceType: 'Switch' as DeviceType,
    location: 'DC-1 Rack A',
    snmpVersion: 'v3',
    snmpUser: 'admin_snmp',
    sshUser: 'admin_nms',
    sshPassword: '••••••••••••'
  });

  const navigate = useNavigate();

  const filteredDevices = devices.filter((dev) => {
    const matchesSearch =
      dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.ipAddress.includes(searchQuery) ||
      (dev.serialNumber && dev.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesVendor = vendorFilter === 'All' || dev.vendor === vendorFilter;
    const matchesType = typeFilter === 'All' || dev.deviceType === typeFilter;
    const matchesStatus = statusFilter === 'All' || dev.status === statusFilter;
    return matchesSearch && matchesVendor && matchesType && matchesStatus;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.ipAddress) {
      addToast('Please enter device name and IP address', 'error');
      return;
    }
    addDevice({
      name: formData.name,
      ipAddress: formData.ipAddress,
      vendor: formData.vendor,
      model: formData.model,
      deviceType: formData.deviceType,
      location: formData.location,
      status: 'online',
      snmpVersion: formData.snmpVersion,
      sshUser: formData.sshUser
    });
    setShowAddModal(false);
    setFormData({
      name: '',
      ipAddress: '',
      vendor: 'Cisco',
      model: 'Catalyst 9300',
      deviceType: 'Switch',
      location: 'DC-1 Rack A',
      snmpVersion: 'v3',
      snmpUser: 'admin_snmp',
      sshUser: 'admin_nms',
      sshPassword: '••••••••••••'
    });
  };

  const handleDiscoverSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!discoverIp) return;
    setIsDiscovering(true);
    try {
      await discoverDevice(discoverIp);
      setShowDiscoverModal(false);
      setDiscoverIp('');
    } catch (err) {
      addToast('Discovery failed. Host unreachable.', 'error');
    } finally {
      setIsDiscovering(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Device Inventory & Management</h2>
          <p className="text-sm text-slate-400">
            Monitor physical Cisco switches, routers, firewalls, and SNMP/SSH parameters.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDiscoverModal(true)}
            className={`px-4 py-2.5 rounded-xl border font-semibold text-sm transition-all flex items-center gap-2 ${
              darkMode ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4 text-blue-400" />
            Discover Device
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Device
          </button>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className={`p-4 rounded-2xl border flex flex-col lg:flex-row items-center justify-between gap-4 ${
        darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, IP, serial..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-xl text-sm border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <select
            value={vendorFilter}
            onChange={(e) => setVendorFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl text-sm border ${
              darkMode ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <option value="All">All Vendors</option>
            <option value="Cisco">Cisco</option>
            <option value="Palo Alto">Palo Alto</option>
            <option value="HP Enterprise">HP Enterprise</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl text-sm border ${
              darkMode ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <option value="All">All Types</option>
            <option value="Switch">Switch</option>
            <option value="Router">Router</option>
            <option value="Firewall">Firewall</option>
            <option value="Access Point">Access Point</option>
            <option value="Server">Server</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl text-sm border ${
              darkMode ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <option value="All">All Statuses</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="warning">Warning</option>
          </select>
        </div>
      </div>

      {/* Devices Table */}
      <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b text-xs font-bold uppercase tracking-wider ${
                darkMode ? 'border-slate-800 bg-slate-900/50 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-500'
              }`}>
                <th className="py-4 px-6">Device Name</th>
                <th className="py-4 px-6">Management IP</th>
                <th className="py-4 px-6">Vendor / Model</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Last Seen</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-sm">
              {filteredDevices.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-slate-400">
                    No devices match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredDevices.map((dev) => (
                  <tr key={dev.id} className={`transition-colors ${darkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}`}>
                    <td className="py-4 px-6 font-bold">
                      <button
                        onClick={() => navigate(`/network/devices/${dev.id}`)}
                        className="hover:text-blue-400 transition-colors flex items-center gap-2"
                      >
                        <Server className="w-4 h-4 text-blue-500 shrink-0" />
                        {dev.name}
                      </button>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-slate-400">{dev.ipAddress}</td>
                    <td className="py-4 px-6">
                      <span className="font-semibold">{dev.vendor}</span> <span className="text-xs text-slate-400">{dev.model}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400">
                        {dev.deviceType}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-400 text-xs">{dev.location}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                        dev.status === 'online'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : dev.status === 'warning'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          dev.status === 'online' ? 'bg-emerald-500' : dev.status === 'warning' ? 'bg-amber-500' : 'bg-rose-500'
                        }`} />
                        {dev.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-400">{dev.lastSeen}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => testConnectivity(dev.id)}
                          className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 transition-colors"
                          title="Test Connectivity (ICMP/SNMP)"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/network/devices/${dev.id}`)}
                          className="p-2 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 transition-colors"
                          title="View Device Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteDevice(dev.id)}
                          className="p-2 rounded-lg bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 transition-colors"
                          title="Delete Device"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Device Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className={`max-w-2xl w-full rounded-2xl border shadow-2xl p-6 ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-700 mb-6">
              <h3 className="text-lg font-bold">Register New Network Device</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Device Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., CORE-SW-03"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Management IP Address</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 10.100.1.50"
                    value={formData.ipAddress}
                    onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Vendor</label>
                  <select
                    value={formData.vendor}
                    onChange={(e) => setFormData({ ...formData, vendor: e.target.value as Vendor })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
                  >
                    <option value="Cisco">Cisco</option>
                    <option value="Juniper">Juniper</option>
                    <option value="Aruba">Aruba</option>
                    <option value="HP Enterprise">HP Enterprise</option>
                    <option value="Palo Alto">Palo Alto</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Device Model</label>
                  <input
                    type="text"
                    placeholder="e.g., Catalyst 9300-48P"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Device Type</label>
                  <select
                    value={formData.deviceType}
                    onChange={(e) => setFormData({ ...formData, deviceType: e.target.value as DeviceType })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
                  >
                    <option value="Switch">Switch</option>
                    <option value="Router">Router</option>
                    <option value="Firewall">Firewall</option>
                    <option value="Access Point">Access Point</option>
                    <option value="Server">Server</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g., DC-1 Rack A"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">SNMP Version</label>
                  <select
                    value={formData.snmpVersion}
                    onChange={(e) => setFormData({ ...formData, snmpVersion: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
                  >
                    <option value="v3">SNMPv3 (Secure)</option>
                    <option value="v2c">SNMPv2c</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">SNMPv3 Username</label>
                  <input
                    type="text"
                    value={formData.snmpUser}
                    onChange={(e) => setFormData({ ...formData, snmpUser: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
              </div>
              <div className="pt-4 border-t border-slate-700 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-sm font-semibold hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/30"
                >
                  Save Device
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Discover Device Modal */}
      {showDiscoverModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className={`max-w-md w-full rounded-2xl border shadow-2xl p-6 ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-700 mb-4">
              <h3 className="text-lg font-bold">SNMP / LLDP Device Discovery</h3>
              <button onClick={() => setShowDiscoverModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleDiscoverSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Target IP Address or Subnet</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 10.100.1.15"
                  value={discoverIp}
                  onChange={(e) => setDiscoverIp(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>
              <p className="text-xs text-slate-400">
                NetPulse will query the target IP via SNMPv3 and LLDP to automatically discover system OIDs, hardware vendor, and interface states.
              </p>
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowDiscoverModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isDiscovering}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  {isDiscovering && <RefreshCw className="w-4 h-4 animate-spin" />}
                  {isDiscovering ? 'Discovering...' : 'Start Discovery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
