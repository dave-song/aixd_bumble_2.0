"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PhoneFrame, StatusBar } from "@/components/layout";
import { ProgressBar, Chip } from "@/components/ui";
import { ChevronRight } from "lucide-react";
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

  const handleNext = () => {
    router.push("/onboarding/notifications");
  };

  const handleSkip = () => {
    router.push("/onboarding/notifications");
  };

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-white">
        <StatusBar />

        {/* Progress bar */}
        <div className="px-6 pt-4">
          <ProgressBar steps={5} currentStep={4} />
        </div>

        {/* Content */}
        <div className="flex-1 px-6 pt-8 overflow-auto hide-scrollbar pb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-[28px] font-bold text-black leading-tight">
              Tell us what you value in a person
            </h1>
            <p className="text-gray-600 mt-2 text-base leading-relaxed">
              Which qualities speak to your soul? Choose 3 that would make a
              connection that much stronger.
            </p>
          </motion.div>

          {/* Qualities */}
          <div className="mt-8">
            <h2 className="text-base font-semibold text-black mb-4">
              Their Qualities
            </h2>
            <div className="flex flex-wrap gap-2">
              {qualities.map((quality, index) => (
                <motion.div
                  key={quality.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                >
                  <Chip
                    label={quality.label}
                    selected={selectedQualities.includes(quality.id)}
                    onSelect={() => toggleQuality(quality.id)}
                    showPlus={!selectedQualities.includes(quality.id)}
                    showX={selectedQualities.includes(quality.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="p-6 flex items-center justify-between">
          <button
            onClick={handleSkip}
            className="text-base font-semibold text-black"
          >
            Skip
          </button>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {selectedQualities.length}/3 selected
            </span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={selectedQualities.length < 3}
              className={`
                w-14 h-14 rounded-full flex items-center justify-center
                transition-colors duration-200
                ${
                  selectedQualities.length >= 3
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-400"
                }
              `}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
