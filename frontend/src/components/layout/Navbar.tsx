import React from 'react';
import Link from 'next/link';
import { useWallet } from '@/hooks/useWallet';
import { Button } from '../ui/Button';

export const Navbar = () => {
  const { connect, address } = useWallet();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-xl px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
        SkillFlow
      </Link>
      
      <div className="flex gap-8 items-center">
        <Link href="/jobs" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Find Work</Link>
        <Link href="/dashboard" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Dashboard</Link>
        
        {address ? (
          <div className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-mono">
            {address.slice(0, 4)}...{address.slice(-4)}
          </div>
        ) : (
          <Button onClick={() => connect('G...')} variant="primary">Connect Wallet</Button>
        )}
      </div>
    </nav>
  );
};
