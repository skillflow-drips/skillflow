import React from 'react';
import { Badge } from './Badge';

interface ToastProps {
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export const Toast: React.FC<ToastProps> = ({ title, message, type }) => {
  return (
    <div className="fixed bottom-8 right-8 w-80 glass p-6 rounded-2xl shadow-2xl border-l-4 border-l-blue-500 animate-in slide-in-from-right">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-white text-sm">{title}</h4>
        <Badge variant={type === 'success' ? 'success' : 'info'}>{type}</Badge>
      </div>
      <p className="text-xs text-gray-400 leading-relaxed">{message}</p>
    </div>
  );
};
