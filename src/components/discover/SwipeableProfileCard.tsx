"use client";

import { useRef, useState } from "react";
import { useDrag } from "@use-gesture/react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const SWIPE_THRESHOLD = 70;
// Arc path: card follows a circular arc. y from x = lower semicircle.
const ARC_RADIUS = 420;
// Slight rotation by swipe direction (right = clockwise, left = counter-clockwise).
const ROTATION_DEG_PER_PX = 0.07;
const EXIT_ROTATE_DEG = 14;

interface SwipeableProfileCardProps {
  children: React.ReactNode;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  className?: string;
}

export function SwipeableProfileCard({
  children,
  onSwipeLeft,
  onSwipeRight,
  className = "",
}: SwipeableProfileCardProps) {
  const x = useMotionValue(0);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Arc path: card moves along one big circle. y from x = lower semicircle.
  const y = useTransform(x, (v) => {
    const r = ARC_RADIUS;
    const absX = Math.min(Math.abs(v), r - 1);
    return r - Math.sqrt(r * r - absX * absX);
  });

  // Slight rotation left/right by swipe direction.
  const rotate = useTransform(x, (v) => v * ROTATION_DEG_PER_PX);

  // Overlays: only show when dragging. Use design assets (matching_check.svg / matching_x.svg).
  const checkOpacity = useTransform(x, (v) =>
    v > 20 ? Math.min(1, v / SWIPE_THRESHOLD) : 0
  );
  const xOpacity = useTransform(x, (v) =>
    v < -20 ? Math.min(1, -v / SWIPE_THRESHOLD) : 0
  );

  const dragGesture = useDrag(
    ({ movement: [mx], velocity: [vx], first, last }) => {
      if (first) setExitDirection(null);
      if (last) {
        const threshold = SWIPE_THRESHOLD;
        const minVelocity = 0.2;
        if (mx > threshold || (mx > 15 && vx > minVelocity)) {
          setExitDirection("right");
          onSwipeRight();
        } else if (mx < -threshold || (mx < -15 && vx < -minVelocity)) {
          setExitDirection("left");
          onSwipeLeft();
        } else {
          x.set(0);
        }
        return;
      }
      x.set(mx);
    },
    {
      axis: "x",
      pointer: { touch: true, mouse: true },
      dragElastic: 0.08,
      from: () => [x.get(), 0],
    }
  );

  return (
    <motion.div
      ref={cardRef}
      className={`absolute inset-0 z-10 cursor-grab active:cursor-grabbing ${className}`}
      style={{ x, y, rotate }}
      {...dragGesture()}
      animate={
        exitDirection
          ? {
              x: exitDirection === "right" ? 520 : -520,
              y: 380,
              rotate: exitDirection === "right" ? EXIT_ROTATE_DEG : -EXIT_ROTATE_DEG,
              opacity: 0,
              transition: { duration: 0.28, ease: "easeOut" },
            }
          : undefined
      }
    >
      <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden rounded-[18px] bg-white">
        {children}
        {/* Swipe overlays: matching_check (right) and matching_x (left) - design assets, only visible when dragging */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          <motion.div
            className="absolute left-1/2 top-1/2 flex h-[127px] w-[127px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            style={{ opacity: checkOpacity }}
          >
            <img
              src="/icons/match_process_assets/matching_check.svg"
              alt=""
              className="h-full w-full object-contain"
            />
          </motion.div>
          <motion.div
            className="absolute left-1/2 top-1/2 flex h-[127px] w-[127px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            style={{ opacity: xOpacity }}
          >
            <img
              src="/icons/match_process_assets/matching_x.svg"
              alt=""
              className="h-full w-full object-contain"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
