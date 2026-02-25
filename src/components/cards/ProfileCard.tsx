'use client';

import { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Upload, Briefcase, GraduationCap, CheckCircle, MessageCircle } from 'lucide-react';
import type { Profile } from '@/lib/mockData';

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
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    
    if (info.offset.x > threshold) {
      setExitDirection('right');
      onSwipeRight?.();
    } else if (info.offset.x < -threshold) {
      setExitDirection('left');
      onSwipeLeft?.();
    }
  };

  return (
    <motion.div
      className="absolute inset-4 bottom-24 rounded-card overflow-hidden shadow-card cursor-grab active:cursor-grabbing"
      style={{ x, rotate }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      animate={
        exitDirection
          ? { x: exitDirection === 'right' ? 500 : -500, opacity: 0 }
          : { x: 0 }
      }
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Profile image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${profile.photos[0]})` }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

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

      {/* Upload button */}
      <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
        <Upload size={18} className="text-white" />
      </button>

      {/* Profile info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        {/* Verified badge */}
        {profile.verified && (
          <div className="flex items-center gap-1.5 mb-2">
            <CheckCircle size={16} className="text-white" fill="currentColor" />
            <span className="text-xs font-medium">Photo verified</span>
          </div>
        )}

        {/* Name and age */}
        <h2 className="text-2xl font-bold">
          {profile.name}, {profile.age}
        </h2>

        {/* Occupation */}
        {profile.occupation && (
          <div className="flex items-center gap-2 mt-2">
            <Briefcase size={16} className="text-white/80" />
            <span className="text-sm text-white/90">{profile.occupation}</span>
          </div>
        )}

        {/* School */}
        {profile.school && (
          <div className="flex items-center gap-2 mt-1">
            <GraduationCap size={16} className="text-white/80" />
            <span className="text-sm text-white/90">{profile.school}</span>
          </div>
        )}
      </div>

      {/* Message button */}
      <button className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-bumble-yellow flex items-center justify-center shadow-lg">
        <MessageCircle size={22} className="text-black" fill="currentColor" />
      </button>

      {/* SuperSwipe button */}
      <button className="absolute bottom-4 right-4 w-14 h-14 rounded-full bg-bumble-yellow flex items-center justify-center shadow-lg">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </button>
    </motion.div>
  );
}
