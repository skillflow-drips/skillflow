import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'secondary',
  ...props
}) => {
  const variants = {
    primary: 'bg-[#7C3AED] text-white border-[#7C3AED] hover:bg-[#7C3AED]/90',
    secondary: 'bg-transparent text-[#F9FAFB] border-[rgba(255,255,255,0.08)] hover:bg-[#111827]',
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-[10px] border px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
