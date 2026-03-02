"use client";

import { Briefcase, Check, GraduationCap, MessageCircle } from "lucide-react";
import type { ProfileHero as ProfileHeroType } from "@/lib/profileData";

interface ProfileHeroProps {
  hero: ProfileHeroType;
  alt: string;
}

/** Info overlay spacing per design: padding 1.12rem, gap between elements 0.62rem */
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
      <div
        className="absolute bottom-0 left-0 right-0 flex flex-col text-white"
        style={{ padding: OVERLAY_PADDING, gap: OVERLAY_GAP }}
      >
        {verified && (
          <div className="flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1.5 backdrop-blur-sm">
            <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/20">
              <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
            </div>
            <span className="text-[12px] font-medium text-white">
              Photo verified
            </span>
          </div>
        )}
        <h2 className="text-[28px] font-semibold tracking-tight text-white">
          {name}, {age}
        </h2>
        <div className="flex items-center gap-2 text-sm text-white/95">
          <Briefcase className="h-4 w-4 shrink-0" strokeWidth={2} />
          <span>{job}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-white/95">
          <GraduationCap className="h-4 w-4 shrink-0" strokeWidth={2} />
          <span>{school}</span>
        </div>
        <button
          type="button"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-bumble-accent text-white shadow-md hover:opacity-95 active:opacity-90"
          aria-label="Chat"
        >
          <MessageCircle className="h-6 w-6" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
