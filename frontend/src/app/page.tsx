'use client';

import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
  FileCheck2,
  LockKeyhole,
  ShieldCheck,
  WalletCards,
} from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/Badge';
import WalletConnectModal from '@/components/wallet/WalletConnectModal';
import { useWalletStore } from '@/store/walletStore';

const marketStats = [
  { label: 'Escrow release', value: '< 8s' },
  { label: 'Success fee', value: '5%' },
  { label: 'Settlement', value: 'USDC' },
];

const featuredJobs = [
  ['Soroban contract audit', '2,500 USDC', '3 milestones'],
  ['Wallet onboarding flow', '1,800 USDC', 'SEP-7 / SEP-10'],
  ['Payment indexer service', '1,200 USDC', 'Horizon + Prisma'],
];

const roleCards = [
  {
    role: 'client' as const,
    title: 'Client workspace',
    body: 'Post jobs with a budget, fund escrow upfront, and approve milestones from a connected Stellar wallet.',
    points: ['Post funded jobs', 'Lock escrow upfront', 'Approve milestone releases'],
    cta: 'Start as client',
  },
  {
    role: 'freelancer' as const,
    title: 'Freelancer workspace',
    body: 'Browse funded work, submit milestone deliverables, and receive approved USDC payouts directly to your wallet.',
    points: ['Browse funded work', 'Submit deliverables', 'Receive wallet payouts'],
    cta: 'Start as freelancer',
  },
];

const escrowFlow = [
  ['Scope', 'Client defines deliverables and milestone amounts.'],
  ['Fund', 'USDC is locked before the freelancer starts work.'],
  ['Submit', 'Work evidence is attached to each milestone.'],
  ['Release', 'Approval sends funds to the freelancer wallet.'],
];

const footerGroups = [
  ['Product', ['Find work', 'Post a job', 'Application tokens', 'Escrow dashboard']],
  ['Stellar', ['SEP-10 auth', 'SEP-7 signing', 'USDC assets', 'Soroban escrow']],
  ['Company', ['Security', 'Docs', 'Maintainers', 'Grants']],
];

