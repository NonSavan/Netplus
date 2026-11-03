/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NMSProvider } from './context/NMSContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { DevicesPage } from './pages/DevicesPage';
import { DeviceDetailPage } from './pages/DeviceDetailPage';
import { InterfacesPage } from './pages/InterfacesPage';
import { TopologyPage } from './pages/TopologyPage';
import { VlansPage } from './pages/VlansPage';
import { MacTablePage } from './pages/MacTablePage';
import { TrafficPage } from './pages/TrafficPage';
import { PerformancePage } from './pages/PerformancePage';
import { HealthPage } from './pages/HealthPage';
import { JobsPage } from './pages/JobsPage';
import { AlertsPage } from './pages/AlertsPage';
import { ReportsPage } from './pages/ReportsPage';
import { UsersPage } from './pages/UsersPage';
import { RolesPage } from './pages/RolesPage';
import { LogsPage } from './pages/LogsPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <NMSProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/network/devices" element={<DevicesPage />} />
            <Route path="/network/devices/:id" element={<DeviceDetailPage />} />
            <Route path="/network/interfaces" element={<InterfacesPage />} />
            <Route path="/network/topology" element={<TopologyPage />} />
            <Route path="/network/vlans" element={<VlansPage />} />
            <Route path="/network/mac-table" element={<MacTablePage />} />
            <Route path="/monitoring/traffic" element={<TrafficPage />} />
            <Route path="/monitoring/performance" element={<PerformancePage />} />
            <Route path="/monitoring/health" element={<HealthPage />} />
            <Route path="/management/jobs" element={<JobsPage />} />
            <Route path="/management/alerts" element={<AlertsPage />} />
            <Route path="/management/reports" element={<ReportsPage />} />
            <Route path="/admin/users" element={<UsersPage />} />
            <Route path="/admin/roles" element={<RolesPage />} />
            <Route path="/admin/logs" element={<LogsPage />} />
            <Route path="/admin/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NMSProvider>
  );
}
