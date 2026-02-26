"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PhoneFrame, StatusBar } from "@/components/layout";
import { TitleSub, Button, Chip, ProgressBar } from "@/components/ui";
import { ChevronLeft } from "lucide-react";
import { lifeExperiences } from "@/lib/constants";

const MAX_SELECTIONS = 3;

export default function LifePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const allExperiences = [
    ...lifeExperiences.travel,
    ...lifeExperiences.education,
    ...lifeExperiences.personal,
  ];

  const toggleExperience = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else if (selected.length < MAX_SELECTIONS) {
      setSelected([...selected, id]);
    }
  };

  const handleContinue = () => {
    router.push("/onboarding/values");
  };

  return (
    <PhoneFrame>
      <div className="relative w-full h-full bg-white flex flex-col">
        <StatusBar />

        {/* Header with back button and progress */}
        <div className="px-[20px] pt-[8px] pb-[16px]">
          <div className="flex items-center gap-[12px] mb-[12px]">
            <button
              onClick={() => router.back()}
              className="w-[32px] h-[32px] flex items-center justify-center"
            >
              <ChevronLeft size={24} className="text-bumble-black" />
            </button>
            <ProgressBar current={3} total={5} className="flex-1" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <TitleSub
          title="Your life"
          subtitle={
            <span>
              Pick{" "}
              <span className="font-medium text-bumble-black">up to 3</span> to
              find friends with{" "}
              <span className="font-medium text-bumble-black">
                shared experiences.
              </span>
            </span>
          }
        />

        {/* Life Experiences */}
        <div className="flex-1 px-[20px] py-[16px] overflow-y-auto scrollbar-hide">
          {/* Travel Section */}
          <div className="mb-[24px]">
            <h3 className="text-[14px] font-medium text-bumble-gray mb-[12px] uppercase tracking-wider">
              Travel
            </h3>
            <div className="flex flex-wrap gap-[10px]">
              {lifeExperiences.travel.map((exp) => (
                <Chip
                  key={exp.id}
                  label={exp.label}
                  selected={selected.includes(exp.id)}
                  onClick={() => toggleExperience(exp.id)}
                  disabled={
                    !selected.includes(exp.id) &&
                    selected.length >= MAX_SELECTIONS
                  }
                />
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-[24px]">
            <h3 className="text-[14px] font-medium text-bumble-gray mb-[12px] uppercase tracking-wider">
              Education
            </h3>
            <div className="flex flex-wrap gap-[10px]">
              {lifeExperiences.education.map((exp) => (
                <Chip
                  key={exp.id}
                  label={exp.label}
                  selected={selected.includes(exp.id)}
                  onClick={() => toggleExperience(exp.id)}
                  disabled={
                    !selected.includes(exp.id) &&
                    selected.length >= MAX_SELECTIONS
                  }
                />
              ))}
            </div>
          </div>

          {/* Personal Section */}
          <div className="mb-[24px]">
            <h3 className="text-[14px] font-medium text-bumble-gray mb-[12px] uppercase tracking-wider">
              Personal
            </h3>
            <div className="flex flex-wrap gap-[10px]">
              {lifeExperiences.personal.map((exp) => (
                <Chip
                  key={exp.id}
                  label={exp.label}
                  selected={selected.includes(exp.id)}
                  onClick={() => toggleExperience(exp.id)}
                  disabled={
                    !selected.includes(exp.id) &&
                    selected.length >= MAX_SELECTIONS
                  }
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="px-[20px] pb-[40px]">
          <div className="flex justify-between items-center mb-[12px]">
            <span className="text-[14px] text-bumble-gray">
              {selected.length}/{MAX_SELECTIONS} selected
            </span>
          </div>
          <Button variant="primary" fullWidth onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </div>
    </PhoneFrame>
  );
}