export default function LandingPage() {
  const router = useRouter();
  const [walletRole, setWalletRole] = React.useState<'client' | 'freelancer' | null>(null);
  const [isWalletOpen, setIsWalletOpen] = React.useState(false);
  const { isConnected, setRole } = useWalletStore();

  const chooseRole = (role: 'client' | 'freelancer') => {
    setRole(role);

    if (isConnected) {
      router.push(`/dashboard?role=${role}`);
      return;
    }

    setWalletRole(role);
    setIsWalletOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <Navbar />

      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-10 lg:grid-cols-[0.98fr_1.02fr] lg:py-14">
          <div className="flex flex-col justify-center">
            <Badge variant="info" className="mb-6 w-fit">Stellar freelance escrow</Badge>
            <div className="max-w-3xl">
              <h1 className="text-4xl font-black leading-[1.02] tracking-tight text-[#F9FAFB] md:text-6xl">
                Choose your side of
                <span className="block text-[#F9FAFB]">Stellar freelance work.</span>
              </h1>
            </div>
            <p className="mt-6 max-w-xl border-l border-[#7C3AED] pl-5 text-base leading-7 text-[#64748B]">
              Clients fund escrow upfront and approve milestones. Freelancers apply, submit deliverables, and receive wallet-native payouts.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => chooseRole('client')}
                className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#7C3AED] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#7C3AED]/90"
              >
                I am hiring
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => chooseRole('freelancer')}
                className="inline-flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] bg-transparent px-6 py-3 text-sm font-bold text-[#F9FAFB] transition hover:bg-[#0B0F1A]"
              >
                I am working
              </button>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 overflow-hidden rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A]">
              {marketStats.map((stat) => (
                <div key={stat.label} className="border-r border-[rgba(255,255,255,0.08)] p-5 last:border-r-0">
                  <p className="text-2xl font-black text-[#F9FAFB]">{stat.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#64748B]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-4">
            <div className="rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-5">
              <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
                <div>
                  <p className="text-sm text-[#64748B]">Live escrow desk</p>
                  <h2 className="text-2xl font-black text-[#F9FAFB]">Milestone queue</h2>
                </div>
                <Badge variant="success">Funded</Badge>
              </div>
              <div className="mt-5 space-y-3">
                {featuredJobs.map(([name, amount, status]) => (
                  <div key={name} className="rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-bold text-[#F9FAFB]">{name}</p>
                        <p className="mt-1 text-sm text-[#64748B]">{status}</p>
                      </div>
                      <p className="whitespace-nowrap font-mono text-sm text-[#F9FAFB]">{amount}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs text-[#64748B]">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        Awaiting approval
                      </span>
                      <span>Wallet signed</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                [LockKeyhole, 'Funded'],
                [FileCheck2, 'Submitted'],
                [WalletCards, 'Paid out'],
              ].map(([Icon, label]) => (
                <div key={label as string} className="flex items-center gap-2 rounded-[14px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-3 text-sm font-bold text-[#F9FAFB]">
                  <Icon className="h-4 w-4 text-[#7C3AED]" />
                  {label as string}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-8">
          <div className="grid gap-5 md:grid-cols-2">
            {roleCards.map((card) => (
              <div key={card.title} className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-7">
                <h2 className="text-2xl font-black text-[#F9FAFB]">{card.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#64748B]">{card.body}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {card.points.map((point) => (
                    <div key={point} className="rounded-[14px] border border-[rgba(255,255,255,0.08)] p-3 text-xs font-bold text-[#F9FAFB]">
                      {point}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => chooseRole(card.role)}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#7C3AED] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#7C3AED]/90"
                >
                  {card.cta}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#7C3AED]">Escrow workflow</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#F9FAFB] md:text-4xl">
                Clear steps from scope to settlement.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#64748B]">
                The platform keeps work management off-chain and fund movement wallet-signed on Stellar.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              {escrowFlow.map(([title, body], index) => (
                <div key={title} className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-5">
                  <p className="text-xs font-black text-[#7C3AED]">0{index + 1}</p>
                  <h3 className="mt-4 font-black text-[#F9FAFB]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#64748B]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12">
          <div className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-7">
            <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
              <div>
                <ShieldCheck className="h-7 w-7 text-[#10B981]" />
                <h2 className="mt-5 text-3xl font-black text-[#F9FAFB]">Built for wallet-native trust.</h2>
                <p className="mt-4 text-sm leading-7 text-[#64748B]">
                  SkillFlow never needs private keys. Wallets sign authentication and payment actions while the product tracks jobs, submissions, and off-chain records.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ['SEP-10 auth', 'Verify wallet ownership before account access.'],
                  ['USDC escrow', 'Funded milestones stay transparent to both sides.'],
                  ['Soroban release', 'Approval triggers deterministic payout rules.'],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-5">
                    <CheckCircle2 className="h-5 w-5 text-[#10B981]" />
                    <h3 className="mt-4 font-black text-[#F9FAFB]">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#64748B]">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 pt-8">
          <div className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-7">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-[#7C3AED]">Ready workspace</p>
                <h2 className="mt-2 text-3xl font-black text-[#F9FAFB]">Open the workspace that matches your role.</h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => chooseRole('client')}
                  className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#7C3AED] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#7C3AED]/90"
                >
                  Client dashboard
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => chooseRole('freelancer')}
                  className="inline-flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] bg-transparent px-6 py-3 text-sm font-bold text-[#F9FAFB] transition hover:bg-[#0B0F1A]"
                >
                  Freelancer dashboard
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[rgba(255,255,255,0.08)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[1.1fr_1.4fr]">
          <div>
            <div className="flex items-center gap-3">
              <BriefcaseBusiness className="h-6 w-6 text-[#F9FAFB]" />
              <p className="text-lg font-black text-[#F9FAFB]">SkillFlow</p>
            </div>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#64748B]">
              A Stellar-native freelance platform for funded work, wallet-signed approvals, and USDC milestone settlement.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Non-custodial', 'USDC escrow', 'Soroban-ready'].map((item) => (
                <span key={item} className="rounded-full border border-[rgba(255,255,255,0.08)] px-3 py-1 text-xs font-bold text-[#F9FAFB]">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {footerGroups.map(([title, items]) => (
              <div key={title as string}>
                <h3 className="text-sm font-black text-[#F9FAFB]">{title as string}</h3>
                <div className="mt-4 space-y-3">
                  {(items as string[]).map((item) => (
                    <p key={item} className="text-sm text-[#64748B]">{item}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-[rgba(255,255,255,0.08)] px-5 py-5 text-xs text-[#64748B] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SkillFlow. Built for Stellar freelance escrow.</p>
          <p>Funds stay in the user wallet until a signed transaction is approved.</p>
        </div>
      </footer>
      <WalletConnectModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        role={walletRole}
        redirectTo={walletRole ? `/dashboard?role=${walletRole}` : '/dashboard'}
      />
    </div>
  );
}
