"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";

interface SwipeIndicatorProps {
  type: "like" | "pass" | null;
  visible: boolean;
}

export default function SwipeIndicator({ type, visible }: SwipeIndicatorProps) {
  return (
    <AnimatePresence>
      {visible && type && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={`
            absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
            w-32 h-32 rounded-full flex items-center justify-center
            ${type === "like" ? "bg-white/95" : "bg-white/95"}
          `}
        >
          {type === "like" ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
            >
              <Check size={64} className="text-green-500" strokeWidth={3} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
            >
              <X size={64} className="text-red-500" strokeWidth={3} />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
