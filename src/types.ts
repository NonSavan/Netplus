export type DeviceType = 'Switch' | 'Router' | 'Access Point' | 'Firewall' | 'Server';
export type DeviceStatus = 'online' | 'offline' | 'warning' | 'critical';
export type Vendor = 'Cisco' | 'Juniper' | 'Aruba' | 'HP Enterprise' | 'Palo Alto';

export interface NetworkDevice {
  id: string;
  name: string;
  ipAddress: string;
  vendor: Vendor;
  model: string;
  deviceType: DeviceType;
  location: string;
  status: DeviceStatus;
  lastSeen: string;
  serialNumber?: string;
  firmware?: string;
  uptime: string;
  cpuUsage: number;
  memoryUsage: number;
  temperature?: number;
  totalInterfaces: number;
  activeInterfaces: number;
  snmpVersion: string;
  sshUser: string;
}

export interface NetworkInterface {
  id: string;
  deviceId: string;
  deviceName: string;
  name: string; // e.g., Gi1/0/1
  description: string;
  adminStatus: 'up' | 'down';
  opStatus: 'connected' | 'disconnected' | 'error';
  speed: '1 Gbps' | '10 Gbps' | '100 Mbps' | '40 Gbps';
  duplex: 'Full' | 'Half' | 'Auto';
  vlan: number;
  macAddress: string;
  inputTraffic: number; // Mbps
  outputTraffic: number; // Mbps
  inputErrors: number;
  outputErrors: number;
  lastStatusChange: string;
  isUplink?: boolean;
  neighborDevice?: string;
}

export interface VLAN {
  id: string;
  vlanId: number;
  name: string;
  device: string;
  assignedPortsCount: number;
  type: 'Static' | 'Dynamic' | 'Voice' | 'Management';
  status: 'Active' | 'Suspended';
}

export interface MACTableEntry {
  id: string;
  macAddress: string;
  vlan: number;
  device: string;
  interface: string;
  vendor: string;
  lastSeen: string;
}

export interface NetworkAlert {
  id: string;
  severity: 'Critical' | 'Warning' | 'Info';
  title: string;
  device: string;
  interface?: string;
  description: string;
  timestamp: string;
  status: 'Active' | 'Acknowledged' | 'Resolved';
}

export interface ConfigurationJob {
  id: string;
  jobId: string;
  device: string;
  operation: string;
  requestedBy: string;
  createdAt: string;
  status: 'Pending' | 'Running' | 'Completed' | 'Failed' | 'Cancelled';
  result: string;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  targetDevice: string;
  ipAddress: string;
  timestamp: string;
  result: 'Success' | 'Failed' | 'Warning';
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Network Administrator' | 'Network Operator' | 'Viewer';
  status: 'Active' | 'Inactive';
  lastLogin: string;
  createdAt: string;
}

export interface RolePermission {
  id: string;
  role: string;
  permissions: {
    viewDashboard: boolean;
    viewDevices: boolean;
    addDevices: boolean;
    editDevices: boolean;
    deleteDevices: boolean;
    viewInterfaces: boolean;
    enableDisableInterfaces: boolean;
    manageVlans: boolean;
    viewTraffic: boolean;
    manageAlerts: boolean;
    viewReports: boolean;
    manageUsers: boolean;
    viewLogs: boolean;
  };
}

export interface SystemSettings {
  systemName: string;
  timeZone: string;
  dateFormat: string;
  language: string;
  pollingInterval: number; // seconds
  deviceTimeout: number; // seconds
  monitoringRetention: number; // days
  cpuWarningThreshold: number;
  cpuCriticalThreshold: number;
  emailNotifications: boolean;
  sessionTimeout: number; // minutes
}
