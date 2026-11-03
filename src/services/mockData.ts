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

export const initialDevices: NetworkDevice[] = [
  {
    id: 'dev-1',
    name: 'COR-RTR-01',
    ipAddress: '10.100.0.1',
    vendor: 'Cisco',
    model: 'ASR 1001-X',
    deviceType: 'Router',
    location: 'DC-1 Core Rack A',
    status: 'online',
    lastSeen: 'Just now',
    serialNumber: 'FXS241289AQ',
    firmware: 'IOS-XE 17.06.03',
    uptime: '142 days, 08:21:12',
    cpuUsage: 34,
    memoryUsage: 58,
    temperature: 42,
    totalInterfaces: 12,
    activeInterfaces: 10,
    snmpVersion: 'v3',
    sshUser: 'admin_nms'
  },
  {
    id: 'dev-2',
    name: 'CORE-SW-01',
    ipAddress: '10.100.0.2',
    vendor: 'Cisco',
    model: 'Catalyst 9300-48P',
    deviceType: 'Switch',
    location: 'DC-1 Core Rack B',
    status: 'online',
    lastSeen: 'Just now',
    serialNumber: 'CAT9300X9921',
    firmware: 'IOS-XE 17.9.4',
    uptime: '89 days, 14:10:05',
    cpuUsage: 22,
    memoryUsage: 45,
    temperature: 39,
    totalInterfaces: 52,
    activeInterfaces: 44,
    snmpVersion: 'v3',
    sshUser: 'admin_nms'
  },
  {
    id: 'dev-3',
    name: 'DIST-SW-01',
    ipAddress: '10.100.1.10',
    vendor: 'Cisco',
    model: 'Catalyst 3850-24T',
    deviceType: 'Switch',
    location: 'Floor 2 IDF Room',
    status: 'online',
    lastSeen: '2 mins ago',
    serialNumber: 'FCW2134L08K',
    firmware: 'IOS-XE 16.12.08',
    uptime: '45 days, 02:15:30',
    cpuUsage: 18,
    memoryUsage: 62,
    temperature: 44,
    totalInterfaces: 28,
    activeInterfaces: 22,
    snmpVersion: 'v3',
    sshUser: 'admin_nms'
  },
  {
    id: 'dev-4',
    name: 'ACCESS-SW-02',
    ipAddress: '10.100.2.15',
    vendor: 'Cisco',
    model: 'Catalyst 2960X-48',
    deviceType: 'Switch',
    location: 'Floor 3 Server Room',
    status: 'warning',
    lastSeen: 'Just now',
    serialNumber: 'FOC220199ZB',
    firmware: 'IOS 15.2(7)E',
    uptime: '12 days, 19:44:11',
    cpuUsage: 78,
    memoryUsage: 89,
    temperature: 51,
    totalInterfaces: 50,
    activeInterfaces: 38,
    snmpVersion: 'v2c',
    sshUser: 'admin_nms'
  },
  {
    id: 'dev-5',
    name: 'EDGE-FW-01',
    ipAddress: '10.100.0.254',
    vendor: 'Palo Alto',
    model: 'PA-3220',
    deviceType: 'Firewall',
    location: 'DC-1 Perimeter',
    status: 'online',
    lastSeen: 'Just now',
    serialNumber: '012903004812',
    firmware: 'PAN-OS 10.2.3',
    uptime: '210 days, 11:05:40',
    cpuUsage: 41,
    memoryUsage: 70,
    temperature: 46,
    totalInterfaces: 8,
    activeInterfaces: 6,
    snmpVersion: 'v3',
    sshUser: 'admin_nms'
  },
  {
    id: 'dev-6',
    name: 'WLC-BUILDING-A',
    ipAddress: '10.100.5.5',
    vendor: 'Cisco',
    model: 'Catalyst 9800-40',
    deviceType: 'Access Point',
    location: 'DC-1 Wireless Control',
    status: 'offline',
    lastSeen: '4 hours ago',
    serialNumber: 'WL9800XYZ99',
    firmware: 'IOS-XE 17.3.4',
    uptime: '0 days, 00:00:00',
    cpuUsage: 0,
    memoryUsage: 0,
    totalInterfaces: 4,
    activeInterfaces: 0,
    snmpVersion: 'v3',
    sshUser: 'admin_nms'
  },
  {
    id: 'dev-7',
    name: 'DC-STORAGE-SRV',
    ipAddress: '10.100.10.50',
    vendor: 'HP Enterprise',
    model: 'ProLiant DL380 Gen10',
    deviceType: 'Server',
    location: 'DC-1 Rack C',
    status: 'online',
    lastSeen: 'Just now',
    serialNumber: 'MXQ849021P',
    firmware: 'iLO 5 v2.40',
    uptime: '320 days, 05:12:00',
    cpuUsage: 28,
    memoryUsage: 74,
    temperature: 35,
    totalInterfaces: 4,
    activeInterfaces: 4,
    snmpVersion: 'v3',
    sshUser: 'root'
  }
];

