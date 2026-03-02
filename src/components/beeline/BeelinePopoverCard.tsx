"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronUp, Phone } from "lucide-react";
import { motion } from "framer-motion";

const QUESTION_TEXT =
  "Does seeing another CMU alum with a 'tech-grind' career feel like a match for your vibe?";
const TYPEWRITER_MS_PER_CHAR = 35;

interface BeelinePopoverCardProps {
  onClose: () => void;
  onFullyExpanded?: () => void;
  onAnswer?: (answer: "yes" | "no") => void;
}

export function BeelinePopoverCard({
  onClose,
  onFullyExpanded,
  onAnswer,
}: BeelinePopoverCardProps) {
  const [typedLength, setTypedLength] = useState(0);
  const [expandDone, setExpandDone] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<"yes" | "no" | null>(null);
  const [isSpilling, setIsSpilling] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const hasFiredFullyExpanded = useRef(false);

  const tryFireFullyExpanded = () => {
    if (
      hasFiredFullyExpanded.current ||
      !onFullyExpanded ||
      !expandDone ||
      typedLength < QUESTION_TEXT.length
    ) {
      return;
    }
    hasFiredFullyExpanded.current = true;
    onFullyExpanded();
  };

  // Typewriter: advance one character at a time
  useEffect(() => {
    if (typedLength >= QUESTION_TEXT.length) {
      tryFireFullyExpanded();
      return;
    }
    const t = setTimeout(() => {
      setTypedLength((n) => n + 1);
    }, TYPEWRITER_MS_PER_CHAR);
    return () => clearTimeout(t);
  }, [typedLength, expandDone]);

  const handleExpandComplete = () => {
    setExpandDone(true);
  };

  useEffect(() => {
    tryFireFullyExpanded();
  }, [expandDone, typedLength]);

  const handleYes = () => {
    setSelectedAnswer("yes");
    setTimeout(() => setIsExiting(true), 200);
  };

  const handleNo = () => {
    setSelectedAnswer("no");
    setTimeout(() => setIsExiting(true), 200);
  };

  const handleAnimationComplete = () => {
    if (isExiting && selectedAnswer) {
      onAnswer?.(selectedAnswer);
    } else {
      handleExpandComplete();
    }
  };

  return (
    <motion.div
      className="w-full overflow-hidden rounded-2xl border border-[#E8D5A3] bg-bumble-yellow-light shadow-sm"
      initial={{
        opacity: 0,
        y: -12,
      }}
      animate={{
        opacity: isExiting ? 0 : 1,
        y: isExiting ? -12 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 28,
      }}
      onAnimationComplete={handleAnimationComplete}
    >
      {/* Beeline tag (SVG) + chevron row */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <img
          src="/icons/user_profile_assets/beeline_highlevel_tag.svg"
          alt="Beeline"
          className="h-7 w-auto object-contain"
        />
        <button
          type="button"
          onClick={onClose}
          className="rounded p-1.5 text-bumble-gray hover:bg-black/5"
          aria-label="Collapse"
        >
          <ChevronUp size={20} strokeWidth={2} />
        </button>
      </div>

      {/* Question with typewriter */}
      <div className="px-4 pb-3">
        <p className="min-h-11 text-[16px] leading-[22px] tracking-[-0.5px] text-bumble-black">
          {QUESTION_TEXT.slice(0, typedLength)}
          {typedLength < QUESTION_TEXT.length && (
            <span className="animate-pulse">|</span>
          )}
        </p>
      </div>

      {/* Buttons: Yes & No narrow; selected = Bumble yellow */}
      <div className="flex w-full items-stretch gap-2 px-4 pb-4">
        <button
          type="button"
          onClick={handleYes}
          className={`shrink-0 rounded-[10px] border px-4 py-2 text-[16px] font-normal tracking-[-0.5px] ${
            selectedAnswer === "yes"
              ? "border-bumble-black bg-[#FFD93A] text-[#1F1F1F]"
              : "border-transparent bg-white text-[#1F1F1F]"
          }`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={handleNo}
          className={`shrink-0 rounded-[10px] border px-4 py-2 text-[16px] font-normal tracking-[-0.5px] ${
            selectedAnswer === "no"
              ? "border-bumble-black bg-[#FFD93A] text-[#1F1F1F]"
              : "border-transparent bg-[#363636] text-white"
          }`}
        >
          No
        </button>
        <button
          type="button"
          onClick={() => setIsSpilling(true)}
          className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-[10px] bg-[#1F1F1F] px-3 py-2 text-[16px] font-normal tracking-[-0.5px] text-white"
        >
          {isSpilling ? (
            <>
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-[#E00900]"
                style={{ animation: "spill-blink 1s ease-in-out infinite" }}
              />
              <TeacupWithSteam className="shrink-0" />
            </>
          ) : (
            <>
              <Phone size={18} className="shrink-0" />
              <span className="truncate">Actually, let&apos;s spill...</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

/** Teacup outline with animated steam (yellow, for "spill the tea" state) */
function TeacupWithSteam({ className }: { className?: string }) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Steam: wavy lines rising up */}
      <motion.g animate={{ y: [0, -2, -4] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M9 7 Q8 5 9 3" stroke="#FFD93A" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity={0.8} />
      </motion.g>
      <motion.g animate={{ y: [0, -2, -4] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}>
        <path d="M12 6 Q13 4 12 2" stroke="#FFD93A" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity={0.8} />
      </motion.g>
      <motion.g animate={{ y: [0, -2, -4] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}>
        <path d="M15 7 Q16 5 15 3" stroke="#FFD93A" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity={0.8} />
      </motion.g>
      {/* Cup body + rim */}
      <path
        d="M5 9 L5 15 C5 16.5 6.5 18 8 18 L14 18 C15.5 18 17 16.5 17 15 L17 9 L5 9"
        stroke="#FFD93A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Handle (right side) */}
      <path
        d="M17 11 L19 11 Q20 13 19 15 L17 15"
        stroke="#FFD93A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Saucer line */}
      <path d="M4 18 L8 18 M14 18 L20 18" stroke="#FFD93A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}
