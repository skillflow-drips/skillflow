import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Badge } from '@/components/ui/Badge';

export default function FreelancerDashboard() {
  const activeGigs = [
    { id: '1', title: 'Soroban Escrow Protocol', client: 'Web3Foundation', amount: '2500', progression: '40%' },
  ];

  return (
    <div className="flex bg-[#030712] min-h-screen">
      <Sidebar />
      <main className="flex-1 p-12">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">Work Management</h1>
          <p className="text-gray-400">Manage your active projects and milestone submissions.</p>
        </header>

        <section className="grid grid-cols-1 gap-6">
          {activeGigs.map(gig => (
            <div key={gig.id} className="glass p-8 rounded-3xl flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{gig.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{gig.client}</p>
                <Badge variant="info">In Progress</Badge>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-400 mb-1">${gig.amount}</p>
                <p className="text-xs text-gray-500">Earnable</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
