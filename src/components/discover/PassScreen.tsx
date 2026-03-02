"use client";

import { BeelineHeaderIcon, StatusBar } from "@/components/layout";
import { ProfileCardContent } from "@/components/discover/ProfileCardContent";
import { DISCOVER_PROFILES } from "@/lib/profileData";

interface PassScreenProps {
  onClose: () => void;
}

/**
 * Pass screen (Figma 1124:17790): same UI structure as Hari's profile on discover,
 * but the profile picture is Elena's (Elena_profile_img.png), no blur or X.
 */
function ElenaPassHero() {
  return (
    <div className="relative block w-full shrink-0 overflow-hidden rounded-t-2xl">
      <img
        src="/icons/user_profile_assets/Elena_profile_img.png"
        alt="Elena, 28"
        className="block w-full object-cover object-top"
        style={{ minHeight: 360 }}
      />
      {/* Bottom gradient + text (same as profile hero) */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent rounded-t-2xl" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h2 className="text-[28px] font-semibold tracking-tight">Elena, 28</h2>
        <p className="mt-1 text-sm text-white/95">Pediatric Resident</p>
        <p className="mt-0.5 text-sm text-white/95">Johns Hopkins University</p>
      </div>
    </div>
  );
}

export function PassScreen({ onClose }: PassScreenProps) {
  const hariProfile = DISCOVER_PROFILES[0];
  if (!hariProfile) return null;

  return (
    <div
      className="flex h-full w-full flex-col bg-white"
      data-name="core_flow/pass transition"
    >
      <StatusBar />

      <header className="relative flex w-full shrink-0 items-center justify-center bg-white">
        <img
          src="/icons/bumble-top-header-no-bee.svg"
          alt="Bumble"
          className="h-[42px] w-full shrink-0 object-contain object-left"
        />
        <div
          className="absolute right-[52px] top-1/2 flex h-[42px] -translate-y-1/2 items-center justify-center"
          aria-hidden
        >
          <BeelineHeaderIcon className="h-9 w-9" isActive={false} />
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col items-center bg-white pb-4">
        <div
          className="relative flex h-full min-h-[512px] w-[411px] min-w-[411px] max-w-[411px] flex-col overflow-hidden rounded-[18px] bg-[#FFFFFF] shadow-[0_0_12px_0_rgba(0,0,0,0.25)]"
          style={{ boxSizing: "border-box" }}
        >
          <ProfileCardContent
            profile={hariProfile}
            customHero={<ElenaPassHero />}
            heroInsideScroll
            renderSectionFollowupCard={() => null}
          />

          {/* Like button overlay - same position as discover */}
          <img
            src="/icons/like button with spacing.svg"
            alt="Like"
            className="absolute bottom-0 right-0 h-auto w-[92px] object-contain object-bottom-right opacity-100 pointer-events-none"
          />
        </div>
      </div>

      <nav className="w-full shrink-0 bg-white">
        <img
          src="/icons/bottom navbar.svg"
          alt="Navigation"
          className="block w-full object-contain object-bottom"
        />
      </nav>

      {/* Tap anywhere to close / continue to next candidate */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 z-30 cursor-default"
        aria-label="Continue to next candidate"
      />
    </div>
  );
}
