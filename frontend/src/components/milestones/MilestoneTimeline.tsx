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
      <h3 className="text-xl font-bold text-[#F9FAFB]">Project Milestones</h3>
      <div className="relative ml-3 space-y-8 border-l-2 border-[rgba(255,255,255,0.08)] pl-8">
        {milestones.map((m, i) => (
          <div key={m.id} className="relative">
            <div className="absolute -left-[42px] mt-1 h-5 w-5 rounded-full border-4 border-[#111827] bg-[#7C3AED]" />
            <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-6">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-[#F9FAFB]">{m.title}</h4>
                <Badge variant={m.status === 'APPROVED' ? 'success' : 'warning'}>
                  {m.status}
                </Badge>
              </div>
              <p className="mt-2 font-mono text-sm text-[#F9FAFB]">{m.amount} USDC</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
