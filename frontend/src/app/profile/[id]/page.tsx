import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Star, ShieldCheck, Globe } from 'lucide-react';

export default function PublicProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-12 px-6">
      <div className="glass p-12 rounded-[3rem] flex flex-col md:flex-row gap-12 items-center md:items-start mb-12">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 p-1">
          <div className="w-full h-full rounded-full bg-[#030712] flex items-center justify-center text-4xl">👤</div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
            <h1 className="text-4xl font-bold text-white">Ana R.</h1>
            <Badge variant="success">Verified Expert</Badge>
          </div>
          <p className="text-gray-400 text-lg mb-6 leading-relaxed max-w-2xl">
            Soroban Specialist & Full-Stack Architect. Helping protocols scale on Stellar with high-fidelity escrow systems.
          </p>
          <div className="flex justify-center md:justify-start gap-8 border-t border-white/10 pt-6">
            <div><p className="text-blue-400 font-bold text-xl">4.9</p><p className="text-[10px] text-gray-500 uppercase">Rating</p></div>
            <div><p className="text-white font-bold text-xl">24</p><p className="text-[10px] text-gray-500 uppercase">Gigs</p></div>
            <div><p className="text-white font-bold text-xl">$18k</p><p className="text-[10px] text-gray-500 uppercase">Earned</p></div>
          </div>
        </div>
        <Button variant="primary">Hire Talent</Button>
      </div>
    </div>
  );
}
