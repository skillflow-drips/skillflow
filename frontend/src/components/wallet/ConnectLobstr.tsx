import React from 'react';
import Button from '../ui/Button';
import WalletConnectModal from './WalletConnectModal';

export default function ConnectLobstr() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Connect wallet
      </Button>
      <WalletConnectModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
