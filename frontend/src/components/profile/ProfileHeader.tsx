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
    <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold">
          {profile.name[0]}
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <h2 className="text-3xl font-bold text-white">{profile.name}</h2>
            <Badge variant="info">Verified Freelancer</Badge>
          </div>
          <p className="mt-1 text-slate-400 font-mono text-xs opacity-60">
            {profile.address.slice(0, 8)}...{profile.address.slice(-8)}
          </p>
          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
            {profile.skills.map(skill => (
              <span key={skill} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
          <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">Rating</p>
          <p className="text-3xl font-bold text-indigo-400">{profile.rating.toFixed(1)}</p>
        </div>
      </div>
      <p className="mt-8 text-slate-400 leading-relaxed max-w-3xl">
        {profile.bio}
      </p>
    </div>
  );
}
