import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 overflow-y-auto modal-overlay">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-[101] w-full max-w-2xl matrix-bg p-4 md:p-6 rounded-lg my-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 p-1 rounded-full hover:bg-[#003300] transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
};