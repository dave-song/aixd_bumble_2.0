"use client";

import { useRef } from "react";
import { PeopleTopHeader, StatusBar } from "@/components/layout";
import { ProfileCardContent } from "@/components/discover/ProfileCardContent";
import { DISCOVER_PROFILES } from "@/lib/profileData";

interface PassScreenProps {
  onClose: () => void;
}

/**
 * Pass screen (Figma 1124:17790): same UI structure as People page,
 * but showing Elena's profile (next candidate).
 */
export function PassScreen({ onClose }: PassScreenProps) {
  const elenaProfile = DISCOVER_PROFILES[1];
  const profileScrollRef = useRef<HTMLDivElement>(null);

  if (!elenaProfile) return null;

  return (
    <div
      className="flex h-full w-full flex-col bg-white"
      data-name="core_flow/pass transition"
    >
      <StatusBar />

      <div className="people-page-shell flex min-h-0 flex-1 flex-col">
        <PeopleTopHeader />

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-white">
          <div className="proto-profile-card proto-profile-card--people relative flex w-full shrink-0 flex-col overflow-hidden rounded-[18px] bg-[#FFFFFF] shadow-[0_0_12px_0_rgba(0,0,0,0.25)]">
            <div
              ref={profileScrollRef}
              className="people-profile-scroll flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden"
            >
              <ProfileCardContent
                profile={elenaProfile}
                heroInsideScroll
                heroLayout="people"
                disableInternalScroll
                renderSectionFollowupCard={() => null}
              />
            </div>
          </div>
        </div>
      </div>

      <nav className="w-full shrink-0 bg-white">
        <img
          src="/icons/bottom navbar.svg"
          alt="Navigation"
          className="block w-full object-contain object-bottom"
        />
      </nav>

      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 z-30 cursor-default"
        aria-label="Continue to next candidate"
      />
    </div>
  );
}
