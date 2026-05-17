"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
}

/** Fixed 390×844 viewport for portfolio iframe embed */
export function PhoneFrame({ children, className = "" }: PhoneFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative h-[844px] w-[390px] max-h-[844px] max-w-[390px] overflow-hidden bg-white ${className}`}
    >
      {children}
    </motion.div>
  );
}
