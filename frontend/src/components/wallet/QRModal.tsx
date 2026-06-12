import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { QRCodeSVG } from 'qrcode.react';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  uri: string;
  title: string;
}

export default function QRModal({ isOpen, onClose, uri, title }: QRModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col items-center gap-6 p-4">
        <div className="rounded-[20px] bg-[#7C3AED] p-6">
          <QRCodeSVG value={uri} size={200} level="H" />
        </div>
        
        <p className="max-w-xs text-center text-sm text-[#64748B]">
          Scan this QR code with your Lobstr wallet app to securely sign the transaction.
        </p>

        <div className="w-full space-y-3">
          <Button variant="primary" className="w-full" onClick={() => window.open(uri, '_blank')}>
            Open in Lobstr
          </Button>
          <button 
            onClick={() => navigator.clipboard.writeText(uri)}
            className="w-full py-2 text-xs text-[#64748B] transition-colors hover:text-[#F9FAFB]"
          >
            Copy SEP-7 URI
          </button>
        </div>
      </div>
    </Modal>
  );
}
