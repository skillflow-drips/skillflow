'use client';

import React from 'react';
import Link from 'next/link';
import { LogOut, Wallet } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import WalletConnectModal from '../wallet/WalletConnectModal';

const SkillFlowMark = () => (
  <span className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[rgba(255,255,255,0.1)] bg-[#0B0F1A]">
    <svg className="h-6 w-6" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M20.8 7.2H10.7C8.3 7.2 6.8 8.55 6.8 10.45C6.8 12.35 8.18 13.25 10.55 13.72L17.15 15.02C19.58 15.5 21 16.52 21 18.72C21 20.98 19.18 22.55 16.45 22.55H6.9"
        stroke="#F9FAFB"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M8.2 5.45L6.25 7.4L8.2 9.35M19.8 24.55L21.75 22.6L19.8 20.65"
        stroke="#10B981"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="21" cy="7.2" r="2" fill="#7C3AED" />
    </svg>
  </span>
);

export const Navbar = () => {
  const [isWalletOpen, setIsWalletOpen] = React.useState(false);
  const { isConnected, displayAddress, walletName, walletIcon, logout } = useWallet();

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-[rgba(255,255,255,0.08)] bg-[#0B0F1A]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-3" aria-label="SkillFlow home">
            <SkillFlowMark />
            <span className="leading-none">
              <span className="block text-[19px] font-black tracking-[-0.03em] text-[#F9FAFB]">SkillFlow</span>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#14B6E7]">Stellar Escrow</span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            <Link href="/jobs" className="text-sm font-semibold text-[#64748B] hover:text-[#F9FAFB]">Find work</Link>
            <Link href="/tokens" className="text-sm font-semibold text-[#64748B] hover:text-[#F9FAFB]">Tokens</Link>
            <Link href="/dashboard" className="text-sm font-semibold text-[#64748B] hover:text-[#F9FAFB]">Dashboard</Link>
          </div>

          <div className="flex items-center gap-3">
            {isConnected ? (
              <div className="flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] py-1 pl-2 pr-2">
                {walletIcon && <img src={walletIcon} alt="" className="h-7 w-7 object-contain" />}
                <div className="hidden text-left sm:block">
                  <p className="text-xs font-bold text-[#F9FAFB]">{walletName}</p>
                  <p className="font-mono text-[11px] text-[#64748B]">{displayAddress}</p>
                </div>
                <button
                  aria-label="Disconnect wallet"
                  className="rounded-full p-2 text-[#64748B] hover:bg-[#0B0F1A] hover:text-[#F9FAFB]"
                  onClick={logout}
                  type="button"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsWalletOpen(true)}
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#7C3AED] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#7C3AED]/90"
              >
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </nav>
      <WalletConnectModal isOpen={isWalletOpen} onClose={() => setIsWalletOpen(false)} />
    </>
  );
};
