"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PhoneFrame, StatusBar } from "@/components/layout";
import {
  OnboardingForwardIcon,
  OnboardingNavBar,
  OnboardingNextButton,
} from "@/components/onboarding/OnboardingNavButtons";
import { useOnboardingEnter } from "@/lib/useOnboardingEnter";
import { Plus, X } from "lucide-react";

const MAX_SELECTIONS = 3;

const qualities = [
  { id: "emotional-intelligence", label: "Emotional intelligence" },
  { id: "humor", label: "Humor" },
  { id: "sassiness", label: "Sassiness" },
  { id: "ambition", label: "Ambition" },
  { id: "confidence", label: "Confidence" },
  { id: "curiosity", label: "Curiosity" },
  { id: "empathy", label: "Empathy" },
  { id: "generosity", label: "Generosity" },
  { id: "gratitude", label: "Gratitude" },
  { id: "humility", label: "Humility" },
  { id: "kindness", label: "Kindness" },
  { id: "leadership", label: "Leadership" },
  { id: "loyalty", label: "Loyalty" },
  { id: "openness", label: "Openness" },
  { id: "optimism", label: "Optimism" },
  { id: "playfulness", label: "Playfulness" },
  { id: "sarcasm", label: "Sarcasm" },
];

export default function ValuesPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleQuality = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else if (selected.length < MAX_SELECTIONS) {
      setSelected([...selected, id]);
    }
  };

  const handleContinue = useCallback(() => {
    router.push("/onboarding/notifications");
  }, [router]);

  const handleSkip = useCallback(() => {
    router.push("/onboarding/notifications");
  }, [router]);

  useOnboardingEnter(handleContinue, selected.length > 0);

  return (
    <PhoneFrame>
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-white">
        <StatusBar />

        <div className="relative w-full h-[10px] px-[20px] flex items-center">
          <div className="relative flex-1 h-[3px] bg-[#D2D2D2] rounded-full">
            <div className="absolute left-0 top-0 h-full w-[90%] bg-black rounded-full" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col px-[20px] pt-[24px] overflow-hidden">
          {/* Title & Subtitle */}
          <h1 className="text-[28px] font-medium text-bumble-black leading-[34px] mb-[8px]">
            Tell us what you value in a person
          </h1>
          <p className="text-[16px] text-bumble-gray leading-[22px] mb-[24px]">
            Which qualities speak to your soul? Choose 3 that would make a connection that much stronger.
          </p>

          {/* Their Qualities */}
          <h2 className="text-[16px] font-medium text-bumble-black mb-[16px]">
            Their Qualities
          </h2>

          {/* Value Tags - 40px height, match value tag.svg style */}
          <div className="flex-1 overflow-y-auto scrollbar-hide pb-[100px]">
            <div className="flex flex-wrap gap-[8px]">
              {qualities.map((quality) => {
                const isSelected = selected.includes(quality.id);
                return (
                  <button
                    key={quality.id}
                    onClick={() => toggleQuality(quality.id)}
                    disabled={!isSelected && selected.length >= MAX_SELECTIONS}
                    className={`h-[40px] pl-[16px] pr-[12px] rounded-full flex items-center gap-[8px] transition-all ${
                      isSelected
                        ? "bg-[#FFDB5B] text-bumble-black"
                        : "bg-[#F2F3F3] text-bumble-black border border-neutral-200"
                    } ${
                      !isSelected && selected.length >= MAX_SELECTIONS
                        ? "opacity-50"
                        : ""
                    }`}
                  >
                    <span className="text-[14px] whitespace-nowrap">{quality.label}</span>
                    {isSelected ? (
                      <X size={16} className="shrink-0" />
                    ) : (
                      <Plus size={16} className="shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 bg-white px-[20px] pb-6 pt-4">
          <OnboardingNavBar
            className="pb-0"
            nextSlot={
              <>
                <button
                  type="button"
                  onClick={handleSkip}
                  className="text-[16px] font-medium text-bumble-black"
                >
                  Skip
                </button>
                <span className="text-[14px] text-bumble-gray">
                  {selected.length}/{MAX_SELECTIONS} selected
                </span>
                {selected.length === MAX_SELECTIONS ? (
                  <Link
                    href="/onboarding/notifications"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-bumble-black"
                    aria-label="Next page"
                  >
                    <OnboardingForwardIcon />
                  </Link>
                ) : (
                  <OnboardingNextButton
                    onClick={handleContinue}
                    disabled={selected.length === 0}
                    aria-label="Next page"
                  />
                )}
              </>
            }
          />
        </div>
      </div>
    </PhoneFrame>
  );
}
