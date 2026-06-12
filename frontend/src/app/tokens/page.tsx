import React from 'react';
import { CreditCard, ShieldCheck, Zap } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const tiers = [
  { amount: '1', credits: '5', label: 'Starter', note: 'Best for first applications' },
  { amount: '5', credits: '30', label: 'Builder', note: 'Includes 5 bonus tokens', popular: true },
  { amount: '10', credits: '70', label: 'Studio', note: 'Includes 20 bonus tokens' },
];

export default function TokenShopPage() {
  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-5 py-10">
        <section className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <Badge variant="info" className="mb-5 w-fit">Application tokens</Badge>
              <h1 className="text-4xl font-black tracking-tight text-[#F9FAFB] md:text-5xl">
                Buy tokens with USDC, apply with intent.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#64748B]">
                SkillFlow uses low-cost application tokens to reduce spam and keep clients reviewing serious proposals.
              </p>
            </div>
            <div className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-6 text-[#F9FAFB]">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-[#10B981]" />
                <p className="font-bold">1 USDC = 5 tokens</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#64748B]">
                Payments are signed in your Stellar wallet. SkillFlow never takes custody of private keys.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.amount}
              className={`relative rounded-[20px] border bg-[#0B0F1A] p-7 ${tier.popular ? 'border-[#7C3AED]' : 'border-[rgba(255,255,255,0.08)]'}`}
            >
              {tier.popular && (
                <div className="absolute right-6 top-6 rounded-full bg-[#7C3AED] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  Most useful
                </div>
              )}
              <CreditCard className="h-7 w-7 text-[#F9FAFB]" />
              <h3 className="mt-5 text-2xl font-black text-[#F9FAFB]">{tier.label}</h3>
              <p className="mt-2 text-sm text-[#64748B]">{tier.note}</p>
              <p className="mt-7 text-5xl font-black tracking-tight text-[#F9FAFB]">
                ${tier.amount}
                <span className="ml-2 text-sm font-bold text-[#64748B]">USDC</span>
              </p>
              <div className="mt-6 flex items-center gap-3 rounded-[14px] bg-[#0B0F1A] p-4 text-[#F9FAFB]">
                <Zap className="h-5 w-5 text-[#7C3AED]" />
                <span className="font-black">{tier.credits} application tokens</span>
              </div>
              <Button variant={tier.popular ? 'primary' : 'secondary'} className="mt-7 w-full">
                Purchase with wallet
              </Button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
