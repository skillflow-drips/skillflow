import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-12 px-6 flex flex-col lg:flex-row gap-12">
      <div className="flex-1">
        <header className="mb-8">
          <Badge variant="success" className="mb-4">Fully Funded</Badge>
          <h1 className="text-5xl font-extrabold text-white mb-4">Soroban Escrow Protocol</h1>
          <p className="text-xl text-gray-400">Implement a multi-signature escrow system with milestone gates.</p>
        </header>

        <section className="glass p-8 rounded-3xl mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Project Roadmap</h2>
          <div className="space-y-4">
            <div className="flex justify-between p-4 bg-white/5 rounded-xl border border-white/5">
              <span>Foundation & Types</span>
              <span className="text-blue-400">$500 USDC</span>
            </div>
            <div className="flex justify-between p-4 bg-white/5 rounded-xl border border-white/5">
              <span>Smart Contract Implementation</span>
              <span className="text-blue-400">$2000 USDC</span>
            </div>
          </div>
        </section>
      </div>

      <aside className="w-full lg:w-80 space-y-6">
        <div className="glass p-6 rounded-3xl sticky top-24">
          <p className="text-sm text-gray-400 mb-2">Total Project Budget</p>
          <p className="text-4xl font-bold text-white mb-6">$2,500 <span className="text-sm text-gray-400">USDC</span></p>
          <Button variant="primary" className="w-full h-12">Apply for this Job</Button>
          <p className="text-[10px] text-center text-gray-500 mt-4 leading-relaxed">
            Applying costs 5 credits (1 USDC). No fee if hired.
          </p>
        </div>
      </aside>
    </div>
  );
}
