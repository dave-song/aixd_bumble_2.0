"use client";

import { Pencil, MessageCircle } from "lucide-react";

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between gap-2 mb-3">
      <h3 className="text-[16px] font-semibold text-bumble-black">{title}</h3>
      <button
        type="button"
        className="w-9 h-9 rounded-lg bg-bumble-black flex items-center justify-center shrink-0"
        aria-label={`Edit ${title}`}
      >
        <Pencil className="w-4 h-4 text-white" strokeWidth={2} />
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
    <section className="bg-white px-4 py-4">
      <SectionHeader title={title} />
      <p className="text-[14px] text-bumble-black leading-relaxed mb-3">
        {body}
      </p>
      {showCompliment && (
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F3F3F3] text-bumble-black text-[14px] font-medium"
        >
          <MessageCircle className="w-4 h-4" strokeWidth={2} />
          Compliment
        </button>
      )}
    </section>
  );
}

export function ProfileSectionTags({
  title,
  tags,
}: {
  title: string;
  tags: { label: string; icon?: React.ReactNode }[];
}) {
  return (
    <section className="bg-white px-4 py-4">
      <SectionHeader title={title} />
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag.label}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-200 bg-white text-[14px] text-bumble-gray"
          >
            {tag.icon}
            {tag.label}
          </span>
        ))}
      </div>
    </section>
  );
}
