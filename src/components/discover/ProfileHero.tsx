"use client";

import { Briefcase, Check, GraduationCap, Heart } from "lucide-react";
import type { ProfileHero as ProfileHeroType } from "@/lib/profileData";

interface ProfileHeroProps {
  hero: ProfileHeroType;
  alt: string;
}

/** Spacing per Figma: padding 1.12rem, gap 0.62rem between elements */
const OVERLAY_PADDING = "1.12rem";
const OVERLAY_GAP = "0.62rem";

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
    <div className="relative block w-full shrink-0 overflow-hidden rounded-t-2xl">
      <img
        src={imageSrc}
        alt={alt}
        className="block w-full object-cover object-top"
        style={{ minHeight: 360 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      {/* Dark panel with rounded bottom corners (Figma + reference image) */}
      <div
        className="absolute bottom-0 left-0 right-0 flex flex-col rounded-b-2xl bg-bumble-black/80 text-white"
        style={{ padding: OVERLAY_PADDING, gap: OVERLAY_GAP }}
      >
        {verified && (
          <div
            className="flex w-fit items-center gap-0.5 rounded-[64px] bg-bumble-black px-[8px] py-[4px]"
            style={{ gap: "2px" }}
          >
            <div className="flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full bg-white/20">
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
          className="font-semibold text-white tracking-[-0.55px]"
          style={{ fontSize: "23px", lineHeight: "30px" }}
        >
          {name}, {age}
        </h2>
        <div className="flex items-center gap-2 text-white">
          <Briefcase className="h-4 w-4 shrink-0" strokeWidth={2} />
          <span
            className="font-medium tracking-[-0.38px]"
            style={{ fontSize: "16.138px", lineHeight: "21.131px" }}
          >
            {job}
          </span>
        </div>
        <div className="flex items-center gap-2 text-white">
          <GraduationCap className="h-4 w-4 shrink-0" strokeWidth={2} />
          <span
            className="font-medium tracking-[-0.38px]"
            style={{ fontSize: "16.138px", lineHeight: "21.131px" }}
          >
            {school}
          </span>
        </div>
        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bumble-accent text-white shadow-md hover:opacity-95 active:opacity-90"
          aria-label="Like or message"
        >
          <Heart className="h-5 w-5" strokeWidth={2} fill="currentColor" />
        </button>
      </div>
    </div>
  );
}
