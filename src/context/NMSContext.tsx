import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  NetworkDevice,
  NetworkInterface,
  VLAN,
  MACTableEntry,
  NetworkAlert,
  ConfigurationJob,
  AuditLog,
  UserAccount,
  RolePermission,
  SystemSettings
} from '../types';
import {
  initialDevices,
  initialInterfaces,
  initialVlans,
  initialMacTable,
  initialAlerts,
  initialJobs,
  initialLogs,
  initialUsers,
  initialRoles,
  initialSettings
} from '../services/mockData';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

interface NMSContextType {
  devices: NetworkDevice[];
  interfaces: NetworkInterface[];
  vlans: VLAN[];
  macTable: MACTableEntry[];
  alerts: NetworkAlert[];
  jobs: ConfigurationJob[];
  logs: AuditLog[];
  users: UserAccount[];
  roles: RolePermission[];
  settings: SystemSettings;
  darkMode: boolean;
  toasts: ToastMessage[];
  toggleDarkMode: () => void;
  addToast: (message: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
  removeToast: (id: string) => void;
  
  // Device actions
  addDevice: (device: Omit<NetworkDevice, 'id' | 'lastSeen' | 'uptime' | 'cpuUsage' | 'memoryUsage' | 'totalInterfaces' | 'activeInterfaces'>) => void;
  updateDevice: (id: string, updates: Partial<NetworkDevice>) => void;
  deleteDevice: (id: string) => void;
  testConnectivity: (id: string) => Promise<boolean>;
  discoverDevice: (ip: string) => Promise<NetworkDevice>;

  // Interface actions
  updateInterfaceStatus: (interfaceId: string, adminStatus: 'up' | 'down') => void;
  updateInterfaceVlan: (interfaceId: string, vlan: number) => void;
  updateInterfaceDescription: (interfaceId: string, desc: string) => void;

  // VLAN actions
  addVlan: (vlan: Omit<VLAN, 'id'>) => void;
  deleteVlan: (id: string) => void;

  // Alert actions
  acknowledgeAlert: (id: string) => void;
  resolveAlert: (id: string) => void;

  // Job actions
  addJob: (job: Omit<ConfigurationJob, 'id' | 'jobId' | 'createdAt'>) => void;
  cancelJob: (id: string) => void;

  // User actions
  addUser: (user: Omit<UserAccount, 'id' | 'createdAt' | 'lastLogin'>) => void;
  updateUserStatus: (id: string, status: 'Active' | 'Inactive') => void;
  deleteUser: (id: string) => void;

  // Settings
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
}

const NMSContext = createContext<NMSContextType | undefined>(undefined);

export const NMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [devices, setDevices] = useState<NetworkDevice[]>(() => {
    const saved = localStorage.getItem('netpulse_devices');
    return saved ? JSON.parse(saved) : initialDevices;
  });

  const [interfaces, setInterfaces] = useState<NetworkInterface[]>(() => {
    const saved = localStorage.getItem('netpulse_interfaces');
    return saved ? JSON.parse(saved) : initialInterfaces;
  });

  const [vlans, setVlans] = useState<VLAN[]>(() => {
    const saved = localStorage.getItem('netpulse_vlans');
    return saved ? JSON.parse(saved) : initialVlans;
  });

  const [macTable, setMacTable] = useState<MACTableEntry[]>(() => {
    const saved = localStorage.getItem('netpulse_mac_table');
    return saved ? JSON.parse(saved) : initialMacTable;
  });

  const [alerts, setAlerts] = useState<NetworkAlert[]>(() => {
    const saved = localStorage.getItem('netpulse_alerts');
    return saved ? JSON.parse(saved) : initialAlerts;
  });

  const [jobs, setJobs] = useState<ConfigurationJob[]>(() => {
    const saved = localStorage.getItem('netpulse_jobs');
    return saved ? JSON.parse(saved) : initialJobs;
  });

