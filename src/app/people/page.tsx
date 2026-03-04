"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BeelineFollowupCard } from "@/components/beeline/BeelineFollowupCard";
import { BeelinePopoverCard } from "@/components/beeline/BeelinePopoverCard";
import { VoiceWaveUI } from "@/components/beeline/VoiceWaveUI";
import { BeelineHeaderIcon, StatusBar } from "@/components/layout";
import { BottomNav } from "@/components/layout/BottomNav";
import { PhoneFrame } from "@/components/layout/PhoneFrame";
import type { BeelineIconState } from "@/components/profile";
import { ProfileCardContent } from "@/components/discover/ProfileCardContent";
import { SwipeExplanationPanel } from "@/components/discover/SwipeExplanationPanel";
import type { BeelineSectionId } from "@/lib/beelineSectionQuestions";
import { BEELINE_SECTION_QUESTIONS } from "@/lib/beelineSectionQuestions";
import { DISCOVER_PROFILES } from "@/lib/profileData";

const HARI_PROFILE = DISCOVER_PROFILES[0];

export default function PeoplePage() {
  const router = useRouter();
  const profileScrollRef = useRef<HTMLDivElement>(null);
  const followupCardRef = useRef<HTMLDivElement>(null);

  const [openBeelineSection, setOpenBeelineSection] =
    useState<BeelineSectionId | null>(null);
  const [sectionIconState, setSectionIconState] = useState<
    Record<BeelineSectionId, BeelineIconState>
  >({});
  const [sectionSpilling, setSectionSpilling] = useState(false);
  const [sectionSpillDone, setSectionSpillDone] = useState(false);
  const [showHeaderBeelineCard, setShowHeaderBeelineCard] = useState(true);

  const handleTabChange = (tab: string) => {
    if (tab === "people") return;
    if (tab === "profile") router.push("/profile");
    if (tab === "discover") router.push("/discover");
    if (tab === "liked") router.push("/liked");
    if (tab === "chats") router.push("/chats");
  };

  const handleBeelineClick = (sectionId: BeelineSectionId) => {
    setOpenBeelineSection((prev) => (prev === sectionId ? null : sectionId));
  };

  const handleFollowupAnswer = (sectionId: BeelineSectionId) => (answer: "yes" | "no") => {
    setSectionIconState((prev) => ({ ...prev, [sectionId]: answer }));
    setOpenBeelineSection(null);
  };

  const handleFollowupSpillDone = (sectionId: BeelineSectionId) => () => {
    setSectionIconState((prev) => ({ ...prev, [sectionId]: "spill-done" }));
    setOpenBeelineSection(null);
    setSectionSpilling(false);
    setSectionSpillDone(false);
  };

  const handleSpillingStateChange = (sectionId: BeelineSectionId) =>
    (isSpilling: boolean, isSpillDone: boolean) => {
      setSectionSpilling(isSpilling);
      setSectionSpillDone(isSpillDone);
      if (isSpilling && followupCardRef.current) {
        setTimeout(() => {
          followupCardRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 100);
      }
    };

  const renderSectionFollowupCard = (sectionId: BeelineSectionId) => {
    if (openBeelineSection !== sectionId) return null;
    const question = BEELINE_SECTION_QUESTIONS[sectionId];
    if (!question) return null;
    return (
      <div key={sectionId} ref={followupCardRef}>
        <BeelineFollowupCard
          question={question}
          onClose={() => setOpenBeelineSection(null)}
          onAnswer={handleFollowupAnswer(sectionId)}
          onActually={handleFollowupSpillDone(sectionId)}
          onSpillingStateChange={handleSpillingStateChange(sectionId)}
        />
      </div>
    );
  };

  const showVoiceWave =
    (sectionSpilling || sectionSpillDone) && openBeelineSection !== null;

  if (!HARI_PROFILE) return null;

  return (
    <div className="flex min-h-screen min-w-0 items-center bg-[#444444]">
      {/* Left spacer: equal to right side so phone is visually centered */}
      <div className="flex-1 min-w-0 shrink" aria-hidden />
      <PhoneFrame>
        <div className="flex h-full w-full flex-col bg-white">
          <StatusBar />

          <header className="relative flex w-full shrink-0 items-center justify-center bg-white">
          <img
            src="/icons/bumble-top-header-no-bee.svg"
            alt="Bumble"
            className="h-[42px] w-full shrink-0 object-contain object-left"
          />
          <div
            className="absolute right-[52px] top-1/2 flex h-[42px] -translate-y-1/2 items-center justify-center"
            aria-hidden={false}
          >
            <BeelineHeaderIcon
              className="h-9 w-9"
              isActive={showHeaderBeelineCard}
              onClick={() => setShowHeaderBeelineCard((prev) => !prev)}
            />
          </div>
          </header>

          <div className="relative flex min-h-0 flex-1 flex-col items-center bg-white pb-4">
          {/* Voice wave pill when spilling the tea (card may have scrolled out of view) */}
          {showVoiceWave && (
            <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
              <VoiceWaveUI />
            </div>
          )}

          {/* Single scroll: Beeline card (outside) + profile card. Beeline scrolls with the page but is not inside the profile's scroll. */}
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden w-full">
            {showHeaderBeelineCard && (
              <div className="shrink-0 flex justify-center px-4 pt-2 pb-2">
                <BeelinePopoverCard
                  onClose={() => setShowHeaderBeelineCard(false)}
                />
              </div>
            )}
            <div
              className="relative flex min-h-[512px] w-full max-w-[411px] shrink-0 flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_0_12px_0_rgba(0,0,0,0.25)] self-center"
              style={{ boxSizing: "border-box" }}
            >
              <ProfileCardContent
                profile={HARI_PROFILE}
                heroInsideScroll
                scrollRef={profileScrollRef}
                onBeelineClick={handleBeelineClick}
                getBeelineIconState={(id) => sectionIconState[id] ?? "default"}
                renderSectionFollowupCard={renderSectionFollowupCard}
              />

              <img
                src="/icons/like button with spacing.svg"
                alt="Like"
                className="absolute bottom-0 right-0 h-auto w-[92px] object-contain object-bottom-right pointer-events-none"
              />
            </div>
          </div>

          </div>

          <BottomNav activeTab="people" onTabChange={handleTabChange} />
        </div>
      </PhoneFrame>

      {/* Right side: panel immediately to the right of the phone */}
      <div className="flex flex-1 min-w-0 items-center justify-start pl-4">
        <SwipeExplanationPanel
          onLeftArrowClick={() => {}}
          onRightArrowClick={() => {}}
        />
      </div>
    </div>
  );
}
