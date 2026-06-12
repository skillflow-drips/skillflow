'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { isConnected as isLobstrConnected } from '@lobstrco/signer-extension-api';
import { ShieldCheck } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { StellarWallet, useWallet } from '@/hooks/useWallet';
import { useWalletStore } from '@/store/walletStore';

type WalletRow = StellarWallet & {
  installUrl?: string;
};

const wallets: WalletRow[] = [
  {
    id: 'lobstr',
    name: 'Lobstr',
    icon: '/wallets/lobstr.svg',
    type: 'mobile',
    url: 'https://lobstr.co/',
    installUrl: 'https://lobstr.co/signer-extension/',
  },
  {
    id: 'freighter',
    name: 'Freighter',
    icon: '/wallets/freighter.svg',
    type: 'browser',
    url: 'https://freighter.app/',
  },
  {
    id: 'albedo',
    name: 'Albedo',
    icon: '/wallets/albedo.svg',
    type: 'browser',
    url: 'https://albedo.link/',
  },
  {
    id: 'solar',
    name: 'Solar Wallet',
    icon: '/wallets/solar.svg',
    type: 'mobile',
    url: 'https://solarwallet.io/',
  },
  {
    id: 'rabet',
    name: 'Rabet',
    icon: '/wallets/rabet.svg',
    type: 'extension',
    url: 'https://rabet.io/',
  },
];

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  role?: 'client' | 'freelancer' | null;
  redirectTo?: string;
}

function WalletIcon({ wallet }: { wallet: StellarWallet }) {
  return (
    <img
      src={wallet.icon}
      alt={`${wallet.name} icon`}
      className="h-11 w-11 shrink-0 object-contain"
    />
  );
}

export default function WalletConnectModal({ isOpen, onClose, role, redirectTo }: WalletConnectModalProps) {
  const router = useRouter();
  const { connect, isConnecting } = useWallet();
  const { setRole } = useWalletStore();
  const [message, setMessage] = React.useState<string | null>(null);
  const [detectedWallets, setDetectedWallets] = React.useState<Record<StellarWallet['id'], boolean>>({
    lobstr: false,
    freighter: false,
    albedo: false,
    solar: false,
    rabet: false,
  });

  React.useEffect(() => {
    let mounted = true;

    const detectWallets = async () => {
      const lobstrDetected = await isLobstrConnected().catch(() => false);

      if (!mounted) return;

      setDetectedWallets({
        lobstr: lobstrDetected,
        freighter: Boolean(window.freighterApi),
        albedo: false,
        solar: false,
        rabet: Boolean(window.rabet),
      });
    };

    if (isOpen) {
      detectWallets();
    }

    return () => {
      mounted = false;
    };
  }, [isOpen]);

  const handleConnect = async (wallet: WalletRow) => {
    setMessage(null);

    try {
      await connect(wallet);
      if (role) {
        setRole(role);
      }
      onClose();
      router.push(redirectTo || (role ? `/dashboard?role=${role}` : '/dashboard'));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Wallet connection failed.');
    }
  };

  const openInstallPage = (wallet: WalletRow) => {
    window.open(wallet.installUrl || wallet.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Connect a wallet">
      <div className="space-y-5">
        <div>
          <p className="text-sm leading-6 text-[#64748B]">
            Detected Stellar wallets can connect. Unavailable wallets show as not installed.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#14B6E7]/25 bg-[#14B6E7]/10 px-3 py-1.5 text-xs font-semibold text-[#14B6E7]">
            <span className="h-2 w-2 rounded-full bg-[#10B981]" />
            Stellar Mainnet
          </div>
        </div>

        <section className="overflow-hidden rounded-[16px] border border-[rgba(255,255,255,0.08)]">
          {wallets.map((wallet, index) => {
            const detected = detectedWallets[wallet.id];

            return (
              <div
                key={wallet.id}
                className={`flex items-center gap-4 bg-[#111827] px-4 py-3.5 ${index > 0 ? 'border-t border-[rgba(255,255,255,0.08)]' : ''}`}
              >
                <WalletIcon wallet={wallet} />
                <div className="min-w-0 flex-1">
                  <p className={`truncate text-sm font-semibold ${detected ? 'text-[#F9FAFB]' : 'text-[#64748B]'}`}>
                    {wallet.name}
                  </p>
                  <p className="mt-1 truncate text-xs text-[#64748B]">{wallet.url.replace('https://', '')}</p>
                </div>
                {detected ? (
                  <button
                    type="button"
                    disabled={isConnecting}
                    onClick={() => handleConnect(wallet)}
                    className="rounded-[10px] bg-[#7C3AED] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#7C3AED]/90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Connect
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => openInstallPage(wallet)}
                    className="rounded-full border border-[rgba(255,255,255,0.08)] px-4 py-2 text-xs font-bold text-[#64748B] transition hover:bg-[#111827] hover:text-[#F9FAFB]"
                  >
                    Not installed
                  </button>
                )}
              </div>
            );
          })}
        </section>

        {message && (
          <div className="rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[#111827] px-4 py-3 text-sm leading-6 text-[#64748B]">
            {message}
          </div>
        )}

        <footer className="flex items-center gap-2 border-t border-[rgba(255,255,255,0.08)] pt-4 text-xs text-[#64748B]">
          <ShieldCheck className="h-4 w-4" />
          Non-custodial · funds stay in your wallet
        </footer>
      </div>
    </Modal>
  );
}
