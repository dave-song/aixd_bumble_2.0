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
          className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-[10px] bg-[#1F1F1F] px-3 py-2 text-[16px] font-normal tracking-[-0.5px] text-white"
        >
          <Phone size={18} className="shrink-0" />
          <span className="truncate">Actually, let&apos;s spill...</span>
        </button>
      </div>
    </motion.div>
  );
}
