import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`animate-pulse bg-white/5 rounded-xl \${className}`} />
  );
};

export const CardSkeleton = () => (
  <div className="p-6 rounded-2xl glass space-y-4">
    <div className="flex justify-between">
      <Skeleton className="w-16 h-6" />
      <Skeleton className="w-24 h-6" />
    </div>
    <Skeleton className="w-3/4 h-8" />
    <Skeleton className="w-1/2 h-4" />
    <Skeleton className="w-full h-10 mt-6" />
  </div>
);
