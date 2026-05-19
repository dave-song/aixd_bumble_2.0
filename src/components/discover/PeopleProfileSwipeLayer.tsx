"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type AnimationPlaybackControls,
} from "framer-motion";
import { useDrag } from "@use-gesture/react";

const MATCHING_CHECK_SRC =
  "/icons/match_process_assets/matching_check.svg";

const SWIPE_DISTANCE_PX = 110;
const SWIPE_VELOCITY = 0.45;
const INTENT_THRESHOLD_PX = 12;

interface PeopleProfileSwipeLayerProps {
  children: ReactNode;
  onSwipeRight: () => void;
  disabled?: boolean;
}

type DragIntent = null | "swipe" | "scroll";

/**
 * Right-only swipe on the People profile card. Horizontal drags trigger a
 * classic card tilt + match check; vertical drags pass through to profile scroll.
 */
export function PeopleProfileSwipeLayer({
  children,
  onSwipeRight,
  disabled = false,
}: PeopleProfileSwipeLayerProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const intentRef = useRef<DragIntent>(null);
  const animRef = useRef<AnimationPlaybackControls | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [0, 220], [0, 12]);
  const likeOpacity = useTransform(x, [0, 60, 140], [0, 0.6, 1]);

  const bind = useDrag(
    ({
      movement: [mx, my],
      velocity: [vx],
      first,
      last,
      cancel,
      event,
      tap,
    }) => {
      if (disabled || tap) return;

      if (first) {
        intentRef.current = null;
        animRef.current?.stop();
        const target = event?.target as HTMLElement | undefined;
        if (target?.closest("button, a, input, textarea, [data-no-swipe]")) {
          intentRef.current = "scroll";
        }
      }

      if (intentRef.current === "scroll") {
        if (!last) cancel();
        return;
      }

      if (
        intentRef.current === null &&
        (Math.abs(mx) > INTENT_THRESHOLD_PX || Math.abs(my) > INTENT_THRESHOLD_PX)
      ) {
        if (Math.abs(my) >= Math.abs(mx) || mx <= 0) {
          intentRef.current = "scroll";
          cancel();
          return;
        }
        intentRef.current = "swipe";
        setIsSwiping(true);
      }

      if (intentRef.current !== "swipe") return;

      event?.preventDefault();
      x.set(Math.max(0, mx));

      if (last) {
        setIsSwiping(false);
        intentRef.current = null;

        const offset = Math.max(0, mx);
        const shouldMatch =
          offset > SWIPE_DISTANCE_PX ||
          (vx > SWIPE_VELOCITY && offset > 40);

        if (shouldMatch) {
          const width = hostRef.current?.offsetWidth ?? 390;
          animRef.current = animate(x, width, {
            type: "spring",
            stiffness: 280,
            damping: 28,
            onComplete: () => {
              x.set(0);
              onSwipeRight();
            },
          });
        } else {
          animRef.current = animate(x, 0, {
            type: "spring",
            stiffness: 420,
            damping: 32,
          });
        }
      }
    },
    {
      filterTaps: true,
      pointer: { touch: true },
      from: () => [x.get(), 0],
    },
  );

  return (
    <div
      ref={hostRef}
      {...bind()}
      className={`relative flex min-h-0 flex-1 flex-col ${isSwiping ? "touch-none" : "touch-pan-y"}`}
      style={{ touchAction: isSwiping ? "none" : "pan-y" }}
    >
      <motion.div
        className="relative flex min-h-0 flex-1 flex-col"
        style={{
          x,
          rotate,
          transformOrigin: "center bottom",
        }}
      >
        {children}

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 flex items-start justify-start rounded-[18px] p-6"
          style={{ opacity: likeOpacity }}
        >
          <img
            src={MATCHING_CHECK_SRC}
            alt=""
            width={127}
            height={127}
            className="h-[127px] w-[127px] shrink-0 object-contain"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
