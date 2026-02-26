"use client";

import { motion } from "framer-motion";

interface ChipProps {
  label: string;
  emoji?: string;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function Chip({
  label,
  emoji,
  selected = false,
  onClick,
  disabled = false,
  className = "",
}: ChipProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.95 }}
      animate={selected ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 0.2 }}
      className={`
        inline-flex items-center gap-[6px] px-[16px] py-[10px] rounded-full
        text-[14px] font-medium transition-colors duration-200
        ${
          selected
            ? "bg-bumble-accent text-bumble-black border-[1.5px] border-bumble-black"
            : "bg-white text-bumble-black border border-neutral-200 hover:border-neutral-300"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      {emoji && <span>{emoji}</span>}
      <span>{label}</span>
    </motion.button>
  );
}
