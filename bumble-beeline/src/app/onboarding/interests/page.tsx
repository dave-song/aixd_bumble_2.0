"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PhoneFrame, StatusBar } from "@/components/layout";
import { ProgressBar, Chip } from "@/components/ui";
import { ChevronRight, Search } from "lucide-react";
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

  const handleNext = () => {
    router.push("/onboarding/life");
  };

  const handleSkip = () => {
    router.push("/onboarding/life");
  };

  const filteredInterests = interests.filter((interest) =>
    interest.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-white">
        <StatusBar />

        {/* Progress bar */}
        <div className="px-6 pt-4">
          <ProgressBar steps={5} currentStep={2} />
        </div>

        {/* Content */}
        <div className="flex-1 px-6 pt-8 overflow-auto hide-scrollbar">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-[28px] font-bold text-black leading-tight">
              Choose 5 things you're really into
            </h1>
            <p className="text-gray-600 mt-2 text-base leading-relaxed">
              Proud foodie or big on bouldering? Add interests to your profile
              to help you match with people who love them too.
            </p>
          </motion.div>

          {/* Search */}
          <div className="mt-6 relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="What are you into?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-100 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Interests */}
          <div className="mt-6">
            <h2 className="text-base font-semibold text-gray-700 mb-4">
              You might like...
            </h2>
            <div className="flex flex-wrap gap-2">
              {filteredInterests.map((interest, index) => (
                <motion.div
                  key={interest.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                >
                  <Chip
                    emoji={interest.emoji}
                    label={interest.label}
                    selected={selectedInterests.includes(interest.id)}
                    onSelect={() => toggleInterest(interest.id)}
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
              {selectedInterests.length}/3 selected
            </span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={selectedInterests.length < 3}
              className={`
                w-14 h-14 rounded-full flex items-center justify-center
                transition-colors duration-200
                ${
                  selectedInterests.length >= 3
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
