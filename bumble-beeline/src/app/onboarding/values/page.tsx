"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PhoneFrame, StatusBar } from "@/components/layout";
import {
  ProgressBar,
  ValueTag,
  TitleSub,
  OnboardingHeader,
} from "@/components/onboarding";
import { qualities } from "@/lib/mockData";

export default function ValuesPage() {
  const router = useRouter();
  const [selectedQualities, setSelectedQualities] = useState<string[]>([
    "emotional-intelligence",
    "humor",
    "sassiness",
  ]);

  const toggleQuality = (id: string) => {
    if (selectedQualities.includes(id)) {
      setSelectedQualities(selectedQualities.filter((q) => q !== id));
    } else if (selectedQualities.length < 3) {
      setSelectedQualities([...selectedQualities, id]);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleSkip = () => {
    router.push("/onboarding/notifications");
  };

  const handleNext = () => {
    router.push("/onboarding/notifications");
  };

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-white">
        <StatusBar />

        {/* Header */}
        <OnboardingHeader
          showBack={true}
          showSkip={true}
          onBack={handleBack}
          onSkip={handleSkip}
        />

        {/* Progress bar */}
        <ProgressBar step={4} totalSteps={5} />

        {/* Content */}
        <div className="flex-1 overflow-auto hide-scrollbar pb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TitleSub
              title="Tell us what you value in a person"
              subtitle="Which qualities speak to your soul? Choose 3 that would make a connection that much stronger."
            />
          </motion.div>

          {/* Qualities */}
          <div className="px-[20px] mt-[24px]">
            <h2
              className="text-[17px] font-medium text-[#202020] mb-[16px]"
              style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
            >
              Their Qualities
            </h2>
            <div className="flex flex-wrap gap-[8px]">
              {qualities.map((quality, index) => (
                <motion.div
                  key={quality.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                >
                  <ValueTag
                    label={quality.label}
                    selected={selectedQualities.includes(quality.id)}
                    onClick={() => toggleQuality(quality.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="p-[20px] flex items-center justify-between">
          <span
            className="text-[14px] text-[#575656]"
            style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
          >
            {selectedQualities.length}/3 selected
          </span>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={selectedQualities.length < 3}
            className={`
              w-[56px] h-[56px] rounded-full flex items-center justify-center
              transition-colors duration-200
              ${
                selectedQualities.length >= 3
                  ? "bg-[#202020] text-white"
                  : "bg-[#e5e5e5] text-[#9ca3af]"
              }
            `}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6L15 12L9 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </PhoneFrame>
  );
}