export const initialInterfaces: NetworkInterface[] = Array.from({ length: 24 }, (_, index) => {
  const portNum = index + 1;
  const isUp = portNum <= 20;
  const isUplink = portNum === 24 || portNum === 23;
  return {
    id: `int-${portNum}`,
    deviceId: 'dev-2',
    deviceName: 'CORE-SW-01',
    name: `Gi1/0/${portNum}`,
    description: isUplink ? `Uplink to Core Router ${portNum}` : portNum <= 10 ? `Access Port - Workstation ${portNum}` : `Server Link - Node ${portNum}`,
    adminStatus: 'up',
    opStatus: isUp ? 'connected' : 'disconnected',
    speed: isUplink ? '10 Gbps' : '1 Gbps',
    duplex: 'Full',
    vlan: portNum <= 10 ? 10 : portNum <= 18 ? 20 : 100,
    macAddress: `00:1a:2b:3c:4d:${portNum < 10 ? '0' + portNum : portNum.toString(16)}`,
    inputTraffic: isUp ? Number((Math.random() * 85 + 5).toFixed(1)) : 0,
    outputTraffic: isUp ? Number((Math.random() * 120 + 10).toFixed(1)) : 0,
    inputErrors: portNum === 4 ? 12 : 0,
    outputErrors: 0,
    lastStatusChange: '3 days ago',
    isUplink,
    neighborDevice: isUplink ? 'COR-RTR-01' : undefined
  };
});

export const initialVlans: VLAN[] = [
  { id: 'vlan-1', vlanId: 1, name: 'default', device: 'CORE-SW-01', assignedPortsCount: 2, type: 'Static', status: 'Active' },
  { id: 'vlan-10', vlanId: 10, name: 'CORP-USERS', device: 'CORE-SW-01', assignedPortsCount: 10, type: 'Static', status: 'Active' },
  { id: 'vlan-20', vlanId: 20, name: 'VOIP-PHONES', device: 'CORE-SW-01', assignedPortsCount: 8, type: 'Voice', status: 'Active' },
  { id: 'vlan-30', vlanId: 30, name: 'GUEST-WIFI', device: 'CORE-SW-01', assignedPortsCount: 4, type: 'Static', status: 'Active' },
  { id: 'vlan-100', vlanId: 100, name: 'SERVERS-DMZ', device: 'CORE-SW-01', assignedPortsCount: 6, type: 'Management', status: 'Active' },
  { id: 'vlan-200', vlanId: 200, name: 'STORAGE-SAN', device: 'CORE-SW-01', assignedPortsCount: 2, type: 'Static', status: 'Active' }
];

