import React from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface JobCardProps {
  title: string;
  budget: string;
  category: string;
  status: string;
}

export const JobCard: React.FC<JobCardProps> = ({ title, budget, category, status }) => {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <Badge variant={status === 'Open' ? 'success' : 'info'}>{status}</Badge>
        <span className="text-xl font-bold text-blue-400">${budget}</span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300">{title}</h3>
      <p className="text-sm text-gray-400 mb-6">{category}</p>
      <Button variant="secondary" className="w-full">View Details</Button>
    </div>
  );
};
