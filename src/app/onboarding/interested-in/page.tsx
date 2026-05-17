"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { PhoneFrame, StatusBar } from "@/components/layout";
import { useOnboardingEnter } from "@/lib/useOnboardingEnter";
import { Info } from "lucide-react";

/** Matches Bumble’s dating preference options (Settings → Filters). */
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

        {/* Progress Bar — tap left side to go back */}
        <div className="relative w-full h-[10px] px-[20px] flex items-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="absolute left-0 top-0 bottom-0 w-1/3 min-w-[80px] z-10 cursor-pointer"
            aria-label="Go back"
          />
          <div className="relative flex-1 h-[3px] bg-[#D2D2D2] rounded-full">
            <div className="absolute left-0 top-0 h-full w-[28%] bg-black rounded-full" />
          </div>
        </div>

        <div className="flex-1 flex flex-col px-[20px] pt-[24px]">
          <h1 className="text-[28px] font-medium text-bumble-black leading-[34px] mb-[12px]">
            Who would you like to meet?
          </h1>
          <p className="text-[16px] text-bumble-gray leading-[22px] mb-[32px]">
            {
              "We'll show you people who match what you're looking for. You can always update this in your filters."
            }
          </p>

          <h2 className="text-[16px] font-medium text-bumble-black mb-[16px]">
            I&apos;m interested in
          </h2>

          <div className="flex flex-col gap-[12px]">
            {interestedInOptions.map((option) => (
              <button
                key={option.id}
                type="button"
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

          <div className="flex items-start gap-[8px] mt-[24px]">
            <Info size={18} className="text-bumble-gray mt-[2px] shrink-0" />
            <p className="text-[14px] text-bumble-gray leading-[20px]">
              Choosing &quot;Everyone&quot; includes people of all genders. You
              can refine this anytime in Settings.
            </p>
          </div>

          <div className="flex-1" />

          <div className="flex justify-end pb-[24px]">
            <button
              type="button"
              onClick={handleContinue}
              disabled={!selected}
              className={`w-[48px] h-[48px] rounded-full bg-bumble-black flex items-center justify-center transition-opacity ${!selected ? "opacity-30" : "opacity-100"}`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
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
