'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Clock3, FileCheck2, ShieldCheck, WalletCards } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import WalletConnectModal from '@/components/wallet/WalletConnectModal';
import { useWalletStore } from '@/store/walletStore';

const freelancerMetrics = [
  { label: 'Escrow available', value: '4,700 USDC', detail: 'Across 3 funded milestones' },
  { label: 'Application tokens', value: '12', detail: 'Ready for proposals' },
  { label: 'Open disputes', value: '0', detail: 'No arbitration requests' },
];

const clientMetrics = [
  { label: 'Escrow funded', value: '7,900 USDC', detail: 'Locked across 4 active jobs' },
  { label: 'Open proposals', value: '18', detail: 'Ready for review' },
  { label: 'Pending approvals', value: '3', detail: 'Milestones awaiting release' },
];

const freelancerMilestones = [
  {
    title: 'Wallet onboarding flow',
    party: 'Orbit Labs',
    amount: '1,800 USDC',
    status: 'Funded',
    due: 'Due Jun 18',
  },
  {
    title: 'Soroban escrow audit',
    party: 'Protocol Desk',
    amount: '2,500 USDC',
    status: 'Submitted',
    due: 'Review pending',
  },
  {
    title: 'Payment indexer service',
    party: 'LedgerWorks',
    amount: '1,200 USDC',
    status: 'In progress',
    due: 'Due Jun 22',
  },
];

const clientMilestones = [
  {
    title: 'Soroban contract audit',
    party: 'Mira Chen',
    amount: '2,500 USDC',
    status: 'Review',
    due: 'Approve milestone 2',
  },
  {
    title: 'Wallet onboarding flow',
    party: 'Northstar Studio',
    amount: '1,800 USDC',
    status: 'Funded',
    due: 'Deliverable due Jun 18',
  },
  {
    title: 'Indexer service build',
    party: 'Ayo Martins',
    amount: '3,600 USDC',
    status: 'Hiring',
    due: '18 proposals',
  },
];

const freelancerActivity = [
  ['USDC escrow funded', 'Protocol Desk funded milestone 2', '8m ago'],
  ['Work submitted', 'Audit evidence attached to Soroban escrow audit', '1h ago'],
  ['Application accepted', 'Orbit Labs moved wallet onboarding into active work', 'Yesterday'],
];

const clientActivity = [
  ['Milestone submitted', 'Mira Chen attached audit evidence for review', '6m ago'],
  ['Escrow funded', 'Wallet onboarding flow was locked on Stellar', '42m ago'],
  ['New proposal', 'Northstar Studio applied to indexer service build', '2h ago'],
];

