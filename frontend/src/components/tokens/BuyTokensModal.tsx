import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

export default function BuyTokensModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Buy Platform Tokens">
      <div className="space-y-6">
        <p className="text-[#64748B]">
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
                  ? 'border-[#7C3AED] bg-[#111827]'
                  : 'border-[rgba(255,255,255,0.08)] bg-[#111827] hover:bg-[#111827]'
              }`}
            >
              {tier.popular && (
                <span className="absolute right-0 top-0 bg-[#7C3AED] px-3 py-1 text-[10px] font-bold text-white">
                  POPULAR
                </span>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-bold text-[#F9FAFB]">{tier.tokens} Tokens</h4>
                  <p className="text-[#64748B]">{tier.price} USDC</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center text-[#64748B] opacity-0 transition-opacity group-hover:opacity-100">
                  →
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-4 text-xs text-[#64748B]">
          Payments are processed on Stellar Mainnet. Keep USDC in your connected wallet.
        </div>
        
        <Button className="w-full" variant="primary">
          Continue to Payment
        </Button>
      </div>
    </Modal>
  );
}
