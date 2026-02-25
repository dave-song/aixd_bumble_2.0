'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Phone, Mic } from 'lucide-react';

export type BeelineState = 'collapsed' | 'question' | 'voice' | 'typing' | 'done';

interface BeelineOverlayProps {
  state: BeelineState;
  question?: string;
  onStateChange?: (state: BeelineState) => void;
  onAnswer?: (answer: 'yes' | 'no' | 'spill') => void;
}

export default function BeelineOverlay({
  state,
  question = "Does seeing another CMU alum with a 'tech-grind' career feel like a match for your vibe?",
  onStateChange,
  onAnswer,
}: BeelineOverlayProps) {
  const [isExpanded, setIsExpanded] = useState(state !== 'collapsed');

  const toggleExpand = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    onStateChange?.(newExpanded ? 'question' : 'collapsed');
  };

  const handleAnswer = (answer: 'yes' | 'no' | 'spill') => {
    onAnswer?.(answer);
    if (answer === 'spill') {
      onStateChange?.('voice');
    } else {
      onStateChange?.('done');
    }
  };

  return (
    <motion.div
      layout
      className="absolute top-0 left-0 right-0 z-20 mx-4 mt-4"
      initial={false}
    >
      <motion.div
        layout
        className="bg-beeline-yellow rounded-2xl overflow-hidden shadow-lg"
      >
        {/* Header - Always visible */}
        <motion.button
          layout
          onClick={toggleExpand}
          className="w-full flex items-center justify-between p-4"
        >
          <div className="flex items-center gap-2">
            <span className="bg-bumble-yellow text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              Beeline
              <span className="text-yellow-600">✦</span>
            </span>
          </div>
          {isExpanded ? (
            <ChevronUp size={20} className="text-gray-600" />
          ) : (
            <ChevronDown size={20} className="text-gray-600" />
          )}
        </motion.button>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {/* Question state */}
              {(state === 'question' || state === 'collapsed') && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-800 leading-relaxed mb-4">
                    {question}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAnswer('yes')}
                      className="flex-1 py-2.5 px-4 bg-white border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleAnswer('no')}
                      className="flex-1 py-2.5 px-4 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      No
                    </button>
                    <button
                      onClick={() => handleAnswer('spill')}
                      className="flex-1 py-2.5 px-4 bg-white border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-1"
                    >
                      <Phone size={14} />
                      Actually, let's spill...
                    </button>
                  </div>
                </div>
              )}

              {/* Voice input state */}
              {state === 'voice' && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-800 leading-relaxed mb-4">
                    {question}
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 px-4 bg-white border border-gray-200 rounded-full text-sm font-medium">
                      Yes
                    </button>
                    <button className="flex-1 py-2.5 px-4 bg-black text-white rounded-full text-sm font-medium">
                      No
                    </button>
                    <div className="flex-1 py-2.5 px-4 bg-black text-white rounded-full text-sm font-medium flex items-center justify-center gap-2">
                      <VoiceWaveform />
                      <Mic size={14} />
                    </div>
                  </div>
                </div>
              )}

              {/* Typing state */}
              {state === 'typing' && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-800">
                    Last<span className="animate-pulse">...</span>
                  </p>
                </div>
              )}

              {/* Done state */}
              {state === 'done' && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-800 leading-relaxed mb-4">
                    {question}
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 px-4 bg-white border border-gray-200 rounded-full text-sm font-medium">
                      Yes
                    </button>
                    <button className="flex-1 py-2.5 px-4 bg-black text-white rounded-full text-sm font-medium">
                      No
                    </button>
                    <button className="flex-1 py-2.5 px-4 bg-bumble-yellow rounded-full text-sm font-medium flex items-center justify-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

// Voice waveform animation component
function VoiceWaveform() {
  return (
    <div className="flex items-center gap-0.5 h-4">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="w-0.5 bg-white rounded-full"
          animate={{
            height: [4, 12, 4],
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
