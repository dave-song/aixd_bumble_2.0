"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PhoneFrame, StatusBar } from "@/components/layout";
import {
  ProgressBar,
  GenderOption,
  TitleSub,
  BumbleButton,
  OnboardingHeader,
} from "@/components/onboarding";

const genderOptions = [
  { id: "woman", label: "Woman" },
  { id: "man", label: "Man" },
  { id: "nonbinary", label: "Nonbinary" },
];

export default function GenderSelectionPage() {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const handleBack = () => {
    router.back();
  };

  const handleSkip = () => {
    router.push("/onboarding/interests");
  };

  const handleNext = () => {
    if (selectedGender) {
      router.push("/onboarding/interests");
    }
  };

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-white">
        <StatusBar />

        {/* Header with back and skip */}
        <OnboardingHeader
          showBack={true}
          showSkip={true}
          onBack={handleBack}
          onSkip={handleSkip}
        />

        {/* Progress bar */}
        <ProgressBar step={1} totalSteps={5} />

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TitleSub
              title="Alex is a great name"
              subtitle="We love that you're here. Pick the gender that best describes you, then add more about it if you like."
            />
          </motion.div>

          {/* Gender question */}
          <div className="px-[20px] mt-[16px]">
            <h2
              className="text-[17px] font-medium text-[#202020] mb-[16px]"
              style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
            >
              Which gender best describes you?
            </h2>

            <div className="flex flex-col gap-[12px]">
              {genderOptions.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <GenderOption
                    label={option.label}
                    selected={selectedGender === option.id}
                    onClick={() => setSelectedGender(option.id)}
                    showExpandOption={selectedGender === option.id}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Note */}
          <div className="px-[20px] mt-[24px]">
            <p
              className="text-[14px] text-[#575656] leading-[20px]"
              style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
            >
              <span className="inline-flex items-center justify-center w-[16px] h-[16px] rounded-full border border-[#575656] text-[10px] mr-[4px]">
                i
              </span>
              You can always update this later.{" "}
              <a href="#" className="underline text-[#202020]">
                A note about gender on Bumble.
              </a>
            </p>
          </div>
        </div>

        {/* Bottom button area */}
        <div className="p-[20px]">
          <div className="flex justify-end">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={!selectedGender}
              className={`
                w-[56px] h-[56px] rounded-full flex items-center justify-center
                transition-colors duration-200
                ${
                  selectedGender
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
      </div>
    </PhoneFrame>
  );
}
