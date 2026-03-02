"use client";

import { useEffect, useRef, useState } from "react";
import { BeelineHeaderIcon, PhoneFrame, StatusBar } from "@/components/layout";
import {
  type BeelineIconState,
  ProfileSectionLocation,
  ProfileSectionTags,
  ProfileSectionText,
} from "@/components/profile";
import { BeelineFollowupCard } from "@/components/beeline/BeelineFollowupCard";
import { BeelinePopoverCard } from "@/components/beeline/BeelinePopoverCard";
import { VoiceWaveUI } from "@/components/beeline/VoiceWaveUI";
import {
  type BeelineSectionId,
  BEELINE_SECTION_QUESTIONS,
} from "@/lib/beelineSectionQuestions";

function getSectionIconState(
  state: Record<string, BeelineIconState>,
  id: BeelineSectionId
): BeelineIconState {
  return state[id] ?? "default";
}

export default function DiscoverPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dogAndLocationRef = useRef<HTMLDivElement>(null);
  const beelineCardRef = useRef<HTMLDivElement>(null);
  const sectionFollowupCardRef = useRef<HTMLDivElement>(null);
  const [likeButtonOpacity, setLikeButtonOpacity] = useState(1);
  const [beelineCardOpen, setBeelineCardOpen] = useState(false);
  const [beelineIconActive, setBeelineIconActive] = useState(false);
  const [isSpilling, setIsSpilling] = useState(false);
  const [isSpillDone, setIsSpillDone] = useState(false);
  const [beelineCardVisible, setBeelineCardVisible] = useState(true);
  const [openBeelineSection, setOpenBeelineSection] = useState<BeelineSectionId | null>(null);
  const [sectionIconState, setSectionIconState] = useState<Record<string, BeelineIconState>>({});
  const [sectionSpilling, setSectionSpilling] = useState(false);
  const [sectionSpillDone, setSectionSpillDone] = useState(false);
  const [sectionFollowupCardVisible, setSectionFollowupCardVisible] = useState(true);

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
      },
    );

    scrollEl.addEventListener("scroll", updateOpacity, { passive: true });
    updateOpacity();

    observer.observe(triggerEl);
    return () => {
      observer.disconnect();
      scrollEl.removeEventListener("scroll", updateOpacity);
    };
  }, []);

  // Detect when Beeline card scrolls out of view (for Voice Wave UI)
  useEffect(() => {
    const scrollEl = scrollRef.current;
    const cardEl = beelineCardRef.current;
    if (!scrollEl || !cardEl || !beelineCardOpen) {
      setBeelineCardVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const [e] = entries;
        if (!e) return;
        setBeelineCardVisible(e.isIntersecting);
      },
      {
        root: scrollEl,
        rootMargin: "0px",
        threshold: 0,
      }
    );
    observer.observe(cardEl);
    return () => observer.disconnect();
  }, [beelineCardOpen]);

  // Detect when section follow-up card scrolls out of view (for Voice Wave UI)
  useEffect(() => {
    const scrollEl = scrollRef.current;
    const cardEl = sectionFollowupCardRef.current;
    if (!scrollEl || !cardEl || !openBeelineSection) {
      setSectionFollowupCardVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const [e] = entries;
        if (!e) return;
        setSectionFollowupCardVisible(e.isIntersecting);
      },
      { root: scrollEl, rootMargin: "0px", threshold: 0 }
    );
    observer.observe(cardEl);
    return () => observer.disconnect();
  }, [openBeelineSection]);

  const showVoiceWaveUI =
    (isSpilling && !isSpillDone && !beelineCardVisible) ||
    (sectionSpilling && !sectionSpillDone && !sectionFollowupCardVisible);

  function closeSectionCard() {
    setOpenBeelineSection(null);
    setSectionSpilling(false);
    setSectionSpillDone(false);
  }

  function handleSectionAnswer(sectionId: BeelineSectionId, answer: "yes" | "no") {
    setSectionIconState((prev) => ({ ...prev, [sectionId]: answer }));
    setOpenBeelineSection(null);
  }

  function handleSectionActually(sectionId: BeelineSectionId) {
    setSectionIconState((prev) => ({ ...prev, [sectionId]: "spill-done" }));
    closeSectionCard();
  }

  function renderSectionFollowupCard(sectionId: BeelineSectionId) {
    if (openBeelineSection !== sectionId) return null;
    return (
      <div
        ref={sectionFollowupCardRef}
        className="w-full shrink-0"
      >
        <BeelineFollowupCard
          question={BEELINE_SECTION_QUESTIONS[sectionId]}
          onClose={closeSectionCard}
          onAnswer={(answer) => handleSectionAnswer(sectionId, answer)}
          onSpillingStateChange={(spilling, done) => {
            setSectionSpilling(spilling);
            setSectionSpillDone(done);
          }}
          onActually={() => handleSectionActually(sectionId)}
        />
      </div>
    );
  }

  return (
    <PhoneFrame>
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-white">
        <StatusBar />

        <header className="relative flex w-full shrink-0 items-center justify-center bg-white">
          <img
            src="/icons/bumble-top-header-no-bee.svg"
            alt="Bumble"
            className="h-[42px] w-full shrink-0 object-contain object-left"
          />
          <div
            className="absolute right-[52px] top-1/2 flex h-[42px] -translate-y-1/2 items-center justify-center"
            aria-hidden
          >
            <BeelineHeaderIcon
              className="h-9 w-9"
              onClick={() => setBeelineCardOpen(true)}
              isActive={beelineIconActive}
            />
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col items-center bg-white pb-4">
          <div
            className="relative flex h-full min-h-[512px] w-[411px] min-w-[411px] max-w-[411px] flex-col overflow-hidden rounded-[18px] bg-[#FFFFFF] shadow-[0_0_12px_0_rgba(0,0,0,0.25)]"
            style={{ boxSizing: "border-box" }}
          >
            {/* Voice Wave UI: shown when spilling (main or section follow-up) and that card has scrolled out of view */}
            {showVoiceWaveUI && (
              <div className="absolute right-[1.12rem] top-[1.12rem] z-10">
                <VoiceWaveUI />
              </div>
            )}
            <div
              ref={scrollRef}
              className="profile-scroll flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden bg-[#FFFFFF] pb-12 pt-0"
            >
              {/* Beeline card scrolls with profile content */}
              {beelineCardOpen && (
                <div ref={beelineCardRef} className="w-full shrink-0 pb-4">
                  <BeelinePopoverCard
                    onClose={() => {
                      setBeelineCardOpen(false);
                      setIsSpilling(false);
                      setIsSpillDone(false);
                    }}
                    onFullyExpanded={() => setBeelineIconActive(true)}
                    onSpillingStateChange={(spilling, done) => {
                      setIsSpilling(spilling);
                      setIsSpillDone(done);
                    }}
                    onAnswer={() => {
                      setBeelineCardOpen(false);
                      scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                </div>
              )}
              <img
                src="/icons/haris profile card.svg"
                alt="Hari, 27 - Project Manager at Tech, Carnegie Mellon"
                className="block w-full shrink-0 object-contain object-top"
              />

              {/* Profile sections and below: inset to card width */}
              <div className="flex flex-col gap-4 px-[10px]">
                <ProfileSectionText
                  title="My bio"
                  body="cat mom, mid runner, and can cook 4 different things"
                  onBeelineClick={() => setOpenBeelineSection("my-bio")}
                  beelineIconState={getSectionIconState(sectionIconState, "my-bio")}
                />
                {renderSectionFollowupCard("my-bio")}
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
                  onBeelineClick={() => setOpenBeelineSection("about-me")}
                  beelineIconState={getSectionIconState(sectionIconState, "about-me")}
                />
                {renderSectionFollowupCard("about-me")}
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
                    <button
                      type="button"
                      onClick={() => setOpenBeelineSection("picture1")}
                      className="h-[34px] w-auto shrink-0 cursor-pointer border-0 bg-transparent p-0"
                      aria-label="Beeline"
                    >
                      <img
                        src="/icons/bumble_image_button.svg"
                        alt=""
                        className="h-[34px] w-auto object-contain"
                      />
                    </button>
                  </div>
                </div>
                {renderSectionFollowupCard("picture1")}
                <ProfileSectionTags
                  title="I'm looking for"
                  tags={[
                    { label: "Early morning", emoji: "🌄" },
                    { label: "Ambition", emoji: "🎯" },
                    { label: "Humor", emoji: "😁" },
                    { label: "Emotional intelligence", emoji: "❤️" },
                  ]}
                  onBeelineClick={() => setOpenBeelineSection("im-looking-for")}
                  beelineIconState={getSectionIconState(sectionIconState, "im-looking-for")}
                />
                {renderSectionFollowupCard("im-looking-for")}
                <ProfileSectionTags
                  title="My interests"
                  tags={[
                    { label: "Art", emoji: "🎨" },
                    { label: "Foodie", emoji: "🍜" },
                    { label: "Journaling", emoji: "✍️" },
                    { label: "Movies", emoji: "🍿" },
                    { label: "Cats", emoji: "🐱" },
                  ]}
                  onBeelineClick={() => setOpenBeelineSection("my-interests")}
                  beelineIconState={getSectionIconState(sectionIconState, "my-interests")}
                />
                {renderSectionFollowupCard("my-interests")}
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
                    <button
                      type="button"
                      onClick={() => setOpenBeelineSection("picture2")}
                      className="h-[34px] w-auto shrink-0 cursor-pointer border-0 bg-transparent p-0"
                      aria-label="Beeline"
                    >
                      <img
                        src="/icons/bumble_image_button.svg"
                        alt=""
                        className="h-[34px] w-auto object-contain"
                      />
                    </button>
                  </div>
                </div>
                {renderSectionFollowupCard("picture2")}
                <ProfileSectionText
                  title="When I unplug I like to"
                  body="Read, draw, journal, play guitar or cello, cook?, meditate"
                  onBeelineClick={() => setOpenBeelineSection("when-i-unplug")}
                  beelineIconState={getSectionIconState(sectionIconState, "when-i-unplug")}
                />
                {renderSectionFollowupCard("when-i-unplug")}
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
                    <button
                      type="button"
                      onClick={() => setOpenBeelineSection("picture3")}
                      className="h-[34px] w-auto shrink-0 cursor-pointer border-0 bg-transparent p-0"
                      aria-label="Beeline"
                    >
                      <img
                        src="/icons/bumble_image_button.svg"
                        alt=""
                        className="h-[34px] w-auto object-contain"
                      />
                    </button>
                  </div>
                </div>
                {renderSectionFollowupCard("picture3")}
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
                  onBeelineClick={() => setOpenBeelineSection("my-causes")}
                  beelineIconState={getSectionIconState(sectionIconState, "my-causes")}
                />
                {renderSectionFollowupCard("my-causes")}
                <ProfileSectionText
                  title="My favorite quality in a person is"
                  body="Passion- I love when people have hobbies they're really into or social causes they participate in"
                  onBeelineClick={() => setOpenBeelineSection("my-favorite-quality")}
                  beelineIconState={getSectionIconState(sectionIconState, "my-favorite-quality")}
                />
                {renderSectionFollowupCard("my-favorite-quality")}
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
                      <button
                        type="button"
                        onClick={() => setOpenBeelineSection("picture4")}
                        className="h-[34px] w-auto shrink-0 cursor-pointer border-0 bg-transparent p-0"
                        aria-label="Beeline"
                      >
                        <img
                          src="/icons/bumble_image_button.svg"
                          alt=""
                          className="h-[34px] w-auto object-contain"
                        />
                      </button>
                    </div>
                  </div>
                  {renderSectionFollowupCard("picture4")}
                  <ProfileSectionLocation
                    location="Boston"
                    onBeelineClick={() => setOpenBeelineSection("my-location")}
                    beelineIconState={getSectionIconState(sectionIconState, "my-location")}
                  />
                  {renderSectionFollowupCard("my-location")}
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
                      className="text-[14px] font-medium text-bumble-black my-6"
                    >
                      Block
                    </button>
                    <button
                      type="button"
                      className="text-[14px] font-medium text-red-600"
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
