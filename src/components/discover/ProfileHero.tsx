"use client";

import { Briefcase, Check, GraduationCap } from "lucide-react";
import { HARI_PROFILE_CARD } from "@/lib/constants";
import type { ProfileHero as ProfileHeroType } from "@/lib/profileData";

const COMPLIMENT_BUTTON_SRC =
  "/icons/discover_page/" +
  encodeURIComponent(
    "📍Final Design (2/18- 2/mobile_flow(hifi_designs)/ios/core_flow/compliment button.png",
  );

const SUPERLIKE_BUTTON_SRC = "/icons/like button with spacing.svg";

interface ProfileHeroProps {
  hero: ProfileHeroType;
  alt: string;
  layout?: "default" | "people";
  onSuperLike?: () => void;
}

export function ProfileHero({
  hero,
  alt,
  layout = "default",
  onSuperLike,
}: ProfileHeroProps) {
  const isPeople = layout === "people";

  if (hero.type === "composite") {
    if (isPeople) {
      return (
        <div
          className="relative w-full shrink-0"
          style={{
            aspectRatio: `${HARI_PROFILE_CARD.width} / ${HARI_PROFILE_CARD.height}`,
          }}
        >
          <img
            src={hero.src}
            alt={alt}
            width={HARI_PROFILE_CARD.width}
            height={HARI_PROFILE_CARD.height}
            className="people-composite-hero-img"
          />
          {onSuperLike && (
            <button
              type="button"
              onClick={onSuperLike}
              className="absolute bottom-[4%] right-[3%] z-10 h-[var(--superlike-button-hit-height)] w-[var(--superlike-button-hit-width)] opacity-0"
              aria-label="Super like"
            />
          )}
        </div>
      );
    }
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
    <div
      className={`relative block w-full shrink-0 overflow-hidden ${
        isPeople
          ? "h-[var(--people-hero-min-height)] rounded-[18px]"
          : "rounded-t-2xl"
      }`}
      style={isPeople ? undefined : { aspectRatio: "4/5" }}
    >
      <img
        src={imageSrc}
        alt={alt}
        className={`block w-full object-cover object-top ${
          isPeople ? "absolute inset-0 size-full" : "size-full"
        }`}
      />
      <div
        className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none"
        aria-hidden
      />

      <div
        className={`absolute bottom-0 left-0 right-0 flex flex-col text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.8)] ${
          isPeople ? "gap-2 p-4 pb-5" : "gap-2 rounded-b-2xl p-4"
        }`}
      >
        {verified && (
          <div
            className={`flex w-fit items-center gap-[2px] rounded-[64px] px-[8px] py-[4px] ${
              isPeople
                ? "bg-black"
                : "border border-white/60 bg-black/30 backdrop-blur-sm [box-shadow:0_1px_3px_rgba(0,0,0,0.4)]"
            }`}
          >
            <div
              className={`flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full ${
                isPeople ? "bg-white/20" : "border border-white/50 bg-white/20"
              }`}
            >
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
        <h2 className="font-bold text-white tracking-[-0.5px] text-[21px] leading-[27px]">
          {name}, {age}
        </h2>
        <div className="flex items-center gap-[4px] text-white">
          <Briefcase className="h-4 w-4 shrink-0" strokeWidth={2} />
          <span className="font-medium text-[15px] leading-[20px] tracking-[-0.38px]">
            {job}
          </span>
        </div>
        <div className="flex items-center gap-[4px] text-white">
          <GraduationCap className="h-4 w-4 shrink-0" strokeWidth={2} />
          <span className="font-medium text-[15px] leading-[20px] tracking-[-0.38px]">
            {school}
          </span>
        </div>

        {isPeople ? (
          <div className="mt-1 flex items-end justify-between">
            <button
              type="button"
              className="flex h-[var(--compliment-button-size)] w-[var(--compliment-button-size)] shrink-0 items-center justify-center rounded-full bg-bumble-accent shadow-md hover:opacity-95 active:opacity-90"
              aria-label="Compliment"
            >
              <img
                src={COMPLIMENT_BUTTON_SRC}
                alt=""
                className="size-[var(--compliment-button-size)] rounded-full object-contain"
              />
            </button>
            <button
              type="button"
              onClick={onSuperLike}
              className="flex h-[var(--superlike-button-hit-height)] w-[var(--superlike-button-hit-width)] shrink-0 items-center justify-center"
              aria-label="Super like"
            >
              <img
                src={SUPERLIKE_BUTTON_SRC}
                alt=""
                className="h-full w-full object-contain"
              />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="flex h-[var(--compliment-button-size)] w-[var(--compliment-button-size)] shrink-0 items-center justify-center rounded-full bg-bumble-accent shadow-md hover:opacity-95 active:opacity-90 pointer-events-auto"
            aria-label="Compliment"
          >
            <img
              src={COMPLIMENT_BUTTON_SRC}
              alt=""
              className="size-[var(--compliment-button-size)] rounded-full object-contain"
            />
          </button>
        )}
      </div>
    </div>
  );
}
