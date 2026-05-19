"use client";

import { Check, MapPin, Phone, X } from "lucide-react";
import Image from "next/image";

const cardClassName =
  "flex w-full max-w-[24.4375rem] flex-col items-start rounded-[14px] bg-[#FFF] p-3.5";

const tagClassName =
  "flex h-9 items-center gap-1.5 rounded-[3rem] bg-[#F3F3F3] px-2.5 py-2 text-[13px] text-bumble-black";

export type BeelineIconState = "default" | "yes" | "no" | "spill-done";

function SectionHeader({
  title,
  onBeelineClick,
  beelineIconState = "default",
}: {
  title: string;
  onBeelineClick?: () => void;
  beelineIconState?: BeelineIconState;
}) {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <h3 className="text-[15px] font-medium text-bumble-black">{title}</h3>
      <button
        type="button"
        onClick={onBeelineClick}
        className={`flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden ${
          beelineIconState === "yes" || beelineIconState === "no" || beelineIconState === "spill-done"
            ? "rounded-[6px] bg-[#FFD93A]"
            : "rounded-lg bg-bumble-black"
        }`}
        aria-label={
          beelineIconState === "yes"
            ? "Beeline: Yes"
            : beelineIconState === "no"
              ? "Beeline: No"
              : beelineIconState === "spill-done"
                ? "Beeline: Spill the tea done"
                : "Beeline"
        }
      >
        {beelineIconState === "yes" ? (
          <Check size={18} className="text-bumble-black" strokeWidth={2.5} />
        ) : beelineIconState === "no" ? (
          <X size={16} className="text-bumble-black" strokeWidth={2.5} />
        ) : beelineIconState === "spill-done" ? (
          <Phone size={18} className="text-bumble-black" strokeWidth={2} />
        ) : (
          <Image
            src="/icons/user_profile_assets/beeline_btn.svg"
            alt=""
            width={29}
            height={27}
            className="h-[27px] w-[29px] object-contain"
          />
        )}
      </button>
    </div>
  );
}

export function ProfileSectionText({
  title,
  body,
  showCompliment = true,
  onBeelineClick,
  beelineIconState,
}: {
  title: string;
  body: string;
  showCompliment?: boolean;
  onBeelineClick?: () => void;
  beelineIconState?: BeelineIconState;
}) {
  return (
    <section className={cardClassName}>
      <div className="flex w-full flex-col gap-3">
        <SectionHeader title={title} onBeelineClick={onBeelineClick} beelineIconState={beelineIconState} />
        <p className="text-[13px] leading-[18px] text-bumble-black">{body}</p>
      </div>
      {showCompliment && (
        <>
          <div className="mt-4 mb-4 w-full border-t border-[#E5E5E5]" role="separator" />
          <button
            type="button"
            className="flex items-center gap-2 self-start text-[13px] font-normal text-bumble-black"
            aria-label="Compliment"
          >
            <Image
              src="/icons/user_profile_assets/compliment section black.svg"
              alt=""
              width={117}
              height={24}
              className="h-5 w-auto object-contain object-left"
            />
          </button>
        </>
      )}
    </section>
  );
}

export function ProfileSectionTags({
  title,
  tags,
  onBeelineClick,
  beelineIconState,
}: {
  title: string;
  tags: { label: string; emoji?: string; icon?: React.ReactNode }[];
  onBeelineClick?: () => void;
  beelineIconState?: BeelineIconState;
}) {
  return (
    <section className={`${cardClassName} gap-4`}>
      <SectionHeader title={title} onBeelineClick={onBeelineClick} beelineIconState={beelineIconState} />
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag.label} className={tagClassName}>
            {tag.emoji && <span className="shrink-0">{tag.emoji}</span>}
            {tag.icon}
            <span>{tag.label}</span>
          </span>
        ))}
      </div>
    </section>
  );
}

export function ProfileSectionLocation({
  location,
  onBeelineClick,
  beelineIconState,
}: {
  location: string;
  onBeelineClick?: () => void;
  beelineIconState?: BeelineIconState;
}) {
  return (
    <section className={`${cardClassName} gap-4`}>
      <SectionHeader title="My location" onBeelineClick={onBeelineClick} beelineIconState={beelineIconState} />
      <div className="flex items-center gap-2">
        <MapPin
          className="h-5 w-5 shrink-0 text-[#E25B45]"
          strokeWidth={2}
          aria-hidden
        />
        <span className="text-[14px] text-bumble-black">{location}</span>
      </div>
    </section>
  );
}
