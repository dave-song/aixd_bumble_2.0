"use client";

import { useEffect, useRef, useState } from "react";
import { BeelineHeaderIcon, StatusBar } from "@/components/layout";
import { ProfileCardContent } from "@/components/discover/ProfileCardContent";
import { DISCOVER_PROFILES } from "@/lib/profileData";

interface PassScreenProps {
  onClose: () => void;
}

/**
 * Pass screen (Figma 1124:17790): same UI structure as discover,
 * but showing Elena's profile (next candidate). Uses ProfileHero for the hero.
 * Like button fades when user scrolls to end of profile (same as People page).
 */
export function PassScreen({ onClose }: PassScreenProps) {
  const elenaProfile = DISCOVER_PROFILES[1];
  const profileScrollRef = useRef<HTMLDivElement>(null);
  const dogAndLocationRef = useRef<HTMLDivElement>(null);
  const [likeButtonOpacity, setLikeButtonOpacity] = useState(1);

  useEffect(() => {
    const scrollEl = profileScrollRef.current;
    const triggerEl = dogAndLocationRef.current;
    if (!scrollEl || !triggerEl) return;

    const updateOpacity = () => {
      const { scrollTop, clientHeight, scrollHeight } = scrollEl;
      const canScroll = scrollHeight > clientHeight;
      if (!canScroll) {
        setLikeButtonOpacity(1);
        return;
      }
      const atEnd = scrollTop + clientHeight >= scrollHeight - 8;
      setLikeButtonOpacity(atEnd ? 0 : 1);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [e] = entries;
        if (!e) return;
        const { clientHeight, scrollHeight } = scrollEl;
        if (scrollHeight <= clientHeight) {
          setLikeButtonOpacity(1);
          return;
        }
        const atEnd = scrollEl.scrollTop + clientHeight >= scrollHeight - 8;
        setLikeButtonOpacity(
          atEnd ? 0 : 1 - Math.min(1, Math.max(0, e.intersectionRatio)),
        );
      },
      { root: scrollEl, rootMargin: "0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    scrollEl.addEventListener("scroll", updateOpacity, { passive: true });
    updateOpacity();
    observer.observe(triggerEl);
    return () => {
      observer.disconnect();
      scrollEl.removeEventListener("scroll", updateOpacity);
    };
  }, []);

  if (!elenaProfile) return null;

  return (
    <div
      className="flex h-full w-full flex-col bg-white"
      data-name="core_flow/pass transition"
    >
      <StatusBar />

      <header className="relative flex w-full shrink-0 items-center justify-center bg-white">
        <img
          src="/icons/bumble-top-header-no-bee.svg"
          alt="Bumble"
          className="h-[42px] w-full shrink-0 object-contain object-left"
        />
        <div
          className="absolute right-[47px] top-1/2 flex h-[42px] -translate-y-1/2 items-center justify-center"
          aria-hidden
        >
          <BeelineHeaderIcon className="h-9 w-9" isActive={false} />
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col items-center overflow-hidden bg-white px-[var(--content-inset-x)]">
        <div className="proto-profile-card relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[18px] bg-[#FFFFFF] shadow-[0_0_12px_0_rgba(0,0,0,0.25)]">
          <ProfileCardContent
            profile={elenaProfile}
            heroInsideScroll
            scrollRef={profileScrollRef}
            dogAndLocationRef={dogAndLocationRef}
            renderSectionFollowupCard={() => null}
          />

          {/* Like button: fixed to card bottom-right, fades when scrolled to end */}
          <img
            src="/icons/like button with spacing.svg"
            alt="Like"
            className={`absolute bottom-0 right-0 z-10 h-auto w-[var(--like-button-width)] object-contain object-bottom-right transition-opacity duration-300 ease-out ${likeButtonOpacity > 0 ? "pointer-events-auto" : "pointer-events-none"}`}
            style={{ opacity: likeButtonOpacity }}
          />
        </div>
      </div>

      <nav className="w-full shrink-0 bg-white">
        <img
          src="/icons/bottom navbar.svg"
          alt="Navigation"
          className="block w-full object-contain object-bottom"
        />
      </nav>

      {/* Tap anywhere to close / continue to next candidate */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 z-30 cursor-default"
        aria-label="Continue to next candidate"
      />
    </div>
  );
}
