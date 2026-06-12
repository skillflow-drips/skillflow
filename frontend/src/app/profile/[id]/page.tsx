import React from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function PublicProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-[#0B0F1A] px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-12 md:flex-row md:items-start">
        <div className="flex h-32 w-32 items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] text-4xl font-black text-[#F9FAFB]">
          AR
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
            <h1 className="text-4xl font-bold text-[#F9FAFB]">Ana R.</h1>
            <Badge variant="success">Verified Expert</Badge>
          </div>
          <p className="mb-6 max-w-2xl text-lg leading-relaxed text-[#64748B]">
            Soroban Specialist & Full-Stack Architect. Helping protocols scale on Stellar with high-fidelity escrow systems.
          </p>
          <div className="flex justify-center gap-8 border-t border-[rgba(255,255,255,0.08)] pt-6 md:justify-start">
            <div><p className="text-xl font-bold text-[#F9FAFB]">4.9</p><p className="text-[10px] uppercase text-[#64748B]">Rating</p></div>
            <div><p className="text-xl font-bold text-[#F9FAFB]">24</p><p className="text-[10px] uppercase text-[#64748B]">Gigs</p></div>
            <div><p className="text-xl font-bold text-[#F9FAFB]">$18k</p><p className="text-[10px] uppercase text-[#64748B]">Earned</p></div>
          </div>
        </div>
        <Button variant="primary">Hire Talent</Button>
      </div>
    </div>
  );
}