export const initialMacTable: MACTableEntry[] = [
  { id: 'mac-1', macAddress: '68:05:ca:12:34:56', vlan: 10, device: 'CORE-SW-01', interface: 'Gi1/0/1', vendor: 'Apple, Inc.', lastSeen: '1 min ago' },
  { id: 'mac-2', macAddress: '00:50:56:a1:b2:c3', vlan: 100, device: 'CORE-SW-01', interface: 'Gi1/0/11', vendor: 'VMware, Inc.', lastSeen: 'Just now' },
  { id: 'mac-3', macAddress: 'cc:2d:e0:ff:ee:aa', vlan: 20, device: 'CORE-SW-01', interface: 'Gi1/0/5', vendor: 'Cisco Systems', lastSeen: '5 mins ago' },
  { id: 'mac-4', macAddress: '14:98:77:22:33:44', vlan: 10, device: 'DIST-SW-01', interface: 'Gi0/2', vendor: 'Dell Inc.', lastSeen: '12 mins ago' },
  { id: 'mac-5', macAddress: 'f8:75:a4:99:88:77', vlan: 30, device: 'CORE-SW-01', interface: 'Gi1/0/18', vendor: 'Intel Corporate', lastSeen: 'Just now' }
];

export const initialAlerts: NetworkAlert[] = [
  {
    id: 'alt-1',
    severity: 'Critical',
    title: 'Device Unreachable',
    device: 'WLC-BUILDING-A',
    description: 'SNMP and ICMP heartbeat failed. Device did not respond to 4 consecutive probes.',
    timestamp: '2026-11-01 03:15:22',
    status: 'Active'
  },
  {
    id: 'alt-2',
    severity: 'Warning',
    title: 'High CPU Utilization',
    device: 'ACCESS-SW-02',
    interface: 'CPU',
    description: 'CPU utilization reached 78% over 15-minute moving average threshold.',
    timestamp: '2026-11-01 04:40:10',
    status: 'Active'
  },
  {
    id: 'alt-3',
    severity: 'Warning',
    title: 'Interface Input Errors',
    device: 'CORE-SW-01',
    interface: 'Gi1/0/4',
    description: 'CRC errors detected on interface Gi1/0/4 (12 error packets in last hour).',
    timestamp: '2026-11-01 01:20:00',
    status: 'Acknowledged'
  },
  {
    id: 'alt-4',
    severity: 'Info',
    title: 'Configuration Backup Completed',
    device: 'COR-RTR-01',
    description: 'Scheduled nightly running-config backup uploaded to TFTP server successfully.',
    timestamp: '2026-11-01 00:00:15',
    status: 'Resolved'
  }
];

export const initialJobs: ConfigurationJob[] = [
  {
    id: 'job-101',
    jobId: 'JOB-9821',
    device: 'CORE-SW-01',
    operation: 'Configure VLAN Access',
    requestedBy: 'alex.morgan',
    createdAt: '2026-11-01 02:10:00',
    status: 'Completed',
    result: 'Successfully applied VLAN 10 configuration to Gi1/0/12'
  },
  {
    id: 'job-102',
    jobId: 'JOB-9822',
    device: 'ACCESS-SW-02',
    operation: 'Enable Interface Description',
    requestedBy: 'sarah.connor',
    createdAt: '2026-11-01 03:45:12',
    status: 'Completed',
    result: 'Description updated: "Printer-Floor3-Admin"'
  },
  {
    id: 'job-103',
    jobId: 'JOB-9823',
    device: 'COR-RTR-01',
    operation: 'Update Device Configuration',
    requestedBy: 'david.chen',
    createdAt: '2026-11-01 04:00:00',
    status: 'Pending',
    result: 'Queued for execution window'
  }
];

export const initialLogs: AuditLog[] = [
  {
    id: 'log-1',
    user: 'alex.morgan (Super Admin)',
    action: 'Device Registration',
    targetDevice: 'COR-RTR-01',
    ipAddress: '192.168.1.50',
    timestamp: '2026-10-15 09:12:00',
    result: 'Success'
  },
  {
    id: 'log-2',
    user: 'sarah.connor (Admin)',
    action: 'Port Enable / Disable',
    targetDevice: 'CORE-SW-01',
    ipAddress: '192.168.1.88',
    timestamp: '2026-11-01 02:11:45',
    result: 'Success'
  },
  {
    id: 'log-3',
    user: 'david.chen (Operator)',
    action: 'VLAN Modification',
    targetDevice: 'CORE-SW-01',
    ipAddress: '192.168.1.102',
    timestamp: '2026-11-01 03:30:10',
    result: 'Success'
  },
  {
    id: 'log-4',
    user: 'system',
    action: 'SNMP Polling Timeout',
    targetDevice: 'WLC-BUILDING-A',
    ipAddress: '10.100.5.5',
    timestamp: '2026-11-01 03:15:00',
    result: 'Failed'
  }
];

