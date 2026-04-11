import { useState, useCallback } from 'react';
import { useUserStore } from '@/store/useUserStore';

export const useWallet = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { setAddress, logout } = useUserStore();

  const connect = useCallback(async (publicKey: string) => {
    setIsConnecting(true);
    try {
      setAddress(publicKey);
      // Logic for triggering the SEP-10 handshake would go here
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  }, [setAddress]);

  return { connect, logout, isConnecting };
};
