"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronUp, Phone } from "lucide-react";
import { motion } from "framer-motion";

const QUESTION_TEXT =
  "Does seeing another CMU alum with a 'tech-grind' career feel like a match for your vibe?";
const TYPEWRITER_MS_PER_CHAR = 35;

interface BeelinePopoverCardProps {
  onClose: () => void;
  onFullyExpanded?: () => void;
  onAnswer?: (answer: "yes" | "no") => void;
  onSpillingStateChange?: (isSpilling: boolean, isSpillDone: boolean) => void;
}

export function BeelinePopoverCard({
  onClose,
  onFullyExpanded,
  onAnswer,
  onSpillingStateChange,
}: BeelinePopoverCardProps) {
  const [typedLength, setTypedLength] = useState(0);
  const [expandDone, setExpandDone] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<"yes" | "no" | null>(null);
  const [isSpilling, setIsSpilling] = useState(false);
  const [isSpillDone, setIsSpillDone] = useState(false);
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

  useEffect(() => {
    onSpillingStateChange?.(isSpilling, isSpillDone);
  }, [isSpilling, isSpillDone, onSpillingStateChange]);

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
      className="w-full overflow-hidden rounded-[14px] border border-[#E8D5A3] bg-bumble-yellow-light shadow-sm"
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
      <div className="flex items-center justify-between px-3.5 pt-2.5 pb-1">
        <img
          src="/icons/user_profile_assets/beeline_highlevel_tag.svg"
          alt="Beeline"
          className="h-6 w-auto object-contain"
        />
        <button
          type="button"
          onClick={onClose}
          className="rounded p-1 text-bumble-gray hover:bg-black/5"
          aria-label="Collapse"
        >
          <ChevronUp size={18} strokeWidth={2} />
        </button>
      </div>

      {/* Question with typewriter */}
      <div className="px-3.5 pb-2">
        <p className="min-h-[38px] text-[14px] leading-[19px] tracking-[-0.5px] text-bumble-black">
          {QUESTION_TEXT.slice(0, typedLength)}
          {typedLength < QUESTION_TEXT.length && (
            <span className="animate-pulse">|</span>
          )}
        </p>
      </div>

      {/* Buttons: Yes & No narrow; selected = Bumble yellow */}
      <div className="flex w-full items-stretch gap-1.5 px-3.5 pb-3">
        <button
          type="button"
          onClick={handleYes}
          className={`shrink-0 rounded-[8px] border px-2 py-[6px] text-[14px] font-normal tracking-[-0.5px] min-w-[72px] ${
            selectedAnswer === "yes"
              ? "border-bumble-black bg-[#FFD93A] text-[#1F1F1F]"
              : "border-[#E5E5E5] bg-white text-[#1F1F1F]"
          }`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={handleNo}
          className={`shrink-0 rounded-[8px] border px-2 py-[6px] text-[14px] font-normal tracking-[-0.5px] min-w-[72px] ${
            selectedAnswer === "no"
              ? "border-bumble-black bg-[#FFD93A] text-[#1F1F1F]"
              : "border-transparent bg-[#363636] text-white"
          }`}
        >
          No
        </button>
        <button
          type="button"
          onClick={() => {
            if (isSpillDone) return;
            if (isSpilling) {
              setIsSpillDone(true);
            } else {
              setIsSpilling(true);
            }
          }}
          className={`flex min-h-[30px] min-w-0 flex-1 items-center justify-center gap-1.5 rounded-[8px] px-2 py-[6px] text-[14px] font-normal tracking-[-0.5px] ${
            isSpillDone
              ? "bg-[#FFD93A] text-bumble-black"
              : "bg-[#1F1F1F] text-white"
          }`}
        >
          {isSpillDone ? (
            <>
              <Check size={16} className="shrink-0" strokeWidth={2.5} />
              <span>Done!</span>
            </>
          ) : isSpilling ? (
            <>
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-[#E00900]"
                style={{ animation: "spill-blink 1s ease-in-out infinite" }}
              />
              <TeacupWithSteam className="shrink-0" />
            </>
          ) : (
            <>
              <Phone size={16} className="shrink-0" />
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
      {/* Steam: smooth wavy strokes rising gently */}
      <motion.g
        animate={{
          y: [0, -1.5, -3, -4.5, -6],
          opacity: [0.5, 0.85, 0.6, 0.4, 0.5],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <path
          d="M9 8 Q8 6 9.5 4 Q11 2 9 0.5"
          stroke="#FFD93A"
          strokeWidth="1.1"
          strokeLinecap="round"
          fill="none"
        />
      </motion.g>
      <motion.g
        animate={{
          y: [0, -1.5, -3, -4.5, -6],
          opacity: [0.5, 0.85, 0.6, 0.4, 0.5],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <path
          d="M12 7 Q11 5 12.5 3 Q14 1 12 -0.5"
          stroke="#FFD93A"
          strokeWidth="1.1"
          strokeLinecap="round"
          fill="none"
        />
      </motion.g>
      <motion.g
        animate={{
          y: [0, -1.5, -3, -4.5, -6],
          opacity: [0.5, 0.85, 0.6, 0.4, 0.5],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <path
          d="M15 8 Q16 6 14.5 4 Q13 2 15 0.5"
          stroke="#FFD93A"
          strokeWidth="1.1"
          strokeLinecap="round"
          fill="none"
        />
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
