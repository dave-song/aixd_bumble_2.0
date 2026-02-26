"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
}

export function PhoneFrame({ children, className = "" }: PhoneFrameProps) {
  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#444444" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`relative bg-white overflow-hidden ${className}`}
        style={{
          width: "430px",
          height: "932px",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
