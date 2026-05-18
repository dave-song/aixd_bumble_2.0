"use client";

import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PhoneFrame, StatusBar } from "@/components/layout";
import { OnboardingNavBar } from "@/components/onboarding/OnboardingNavButtons";
import { useOnboardingEnter } from "@/lib/useOnboardingEnter";
import { Info } from "lucide-react";

const genderOptions = [
  { id: "woman", label: "Woman" },
  { id: "man", label: "Man" },
  { id: "nonbinary", label: "Nonbinary" },
];

export default function GenderPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [userName, setUserName] = useState("Alex");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleContinue = useCallback(() => {
    if (selected) {
      localStorage.setItem("userGender", selected);
      router.push("/onboarding/interested-in");
    }
  }, [selected, router]);

  useOnboardingEnter(handleContinue, Boolean(selected));

  return (
    <PhoneFrame>
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-white">
        <StatusBar />

        <div className="relative w-full">
          <img
            src="/icons/onboarding/onboarding progress bar.svg"
            alt="Progress"
            className="w-full"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col px-[20px] pt-[24px]">
          {/* Title & Subtitle */}
          <h1 className="text-[28px] font-medium text-bumble-black leading-[34px] mb-[12px]">
            {userName} is a great name
          </h1>
          <p className="text-[16px] text-bumble-gray leading-[22px] mb-[32px]">
            {"We love that you're here. Pick the gender that best describes you, then add more about it if you like."}
          </p>

          {/* Section Header */}
          <h2 className="text-[16px] font-medium text-bumble-black mb-[16px]">
            Which gender best describes you?
          </h2>

          {/* Gender Options */}
          <div className="flex flex-col gap-[12px]">
            {genderOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelected(option.id)}
                className="w-full py-[16px] px-[20px] rounded-[12px] flex items-center justify-between bg-[#F5F5F5] transition-all duration-200"
              >
                <span className="text-[16px] text-bumble-black">
                  {option.label}
                </span>
                <div
                  className={`w-[24px] h-[24px] rounded-full border-2 flex items-center justify-center transition-all ${
                    selected === option.id
                      ? "border-bumble-black bg-bumble-black"
                      : "border-neutral-300 bg-white"
                  }`}
                >
                  {selected === option.id && (
                    <div className="w-[8px] h-[8px] rounded-full bg-white" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Info Text - directly below options */}
          <div className="flex items-start gap-[8px] mt-[24px]">
            <Info size={18} className="text-bumble-gray mt-[2px] shrink-0" />
            <p className="text-[14px] text-bumble-gray leading-[20px]">
              You can always update this later.{" "}
              <span className="underline">A note about gender on Bumble.</span>
            </p>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Next Button */}
          <OnboardingNavBar onNext={handleContinue} nextDisabled={!selected} />
                </div>
      </div>
    </PhoneFrame>
  );
}
