import React from 'react';
import { CalendarDays, CheckCircle2, FileText, ShieldCheck } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function JobDetailPage() {
  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <Navbar />
      <main className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[1fr_360px]">
        <section className="space-y-6">
          <header className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-8">
            <Badge variant="success" className="mb-5 w-fit">Fundable milestone scope</Badge>
            <h1 className="text-4xl font-black tracking-tight text-[#F9FAFB] md:text-5xl">
              Soroban escrow contract hardening
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#64748B]">
              Review and harden the escrow contract paths for milestone approval, dispute settlement, and cancellation refunds.
            </p>
          </header>

          <section className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-6">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-[#7C3AED]" />
              <h2 className="text-xl font-black text-[#F9FAFB]">Milestone plan</h2>
            </div>
            <div className="mt-6 space-y-3">
              {[
                ['Contract review and threat model', '500 USDC', '3 days'],
                ['Authorization and fee-split fixes', '1,250 USDC', '5 days'],
                ['Regression tests and deployment notes', '750 USDC', '2 days'],
              ].map(([title, amount, duration]) => (
                <div key={title} className="rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-black text-[#F9FAFB]">{title}</p>
                      <p className="mt-2 inline-flex items-center gap-2 text-sm text-[#64748B]">
                        <CalendarDays className="h-4 w-4" />
                        {duration}
                      </p>
                    </div>
                    <p className="font-mono text-sm font-black text-[#F9FAFB]">{amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>

        <aside className="h-fit rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-6 lg:sticky lg:top-24">
          <p className="text-sm font-bold uppercase tracking-wide text-[#64748B]">Total budget</p>
          <p className="mt-2 text-4xl font-black text-[#F9FAFB]">$2,500 <span className="text-sm font-bold text-[#64748B]">USDC</span></p>
          <div className="mt-6 space-y-3 rounded-[16px] bg-[#0B0F1A] p-4">
            {['USDC escrow compatible', 'Wallet-signed approval', '5% platform commission'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm font-semibold text-[#64748B]">
                <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                {item}
              </div>
            ))}
          </div>
          <Button variant="primary" className="mt-6 w-full">
            Apply with 1 token
          </Button>
          <div className="mt-5 flex items-start gap-3 rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-4 text-sm leading-6 text-[#64748B]">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#10B981]" />
            Funds move only after the client signs a milestone approval transaction.
          </div>
        </aside>
      </main>
    </div>
  );
}
