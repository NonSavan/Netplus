# NetPulse Enterprise Network Management System (NMS)

NetPulse Enterprise NMS is a professional, modern enterprise-grade Network Management System web application designed for monitoring, configuring, and controlling physical Cisco network devices.

## Features & Architecture

### 1. Dark NOC Theme & UI Design
- Dark navy and charcoal aesthetic optimized for Network Operations Centers (NOC).
- Professional blue accents with distinct success (emerald), warning (amber), and critical (rose) status badges.
- Fully responsive layout with collapsible sidebar and dark/light mode switching.

### 2. Complete Navigation & Modules
- **Dashboard**: Overview summary cards, Network Traffic Chart (Chart.js), Device Availability, Device Distribution, Interface Status, Recent Activity, and Recent Alerts.
- **Devices**: Professional device inventory table with filtering by vendor, device type, and status. Add device modal with secure SNMPv3 and SSH parameters. Device discovery via LLDP/SNMP.
- **Device Details**: Comprehensive 8-tab profile (Overview, Interfaces, VLANs, MAC Addresses, Performance, Neighbors, Configuration, Logs).
- **Interfaces / Ports**: Visual 24-port switch front panel with graphical LED representations, port color states, detailed side panel, port enable/disable, VLAN configuration, and uplink safety warnings.
- **Network Topology**: Interactive graph visualization of core routers, switches, and edge firewalls.
- **VLAN Management**: 802.1Q VLAN configuration table and deployment modal.
- **MAC Address Table**: Layer 2 forwarding table with OUI vendor lookup and CSV export.
- **Network Traffic Monitoring**: Bandwidth analytics and throughput charts (Mbps/Gbps/TB).
- **Device Performance**: CPU utilization, memory allocation, and chassis temperature metrics.
- **Network Health**: Global availability score, ping latency, and node health summary.
- **Configuration Jobs**: Scheduled SSH/NETCONF script execution history and verification.
- **Alerts & Notifications**: Real-time SNMP traps and syslog alert acknowledgement/resolution.
- **Reports**: Executive summaries, SLA reports, and configuration audit documentation.
- **Administration**: User administration, Role-Based Access Control (RBAC), immutable audit logs, and system polling settings.

## Technology Stack
- **Frontend**: React 19, Vite, TypeScript, Tailwind CSS, Chart.js / react-chartjs-2, Lucide React icons, React Router DOM.
- **Backend Architecture**: Prepared for Laravel REST API, MySQL database, Laravel Sanctum authentication, SNMPv3 monitoring, and WebSocket real-time updates.

## Setup Instructions
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Build for production: `npm run build`
