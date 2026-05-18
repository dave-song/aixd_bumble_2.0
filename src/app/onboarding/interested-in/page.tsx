"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { PhoneFrame, StatusBar } from "@/components/layout";
import { OnboardingNavBar } from "@/components/onboarding/OnboardingNavButtons";
import { useOnboardingEnter } from "@/lib/useOnboardingEnter";
import { Info } from "lucide-react";

const interestedInOptions = [
  { id: "women", label: "Women" },
  { id: "men", label: "Men" },
  { id: "everyone", label: "Everyone" },
] as const;

export default function InterestedInPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = useCallback(() => {
    if (!selected) return;
    localStorage.setItem("interestedIn", selected);
    router.push("/onboarding/life");
  }, [selected, router]);

  useOnboardingEnter(handleContinue, Boolean(selected));

  return (
    <PhoneFrame>
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-white">
        <StatusBar />

        <div className="relative flex h-[10px] w-full items-center px-[20px]">
          <div className="relative h-[3px] flex-1 rounded-full bg-[#D2D2D2]">
            <div className="absolute left-0 top-0 h-full w-[28%] rounded-full bg-black" />
          </div>
        </div>

        <div className="flex flex-1 flex-col px-[20px] pt-[24px]">
          <h1 className="mb-[12px] text-[28px] font-medium leading-[34px] text-bumble-black">
            Who would you like to meet?
          </h1>
          <p className="mb-[32px] text-[16px] leading-[22px] text-bumble-gray">
            We&apos;ll show you people who match what you&apos;re looking for.
            You can always update this in your filters.
          </p>

          <h2 className="mb-[16px] text-[16px] font-medium text-bumble-black">
            I&apos;m interested in
          </h2>

          <div className="flex flex-col gap-[12px]">
            {interestedInOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelected(option.id)}
                className="flex w-full items-center justify-between rounded-[12px] bg-[#F5F5F5] px-[20px] py-[16px] transition-all duration-200"
              >
                <span className="text-[16px] text-bumble-black">
                  {option.label}
                </span>
                <div
                  className={`flex h-[24px] w-[24px] items-center justify-center rounded-full border-2 transition-all ${
                    selected === option.id
                      ? "border-bumble-black bg-bumble-black"
                      : "border-neutral-300 bg-white"
                  }`}
                >
                  {selected === option.id && (
                    <div className="h-[8px] w-[8px] rounded-full bg-white" />
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-[24px] flex items-start gap-[8px]">
            <Info size={18} className="mt-[2px] shrink-0 text-bumble-gray" />
            <p className="text-[14px] leading-[20px] text-bumble-gray">
              Choosing &quot;Everyone&quot; includes people of all genders. You
              can refine this anytime in Settings.
            </p>
          </div>

          <div className="flex-1" />

          <OnboardingNavBar
            onNext={handleContinue}
            nextDisabled={!selected}
          />
        </div>
      </div>
    </PhoneFrame>
  );
}
