"use client";

import { MapPin } from "lucide-react";
import Image from "next/image";

const cardClassName =
  "flex w-full max-w-[24.4375rem] flex-col items-start rounded-[1rem] bg-[#FFF] p-4 shadow-[0_0_12px_0_rgba(0,0,0,0.12)]";

const tagClassName =
  "flex h-[2.875rem] items-center gap-[0.375rem] rounded-[3rem] bg-[#F3F3F3] px-3 py-3 text-[14px] text-bumble-black";

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <h3 className="text-[16px] font-semibold text-bumble-black">{title}</h3>
      <button
        type="button"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg overflow-hidden bg-bumble-black"
        aria-label="Beeline"
      >
        <Image
          src="/icons/user_profile_assets/beeline_btn.svg"
          alt=""
          width={32}
          height={30}
          className="h-[30px] w-[32px] object-contain"
        />
      </button>
    </div>
  );
}

export function ProfileSectionText({
  title,
  body,
  showCompliment = true,
}: {
  title: string;
  body: string;
  showCompliment?: boolean;
}) {
  return (
    <section className={cardClassName}>
      <div className="flex w-full flex-col gap-4">
        <SectionHeader title={title} />
        <p className="text-[14px] leading-relaxed text-bumble-black">{body}</p>
      </div>
      {showCompliment && (
        <>
          <div className="mt-4 mb-4 w-full border-t border-[#E5E5E5]" role="separator" />
          <button
            type="button"
            className="flex items-center gap-2 self-start text-[14px] font-normal text-bumble-black"
            aria-label="Compliment"
          >
            <Image
              src="/icons/user_profile_assets/compliment section black.svg"
              alt=""
              width={117}
              height={24}
              className="h-6 w-auto object-contain object-left"
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
}: {
  title: string;
  tags: { label: string; emoji?: string; icon?: React.ReactNode }[];
}) {
  return (
    <section className={`${cardClassName} gap-4`}>
      <SectionHeader title={title} />
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

export function ProfileSectionLocation({ location }: { location: string }) {
  return (
    <section className={`${cardClassName} gap-4`}>
      <SectionHeader title="My location" />
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
