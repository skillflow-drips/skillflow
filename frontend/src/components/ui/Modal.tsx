import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="relative z-[100]" role="dialog" aria-modal="true" aria-label={title}>
      <button
        aria-label="Close modal"
        className="fixed inset-0 bg-[#7C3AED]/60 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-[20px] border border-[rgba(255,255,255,0.1)] bg-[#111827] p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-[#F9FAFB]">{title}</h2>
              <button
                aria-label="Close"
                className="rounded-lg px-2 py-1 text-[#64748B] hover:bg-[#111827] hover:text-[#F9FAFB]"
                onClick={onClose}
                type="button"
              >
                x
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
