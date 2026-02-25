'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface BeelineBannerProps {
  title: string;
  subtitle: string;
  onClick?: () => void;
}

export default function BeelineBanner({ title, subtitle, onClick }: BeelineBannerProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onClick={onClick}
      className="w-full bg-beeline-yellow rounded-2xl p-4 flex items-center justify-between shadow-md"
    >
      <div className="flex items-center gap-3">
        {/* Beeline icon */}
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#FFC629" strokeWidth="2" />
            <circle cx="12" cy="12" r="4" fill="#FFC629" />
          </svg>
        </div>
        
        <div className="text-left">
          <p className="text-sm font-semibold text-black">{title}</p>
          <p className="text-xs text-gray-600">{subtitle}</p>
        </div>
      </div>
      
      <ChevronRight size={20} className="text-gray-600" />
    </motion.button>
  );
}
