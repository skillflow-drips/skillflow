import React from 'react';
import Badge from '../ui/Badge';

interface Milestone {
  id: string;
  title: string;
  amount: string;
  status: 'PENDING' | 'SUBMITTED' | 'APPROVED' | 'DISPUTED';
}

export default function MilestoneTimeline({ milestones }: { milestones: Milestone[] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">Project Milestones</h3>
      <div className="relative border-l-2 border-white/5 ml-3 pl-8 space-y-8">
        {milestones.map((m, i) => (
          <div key={m.id} className="relative">
            <div className="absolute -left-[42px] mt-1 w-5 h-5 rounded-full border-4 border-slate-950 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-white">{m.title}</h4>
                <Badge variant={m.status === 'APPROVED' ? 'success' : 'warning'}>
                  {m.status}
                </Badge>
              </div>
              <p className="mt-2 text-indigo-400 font-mono text-sm">{m.amount} USDC</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
