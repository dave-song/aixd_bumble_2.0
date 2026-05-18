"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { PhoneFrame, StatusBar } from "@/components/layout";
import {
  OnboardingForwardIcon,
  OnboardingNavBar,
} from "@/components/onboarding/OnboardingNavButtons";
import { useOnboardingEnter } from "@/lib/useOnboardingEnter";

const MAX_SELECTIONS = 3;

const lifeCategories = {
  travel: {
    label: "Travel",
    options: [
      { id: "new-in-town", emoji: "👋", label: "New in town" },
      { id: "living-abroad", emoji: "🛫", label: "Living abroad" },
      { id: "new-country", emoji: "🎉", label: "New country" },
      { id: "traveling", emoji: "🌍", label: "Traveling" },
    ],
  },
  education: {
    label: "Education",
    options: [
      { id: "in-college", emoji: "🎓", label: "In college" },
      { id: "university", emoji: "🎓", label: "University" },
      { id: "just-graduated", emoji: "🎓", label: "Just graduated" },
      {
        id: "going-back-to-school",
        emoji: "📚",
        label: "Going back to school",
      },
      { id: "working-and-studying", emoji: "💼", label: "Working & studying" },
      { id: "gap-year", emoji: "🌍", label: "Gap year" },
    ],
  },
  working: {
    label: "Working",
    options: [
      { id: "career-focused", emoji: "💻", label: "Career focused" },
      { id: "new-job", emoji: "🥳", label: "New job" },
      { id: "first-job", emoji: "💻", label: "First job" },
    ],
  },
};

export default function LifePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [showOnProfile, setShowOnProfile] = useState(false);

  const toggleExperience = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else if (selected.length < MAX_SELECTIONS) {
      setSelected([...selected, id]);
    }
  };

  const handleContinue = useCallback(() => {
    router.push("/onboarding/interests");
  }, [router]);

  useOnboardingEnter(handleContinue);

  return (
    <PhoneFrame>
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-white">
        <StatusBar />

        <div className="relative flex h-[10px] w-full items-center px-[20px]">
          <div className="relative h-[3px] flex-1 rounded-full bg-[#D2D2D2]">
            <div className="absolute left-0 top-0 h-full w-[38%] bg-black rounded-full" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="px-[20px] pt-[24px] pb-[36px]">
          <h1 className="text-[28px] font-medium text-bumble-black leading-[34px] mb-[8px]">
            Your life
          </h1>
          <p className="text-[16px] text-bumble-gray leading-[22px]">
            Pick <span className="font-medium text-bumble-black">up to 3</span>{" "}
            to find friends with{" "}
            <span className="font-medium text-bumble-black">
              shared experiences.
            </span>
          </p>
        </div>

        {/* Shown on my profile toggle */}
        <div className="flex items-center gap-[12px] px-[20px] mb-[24px]">
          <button
            type="button"
            role="switch"
            aria-checked={showOnProfile}
            onClick={() => setShowOnProfile(!showOnProfile)}
            className={`w-[50px] h-[28px] rounded-full p-[2px] transition-colors flex items-center ${
              showOnProfile
                ? "bg-bumble-black justify-end"
                : "bg-neutral-300 justify-start"
            }`}
          >
            <div className="w-[24px] h-[24px] rounded-full bg-white shadow-sm" />
          </button>
          <span className="text-[14px] text-bumble-black">
            Shown on my profile
          </span>
        </div>

        {/* Scrollable categories: Travel, Education, Working */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide px-[20px] pb-[100px]">
          {Object.entries(lifeCategories).map(([key, category], index) => (
            <div key={key}>
              {index > 0 && (
                <div className="mt-[24px] mb-[24px] h-[5px] bg-[#F3F3F3] -mx-[20px] w-[calc(100%_+_40px)] shrink-0" />
              )}
              <div>
                <h2 className="text-[16px] font-medium text-bumble-black mb-[16px]">
                  {category.label}
                </h2>
                <div className="flex flex-wrap gap-[6px]">
                  {category.options.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => toggleExperience(option.id)}
                      disabled={
                        !selected.includes(option.id) &&
                        selected.length >= MAX_SELECTIONS
                      }
                      className={`inline-flex items-center gap-[6px] h-[40px] px-[12px] rounded-full text-[14px] font-normal transition-all border ${
                        selected.includes(option.id)
                          ? "bg-[#FFDB5B] text-bumble-black border-[#FFDB5B]"
                          : "bg-[#F3F3F3] text-bumble-black border-[#F3F3F3] hover:border-neutral-300"
                      } ${
                        !selected.includes(option.id) &&
                        selected.length >= MAX_SELECTIONS
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <span>{option.emoji}</span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-white px-[20px] pb-6 pt-4">
          <OnboardingNavBar
            className="pb-0"
            nextSlot={
              <>
                <span className="text-[14px] text-bumble-gray">
                  {selected.length}/{MAX_SELECTIONS} selected
                </span>
                <button
                  type="button"
                  onClick={handleContinue}
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-opacity ${
                    selected.length === 0 ? "bg-neutral-300" : "bg-bumble-black"
                  }`}
                  aria-label="Continue"
                >
                  <OnboardingForwardIcon />
                </button>
              </>
            }
          />
        </div>
      </div>
    </PhoneFrame>
  );
}
