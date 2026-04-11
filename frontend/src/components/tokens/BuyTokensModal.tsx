import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

export default function BuyTokensModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Buy Platform Tokens">
      <div className="space-y-6">
        <p className="text-slate-400">
          Apply for jobs and build your reputation. 1 USDC gets you 5 application tokens.
        </p>
        
        <div className="grid grid-cols-1 gap-4">
          {[
            { tokens: 5, price: 1, popular: false },
            { tokens: 25, price: 5, popular: true },
            { tokens: 60, price: 10, popular: false }
          ].map((tier) => (
            <button 
              key={tier.tokens}
              className={`p-6 rounded-2xl border transition-all text-left relative overflow-hidden group ${
                tier.popular 
                  ? 'border-indigo-500 bg-indigo-500/10' 
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              {tier.popular && (
                <span className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </span>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-bold text-white">{tier.tokens} Tokens</h4>
                  <p className="text-slate-400">{tier.price} USDC</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/70">
          Note: Payments are processed on the Stellar network. Ensure you have USDC in your Lobstr wallet.
        </div>
        
        <Button className="w-full" variant="primary">
          Continue to Payment
        </Button>
      </div>
    </Modal>
  );
}
