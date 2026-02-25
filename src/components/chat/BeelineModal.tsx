'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone } from 'lucide-react';

interface BeelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCall?: () => void;
}

export default function BeelineModal({ isOpen, onClose, onCall }: BeelineModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-24 left-4 right-4 bg-beeline-yellow rounded-2xl p-4 shadow-lg"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500"
          >
            <X size={20} />
          </button>

          {/* Beeline icon */}
          <div className="flex items-center gap-2 mb-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="#FFC629"
              />
            </svg>
          </div>

          {/* Typing indicator */}
          <p className="text-sm text-gray-800 mb-4">
            S<span className="animate-pulse">...</span>
          </p>

          {/* Call button */}
          <button
            onClick={onCall}
            className="w-full py-3 bg-black text-white rounded-full font-medium flex items-center justify-center gap-2"
          >
            <Phone size={18} />
            Call Beeline
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
