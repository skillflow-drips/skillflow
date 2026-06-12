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
        className={`peer w-full rounded-xl border bg-[#111827] px-4 py-3 text-[#F9FAFB] placeholder-transparent transition-all focus:border-[#7C3AED] focus:outline-none ${error ? 'border-[rgba(255,255,255,0.18)]' : 'border-[rgba(255,255,255,0.08)]'} ${className || ''}`}
        placeholder={label}
      />
      <label className="absolute -top-6 left-4 text-[10px] font-bold uppercase tracking-widest text-[#64748B] transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#64748B] peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-[#7C3AED]">
        {label}
      </label>
      {error && <span className="mt-1 block text-[10px] text-[#F9FAFB]">{error}</span>}
    </div>
  );
};

export default Input;
