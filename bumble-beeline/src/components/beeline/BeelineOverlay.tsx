"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type BeelineState =
  | "collapsed"
  | "question"
  | "voice"
  | "typing"
  | "done";

interface BeelineOverlayProps {
  state: BeelineState;
  question?: string;
  onStateChange?: (state: BeelineState) => void;
  onAnswer?: (answer: "yes" | "no" | "spill") => void;
}

export default function BeelineOverlay({
  state,
  question = "Does seeing another CMU alum with a 'tech-grind' career feel like a match for your vibe?",
  onStateChange,
  onAnswer,
}: BeelineOverlayProps) {
  const [isExpanded, setIsExpanded] = useState(state !== "collapsed");

  const toggleExpand = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    onStateChange?.(newExpanded ? "question" : "collapsed");
  };

  const handleAnswer = (answer: "yes" | "no" | "spill") => {
    onAnswer?.(answer);
    if (answer === "spill") {
      onStateChange?.("voice");
    } else {
      onStateChange?.("done");
    }
  };

  return (
    <motion.div
      layout
      className="absolute top-[114px] left-[10px] right-[10px] z-30"
      initial={false}
    >
      <motion.div
        layout
        className="bg-[#ffe792] rounded-[18px] overflow-hidden"
        style={{ boxShadow: "0 0 12px rgba(0, 0, 0, 0.25)" }}
      >
        {/* Header */}
        <motion.button
          layout
          onClick={toggleExpand}
          className="w-full flex items-center justify-between p-[16px]"
        >
          <div className="relative h-[27px]">
            {/* Beeline badge background */}
            <img
              src="/icons/beeline-badge.svg"
              alt=""
              className="h-[27px] w-[95px]"
            />
            {/* Beeline text overlay */}
            <div className="absolute inset-0 flex items-center gap-[4px] pl-[8px]">
              <span
                className="text-[16px] italic font-semibold text-[#ffdb5b]"
                style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
              >
                Beeline
              </span>
              <img
                src="/icons/beeline-sparkle.svg"
                alt=""
                className="w-[20px] h-[20px]"
              />
            </div>
          </div>
          <div
            className={`transition-transform duration-200 ${isExpanded ? "-rotate-90" : "rotate-90"}`}
          >
            <img
              src="/icons/chevron-down.svg"
              alt=""
              className="w-[24px] h-[24px]"
            />
          </div>
        </motion.button>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {/* Question state */}
              {(state === "question" || state === "collapsed") && (
                <div className="px-[16px] pb-[16px] flex flex-col gap-[8px]">
                  <p
                    className="text-[16px] text-[#202020] leading-normal tracking-[-0.5px]"
                    style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
                  >
                    {question}
                  </p>
                  <div className="flex gap-[8px] items-center">
                    <button
                      onClick={() => handleAnswer("yes")}
                      className="w-[90px] bg-white rounded-[10px] px-[8px] py-[7px] text-[16px] text-[#202020] tracking-[-0.5px]"
                      style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleAnswer("no")}
                      className="w-[90px] bg-[#474747] rounded-[10px] px-[8px] py-[7px] text-[16px] text-white tracking-[-0.5px]"
                      style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
                    >
                      No
                    </button>
                    <button
                      onClick={() => handleAnswer("spill")}
                      className="flex-1 bg-[#202020] rounded-[10px] px-[8px] py-[7px] text-[16px] text-white tracking-[-0.5px] flex items-center justify-center gap-[8px]"
                      style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
                    >
                      <img
                        src="/icons/phone-icon.svg"
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <span>Actually, let's spill...</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Voice input state */}
              {state === "voice" && (
                <div className="px-[16px] pb-[16px] flex flex-col gap-[8px]">
                  <p
                    className="text-[16px] text-[#202020] leading-normal tracking-[-0.5px]"
                    style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
                  >
                    {question}
                  </p>
                  <div className="flex gap-[8px] items-center">
                    <button className="w-[90px] bg-white rounded-[10px] px-[8px] py-[7px] text-[16px] text-[#202020] tracking-[-0.5px]">
                      Yes
                    </button>
                    <button className="w-[90px] bg-[#474747] rounded-[10px] px-[8px] py-[7px] text-[16px] text-white tracking-[-0.5px]">
                      No
                    </button>
                    <div className="flex-1 bg-[#202020] rounded-[10px] px-[8px] py-[7px] flex items-center justify-center gap-[8px]">
                      <VoiceWaveform />
                    </div>
                  </div>
                </div>
              )}

              {/* Typing state */}
              {state === "typing" && (
                <div className="px-[16px] pb-[16px]">
                  <p className="text-[16px] text-[#202020]">
                    Last<span className="animate-pulse">...</span>
                  </p>
                </div>
              )}

              {/* Done state */}
              {state === "done" && (
                <div className="px-[16px] pb-[16px] flex flex-col gap-[8px]">
                  <p
                    className="text-[16px] text-[#202020] leading-normal tracking-[-0.5px]"
                    style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
                  >
                    {question}
                  </p>
                  <div className="flex gap-[8px] items-center">
                    <button className="w-[90px] bg-white rounded-[10px] px-[8px] py-[7px] text-[16px] text-[#202020] tracking-[-0.5px] border border-[#ffd93a]">
                      Yes
                    </button>
                    <button className="w-[90px] bg-[#474747] rounded-[10px] px-[8px] py-[7px] text-[16px] text-white tracking-[-0.5px]">
                      No
                    </button>
                    <button className="flex-1 bg-[#ffd93a] rounded-[10px] px-[8px] py-[7px] text-[16px] text-[#202020] tracking-[-0.5px] flex items-center justify-center gap-[8px]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                      Done!
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function VoiceWaveform() {
  return (
    <div className="flex items-center gap-[2px] h-[20px]">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] bg-white rounded-full"
          animate={{
            height: [6, 16, 6],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}
