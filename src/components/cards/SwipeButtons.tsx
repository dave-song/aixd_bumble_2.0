"use client";

import { X, Star, Heart, MessageCircle } from "lucide-react";

interface SwipeButtonsProps {
  onPass?: () => void;
  onSuperLike?: () => void;
  onLike?: () => void;
  onBeeline?: () => void;
}

export function SwipeButtons({
  onPass,
  onSuperLike,
  onLike,
  onBeeline,
}: SwipeButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-[16px] py-[16px]">
      {/* Beeline Button */}
      <button
        onClick={onBeeline}
        className="w-[48px] h-[48px] bg-bumble-accent rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      >
        <MessageCircle size={24} className="text-bumble-black" />
      </button>

      {/* Pass Button */}
      <button
        onClick={onPass}
        className="w-[56px] h-[56px] bg-white rounded-full flex items-center justify-center shadow-lg border border-neutral-200 hover:scale-105 transition-transform"
      >
        <X size={28} className="text-neutral-400" />
      </button>

      {/* Super Like Button */}
      <button
        onClick={onSuperLike}
        className="w-[56px] h-[56px] bg-bumble-accent rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      >
        <Star size={28} className="text-bumble-black" fill="#202020" />
      </button>
    </div>
  );
}
