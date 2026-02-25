"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import type { Profile } from "@/lib/mockData";

interface ProfileCardProps {
  profile: Profile;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  isTop?: boolean;
}

export default function ProfileCard({
  profile,
  onSwipeLeft,
  onSwipeRight,
  isTop = true,
}: ProfileCardProps) {
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(
    null,
  );

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const threshold = 100;

    if (info.offset.x > threshold) {
      setExitDirection("right");
      onSwipeRight?.();
    } else if (info.offset.x < -threshold) {
      setExitDirection("left");
      onSwipeLeft?.();
    }
  };

  return (
    <motion.div
      className="absolute left-[10px] right-[10px] top-[114px] bottom-[94px] rounded-[16px] overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ x, rotate }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      animate={
        exitDirection
          ? { x: exitDirection === "right" ? 500 : -500, opacity: 0 }
          : { x: 0 }
      }
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Profile image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${profile.photos[0]})` }}
      />

      {/* Gradient overlay - matches Figma gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 via-[40%] to-transparent" />

      {/* Like indicator */}
      <motion.div
        className="absolute top-8 right-8 w-20 h-20 rounded-full bg-white/90 flex items-center justify-center"
        style={{ opacity: likeOpacity }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#10B981"
          strokeWidth="3"
        >
          <polyline points="20,6 9,17 4,12" />
        </svg>
      </motion.div>

      {/* Nope indicator */}
      <motion.div
        className="absolute top-8 left-8 w-20 h-20 rounded-full bg-white/90 flex items-center justify-center"
        style={{ opacity: nopeOpacity }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#EF4444"
          strokeWidth="3"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </motion.div>

      {/* Share/Upload button - top right */}
      <button className="absolute top-[18px] right-[18px] w-[30px] h-[30px] rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </button>

      {/* Profile info section - positioned from bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-[18px] pb-[18px]">
        {/* Verified badge */}
        {profile.verified && (
          <div className="inline-flex items-center gap-[6px] bg-black/50 backdrop-blur-sm rounded-full px-[10px] py-[5px] mb-[12px]">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <circle cx="8.5" cy="8.5" r="8" fill="white" stroke="white" strokeWidth="1"/>
              <path d="M5 8.5L7.5 11L12 6" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[12px] font-medium text-white leading-none">Photo verified</span>
          </div>
        )}

        {/* Name and age */}
        <h2 className="text-[28px] font-bold text-white leading-tight tracking-[-0.02em]">
          {profile.name}, {profile.age}
        </h2>

        {/* Occupation */}
        {profile.occupation && (
          <div className="flex items-center gap-[8px] mt-[10px]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            <span className="text-[15px] text-white/90 leading-tight">{profile.occupation}</span>
          </div>
        )}

        {/* School */}
        {profile.school && (
          <div className="flex items-center gap-[8px] mt-[8px]">
            <svg width="20" height="16" viewBox="0 0 22 18" fill="white" fillOpacity="0.8">
              <path d="M11 0L0 6L11 12L20 7.09V14H22V6L11 0ZM4 10.18V14.18L11 18L18 14.18V10.18L11 14L4 10.18Z"/>
            </svg>
            <span className="text-[15px] text-white/90 leading-tight">{profile.school}</span>
          </div>
        )}

        {/* Action buttons row */}
        <div className="flex items-end justify-between mt-[16px]">
          {/* Compliment/Message button - yellow */}
          <button className="w-[44px] h-[44px] rounded-full bg-bumble-yellow flex items-center justify-center shadow-lg">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#1A1A1A">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
              <circle cx="12" cy="10" r="1.5"/>
              <circle cx="8" cy="10" r="1.5"/>
              <circle cx="16" cy="10" r="1.5"/>
            </svg>
          </button>

          {/* Like/Star button - larger yellow */}
          <button className="w-[66px] h-[66px] rounded-full bg-bumble-yellow flex items-center justify-center shadow-lg">
            <svg width="33" height="32" viewBox="0 0 33 32" fill="#1A1A1A">
              <path d="M16.5 2L20.326 10.528L29.5 11.77L22.938 18.072L24.653 27.23L16.5 22.848L8.347 27.23L10.062 18.072L3.5 11.77L12.674 10.528L16.5 2Z"/>
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
