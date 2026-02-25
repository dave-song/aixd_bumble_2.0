'use client';

import { motion } from 'framer-motion';

interface ChipProps {
  emoji?: string;
  label: string;
  selected?: boolean;
  onSelect?: () => void;
  showPlus?: boolean;
  showX?: boolean;
}

export default function Chip({
  emoji,
  label,
  selected = false,
  onSelect,
  showPlus = false,
  showX = false,
}: ChipProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onSelect}
      className={`
        inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium
        transition-colors duration-200 border
        ${
          selected
            ? 'bg-bumble-yellow border-bumble-yellow text-black'
            : 'bg-white border-gray-200 text-gray-800 hover:border-gray-300'
        }
      `}
    >
      {emoji && <span className="text-base">{emoji}</span>}
      <span>{label}</span>
      {showPlus && !selected && (
        <span className="text-gray-400 ml-1">+</span>
      )}
      {showX && selected && (
        <span className="text-black ml-1">×</span>
      )}
    </motion.button>
  );
}
