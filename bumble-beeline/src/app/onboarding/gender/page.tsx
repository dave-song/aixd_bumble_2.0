"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PhoneFrame, StatusBar } from "@/components/layout";
import { ProgressBar } from "@/components/ui";
import { ChevronRight } from "lucide-react";

const genderOptions = [
  { id: "woman", label: "Woman" },
  { id: "man", label: "Man" },
  { id: "nonbinary", label: "Nonbinary" },
];

export default function GenderSelectionPage() {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedGender) {
      router.push("/onboarding/interests");
    }
  };

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-white">
        <StatusBar />

        {/* Progress bar */}
        <div className="px-6 pt-4">
          <ProgressBar steps={5} currentStep={1} />
        </div>

        {/* Content */}
        <div className="flex-1 px-6 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-[28px] font-bold text-black leading-tight">
              Alex is a great name
            </h1>
            <p className="text-gray-600 mt-2 text-base leading-relaxed">
              We love that you're here. Pick the gender that best describes you,
              then add more about it if you like.
            </p>
          </motion.div>

          {/* Gender question */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-black mb-4">
              Which gender best describes you?
            </h2>

            <div className="space-y-3">
              {genderOptions.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => setSelectedGender(option.id)}
                  className={`
                    w-full flex items-center justify-between p-4 rounded-xl
                    border-2 transition-all duration-200
                    ${
                      selectedGender === option.id
                        ? "border-black bg-gray-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }
                  `}
                >
                  <span className="text-base font-medium text-black">
                    {option.label}
                  </span>
                  <div
                    className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center
                      transition-colors duration-200
                      ${
                        selectedGender === option.id
                          ? "border-black bg-black"
                          : "border-gray-300"
                      }
                    `}
                  >
                    {selectedGender === option.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-white"
                      />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Note */}
          <p className="mt-6 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1">
              <span className="w-4 h-4 rounded-full border border-gray-400 inline-flex items-center justify-center text-[10px]">
                i
              </span>
            </span>{" "}
            You can always update this later.{" "}
            <a href="#" className="underline text-gray-700">
              A note about gender on Bumble.
            </a>
          </p>
        </div>

        {/* Next button */}
        <div className="p-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={!selectedGender}
            className={`
              w-14 h-14 rounded-full flex items-center justify-center ml-auto
              transition-colors duration-200
              ${
                selectedGender
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-400"
              }
            `}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
      </div>
    </PhoneFrame>
  );
}
