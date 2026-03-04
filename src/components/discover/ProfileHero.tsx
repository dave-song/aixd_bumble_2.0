"use client";

import { Briefcase, Check, GraduationCap } from "lucide-react";
import type { ProfileHero as ProfileHeroType } from "@/lib/profileData";

interface ProfileHeroProps {
  hero: ProfileHeroType;
  alt: string;
}

/**
 * Spacing guide (Figma): overlay content block
 * - Blue 1.12: padding on all sides of the block (top, right, bottom, left)
 * - Pink 0.62: vertical gap between each element (Photo verified → name → job → school → buttons)
 */
const COMPLIMENT_BUTTON_SRC =
  "/icons/discover_page/" +
  encodeURIComponent(
    "📍Final Design (2/18- 2/mobile_flow(hifi_designs)/ios/core_flow/compliment button.png"
  );

export function ProfileHero({ hero, alt }: ProfileHeroProps) {
  if (hero.type === "composite") {
    return (
      <img
        src={hero.src}
        alt={alt}
        className="block w-full shrink-0 object-contain object-top"
      />
    );
  }
  const { imageSrc, name, age, job, school, verified } = hero;
  return (
    <div className="relative block w-full shrink-0 overflow-hidden rounded-t-2xl aspect-9/16 min-h-[420px]">
      <img
        src={imageSrc}
        alt={alt}
        className="block size-full object-cover object-top"
      />
      {/* Transparent overlay: only a soft gradient at the bottom so text stays readable over the photo */}
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" aria-hidden />
      {/* Info panel: 1.12rem padding from hero edges (blue) — sets spacing from compliment button to left/bottom of hero; 0.62rem gap between elements (pink) */}
      <div
        className="absolute bottom-0 left-0 right-0 flex flex-col rounded-b-2xl p-[1.12rem] gap-[0.62rem] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]"
      >
        {verified && (
          <div className="flex w-fit items-center gap-[2px] rounded-[64px] border border-white/60 bg-black/30 px-[8px] py-[4px] backdrop-blur-sm [box-shadow:0_1px_3px_rgba(0,0,0,0.4)]">
            <div className="flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/20">
              <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
            </div>
            <span
              className="font-normal text-white tracking-[-0.25px]"
              style={{ fontSize: "10.607px", lineHeight: "13.727px" }}
            >
              Photo verified
            </span>
          </div>
        )}
        <h2
          className="font-bold text-white tracking-[-0.55px]"
          style={{ fontSize: "23px", lineHeight: "30px" }}
        >
          {name}, {age}
        </h2>
        <div className="flex items-center gap-[4px] text-white">
          <Briefcase className="h-5 w-5 shrink-0" strokeWidth={2} />
          <span
            className="font-medium tracking-[-0.38px]"
            style={{ fontSize: "16.138px", lineHeight: "21.131px" }}
          >
            {job}
          </span>
        </div>
        <div className="flex items-center gap-[4px] text-white">
          <GraduationCap className="h-5 w-5 shrink-0" strokeWidth={2} />
          <span
            className="font-medium tracking-[-0.38px]"
            style={{ fontSize: "16.138px", lineHeight: "21.131px" }}
          >
            {school}
          </span>
        </div>
        {/* Compliment button: 1.12rem from left/bottom hero edges via container padding above */}
        <button
          type="button"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-bumble-black bg-bumble-accent shadow-md hover:opacity-95 active:opacity-90 pointer-events-auto"
          aria-label="Compliment"
        >
          <img
            src={COMPLIMENT_BUTTON_SRC}
            alt=""
            className="h-12 w-12 rounded-full object-contain"
          />
        </button>
      </div>
    </div>
  );
}
