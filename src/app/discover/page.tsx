"use client";

import { useEffect, useRef, useState } from "react";
import { PhoneFrame, StatusBar } from "@/components/layout";
import {
  ProfileSectionLocation,
  ProfileSectionTags,
  ProfileSectionText,
} from "@/components/profile";

export default function DiscoverPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dogAndLocationRef = useRef<HTMLDivElement>(null);
  const [likeButtonOpacity, setLikeButtonOpacity] = useState(1);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    const triggerEl = dogAndLocationRef.current;
    if (!scrollEl || !triggerEl) return;

    const updateOpacity = () => {
      const { scrollTop, clientHeight, scrollHeight } = scrollEl;
      const atEnd = scrollTop + clientHeight >= scrollHeight - 8;
      if (atEnd) {
        setLikeButtonOpacity(0);
        return;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [e] = entries;
        if (!e) return;
        const { scrollTop, clientHeight, scrollHeight } = scrollEl;
        const atEnd = scrollTop + clientHeight >= scrollHeight - 8;
        if (atEnd) {
          setLikeButtonOpacity(0);
          return;
        }
        const ratio = Math.min(1, Math.max(0, e.intersectionRatio));
        setLikeButtonOpacity(1 - ratio);
      },
      {
        root: scrollEl,
        rootMargin: "0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    scrollEl.addEventListener("scroll", updateOpacity, { passive: true });
    updateOpacity();

    observer.observe(triggerEl);
    return () => {
      observer.disconnect();
      scrollEl.removeEventListener("scroll", updateOpacity);
    };
  }, []);

  return (
    <PhoneFrame>
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-white">
        <StatusBar />

        <header className="flex w-full shrink-0 items-center justify-center bg-white">
          <img
            src="/icons/bumble top header.svg"
            alt="Bumble"
            className="h-[42px] w-full shrink-0 object-contain object-left"
          />
        </header>

        <div className="flex min-h-0 flex-1 justify-center bg-white pb-4">
          <div
            className="relative flex h-full min-h-[512px] w-[411px] min-w-[411px] max-w-[411px] flex-col overflow-hidden rounded-[18px] bg-[#FFFFFF] shadow-[0_0_12px_0_rgba(0,0,0,0.25)]"
            style={{ boxSizing: "border-box" }}
          >
            <div
              ref={scrollRef}
              className="profile-scroll flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden bg-[#FFFFFF] pb-12 pt-0"
            >
              <img
                src="/icons/haris profile card.svg"
                alt="Hari, 27 - Project Manager at Tech, Carnegie Mellon"
                className="block w-full shrink-0 object-contain object-top"
              />

              {/* Profile sections and below: inset to match card width */}
              <div className="flex flex-col gap-4 px-[10px]">
              <ProfileSectionText
                title="My bio"
                body="cat mom, mid runner, and can cook 4 different things"
              />
              <ProfileSectionTags
                title="About me"
                tags={[
                  { label: "5'10\"", emoji: "📏" },
                  { label: "Active", emoji: "🤸" },
                  { label: "undergraduate degree", emoji: "🎓" },
                  { label: "Woman", emoji: "🚺" },
                  { label: "Open to kids", emoji: "🍼" },
                  { label: "Aries", emoji: "♈" },
                  { label: "Liberal", emoji: "🏛️" },
                ]}
              />
              <div className="relative w-full">
                <img
                  src="/icons/user_profile_assets/p1.png"
                  alt=""
                  className="w-full rounded-2xl object-cover"
                />
                <div
                  className="absolute bottom-4 left-0 right-0 flex items-center justify-between"
                  style={{ paddingLeft: 16, paddingRight: 16 }}
                >
                  <img
                    src="/icons/compliment section.svg"
                    alt=""
                    width={200}
                    height={52}
                    className="shrink-0 object-contain"
                    style={{ width: 200, height: 52, marginLeft: -34 }}
                  />
                  <img src="/icons/bumble_image_button.svg" alt="Beeline" className="h-[34px] w-auto shrink-0 object-contain" />
                </div>
              </div>
              <ProfileSectionTags
                title="I'm looking for"
                tags={[
                  { label: "Early morning", emoji: "🌄" },
                  { label: "Ambition", emoji: "🎯" },
                  { label: "Humor", emoji: "😁" },
                  { label: "Emotional intelligence", emoji: "❤️" },
                ]}
              />
              <ProfileSectionTags
                title="My interests"
                tags={[
                  { label: "Art", emoji: "🎨" },
                  { label: "Foodie", emoji: "🍜" },
                  { label: "Journaling", emoji: "✍️" },
                  { label: "Movies", emoji: "🍿" },
                  { label: "Cats", emoji: "🐱" },
                ]}
              />
              <div className="relative w-full">
                <img
                  src="/icons/user_profile_assets/p2.png"
                  alt=""
                  className="w-full rounded-2xl object-cover"
                />
                <div
                  className="absolute bottom-4 left-0 right-0 flex items-center justify-between"
                  style={{ paddingLeft: 16, paddingRight: 16 }}
                >
                  <img
                    src="/icons/compliment section.svg"
                    alt=""
                    width={200}
                    height={52}
                    className="shrink-0 object-contain"
                    style={{ width: 200, height: 52, marginLeft: -34 }}
                  />
                  <img src="/icons/bumble_image_button.svg" alt="Beeline" className="h-[34px] w-auto shrink-0 object-contain" />
                </div>
              </div>
              <ProfileSectionText
                title="When I unplug I like to"
                body="Read, draw, journal, play guitar or cello, cook?, meditate"
              />
              <div className="relative w-full">
                <img
                  src="/icons/user_profile_assets/p3.png"
                  alt=""
                  className="w-full rounded-2xl object-cover"
                />
                <div
                  className="absolute bottom-4 left-0 right-0 flex items-center justify-between"
                  style={{ paddingLeft: 16, paddingRight: 16 }}
                >
                  <img
                    src="/icons/compliment section.svg"
                    alt=""
                    width={200}
                    height={52}
                    className="shrink-0 object-contain"
                    style={{ width: 200, height: 52, marginLeft: -34 }}
                  />
                  <img src="/icons/bumble_image_button.svg" alt="Beeline" className="h-[34px] w-auto shrink-0 object-contain" />
                </div>
              </div>
              <ProfileSectionTags
                title="My causes and communities"
                tags={[
                  { label: "Mental health in tech" },
                  { label: "UX" },
                  { label: "Digital minimalist" },
                  { label: "Morning person club" },
                  { label: "Community gardens" },
                  { label: "Slow food" },
                ]}
              />
              <ProfileSectionText
                title="My favorite quality in a person is"
                body="Passion- I love when people have hobbies they're really into or social causes they participate in"
              />
              <div ref={dogAndLocationRef} className="flex flex-col gap-4">
                <div className="relative w-full">
                  <img
                    src="/icons/user_profile_assets/p4.png"
                    alt=""
                    className="w-full rounded-2xl object-cover"
                  />
                  <div
                  className="absolute bottom-4 left-0 right-0 flex items-center justify-between"
                  style={{ paddingLeft: 16, paddingRight: 16 }}
                >
                    <img
                      src="/icons/compliment section.svg"
                      alt=""
                      width={200}
                      height={52}
                      className="shrink-0 object-contain"
                      style={{ width: 200, height: 52, marginLeft: -34 }}
                    />
                    <img src="/icons/bumble_image_button.svg" alt="Beeline" className="h-[34px] w-auto shrink-0 object-contain" />
                  </div>
                </div>
                <ProfileSectionLocation location="Boston" />
              </div>

              {/* Bottom decision bar (pass / super like / like) - same width as cards, Figma 1068-8451 */}
              <div className="flex w-full max-w-[24.4375rem] flex-col items-center justify-center gap-2 py-6">
                <img
                  src="/icons/user_profile_assets/bottom decision bar section.svg"
                  alt="Pass, Super like, Like"
                  className="h-auto w-full object-contain object-center"
                />
                <div className="flex flex-col items-center gap-0.5 text-center">
                  <button
                    type="button"
                    className="text-[14px] font-normal text-bumble-black"
                  >
                    Block
                  </button>
                  <button
                    type="button"
                    className="text-[14px] font-normal text-red-600"
                  >
                    Report
                  </button>
                </div>
              </div>
              </div>
            </div>

            {/* Like button overlay - fades out as dog + My location come into view */}
            <img
              src="/icons/like button with spacing.svg"
              alt="Like"
              className={`absolute bottom-0 right-0 h-auto w-[92px] object-contain object-bottom-right transition-opacity duration-300 ease-out ${likeButtonOpacity > 0 ? "pointer-events-auto" : "pointer-events-none"}`}
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
      </div>
    </PhoneFrame>
  );
}
