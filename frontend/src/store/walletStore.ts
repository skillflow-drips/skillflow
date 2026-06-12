import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WalletState {
  role: 'client' | 'freelancer' | null;
  isConnected: boolean;
  address: string | null;
  displayAddress: string | null;
  walletName: string | null;
  walletIcon: string | null;
  tokenBalance: number;
  setWallet: (wallet: {
    address?: string | null;
    displayAddress: string;
    walletName: string;
    walletIcon: string;
  }) => void;
  setBalance: (balance: number) => void;
  setRole: (role: 'client' | 'freelancer') => void;
  logout: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      role: null,
      isConnected: false,
      address: null,
      displayAddress: null,
      walletName: null,
      walletIcon: null,
      tokenBalance: 0,
      setWallet: (wallet) => set({ ...wallet, address: wallet.address || null, isConnected: true }),
      setBalance: (tokenBalance) => set({ tokenBalance }),
      setRole: (role) => set({ role }),
      logout: () => set({
        role: null,
        isConnected: false,
        address: null,
        displayAddress: null,
        walletName: null,
        walletIcon: null,
        tokenBalance: 0,
      }),
    }),
    { name: 'skillflow-session' }
  )
);
