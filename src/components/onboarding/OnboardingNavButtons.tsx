"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getOnboardingBackPath } from "@/lib/onboardingRoutes";

export const ONBOARDING_FORWARD_ARROW_PATH =
  "M13.887 12.0005L7.20098 5.31477C6.88665 5.00043 6.72898 4.60043 6.72898 4.11477C6.72898 3.6291 6.88665 3.2291 7.20098 2.91477C7.51531 2.60043 7.91531 2.44277 8.40098 2.44277C8.88665 2.44277 9.28665 2.60043 9.60098 2.91477L17.4873 10.8005C17.6583 10.9719 17.7793 11.1576 17.8506 11.3576C17.922 11.5576 17.9576 11.7719 17.9576 12.0005C17.9576 12.2291 17.922 12.4434 17.8506 12.6434C17.7793 12.8434 17.6583 13.0291 17.4873 13.2005L9.60098 21.0861C9.28665 21.4005 8.88665 21.5576 8.40098 21.5576C7.91531 21.5576 7.51531 21.4005 7.20098 21.0861C6.88665 20.7718 6.72898 20.3718 6.72898 19.8861C6.72898 19.4005 6.88665 19.0005 7.20098 18.6861L13.887 12.0005Z";

const FORWARD_ARROW_PATH = ONBOARDING_FORWARD_ARROW_PATH;

export function OnboardingForwardIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d={FORWARD_ARROW_PATH} fill="white" />
    </svg>
  );
}

const circleButtonClass =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-opacity";

interface OnboardingBackButtonProps {
  href?: string;
  className?: string;
}

export function OnboardingBackButton({ href, className = "" }: OnboardingBackButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const backPath = href ?? getOnboardingBackPath(pathname);

  if (!backPath) {
    return <div className="shrink-0" aria-hidden />;
  }

  return (
    <button
      type="button"
      onClick={() => router.push(backPath)}
      className={`shrink-0 text-[16px] font-normal leading-[22px] text-bumble-gray underline ${className}`}
      aria-label="Go back"
    >
      back
    </button>
  );
}

interface OnboardingNextButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

export function OnboardingNextButton({
  onClick,
  disabled = false,
  className = "",
  "aria-label": ariaLabel = "Continue",
}: OnboardingNextButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${circleButtonClass} bg-bumble-black ${disabled ? "opacity-30" : "opacity-100"} ${className}`}
      aria-label={ariaLabel}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d={FORWARD_ARROW_PATH} fill="white" />
      </svg>
    </button>
  );
}

interface OnboardingNavBarProps {
  backHref?: string;
  onNext?: () => void;
  nextDisabled?: boolean;
  nextSlot?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/** Bottom row: back (left), optional center content, forward (right). */
export function OnboardingNavBar({
  backHref,
  onNext,
  nextDisabled,
  nextSlot,
  children,
  className = "pb-6",
}: OnboardingNavBarProps) {
  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      <OnboardingBackButton href={backHref} />
      <div className="ml-auto flex min-w-0 items-center gap-4">
        {children}
        {nextSlot ?? (
          <OnboardingNextButton onClick={onNext} disabled={nextDisabled} />
        )}
      </div>
    </div>
  );
}
