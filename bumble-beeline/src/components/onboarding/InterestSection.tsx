"use client";

import InterestTag from "./InterestTag";

interface Interest {
  emoji: string;
  label: string;
}

interface InterestSectionProps {
  title: string;
  interests: Interest[];
  selectedInterests: string[];
  onToggleInterest: (label: string) => void;
}

export default function InterestSection({
  title,
  interests,
  selectedInterests,
  onToggleInterest,
}: InterestSectionProps) {
  return (
    <div className="flex flex-col gap-[14px] items-start w-[398px]">
      <h3
        className="text-[17px] font-medium text-[#202020] leading-[33px] w-full"
        style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
      >
        {title}
      </h3>
      <div className="flex flex-wrap gap-[6px] items-center w-full">
        {interests.map((interest) => (
          <InterestTag
            key={interest.label}
            emoji={interest.emoji}
            label={interest.label}
            selected={selectedInterests.includes(interest.label)}
            onClick={() => onToggleInterest(interest.label)}
          />
        ))}
      </div>
    </div>
  );
}
