import React from 'react';
import Button from '../ui/Button';

export default function ConnectLobstr() {
  const [connecting, setConnecting] = React.useState(false);

  const handleConnect = () => {
    setConnecting(true);
    // Simulate connection
    setTimeout(() => setConnecting(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl max-w-sm mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-white">Secure Access</h3>
      <p className="text-center text-slate-400 text-sm">
        Connect your Lobstr wallet to sign milestones and manage your funds securely using Stellar SEP-10.
      </p>
      <Button 
        variant="primary" 
        className="w-full mt-2"
        onClick={handleConnect}
        disabled={connecting}
      >
        {connecting ? 'Requesting Challenge...' : 'Connect Lobstr'}
      </Button>
    </div>
  );
}
