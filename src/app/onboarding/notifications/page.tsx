"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { PhoneFrame, StatusBar } from "@/components/layout";
import { OnboardingBackButton } from "@/components/onboarding/OnboardingNavButtons";
import { useOnboardingEnter } from "@/lib/useOnboardingEnter";

export default function NotificationsPage() {
  const router = useRouter();

  const handleAllow = useCallback(() => {
    router.push("/people");
  }, [router]);

  const handleNotNow = useCallback(() => {
    router.push("/people");
  }, [router]);

  useOnboardingEnter(handleAllow);

  return (
    <PhoneFrame>
      <div className="relative flex h-full w-full flex-col bg-white">
        <StatusBar />

        <div className="flex justify-start px-[20px] pb-[8px] pt-[12px]">
          <OnboardingBackButton />
        </div>

        {/* Content - left-aligned layout */}
        <div className="flex-1 flex flex-col items-start px-[20px] pt-[16px]">
          {/* Bell illustration - 80x80px, left aligned */}
          <div className="w-[80px] h-[80px] flex items-center justify-start mb-[32px] shrink-0">
            <img
              src="/icons/onboarding/notification illustration.png"
              alt="Notifications"
              width={80}
              height={80}
              className="w-[80px] h-[80px] object-contain"
            />
          </div>

          {/* Headline */}
          <h1 className="text-[28px] font-medium text-bumble-black leading-[34px] text-left mb-[16px] w-full">
            Don&apos;t miss a beat, or a match
          </h1>

          {/* Body text - 16px, full width so it fits in two lines */}
          <p className="text-[16px] text-bumble-gray leading-[22px] text-left mb-[48px] w-full">
            Turn on your notifications so we can let you know when you have new
            matches, likes, or messages.
          </p>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Bottom CTAs */}
          <div className="w-full flex flex-col items-stretch gap-[16px] pb-[40px]">
            <button
              onClick={handleAllow}
              className="w-full py-[14px] px-[24px] rounded-[12px] bg-bumble-black text-white text-[16px] font-medium"
            >
              Allow notifications
            </button>
            <button
              onClick={handleNotNow}
              className="text-[16px] text-bumble-gray"
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
