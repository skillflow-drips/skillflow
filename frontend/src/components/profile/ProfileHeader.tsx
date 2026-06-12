import React from 'react';
import Badge from '../ui/Badge';

interface Profile {
  name: string;
  address: string;
  rating: number;
  bio: string;
  skills: string[];
}

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <div className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#111827] p-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111827] text-3xl font-bold text-[#F9FAFB]">
          {profile.name[0]}
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <h2 className="text-3xl font-bold text-[#F9FAFB]">{profile.name}</h2>
            <Badge variant="info">Verified Freelancer</Badge>
          </div>
          <p className="mt-1 font-mono text-xs text-[#64748B]">
            {profile.address.slice(0, 8)}...{profile.address.slice(-8)}
          </p>
          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
            {profile.skills.map(skill => (
              <span key={skill} className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[#111827] px-3 py-1 text-xs text-[#64748B]">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-4 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#64748B]">Rating</p>
          <p className="text-3xl font-bold text-[#F9FAFB]">{profile.rating.toFixed(1)}</p>
        </div>
      </div>
      <p className="mt-8 max-w-3xl leading-relaxed text-[#64748B]">
        {profile.bio}
      </p>
    </div>
  );
}
