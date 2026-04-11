import React from 'react';
import { JobCard } from '@/components/jobs/JobCard';

export default function JobsDiscoveryPage() {
  const jobs = [
    { id: '1', title: 'Soroban Escrow Protocol', budget: '2500', category: 'Smart Contracts', status: 'Open' },
    { id: '2', title: 'Next.js 16 Dashboard', budget: '1800', category: 'Frontend', status: 'Open' },
    { id: '3', title: 'NestJS Indexer Service', budget: '1200', category: 'Backend', status: 'In Progress' },
  ];

  return (
    <div className="container mx-auto py-12 px-6">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Discover Opportunities</h1>
        <p className="text-gray-400">Apply for high-impact projects on the Stellar Network.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </div>
  );
}
