"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { PhoneFrame, StatusBar } from "@/components/layout";
import { OnboardingNavBar } from "@/components/onboarding/OnboardingNavButtons";
import { useOnboardingEnter } from "@/lib/useOnboardingEnter";

export default function NamePage() {
  const router = useRouter();
  const [name, setName] = useState("");

  /** Capitalize first letter, lowercase the rest (e.g. DAVE → Dave, dave → Dave) */
  function formatName(value: string): string {
    const trimmed = value.trim();
    if (!trimmed) return trimmed;
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  }

  const handleContinue = useCallback(() => {
    if (name.trim()) {
      localStorage.setItem("userName", formatName(name));
      router.push("/onboarding/gender");
    }
  }, [name, router]);

  useOnboardingEnter(handleContinue, Boolean(name.trim()));

  return (
    <PhoneFrame>
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-white">
        <StatusBar />

        <div className="relative w-full h-[10px] px-[20px] flex items-center">
          <div className="h-[3px] flex-1 rounded-full bg-[#D2D2D2]" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col px-[20px] pt-[24px]">
          {/* Title */}
          <h1 className="text-[28px] font-medium text-bumble-black leading-[34px] mb-[12px]">
            {"What's your first name?"}
          </h1>
          <p className="text-[16px] text-bumble-gray leading-[22px] mb-[32px]">
            {"This is how you'll appear on Bumble. You won't be able to change it later."}
          </p>

          {/* Name Input */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleContinue();
              }
            }}
            placeholder="Enter your name"
            className="w-full py-[16px] px-[20px] rounded-[12px] bg-[#F5F5F5] text-[16px] text-bumble-black placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-bumble-accent"
            autoFocus
          />

          {/* Spacer */}
          <div className="flex-1" />

          <OnboardingNavBar onNext={handleContinue} nextDisabled={!name.trim()} />
        </div>
      </div>
    </PhoneFrame>
  );
}
