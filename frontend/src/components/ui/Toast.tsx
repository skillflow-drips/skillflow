import React from 'react';
import { Badge } from './Badge';

interface ToastProps {
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export const Toast: React.FC<ToastProps> = ({ title, message, type }) => {
  return (
    <div className="fixed bottom-8 right-8 w-80 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-6 animate-in slide-in-from-right">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-[#F9FAFB] text-sm">{title}</h4>
        <Badge variant={type === 'success' ? 'success' : 'info'}>{type}</Badge>
      </div>
      <p className="text-xs leading-relaxed text-[#64748B]">{message}</p>
    </div>
  );
};