  const [logs, setLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('netpulse_logs');
    return saved ? JSON.parse(saved) : initialLogs;
  });

  const [users, setUsers] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem('netpulse_users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [roles] = useState<RolePermission[]>(() => {
    const saved = localStorage.getItem('netpulse_roles');
    return saved ? JSON.parse(saved) : initialRoles;
  });

  const [settings, setSettings] = useState<SystemSettings>(() => {
    const saved = localStorage.getItem('netpulse_settings');
    return saved ? JSON.parse(saved) : initialSettings;
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('netpulse_dark_mode');
    return saved ? JSON.parse(saved) : true; // Default to Dark NOC theme
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist state
  useEffect(() => { localStorage.setItem('netpulse_devices', JSON.stringify(devices)); }, [devices]);
  useEffect(() => { localStorage.setItem('netpulse_interfaces', JSON.stringify(interfaces)); }, [interfaces]);
  useEffect(() => { localStorage.setItem('netpulse_vlans', JSON.stringify(vlans)); }, [vlans]);
  useEffect(() => { localStorage.setItem('netpulse_mac_table', JSON.stringify(macTable)); }, [macTable]);
  useEffect(() => { localStorage.setItem('netpulse_alerts', JSON.stringify(alerts)); }, [alerts]);
  useEffect(() => { localStorage.setItem('netpulse_jobs', JSON.stringify(jobs)); }, [jobs]);
  useEffect(() => { localStorage.setItem('netpulse_logs', JSON.stringify(logs)); }, [logs]);
  useEffect(() => { localStorage.setItem('netpulse_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('netpulse_settings', JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem('netpulse_dark_mode', JSON.stringify(darkMode)); }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addDevice = (deviceData: Omit<NetworkDevice, 'id' | 'lastSeen' | 'uptime' | 'cpuUsage' | 'memoryUsage' | 'totalInterfaces' | 'activeInterfaces'>) => {
    const newDevice: NetworkDevice = {
      ...deviceData,
      id: `dev-${Date.now()}`,
      lastSeen: 'Just now',
      uptime: '0 days, 00:05:00',
      cpuUsage: Math.floor(Math.random() * 30) + 10,
      memoryUsage: Math.floor(Math.random() * 40) + 30,
      totalInterfaces: 24,
      activeInterfaces: 20
    };
    setDevices((prev) => [newDevice, ...prev]);
    
    // Log audit
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      user: 'alex.morgan (Super Admin)',
      action: 'Device Registration',
      targetDevice: newDevice.name,
      ipAddress: newDevice.ipAddress,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      result: 'Success'
    };
    setLogs((prev) => [newLog, ...prev]);
    addToast(`Successfully registered device ${newDevice.name}`, 'success');
  };

  const updateDevice = (id: string, updates: Partial<NetworkDevice>) => {
    setDevices((prev) => prev.map((d) => (d.id === id ? { ...d, ...updates } : d)));
    addToast('Device configuration updated successfully', 'success');
  };

  const deleteDevice = (id: string) => {
    const dev = devices.find((d) => d.id === id);
    setDevices((prev) => prev.filter((d) => d.id !== id));
    if (dev) {
      addToast(`Deleted device ${dev.name}`, 'info');
    }
  };

  const testConnectivity = async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const dev = devices.find((d) => d.id === id);
        if (dev && dev.status !== 'offline') {
          addToast(`Connectivity test to ${dev.name} (${dev.ipAddress}) succeeded (ICMP 1.4ms, SNMP v3 ok)`, 'success');
          resolve(true);
        } else {
          addToast(`Connectivity test failed: Device unreachable`, 'error');
          resolve(false);
        }
      }, 1000);
    });
  };

  const discoverDevice = async (ip: string): Promise<NetworkDevice> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!ip) {
          reject(new Error('Invalid IP address'));
          return;
        }
        const discovered: NetworkDevice = {
          id: `dev-${Date.now()}`,
          name: `DISCOVERED-${ip.replace(/\./g, '-')}`,
          ipAddress: ip,
          vendor: 'Cisco',
          model: 'Catalyst 9200L',
          deviceType: 'Switch',
          location: 'Auto-Discovered Segment',
          status: 'online',
          lastSeen: 'Just now',
          serialNumber: 'DISC99281X',
          firmware: 'IOS-XE 17.3.1',
          uptime: '1 day, 02:11:00',
          cpuUsage: 15,
          memoryUsage: 42,
          totalInterfaces: 24,
          activeInterfaces: 18,
          snmpVersion: 'v3',
          sshUser: 'admin_nms'
        };
        setDevices((prev) => [discovered, ...prev]);
        addToast(`Successfully discovered device at ${ip}`, 'success');
        resolve(discovered);
      }, 1200);
    });
  };

  const updateInterfaceStatus = (interfaceId: string, adminStatus: 'up' | 'down') => {
    setInterfaces((prev) =>
      prev.map((intf) => {
        if (intf.id === interfaceId) {
          const opStatus = adminStatus === 'up' ? 'connected' : 'disconnected';
          return { ...intf, adminStatus, opStatus, lastStatusChange: 'Just now' };
        }
        return intf;
      })
    );
    addToast(`Interface administrative status updated to ${adminStatus.toUpperCase()}`, 'success');
  };

  const updateInterfaceVlan = (interfaceId: string, vlan: number) => {
    setInterfaces((prev) => prev.map((intf) => (intf.id === interfaceId ? { ...intf, vlan } : intf)));
    addToast(`Interface assigned to VLAN ${vlan}`, 'success');
  };

  const updateInterfaceDescription = (interfaceId: string, description: string) => {
    setInterfaces((prev) => prev.map((intf) => (intf.id === interfaceId ? { ...intf, description } : intf)));
    addToast(`Interface description updated`, 'success');
  };

  const addVlan = (vlanData: Omit<VLAN, 'id'>) => {
    const newVlan: VLAN = {
      ...vlanData,
      id: `vlan-${Date.now()}`
    };
    setVlans((prev) => [...prev, newVlan]);
    addToast(`VLAN ${newVlan.vlanId} (${newVlan.name}) created successfully`, 'success');
  };

  const deleteVlan = (id: string) => {
    setVlans((prev) => prev.filter((v) => v.id !== id));
    addToast('VLAN removed successfully', 'info');
  };

  const acknowledgeAlert = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'Acknowledged' } : a)));
    addToast('Alert acknowledged', 'info');
  };

  const resolveAlert = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'Resolved' } : a)));
    addToast('Alert marked as resolved', 'success');
  };

  const addJob = (jobData: Omit<ConfigurationJob, 'id' | 'jobId' | 'createdAt'>) => {
    const newJob: ConfigurationJob = {
      ...jobData,
      id: `job-${Date.now()}`,
      jobId: `JOB-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    setJobs((prev) => [newJob, ...prev]);
    addToast(`Configuration job ${newJob.jobId} created`, 'success');
  };

  const cancelJob = (id: string) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status: 'Cancelled' } : j)));
    addToast('Job cancelled', 'warning');
  };

  const addUser = (userData: Omit<UserAccount, 'id' | 'createdAt' | 'lastLogin'>) => {
    const newUser: UserAccount = {
      ...userData,
      id: `u-${Date.now()}`,
      lastLogin: 'Never',
      createdAt: new Date().toISOString().substring(0, 10)
    };
    setUsers((prev) => [...prev, newUser]);
    addToast(`User ${newUser.name} created`, 'success');
  };

  const updateUserStatus = (id: string, status: 'Active' | 'Inactive') => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
    addToast('User status updated', 'success');
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    addToast('User account removed', 'info');
  };

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    addToast('System settings saved successfully', 'success');
  };

  return (
    <NMSContext.Provider
      value={{
        devices,
        interfaces,
        vlans,
        macTable,
        alerts,
        jobs,
        logs,
        users,
        roles,
        settings,
        darkMode,
        toasts,
        toggleDarkMode,
        addToast,
        removeToast,
        addDevice,
        updateDevice,
        deleteDevice,
        testConnectivity,
        discoverDevice,
        updateInterfaceStatus,
        updateInterfaceVlan,
        updateInterfaceDescription,
        addVlan,
        deleteVlan,
        acknowledgeAlert,
        resolveAlert,
        addJob,
        cancelJob,
        addUser,
        updateUserStatus,
        deleteUser,
        updateSettings
      }}
    >
      {children}
    </NMSContext.Provider>
  );
};

export const useNMS = () => {
  const context = useContext(NMSContext);
  if (!context) {
    throw new Error('useNMS must be used within an NMSProvider');
  }
  return context;
};
