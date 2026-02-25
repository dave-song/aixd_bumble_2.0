'use client';

import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

interface BeelineQuestionProps {
  question: string;
  onYes?: () => void;
  onNo?: () => void;
  onSpill?: () => void;
  selectedAnswer?: 'yes' | 'no' | null;
  showDone?: boolean;
}

export default function BeelineQuestion({
  question,
  onYes,
  onNo,
  onSpill,
  selectedAnswer,
  showDone = false,
}: BeelineQuestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-beeline-yellow rounded-2xl p-4"
    >
      {/* Beeline badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-bumble-yellow text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
          Beeline
          <span className="text-yellow-600">✦</span>
        </span>
      </div>

      {/* Question text */}
      <p className="text-sm text-gray-800 leading-relaxed mb-4">
        {question}
      </p>

      {/* Answer buttons */}
      <div className="flex gap-2">
        <button
          onClick={onYes}
          className={`
            flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-colors
            ${selectedAnswer === 'yes' 
              ? 'bg-bumble-yellow border border-bumble-yellow' 
              : 'bg-white border border-gray-200 hover:bg-gray-50'
            }
          `}
        >
          Yes
        </button>
        <button
          onClick={onNo}
          className={`
            flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-colors
            ${selectedAnswer === 'no'
              ? 'bg-black text-white'
              : 'bg-black text-white hover:bg-gray-800'
            }
          `}
        >
          No
        </button>
        {showDone ? (
          <button className="flex-1 py-2.5 px-4 bg-bumble-yellow rounded-full text-sm font-medium flex items-center justify-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20,6 9,17 4,12" />
            </svg>
            Done!
          </button>
        ) : (
          <button
            onClick={onSpill}
            className="flex-1 py-2.5 px-4 bg-white border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-1"
          >
            <Phone size={14} />
            <span className="truncate">Actually, let's spill...</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}
