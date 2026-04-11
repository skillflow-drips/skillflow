import React from 'react';
import { Button } from '@/components/ui/Button';
import { CreditCard, Zap } from 'lucide-react';

export default function TokenShopPage() {
  const tiers = [
    { amount: '1', credits: '5', label: 'Starter Pack' },
    { amount: '5', credits: '30', label: 'Pro Pack (Bonus 5)', popular: true },
    { amount: '10', credits: '70', label: 'Elite Pack (Bonus 20)' },
  ];

  return (
    <div className="container mx-auto py-16 px-6">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-white mb-4">Procure Credits</h1>
        <p className="text-gray-400">README Baseline: 1 USDC = 5 Application Credits.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <div key={tier.amount} className={`glass p-8 rounded-[2rem] relative \${tier.popular ? 'border-blue-500/50 shadow-blue-500/10 shadow-2xl' : ''}`}>
            {tier.popular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">Most Popular</div>}
            <h3 className="text-xl font-bold text-white mb-2">{tier.label}</h3>
            <p className="text-4xl font-black text-white mb-8">\${tier.amount} <span className="text-sm font-normal text-gray-500">USDC</span></p>
            <div className="flex items-center gap-4 text-blue-400 font-bold mb-8">
              <Zap className="w-5 h-5" />
              <span>{tier.credits} Credits</span>
            </div>
            <Button variant={tier.popular ? 'primary' : 'secondary'} className="w-full">Purchase Package</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
