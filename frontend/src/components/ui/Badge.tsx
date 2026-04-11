import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'warning' | 'error' | 'info';
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'info', children, className, ...props }) => {
  const base = "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border";
  const variants = {
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    error: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };

  return (
    <div className={`\${base} \${variants[variant]} \${className}`} {...props}>
      {children}
    </div>
  );
};
