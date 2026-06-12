import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'warning' | 'error' | 'info';
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'info', children, className, ...props }) => {
  const base = "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide border";
  const variants = {
    success: "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20",
    warning: "bg-[#111827] text-[#F9FAFB] border-[rgba(255,255,255,0.08)]",
    error: "bg-[#111827] text-[#F9FAFB] border-[rgba(255,255,255,0.08)]",
    info: "bg-[#14B6E7]/10 text-[#14B6E7] border-[#14B6E7]/25",
  };

  return (
    <div className={`${base} ${variants[variant]} ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

export default Badge;
