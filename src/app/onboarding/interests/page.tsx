"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { PhoneFrame, StatusBar } from "@/components/layout";
import { OnboardingNavBar } from "@/components/onboarding/OnboardingNavButtons";
import { useOnboardingEnter } from "@/lib/useOnboardingEnter";
import { Search } from "lucide-react";

const MAX_SELECTIONS = 5;

const interests = [
  { id: "rnb", emoji: "🎵", label: "R&B" },
  { id: "writing", emoji: "📝", label: "Writing" },
  { id: "horror", emoji: "📺", label: "Horror" },
  { id: "feminism", emoji: "💛", label: "Feminism" },
  { id: "concerts", emoji: "🎫", label: "Concerts" },
  { id: "art", emoji: "🎨", label: "Art" },
  { id: "crafts", emoji: "🧵", label: "Crafts" },
  { id: "dogs", emoji: "🐕", label: "Dogs" },
  { id: "camping", emoji: "⛺", label: "Camping" },
  { id: "cats", emoji: "🐱", label: "Cats" },
  { id: "dancing", emoji: "💃", label: "Dancing" },
  { id: "foodie", emoji: "🍜", label: "Foodie" },
  { id: "festivals", emoji: "🎪", label: "Festivals" },
  { id: "vegetarian", emoji: "🥗", label: "Vegetarian" },
  { id: "lgbtq", emoji: "🏳️‍🌈", label: "LGBTQ+ rights" },
  { id: "museums", emoji: "🏛️", label: "Museums & galleries" },
  { id: "country", emoji: "🎵", label: "Country" },
  { id: "gardening", emoji: "🌱", label: "Gardening" },
];

export default function InterestsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleInterest = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else if (selected.length < MAX_SELECTIONS) {
      setSelected([...selected, id]);
    }
  };

  const handleContinue = useCallback(() => {
    router.push("/onboarding/values");
  }, [router]);

  const handleSkip = useCallback(() => {
    router.push("/onboarding/values");
  }, [router]);

  useOnboardingEnter(handleContinue);

  const filteredInterests = interests.filter((interest) =>
    interest.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PhoneFrame>
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-white">
        <StatusBar />

        <div className="relative w-full h-[10px] px-[20px] flex items-center">
          <div className="relative flex-1 h-[3px] bg-[#D2D2D2] rounded-full">
            <div className="absolute left-0 top-0 h-full w-[80%] bg-black rounded-full" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col px-[20px] pt-[24px] overflow-hidden">
          {/* Title & Subtitle */}
          <h1 className="text-[28px] font-medium text-bumble-black leading-[34px] mb-[8px]">
            {"Choose 5 things you're really into"}
          </h1>
          <p className="text-[16px] text-bumble-gray leading-[22px] mb-[24px]">
            Proud foodie or big on bouldering? Add interests to your profile to help you match with people who love them too.
          </p>

          {/* Search Bar */}
          <div className="flex items-center gap-[12px] px-[16px] py-[12px] bg-[#F5F5F5] rounded-[0.5rem] mb-[24px]">
            <Search size={20} className="text-bumble-gray" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleContinue();
                }
              }}
              placeholder="What are you into?"
              className="flex-1 bg-transparent text-[16px] text-bumble-black placeholder:text-bumble-gray outline-none"
            />
          </div>

          {/* You might like section */}
          <h2 className="text-[16px] font-medium text-bumble-black mb-[16px]">
            You might like...
          </h2>

          {/* Interest Tags - Scrollable */}
          <div className="flex-1 overflow-y-auto scrollbar-hide pb-[100px]">
            <div className="flex flex-wrap gap-[6px]">
              {filteredInterests.map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  disabled={!selected.includes(interest.id) && selected.length >= MAX_SELECTIONS}
                  className={`h-[40px] px-[16px] rounded-full flex items-center gap-[6px] transition-all ${
                    selected.includes(interest.id)
                      ? "bg-bumble-accent text-bumble-black"
                      : "bg-[#F3F3F3] text-bumble-black"
                  } ${
                    !selected.includes(interest.id) && selected.length >= MAX_SELECTIONS
                      ? "opacity-50"
                      : ""
                  }`}
                >
                  <span>{interest.emoji}</span>
                  <span className="text-[14px]">{interest.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-white px-[20px] pb-6 pt-4">
          <OnboardingNavBar
            className="pb-0"
            onNext={handleContinue}
            nextDisabled={selected.length === 0}
          >
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
          </OnboardingNavBar>
        </div>
      </div>
    </PhoneFrame>
  );
}
