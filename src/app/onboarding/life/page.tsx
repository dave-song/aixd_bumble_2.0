"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { PhoneFrame, StatusBar } from "@/components/layout";
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

        {/* Progress Bar - ~1/3 filled black, rest light grey */}
        <div className="relative w-full h-[10px] px-[20px] flex items-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="absolute left-0 top-0 bottom-0 w-1/3 min-w-[80px] z-10 cursor-pointer"
            aria-label="Go back"
          />
          <div className="relative flex-1 h-[3px] bg-[#D2D2D2] rounded-full">
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

        {/* Bottom: 0/3 selected + next arrow button (right side) */}
        <div className="absolute bottom-0 left-0 right-0 bg-white px-[20px] pb-[24px] pt-[16px]">
          <div className="flex items-center justify-end gap-[16px]">
            <span className="text-[14px] text-bumble-gray">
              {selected.length}/{MAX_SELECTIONS} selected
            </span>
            <button
              type="button"
              onClick={handleContinue}
              className={`w-[48px] h-[48px] rounded-full flex items-center justify-center transition-opacity ${
                selected.length === 0 ? "bg-neutral-300" : "bg-bumble-black"
              }`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.887 12.0005L7.20098 5.31477C6.88665 5.00043 6.72898 4.60043 6.72898 4.11477C6.72898 3.6291 6.88665 3.2291 7.20098 2.91477C7.51531 2.60043 7.91531 2.44277 8.40098 2.44277C8.88665 2.44277 9.28665 2.60043 9.60098 2.91477L17.4873 10.8005C17.6583 10.9719 17.7793 11.1576 17.8506 11.3576C17.922 11.5576 17.9576 11.7719 17.9576 12.0005C17.9576 12.2291 17.922 12.4434 17.8506 12.6434C17.7793 12.8434 17.6583 13.0291 17.4873 13.2005L9.60098 21.0861C9.28665 21.4005 8.88665 21.5576 8.40098 21.5576C7.91531 21.5576 7.51531 21.4005 7.20098 21.0861C6.88665 20.7718 6.72898 20.3718 6.72898 19.8861C6.72898 19.4005 6.88665 19.0005 7.20098 18.6861L13.887 12.0005Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
