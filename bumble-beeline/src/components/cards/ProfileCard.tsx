"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import type { Profile } from "@/lib/mockData";
import { LikeButton, ComplimentButton, ShareButton } from "@/components/ui";

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
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
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
      className="absolute left-[10px] right-[10px] top-[114px] bottom-[94px] rounded-[18px] overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ 
        x, 
        rotate,
        boxShadow: "0 0 12px rgba(0, 0, 0, 0.25)"
      }}
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

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 via-[50%] to-transparent" />

      {/* Like indicator */}
      <motion.div
        className="absolute top-8 right-8 w-20 h-20 rounded-full bg-white/90 flex items-center justify-center"
        style={{ opacity: likeOpacity }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3">
          <polyline points="20,6 9,17 4,12" />
        </svg>
      </motion.div>

      {/* Nope indicator */}
      <motion.div
        className="absolute top-8 left-8 w-20 h-20 rounded-full bg-white/90 flex items-center justify-center"
        style={{ opacity: nopeOpacity }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="3">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </motion.div>

      {/* Share button - top right */}
      <div className="absolute top-[18px] right-[18px]">
        <ShareButton />
      </div>

      {/* Profile info section - bottom left */}
      <div className="absolute bottom-0 left-0 right-0 p-[18px] flex flex-col gap-[10px]">
        {/* Verified badge */}
        {profile.verified && (
          <div className="inline-flex items-center gap-[2px] bg-[#202020] rounded-[64px] px-[8px] py-[4px] w-fit">
            <img
              src="/icons/verified-badge.svg"
              alt=""
              className="w-[17px] h-[17px]"
            />
            <span
              className="text-[10.6px] font-normal text-white leading-[14px] tracking-[-0.25px] text-center"
              style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
            >
              Photo verified
            </span>
          </div>
        )}

        {/* Name and age */}
        <h2
          className="text-[23px] font-semibold text-white leading-[30px] tracking-[-0.55px]"
          style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
        >
          <span>{profile.name}</span>
          <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro', system-ui, sans-serif" }}>
            , {profile.age}
          </span>
        </h2>

        {/* Occupation */}
        {profile.occupation && (
          <div className="flex items-center gap-[4px]">
            <img
              src="/icons/briefcase-icon.svg"
              alt=""
              className="w-[24px] h-[24px]"
            />
            <span
              className="text-[16px] font-medium text-white leading-[21px] tracking-[-0.38px] text-center"
              style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
            >
              {profile.occupation}
            </span>
          </div>
        )}

        {/* School */}
        {profile.school && (
          <div className="flex items-center gap-[4px]">
            <img
              src="/icons/school-icon.svg"
              alt=""
              className="w-[22px] h-[18px]"
            />
            <span
              className="text-[16px] font-medium text-white leading-[21px] tracking-[-0.38px] text-center"
              style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
            >
              {profile.school}
            </span>
            <img
              src="/icons/checkmark-icon.svg"
              alt=""
              className="w-[24px] h-[24px]"
            />
          </div>
        )}

        {/* Compliment button */}
        <div className="flex items-center">
          <ComplimentButton />
        </div>
      </div>

      {/* Like/Star button - bottom right */}
      <div className="absolute bottom-[18px] right-[18px]">
        <LikeButton onClick={onSwipeRight} />
      </div>
    </motion.div>
  );
}
