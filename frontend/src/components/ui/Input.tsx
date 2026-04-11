import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="relative w-full">
      <input
        {...props}
        className={`peer w-full bg-white/5 border \${error ? 'border-rose-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-transparent focus:outline-none focus:border-blue-500/50 transition-all \${className}`}
        placeholder={label}
      />
      <label className="absolute left-4 -top-6 text-[10px] text-gray-500 font-bold uppercase tracking-widest transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-blue-400">
        {label}
      </label>
      {error && <span className="text-[10px] text-rose-400 mt-1 block">{error}</span>}
    </div>
  );
};
