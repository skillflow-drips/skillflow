import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WalletState {
  address: string | null;
  tokenBalance: number;
  setAddress: (address: string | null) => void;
  setBalance: (balance: number) => void;
  logout: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      address: null,
      tokenBalance: 0,
      setAddress: (address) => set({ address }),
      setBalance: (tokenBalance) => set({ tokenBalance }),
      logout: () => set({ address: null, tokenBalance: 0 }),
    }),
    { name: 'skillflow-session' }
  )
);