export const initialUsers: UserAccount[] = [
  {
    id: 'u-1',
    name: 'Alex Morgan',
    email: 'alex.morgan@enterprise.net',
    role: 'Super Admin',
    status: 'Active',
    lastLogin: '10 mins ago',
    createdAt: '2024-01-10'
  },
  {
    id: 'u-2',
    name: 'Sarah Connor',
    email: 'sarah.connor@enterprise.net',
    role: 'Network Administrator',
    status: 'Active',
    lastLogin: '1 hour ago',
    createdAt: '2024-03-15'
  },
  {
    id: 'u-3',
    name: 'David Chen',
    email: 'david.chen@enterprise.net',
    role: 'Network Operator',
    status: 'Active',
    lastLogin: 'Yesterday',
    createdAt: '2024-06-20'
  },
  {
    id: 'u-4',
    name: 'Elena Rostova',
    email: 'elena.rostova@enterprise.net',
    role: 'Viewer',
    status: 'Inactive',
    lastLogin: '3 weeks ago',
    createdAt: '2024-09-01'
  }
];

export const initialRoles: RolePermission[] = [
  {
    id: 'role-1',
    role: 'Super Admin',
    permissions: {
      viewDashboard: true,
      viewDevices: true,
      addDevices: true,
      editDevices: true,
      deleteDevices: true,
      viewInterfaces: true,
      enableDisableInterfaces: true,
      manageVlans: true,
      viewTraffic: true,
      manageAlerts: true,
      viewReports: true,
      manageUsers: true,
      viewLogs: true
    }
  },
  {
    id: 'role-2',
    role: 'Network Administrator',
    permissions: {
      viewDashboard: true,
      viewDevices: true,
      addDevices: true,
      editDevices: true,
      deleteDevices: false,
      viewInterfaces: true,
      enableDisableInterfaces: true,
      manageVlans: true,
      viewTraffic: true,
      manageAlerts: true,
      viewReports: true,
      manageUsers: false,
      viewLogs: true
    }
  },
  {
    id: 'role-3',
    role: 'Network Operator',
    permissions: {
      viewDashboard: true,
      viewDevices: true,
      addDevices: false,
      editDevices: false,
      deleteDevices: false,
      viewInterfaces: true,
      enableDisableInterfaces: false,
      manageVlans: false,
      viewTraffic: true,
      manageAlerts: true,
      viewReports: true,
      manageUsers: false,
      viewLogs: false
    }
  },
  {
    id: 'role-4',
    role: 'Viewer',
    permissions: {
      viewDashboard: true,
      viewDevices: true,
      addDevices: false,
      editDevices: false,
      deleteDevices: false,
      viewInterfaces: true,
      enableDisableInterfaces: false,
      manageVlans: false,
      viewTraffic: true,
      manageAlerts: false,
      viewReports: true,
      manageUsers: false,
      viewLogs: false
    }
  }
];

export const initialSettings: SystemSettings = {
  systemName: 'NetPulse Enterprise NMS - Primary DC',
  timeZone: 'UTC (Coordinated Universal Time)',
  dateFormat: 'YYYY-MM-DD HH:mm:ss',
  language: 'English (US)',
  pollingInterval: 60,
  deviceTimeout: 15,
  monitoringRetention: 90,
  cpuWarningThreshold: 75,
  cpuCriticalThreshold: 90,
  emailNotifications: true,
  sessionTimeout: 30
};
