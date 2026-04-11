import React from 'react';

export const Button = ({ children, ...props }) => (
  <button className="px-6 py-2 rounded-xl glass bg-blue-500/10 text-blue-400 border border-blue-500/20" {...props}>
    {children}
  </button>
);
