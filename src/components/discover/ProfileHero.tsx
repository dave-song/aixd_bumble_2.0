"use client";

import { Briefcase, Check, GraduationCap, Heart, MessageCircle } from "lucide-react";
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
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
      {/* Dark panel with rounded bottom corners – ref: Photo verified pill, name/job/school with icons, Compliment button */}
      <div
        className="absolute bottom-0 left-0 right-0 flex flex-col rounded-b-2xl bg-bumble-black/80 text-white"
        style={{ padding: OVERLAY_PADDING, gap: OVERLAY_GAP }}
      >
        {verified && (
          <div className="flex w-fit items-center gap-[2px] rounded-[64px] border border-white/40 bg-bumble-black px-[8px] py-[4px]">
            <div className="flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/10">
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
        <button
          type="button"
          className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-bumble-black bg-bumble-accent shadow-md hover:opacity-95 active:opacity-90"
          aria-label="Compliment"
        >
          <MessageCircle className="h-6 w-6 text-bumble-black" strokeWidth={2} />
          <Heart
            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-white"
            strokeWidth={2}
            fill="currentColor"
          />
        </button>
      </div>
    </div>
  );
}
