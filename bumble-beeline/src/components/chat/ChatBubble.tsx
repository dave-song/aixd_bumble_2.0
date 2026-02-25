"use client";

import { motion } from "framer-motion";

interface ChatBubbleProps {
  message: string;
  isOwn: boolean;
  timestamp?: string;
  delivered?: boolean;
}

export default function ChatBubble({
  message,
  isOwn,
  timestamp,
  delivered,
}: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`
          max-w-[75%] px-4 py-2.5 rounded-2xl
          ${
            isOwn
              ? "bg-bumble-yellow text-black rounded-br-md"
              : "bg-gray-100 text-black rounded-bl-md"
          }
        `}
      >
        <p className="text-sm leading-relaxed">{message}</p>
        {isOwn && delivered && (
          <p className="text-[10px] text-gray-600 mt-1 text-right">Delivered</p>
        )}
      </div>
    </motion.div>
  );
}
