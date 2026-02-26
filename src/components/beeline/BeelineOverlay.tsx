"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, Check, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type BeelineState = "collapsed" | "expanded" | "voice" | "done";

interface BeelineOverlayProps {
  question?: string;
  onYes?: () => void;
  onNo?: () => void;
  onVoiceStart?: () => void;
  onVoiceEnd?: () => void;
  className?: string;
}

export function BeelineOverlay({
  question = "Does seeing another CMU alum with a 'tech-grind' career feel like a match for your vibe?",
  onYes,
  onNo,
  onVoiceStart,
  onVoiceEnd,
  className = "",
}: BeelineOverlayProps) {
  const [state, setState] = useState<BeelineState>("collapsed");
  const [selectedAnswer, setSelectedAnswer] = useState<"yes" | "no" | null>(null);

  const handleToggle = () => {
    if (state === "collapsed") {
      setState("expanded");
    } else if (state === "expanded" || state === "voice") {
      setState("collapsed");
    }
  };

  const handleYes = () => {
    setSelectedAnswer("yes");
    setState("done");
    onYes?.();
  };

  const handleNo = () => {
    setSelectedAnswer("no");
    setState("done");
    onNo?.();
  };

  const handleVoice = () => {
    setState("voice");
    onVoiceStart?.();
  };

  const handleVoiceDone = () => {
    setState("done");
    onVoiceEnd?.();
  };

  return (
    <motion.div
      className={`bg-bumble-yellow-light rounded-[16px] overflow-hidden ${className}`}
      layout
    >
      {/* Header - Always visible */}
      <div
        className="flex items-center justify-between px-[16px] py-[12px] cursor-pointer"
        onClick={handleToggle}
      >
        <div className="flex items-center gap-[8px]">
          <span className="font-medium text-[14px] text-bumble-black">
            Beeline
          </span>
          <BeelineSparkle />
        </div>

        {state === "voice" && <VoiceWaveform />}

        <motion.div
          animate={{ rotate: state === "collapsed" ? 0 : 180 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronUp size={20} className="text-bumble-black" />
        </motion.div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {(state === "expanded" || state === "voice" || state === "done") && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {/* Question */}
            <div className="px-[16px] pb-[12px]">
              <p className="text-[16px] text-bumble-black leading-[22px] tracking-[-0.5px]">
                {state === "voice" || state === "done" ? question : "Does"}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-[8px] px-[16px] pb-[16px]">
              {state === "done" ? (
                <>
                  <BeelineButton
                    label="Yes"
                    selected={selectedAnswer === "yes"}
                    onClick={handleYes}
                  />
                  <BeelineButton
                    label="No"
                    variant="dark"
                    selected={selectedAnswer === "no"}
                    onClick={handleNo}
                  />
                  <DoneButton />
                </>
              ) : state === "voice" ? (
                <>
                  <BeelineButton label="Yes" onClick={handleYes} />
                  <BeelineButton label="No" variant="dark" onClick={handleNo} />
                  <VoiceRecordingButton onClick={handleVoiceDone} />
                </>
              ) : (
                <>
                  <BeelineButton label="Yes" onClick={handleYes} />
                  <BeelineButton label="No" variant="dark" onClick={handleNo} />
                  <ActuallyButton onClick={handleVoice} />
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function BeelineSparkle() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0L9.5 5.5L15 7L9.5 8.5L8 14L6.5 8.5L1 7L6.5 5.5L8 0Z"
        fill="#FFD93A"
      />
      <path
        d="M13 1L13.5 3L15.5 3.5L13.5 4L13 6L12.5 4L10.5 3.5L12.5 3L13 1Z"
        fill="#FFD93A"
      />
    </svg>
  );
}

function VoiceWaveform() {
  return (
    <div className="flex items-center gap-[2px] bg-bumble-black rounded-[8px] px-[12px] py-[6px]">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] bg-bumble-accent rounded-full"
          animate={{
            height: [8, 16, 8],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
      <div className="ml-[8px] w-[20px] h-[20px] bg-white/20 rounded flex items-center justify-center">
        <div className="w-[8px] h-[8px] bg-white rounded-sm" />
      </div>
    </div>
  );
}

interface BeelineButtonProps {
  label: string;
  variant?: "light" | "dark";
  selected?: boolean;
  onClick?: () => void;
}

function BeelineButton({
  label,
  variant = "light",
  selected = false,
  onClick,
}: BeelineButtonProps) {
  const baseClasses =
    "px-[16px] py-[8px] rounded-[10px] text-[16px] font-normal tracking-[-0.5px] transition-all";

  const variantClasses = selected
    ? "bg-bumble-accent text-bumble-black border-[1.5px] border-bumble-black"
    : variant === "dark"
    ? "bg-[#474747] text-white"
    : "bg-white text-bumble-black";

  return (
    <button className={`${baseClasses} ${variantClasses}`} onClick={onClick}>
      {label}
    </button>
  );
}

function ActuallyButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 flex items-center justify-center gap-[8px] bg-bumble-black text-white px-[16px] py-[8px] rounded-[10px] text-[16px] tracking-[-0.5px]"
    >
      <Phone size={16} />
      <span>Actually, let&apos;s spill...</span>
    </button>
  );
}

function VoiceRecordingButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 flex items-center justify-center gap-[8px] bg-bumble-black text-white px-[16px] py-[8px] rounded-[10px]"
    >
      <div className="flex items-center gap-[2px]">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="w-[2px] bg-bumble-accent rounded-full"
            animate={{
              height: [6, 14, 6],
            }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              delay: i * 0.08,
            }}
          />
        ))}
      </div>
      <div className="w-[20px] h-[20px] bg-white/20 rounded flex items-center justify-center ml-[4px]">
        <div className="w-[8px] h-[8px] bg-white rounded-sm" />
      </div>
    </button>
  );
}

function DoneButton() {
  return (
    <div className="flex-1 flex items-center justify-center gap-[8px] bg-bumble-accent text-bumble-black px-[16px] py-[8px] rounded-[10px] text-[16px] tracking-[-0.5px]">
      <Check size={16} />
      <span>Done!</span>
    </div>
  );
}
