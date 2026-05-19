"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
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

const SWIPE_DISTANCE_PX = 100;
const SWIPE_VELOCITY = 0.4;
const INTENT_THRESHOLD_PX = 8;

interface PeopleProfileSwipeLayerProps {
  children: ReactNode;
  onSwipeRight: () => void;
  disabled?: boolean;
}

type DragIntent = null | "swipe" | "scroll";

function isInteractiveSwipeTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest("button, a, input, textarea, [data-no-swipe]"),
  );
}

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

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const blockNativeDrag = (event: DragEvent) => {
      if (disabled) return;
      event.preventDefault();
    };

    el.addEventListener("dragstart", blockNativeDrag, true);
    return () => el.removeEventListener("dragstart", blockNativeDrag, true);
  }, [disabled]);

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
        if (isInteractiveSwipeTarget(event?.target ?? null)) {
          intentRef.current = "scroll";
        }
      }

      if (intentRef.current === "scroll") {
        if (!last) cancel();
        return;
      }

      const absX = Math.abs(mx);
      const absY = Math.abs(my);

      if (
        intentRef.current === null &&
        (absX > INTENT_THRESHOLD_PX || absY > INTENT_THRESHOLD_PX)
      ) {
        const isHorizontalIntent = absX > absY * 0.65 && mx > 0;
        const isVerticalIntent = absY > absX * 1.1;

        if (isVerticalIntent || mx <= 0) {
          intentRef.current = "scroll";
          cancel();
          return;
        }
        if (isHorizontalIntent) {
          intentRef.current = "swipe";
          setIsSwiping(true);
        }
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
          (vx > SWIPE_VELOCITY && offset > 36);

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
      pointer: { touch: true, mouse: true },
      eventOptions: { capture: true, passive: false },
      from: () => [x.get(), 0],
    },
  );

  return (
    <div
      ref={hostRef}
      {...bind()}
      data-swiping={isSwiping ? "true" : "false"}
      className={`people-swipe-card relative flex min-h-0 flex-1 flex-col ${
        isSwiping ? "touch-none cursor-grabbing" : "touch-pan-y cursor-grab"
      }`}
      style={{ touchAction: isSwiping ? "none" : "pan-y" }}
      onDragStart={(event) => event.preventDefault()}
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
            draggable={false}
            className="h-[127px] w-[127px] shrink-0 object-contain"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
