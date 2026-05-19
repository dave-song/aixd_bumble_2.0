"use client";

import { USER_PROFILE_HERO_SRC } from "@/lib/profilePageAssets";

/** Figma 1273-32085 — single asset replaces the previous layered profile card */
export function ProfilePageHero() {
  return (
    <div className="mx-auto w-full max-w-[410px]">
      <img
        src={USER_PROFILE_HERO_SRC}
        alt="Kyle, 27 — The domestic daredevil"
        width={820}
        height={756}
        draggable={false}
        className="block h-auto w-full rounded-[18px]"
      />
    </div>
  );
}
