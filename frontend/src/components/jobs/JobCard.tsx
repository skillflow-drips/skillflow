import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Clock, MapPin } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface JobCardProps {
  id: string;
  title: string;
  budget: string;
  category: string;
  status: string;
  client: string;
  posted: string;
  skills: string[];
}

export const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  budget,
  category,
  status,
  client,
  posted,
  skills,
}) => {
  return (
    <article className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#111827] p-6 transition hover:bg-[#111827]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Badge variant={status === 'Open' ? 'success' : 'info'}>{status}</Badge>
        <span className="rounded-full bg-[#111827] px-3 py-1 text-sm font-black text-[#F9FAFB]">${budget} USDC</span>
      </div>

      <div className="mt-5">
        <p className="text-sm font-bold uppercase tracking-wide text-[#7C3AED]">{category}</p>
        <h3 className="mt-2 text-xl font-black tracking-tight text-[#F9FAFB]">{title}</h3>
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-[#64748B]">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {client}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {posted}
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span key={skill} className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[#111827] px-3 py-1 text-xs font-semibold text-[#64748B]">
            {skill}
          </span>
        ))}
      </div>

      <Link
        href={`/jobs/${id}`}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-transparent px-5 py-3 text-sm font-bold text-[#F9FAFB] transition hover:bg-[#111827]"
      >
        Review scope
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </article>
  );
};
