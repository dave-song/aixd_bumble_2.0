"use client";

import { useRef } from "react";
import {
  INSIGHT_CARD_1_SRC,
  INSIGHT_CARD_2_SRC,
  INSIGHT_CARD_3_SRC,
  INSIGHT_CARD_REVEAL_SRC,
  PROFILE_INSIGHT_CARD_GAP_PX,
  PROFILE_INSIGHT_CARD_HEIGHT_PX,
  PROFILE_INSIGHT_CARD_WIDTH_PX,
  PROFILE_INSIGHT_LOCK_SIZE_PX,
  PROFILE_INSIGHT_LOCK_SVG_X,
  PROFILE_INSIGHT_LOCK_SVG_Y,
  PROFILE_INSIGHT_SVG_WIDTH_PX,
} from "@/lib/profilePageAssets";

/** Native emoji overlay — SVG <text> emojis do not render when the card is an <img> */
function InsightCardPrivateLock() {
  const scale = PROFILE_INSIGHT_CARD_WIDTH_PX / PROFILE_INSIGHT_SVG_WIDTH_PX;

  return (
    <span
      aria-hidden
      className="pointer-events-none absolute z-10 leading-none"
      style={{
        left: PROFILE_INSIGHT_LOCK_SVG_X * scale,
        top: PROFILE_INSIGHT_LOCK_SVG_Y * scale,
        fontSize: PROFILE_INSIGHT_LOCK_SIZE_PX * scale,
      }}
    >
      🔒
    </span>
  );
}

const INSIGHT_CARDS = [
  {
    id: "reveal",
    src: INSIGHT_CARD_REVEAL_SRC,
    alt: "Culinary chaos and strategic laziness — see what Beeline learned about you",
  },
  {
    id: "insight-1",
    src: INSIGHT_CARD_1_SRC,
    alt: "Culinary Optimist — Beeline insight",
  },
  {
    id: "insight-2",
    src: INSIGHT_CARD_2_SRC,
    alt: "Beeline insight",
  },
  {
    id: "insight-3",
    src: INSIGHT_CARD_3_SRC,
    alt: "Beeline insight",
  },
] as const;

/**
 * Horizontal insight cards — Figma 1273-32116. SVGs include their own shadows.
 */
export function ProfileInsightsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToInsight = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  };

  return (
    <div
      ref={scrollRef}
      className="flex w-full items-center overflow-x-auto overflow-y-visible pb-[10px] scrollbar-hide snap-x snap-mandatory"
      style={{
        gap: PROFILE_INSIGHT_CARD_GAP_PX,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      {INSIGHT_CARDS.map((card, index) => (
        <button
          key={card.id}
          type="button"
          onClick={() => {
            if (card.id === "reveal") scrollToInsight(1);
          }}
          className={`relative block shrink-0 snap-start border-0 bg-transparent p-0 ${
            card.id === "reveal" ? "cursor-pointer" : "cursor-default"
          }`}
          style={{
            width: PROFILE_INSIGHT_CARD_WIDTH_PX,
            height: PROFILE_INSIGHT_CARD_HEIGHT_PX,
          }}
          aria-label={card.alt}
        >
          <img
            src={card.src}
            alt=""
            width={PROFILE_INSIGHT_CARD_WIDTH_PX}
            height={PROFILE_INSIGHT_CARD_HEIGHT_PX}
            draggable={false}
            className="pointer-events-none block h-full w-full object-contain object-top"
          />
          {card.id !== "reveal" ? <InsightCardPrivateLock /> : null}
        </button>
      ))}
    </div>
  );
}
