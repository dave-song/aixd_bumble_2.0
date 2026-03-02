"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EXPANDED_BAR_COUNT = 18;
const WAVEFORM_COLOR = "#FFC629";
const PILL_BG = "#363636";
const COMPACT_DELAY_MS = 3000;

/** Animated waveform bars – full state: many bars with rounded pill ends */
function WaveformBarsExpanded() {
  const heights = [4, 6, 10, 8, 12, 6, 4, 8, 10, 4];
  return (
    <div className="flex items-end gap-0.5" style={{ height: 14 }} aria-hidden>
      {Array.from({ length: EXPANDED_BAR_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 shrink-0 rounded-full"
          style={{ backgroundColor: WAVEFORM_COLOR }}
          animate={{
            height: [
              heights[i % heights.length],
              heights[(i + 2) % heights.length],
              heights[(i + 4) % heights.length],
              heights[(i + 1) % heights.length],
              heights[i % heights.length],
            ],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.04,
          }}
        />
      ))}
    </div>
  );
}

/** Compact waveform: 5 bars, symmetric (middle tallest), rounded pill ends */
function WaveformBarsCompact() {
  const heights = [6, 10, 14, 10, 6];
  return (
    <div className="flex items-end gap-0.5" style={{ height: 14 }} aria-hidden>
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="w-1 shrink-0 rounded-full"
          style={{ backgroundColor: WAVEFORM_COLOR, height: h }}
          animate={{
            height: [h, h + 2, h - 2, h],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

/** White "A" icon in a square outline (AI/assist indicator) */
function AIcon() {
  return (
    <div
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] border border-white/90"
      aria-hidden
    >
      <span className="text-[12px] font-semibold text-white">A</span>
    </div>
  );
}

/**
 * Pill UI shown when user is "spilling the tea" and the Beeline card is out of view.
 * Full state: waveform + A icon. After a few seconds compacts to waveform-only;
 * hover expands back to full.
 */
export function VoiceWaveUI() {
  const [isCompact, setIsCompact] = useState(false);
  const compactTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Compact after a few seconds on mount, and again after user leaves hover
  useEffect(() => {
    compactTimerRef.current = setTimeout(() => setIsCompact(true), COMPACT_DELAY_MS);
    return () => {
      if (compactTimerRef.current) clearTimeout(compactTimerRef.current);
    };
  }, []);

  const handlePointerEnter = () => {
    if (compactTimerRef.current) {
      clearTimeout(compactTimerRef.current);
      compactTimerRef.current = null;
    }
    setIsCompact(false);
  };
  const handlePointerLeave = () => {
    if (compactTimerRef.current) clearTimeout(compactTimerRef.current);
    compactTimerRef.current = setTimeout(() => setIsCompact(true), COMPACT_DELAY_MS);
  };

  return (
    <motion.div
      className="flex cursor-default items-center gap-2 rounded-full"
      style={{ backgroundColor: PILL_BG }}
      initial={false}
      animate={{
        paddingLeft: isCompact ? 10 : 12,
        paddingRight: isCompact ? 10 : 12,
        paddingTop: 8,
        paddingBottom: 8,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      role="status"
      aria-live="polite"
      aria-label="Beeline is listening"
    >
      <AnimatePresence mode="wait">
        {isCompact ? (
          <motion.div
            key="compact"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <WaveformBarsCompact />
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <WaveformBarsExpanded />
            <AIcon />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
