"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { PhoneFrame, StatusBar } from "@/components/layout";
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

        {/* Progress Bar - 4th step; tap left side to go back */}
        <div className="relative w-full h-[10px] px-[20px] flex items-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="absolute left-0 top-0 bottom-0 w-1/3 min-w-[80px] z-10 cursor-pointer"
            aria-label="Go back"
          />
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

        {/* Fixed Bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-white px-[20px] pb-[24px] pt-[16px]">
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
              <button
                onClick={handleContinue}
                className={`w-[48px] h-[48px] rounded-full bg-bumble-black flex items-center justify-center transition-opacity ${
                  selected.length === 0 ? "opacity-30" : "opacity-100"
                }`}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.887 12.0005L7.20098 5.31477C6.88665 5.00043 6.72898 4.60043 6.72898 4.11477C6.72898 3.6291 6.88665 3.2291 7.20098 2.91477C7.51531 2.60043 7.91531 2.44277 8.40098 2.44277C8.88665 2.44277 9.28665 2.60043 9.60098 2.91477L17.4873 10.8005C17.6583 10.9719 17.7793 11.1576 17.8506 11.3576C17.922 11.5576 17.9576 11.7719 17.9576 12.0005C17.9576 12.2291 17.922 12.4434 17.8506 12.6434C17.7793 12.8434 17.6583 13.0291 17.4873 13.2005L9.60098 21.0861C9.28665 21.4005 8.88665 21.5576 8.40098 21.5576C7.91531 21.5576 7.51531 21.4005 7.20098 21.0861C6.88665 20.7718 6.72898 20.3718 6.72898 19.8861C6.72898 19.4005 6.88665 19.0005 7.20098 18.6861L13.887 12.0005Z" fill="white"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
