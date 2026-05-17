"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PhoneFrame, StatusBar } from "@/components/layout";
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

        {/* Progress Bar; tap left side to go back */}
        <div className="relative w-full h-[10px] px-[20px] flex items-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="absolute left-0 top-0 bottom-0 w-1/3 min-w-[80px] z-10 cursor-pointer"
            aria-label="Go back"
          />
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

        {/* Fixed Bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-white px-[20px] pb-[24px] pt-[16px]">
          <div className="flex items-center justify-between">
            <button
              onClick={handleSkip}
              className="text-[16px] font-medium text-bumble-black"
            >
              Skip
            </button>
            <div className="flex items-center gap-[16px]">
              <span className="text-[14px] text-bumble-gray">
                {selected.length}/{MAX_SELECTIONS} selected
              </span>
              {selected.length === MAX_SELECTIONS ? (
                <Link
                  href="/onboarding/notifications"
                  className="w-[48px] h-[48px] rounded-full bg-bumble-black flex items-center justify-center transition-opacity opacity-100 shrink-0"
                  aria-label="Next page"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.887 12.0005L7.20098 5.31477C6.88665 5.00043 6.72898 4.60043 6.72898 4.11477C6.72898 3.6291 6.88665 3.2291 7.20098 2.91477C7.51531 2.60043 7.91531 2.44277 8.40098 2.44277C8.88665 2.44277 9.28665 2.60043 9.60098 2.91477L17.4873 10.8005C17.6583 10.9719 17.7793 11.1576 17.8506 11.3576C17.922 11.5576 17.9576 11.7719 17.9576 12.0005C17.9576 12.2291 17.922 12.4434 17.8506 12.6434C17.7793 12.8434 17.6583 13.0291 17.4873 13.2005L9.60098 21.0861C9.28665 21.4005 8.88665 21.5576 8.40098 21.5576C7.91531 21.5576 7.51531 21.4005 7.20098 21.0861C6.88665 20.7718 6.72898 20.3718 6.72898 19.8861C6.72898 19.4005 6.88665 19.0005 7.20098 18.6861L13.887 12.0005Z" fill="white"/>
                  </svg>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={selected.length > 0 ? handleContinue : undefined}
                  className={`w-[48px] h-[48px] rounded-full bg-bumble-black flex items-center justify-center transition-opacity shrink-0 ${
                    selected.length === 0 ? "opacity-30 cursor-not-allowed" : "opacity-100 cursor-pointer"
                  }`}
                  disabled={selected.length === 0}
                  aria-label="Next page"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.887 12.0005L7.20098 5.31477C6.88665 5.00043 6.72898 4.60043 6.72898 4.11477C6.72898 3.6291 6.88665 3.2291 7.20098 2.91477C7.51531 2.60043 7.91531 2.44277 8.40098 2.44277C8.88665 2.44277 9.28665 2.60043 9.60098 2.91477L17.4873 10.8005C17.6583 10.9719 17.7793 11.1576 17.8506 11.3576C17.922 11.5576 17.9576 11.7719 17.9576 12.0005C17.9576 12.2291 17.922 12.4434 17.8506 12.6434C17.7793 12.8434 17.6583 13.0291 17.4873 13.2005L9.60098 21.0861C9.28665 21.4005 8.88665 21.5576 8.40098 21.5576C7.91531 21.5576 7.51531 21.4005 7.20098 21.0861C6.88665 20.7718 6.72898 20.3718 6.72898 19.8861C6.72898 19.4005 6.88665 19.0005 7.20098 18.6861L13.887 12.0005Z" fill="white"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
