"use client";

import { motion } from "framer-motion";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export default function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3"
    >
      <div
        className={`
          relative w-[51px] h-[31px] rounded-full transition-colors duration-200
          ${checked ? "bg-black" : "bg-gray-200"}
        `}
      >
        <motion.div
          initial={false}
          animate={{ x: checked ? 22 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-[2px] w-[27px] h-[27px] bg-white rounded-full shadow-md"
        />
      </div>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </button>
  );
}