export default function Dashboard() {
  const [isWalletOpen, setIsWalletOpen] = React.useState(false);
  const [routeRole, setRouteRole] = React.useState<'client' | 'freelancer' | null>(null);
  const { role, isConnected, displayAddress, walletName, walletIcon, setRole } = useWalletStore();
  const activeRole = routeRole || role || 'freelancer';
  const isClient = activeRole === 'client';
  const metrics = isClient ? clientMetrics : freelancerMetrics;
  const milestones = isClient ? clientMilestones : freelancerMilestones;
  const activity = isClient ? clientActivity : freelancerActivity;

  React.useEffect(() => {
    const roleParam = new URLSearchParams(window.location.search).get('role');

    if (roleParam === 'client' || roleParam === 'freelancer') {
      setRouteRole(roleParam);
      setRole(roleParam);
    }
  }, [setRole]);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-[#0B0F1A]">
        <Navbar />
        <main className="mx-auto max-w-6xl px-5 py-16">
          <section className="grid gap-8 rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-8 lg:grid-cols-[1fr_0.8fr]">
            <div className="flex flex-col justify-center">
              <Badge variant="info" className="mb-5 w-fit">Wallet required</Badge>
              <h1 className="text-4xl font-black tracking-tight text-[#F9FAFB] md:text-5xl">
                Connect a Stellar wallet to open your {isClient ? 'client' : 'freelancer'} workspace.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#64748B]">
                Your dashboard is keyed to your public Stellar address. Once connected, SkillFlow can show {isClient ? 'posted jobs, funded escrow, proposals, and approval actions' : 'applications, escrowed milestones, deliverables, and payout records'} for that wallet.
              </p>
              <div className="mt-8">
                <button
                  onClick={() => setIsWalletOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#7C3AED] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#7C3AED]/90"
                  type="button"
                >
                  <WalletCards className="h-4 w-4" />
                  Connect Wallet
                </button>
              </div>
            </div>
            <div className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-6 text-[#F9FAFB]">
              <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
                <p className="font-bold">Workspace access</p>
                <ShieldCheck className="h-5 w-5 text-[#10B981]" />
              </div>
              <div className="mt-6 space-y-4">
                {(isClient
                  ? ['Verify wallet ownership', 'Load funded jobs', 'Unlock escrow approval actions']
                  : ['Verify wallet ownership', 'Load active work', 'Unlock deliverable and payout actions']
                ).map((step) => (
                  <div key={step} className="flex items-center gap-3 rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-4">
                    <CheckCircle2 className="h-5 w-5 text-[#10B981]" />
                    <span className="text-sm font-semibold text-[#64748B]">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <WalletConnectModal
          isOpen={isWalletOpen}
          onClose={() => setIsWalletOpen(false)}
          role={activeRole}
          redirectTo={`/dashboard?role=${activeRole}`}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-5 py-10">
        <header className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Badge variant="success" className="mb-4 w-fit">Connected workspace</Badge>
              <h1 className="text-4xl font-black tracking-tight text-[#F9FAFB]">
                {isClient ? 'Client dashboard' : 'Freelancer dashboard'}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B]">
                {isClient
                  ? 'Post jobs, review proposals, fund escrow upfront, and approve milestone release transactions.'
                  : 'Browse work, track applications, submit milestone deliverables, and monitor wallet payouts.'}
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-4">
              {walletIcon && <img src={walletIcon} alt="" className="h-10 w-10 object-contain" />}
              <div>
                <p className="text-sm font-black text-[#F9FAFB]">{walletName}</p>
                <p className="font-mono text-xs text-[#64748B]">{displayAddress}</p>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-6">
              <p className="text-sm font-bold uppercase tracking-wide text-[#64748B]">{metric.label}</p>
              <p className="mt-3 text-3xl font-black text-[#F9FAFB]">{metric.value}</p>
              <p className="mt-2 text-sm text-[#64748B]">{metric.detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-[#F9FAFB]">
                  {isClient ? 'Posted work' : 'Active milestones'}
                </h2>
                <p className="mt-1 text-sm text-[#64748B]">
                  {isClient ? 'Jobs, proposals, and funded milestones controlled by this wallet.' : 'Escrowed work assigned to this wallet appears here.'}
                </p>
              </div>
              <Clock3 className="h-5 w-5 text-[#64748B]" />
            </div>
            <div className="mt-6 space-y-3">
              {milestones.map((milestone) => (
                <div key={milestone.title} className="rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-black text-[#F9FAFB]">{milestone.title}</h3>
                        <span className="rounded-full bg-[#10B981] px-2 py-0.5 text-[11px] font-bold text-[#F9FAFB]">
                          {milestone.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-[#64748B]">{milestone.party} · {milestone.due}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-mono text-sm font-black text-[#F9FAFB]">{milestone.amount}</p>
                      <p className="mt-1 text-xs text-[#64748B]">{isClient ? 'Budget on Stellar' : 'Escrowed on Stellar'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-6">
            <h2 className="text-xl font-black text-[#F9FAFB]">Settlement rules</h2>
            <div className="mt-5 space-y-4">
              {[
                ['Escrow asset', 'USDC on Stellar'],
                [isClient ? 'Client action' : 'Freelancer payout', isClient ? 'Approve release' : '95%'],
                ['Treasury fee', '5%'],
                ['Signing', 'Connected wallet'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3 last:border-b-0">
                  <span className="text-sm text-[#64748B]">{label}</span>
                  <span className="text-sm font-black text-[#F9FAFB]">{value}</span>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-[#F9FAFB]">Recent activity</h2>
                <p className="mt-1 text-sm text-[#64748B]">Wallet and escrow events from your workspace.</p>
              </div>
              <FileCheck2 className="h-5 w-5 text-[#7C3AED]" />
            </div>
            <div className="mt-6 space-y-3">
              {activity.map(([title, body, time]) => (
                <div key={title} className="flex gap-3 rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#10B981]" />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[#F9FAFB]">{title}</p>
                    <p className="mt-1 text-sm text-[#64748B]">{body}</p>
                  </div>
                  <p className="whitespace-nowrap text-xs text-[#64748B]">{time}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-6">
            <h2 className="text-xl font-black text-[#F9FAFB]">Next action</h2>
            <p className="mt-3 text-sm leading-6 text-[#64748B]">
              {isClient
                ? 'Review the submitted Soroban audit milestone and sign the release transaction when the work is approved.'
                : 'Submit the next deliverable for the wallet onboarding flow and wait for client approval.'}
            </p>
            <Link
              href={isClient ? '/dashboard?role=client' : '/jobs/1'}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#7C3AED] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#7C3AED]/90"
            >
              {isClient ? 'Review approvals' : 'Open milestone'}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </section>
      </main>
    </div>
  );
}
