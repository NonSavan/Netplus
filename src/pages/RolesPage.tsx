import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';
import { useNMS } from '../context/NMSContext';

export const RolesPage: React.FC = () => {
  const { roles, darkMode } = useNMS();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Roles & Permissions (RBAC)</h2>
        <p className="text-sm text-slate-400">Configure granular role privileges and access control matrix.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {roles.map((r) => (
          <div key={r.id} className={`p-6 rounded-2xl border space-y-4 ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base">{r.role}</h3>
            </div>
            <div className="space-y-2.5 text-xs">
              {Object.entries(r.permissions).map(([key, allowed]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className={`font-bold ${allowed ? 'text-emerald-400' : 'text-slate-600'}`}>
                    {allowed ? 'Allowed' : 'Denied'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
