import { useState, useCallback } from 'react';
import { getPublicKey as getLobstrPublicKey } from '@lobstrco/signer-extension-api';
import { useWalletStore } from '@/store/walletStore';

export interface StellarWallet {
  id: 'albedo' | 'freighter' | 'solar' | 'lobstr' | 'rabet';
  name: string;
  icon: string;
  type: 'browser' | 'mobile' | 'extension';
  url: string;
}

type FreighterApi = {
  getPublicKey?: () => Promise<string>;
  getAddress?: () => Promise<{ address: string } | string>;
  requestAccess?: () => Promise<{ address: string } | string>;
  isConnected?: () => Promise<boolean>;
};

type RabetApi = {
  connect?: () => Promise<{ publicKey?: string; address?: string } | string>;
  getPublicKey?: () => Promise<string>;
};

declare global {
  interface Window {
    freighterApi?: FreighterApi;
    rabet?: RabetApi;
  }
}

const walletInstallUrls: Record<StellarWallet['id'], string> = {
  albedo: 'https://albedo.link/',
  freighter: 'https://freighter.app/',
  solar: 'https://solarwallet.io/',
  lobstr: 'https://lobstr.co/signer-extension/',
  rabet: 'https://rabet.io/',
};

const normalizeWalletAddress = (value?: { address?: string; publicKey?: string } | string) => {
  if (!value) return null;
  if (typeof value === 'string') return value;
  return value.address || value.publicKey || null;
};

const openWalletPopup = (wallet: StellarWallet) => {
  const width = 460;
  const height = 720;
  const left = Math.max((window.screen.width - width) / 2, 0);
  const top = Math.max((window.screen.height - height) / 2, 0);
  const popup = window.open(
    walletInstallUrls[wallet.id] || wallet.url,
    `${wallet.id}-wallet-connect`,
    `popup=yes,width=${width},height=${height},left=${left},top=${top},noopener,noreferrer`,
  );

  if (!popup) {
    throw new Error(`Popup blocked. Allow popups for SkillFlow, then connect ${wallet.name} again.`);
  }
};

export const useWallet = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { isConnected, address, displayAddress, walletName, walletIcon, setWallet, logout } = useWalletStore();

  const connect = useCallback(async (wallet: StellarWallet) => {
    setIsConnecting(true);
    try {
      let publicKey: string | null = null;

      if (wallet.id === 'freighter') {
        const api = window.freighterApi;
        if (!api) {
          openWalletPopup(wallet);
          throw new Error('Freighter extension was not detected. Install it, then connect again.');
        }

        const maybeAddress = api.requestAccess
          ? await api.requestAccess()
          : api.getAddress
            ? await api.getAddress()
            : undefined;

        publicKey = normalizeWalletAddress(maybeAddress);
        if (!publicKey && api.getPublicKey) {
          publicKey = await api.getPublicKey();
        }
      } else if (wallet.id === 'rabet') {
        const api = window.rabet;
        if (!api) {
          openWalletPopup(wallet);
          throw new Error('Rabet extension was not detected. Install it, then connect again.');
        }

        const maybeAddress = api.connect ? await api.connect() : undefined;
        publicKey = normalizeWalletAddress(maybeAddress);
        if (!publicKey && api.getPublicKey) {
          publicKey = await api.getPublicKey();
        }
      } else if (wallet.id === 'lobstr') {
        publicKey = await getLobstrPublicKey();
      } else {
        openWalletPopup(wallet);
        throw new Error(`${wallet.name} is not detected in this browser.`);
      }

      if (!publicKey) {
        throw new Error(`${wallet.name} did not return a public key.`);
      }

      setWallet({
        address: publicKey,
        displayAddress: `${publicKey.slice(0, 8)}...${publicKey.slice(-8)}`,
        walletName: wallet.name,
        walletIcon: wallet.icon,
      });

      return publicKey;
    } catch (error) {
      throw error;
    } finally {
      setIsConnecting(false);
    }
  }, [setWallet]);

  return { isConnected, address, displayAddress, walletName, walletIcon, connect, logout, isConnecting };
};
