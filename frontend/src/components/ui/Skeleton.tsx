import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`animate-pulse rounded-xl bg-[#111827] ${className || ''}`} />
  );
};

export const CardSkeleton = () => (
  <div className="space-y-4 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-6">
    <div className="flex justify-between">
      <Skeleton className="w-16 h-6" />
      <Skeleton className="w-24 h-6" />
    </div>
    <Skeleton className="w-3/4 h-8" />
    <Skeleton className="w-1/2 h-4" />
    <Skeleton className="w-full h-10 mt-6" />
  </div>
);
