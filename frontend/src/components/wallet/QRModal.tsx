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
        <div className="p-6 rounded-3xl bg-white shadow-2xl">
          <QRCodeSVG value={uri} size={200} level="H" />
        </div>
        
        <p className="text-center text-slate-400 text-sm max-w-xs">
          Scan this QR code with your Lobstr wallet app to securely sign the transaction.
        </p>

        <div className="w-full space-y-3">
          <Button variant="primary" className="w-full" onClick={() => window.open(uri, '_blank')}>
            Open in Lobstr
          </Button>
          <button 
            onClick={() => navigator.clipboard.writeText(uri)}
            className="w-full py-2 text-xs text-slate-500 hover:text-white transition-colors"
          >
            Copy SEP-7 URI
          </button>
        </div>
      </div>
    </Modal>
  );
}
