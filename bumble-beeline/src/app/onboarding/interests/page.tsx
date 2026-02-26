"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PhoneFrame, StatusBar } from "@/components/layout";
import {
  ProgressBar,
  InterestTag,
  TitleSub,
  OnboardingHeader,
} from "@/components/onboarding";
import { interests } from "@/lib/mockData";

export default function InterestsPage() {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "concerts",
    "vegetarian",
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== id));
    } else if (selectedInterests.length < 5) {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleSkip = () => {
    router.push("/onboarding/life");
  };

  const handleNext = () => {
    router.push("/onboarding/life");
  };

  const filteredInterests = interests.filter((interest) =>
    interest.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <ProgressBar step={2} totalSteps={5} />

        {/* Content */}
        <div className="flex-1 overflow-auto hide-scrollbar">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TitleSub
              title="Choose 5 things you're really into"
              subtitle="Proud foodie or big on bouldering? Add interests to your profile to help you match with people who love them too."
            />
          </motion.div>

          {/* Search */}
          <div className="px-[20px] mt-[16px]">
            <div className="relative">
              <svg
                className="absolute left-[16px] top-1/2 -translate-y-1/2 text-[#575656]"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="What are you into?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-[48px] pr-[16px] py-[12px] rounded-full bg-[#f3f3f3] text-[16px] text-[#202020] placeholder:text-[#575656] focus:outline-none"
                style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
              />
            </div>
          </div>

          {/* Interests */}
          <div className="px-[20px] mt-[24px]">
            <h2
              className="text-[17px] font-medium text-[#575656] mb-[16px]"
              style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
            >
              You might like...
            </h2>
            <div className="flex flex-wrap gap-[6px]">
              {filteredInterests.map((interest, index) => (
                <motion.div
                  key={interest.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                >
                  <InterestTag
                    emoji={interest.emoji}
                    label={interest.label}
                    selected={selectedInterests.includes(interest.id)}
                    onClick={() => toggleInterest(interest.id)}
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
            {selectedInterests.length}/5 selected
          </span>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={selectedInterests.length < 3}
            className={`
              w-[56px] h-[56px] rounded-full flex items-center justify-center
              transition-colors duration-200
              ${
                selectedInterests.length >= 3
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
