import React from 'react';
import { Filter, Search, SlidersHorizontal } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { JobCard } from '@/components/jobs/JobCard';

const jobs = [
  {
    id: '1',
    title: 'Soroban escrow contract hardening',
    budget: '2,500',
    category: 'Smart Contracts',
    status: 'Open',
    client: 'Protocol team',
    posted: 'Today',
    skills: ['Rust', 'Soroban', 'Escrow'],
  },
  {
    id: '2',
    title: 'Stellar wallet onboarding flow',
    budget: '1,800',
    category: 'Frontend',
    status: 'Open',
    client: 'Product studio',
    posted: '2 days ago',
    skills: ['Next.js', 'SEP-7', 'UX'],
  },
  {
    id: '3',
    title: 'Payment verification indexer',
    budget: '1,200',
    category: 'Backend',
    status: 'In Review',
    client: 'Infrastructure guild',
    posted: '4 days ago',
    skills: ['NestJS', 'Prisma', 'Stellar SDK'],
  },
];

export default function JobsDiscoveryPage() {
  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-5 py-10">
        <section className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#7C3AED]">Verified Stellar work</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-[#F9FAFB] md:text-5xl">
                Browse funded jobs that settle in USDC.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#64748B]">
                Listings are organized around milestone escrow, wallet signing, and application-token quality control.
              </p>
            </div>
            <div className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-4">
              <div className="flex items-center gap-3 rounded-[14px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] px-4 py-3">
                <Search className="h-5 w-5 text-[#64748B]" />
                <span className="text-sm font-medium text-[#64748B]">Search contracts, skills, clients</span>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-transparent px-3 py-2 text-sm font-bold text-[#F9FAFB]">
                  <Filter className="h-4 w-4" />
                  Filters
                </button>
                <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-transparent px-3 py-2 text-sm font-bold text-[#F9FAFB]">
                  <SlidersHorizontal className="h-4 w-4" />
                  Sort
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] p-5">
            <h2 className="font-black text-[#F9FAFB]">Market focus</h2>
            <div className="mt-4 space-y-2">
              {['Soroban', 'Wallet UX', 'Backend indexers', 'Dispute tooling'].map((item) => (
                <label key={item} className="flex items-center justify-between rounded-[14px] bg-[#0B0F1A] px-4 py-3 text-sm font-semibold text-[#64748B]">
                  {item}
                  <input type="checkbox" className="h-4 w-4 accent-[#7C3AED]" />
                </label>
              ))}
            </div>
          </aside>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {jobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
