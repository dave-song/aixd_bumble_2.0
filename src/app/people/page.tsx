"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BeelineFollowupCard } from "@/components/beeline/BeelineFollowupCard";
import { BeelinePopoverCard } from "@/components/beeline/BeelinePopoverCard";
import { VoiceWaveUI } from "@/components/beeline/VoiceWaveUI";
import { BeelineHeaderIcon, StatusBar } from "@/components/layout";
import { BottomNav } from "@/components/layout/BottomNav";
import { PhoneFrame } from "@/components/layout/PhoneFrame";
import type { BeelineIconState } from "@/components/profile";
import { MatchScreen } from "@/components/discover/MatchScreen";
import { PassScreen } from "@/components/discover/PassScreen";
import { PostMatchChatScreen } from "@/components/discover/PostMatchChatScreen";
import { ProfileCardContent } from "@/components/discover/ProfileCardContent";
import type { BeelineSectionId } from "@/lib/beelineSectionQuestions";
import { BEELINE_SECTION_QUESTIONS } from "@/lib/beelineSectionQuestions";
import { DISCOVER_PROFILES } from "@/lib/profileData";

const HARI_PROFILE = DISCOVER_PROFILES[0];
const OPENING_MOVE_PLACEHOLDER = "What's your ideal first date?";
const HARI_AVATAR = "/icons/match_process_assets/haris_profile_pic.png";

export default function PeoplePage() {
  const router = useRouter();
  const profileScrollRef = useRef<HTMLDivElement>(null);
  const followupCardRef = useRef<HTMLDivElement>(null);
  const dogAndLocationRef = useRef<HTMLDivElement>(null);

  const [likeButtonOpacity, setLikeButtonOpacity] = useState(1);
  const [openBeelineSection, setOpenBeelineSection] =
    useState<BeelineSectionId | null>(null);
  const [sectionIconState, setSectionIconState] = useState<
    Partial<Record<BeelineSectionId, BeelineIconState>>
  >({});
  const [sectionSpilling, setSectionSpilling] = useState(false);
  const [sectionSpillDone, setSectionSpillDone] = useState(false);
  const [showHeaderBeelineCard, setShowHeaderBeelineCard] = useState(true);
  const [showMatchScreen, setShowMatchScreen] = useState(false);
  const [showPassScreen, setShowPassScreen] = useState(false);
  const [showPostMatchChat, setShowPostMatchChat] = useState(false);
  const [sentMessage, setSentMessage] = useState("");

  // Keyboard: left = pass, right = match (only when not already on match/post-match)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setShowPassScreen(true);
      }
      if (e.key === "ArrowRight" && !showMatchScreen && !showPostMatchChat) {
        e.preventDefault();
        setShowMatchScreen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showMatchScreen, showPostMatchChat]);

  // Like button hovers over profile and fades out only when user scrolls to near the end (and content is scrollable)
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
      if (atEnd) {
        setLikeButtonOpacity(0);
        return;
      }
      setLikeButtonOpacity(1);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [e] = entries;
        if (!e) return;
        const { scrollTop, clientHeight, scrollHeight } = scrollEl;
        const canScroll = scrollHeight > clientHeight;
        if (!canScroll) {
          setLikeButtonOpacity(1);
          return;
        }
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
    // Initial: show button unless content is scrollable and we're already at end
    updateOpacity();
    observer.observe(triggerEl);
    return () => {
      observer.disconnect();
      scrollEl.removeEventListener("scroll", updateOpacity);
    };
  }, []);

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

  const handleFollowupAnswer =
    (sectionId: BeelineSectionId) => (answer: "yes" | "no") => {
      setSectionIconState((prev) => ({ ...prev, [sectionId]: answer }));
      setOpenBeelineSection(null);
    };

  const handleFollowupSpillDone = (sectionId: BeelineSectionId) => () => {
    setSectionIconState((prev) => ({ ...prev, [sectionId]: "spill-done" }));
    setOpenBeelineSection(null);
    setSectionSpilling(false);
    setSectionSpillDone(false);
  };

  const handleSpillingStateChange =
    (sectionId: BeelineSectionId) =>
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
    <PhoneFrame>
      <div className="relative flex h-full w-full flex-col bg-white">
          {/* Match flow overlays */}
          {showMatchScreen && (
            <div className="absolute inset-0 z-50 flex flex-col bg-white">
              <MatchScreen
                matchedProfileId="hari"
                matchedProfileName="Hari"
                openingMovePlaceholder={OPENING_MOVE_PLACEHOLDER}
                onClose={() => setShowMatchScreen(false)}
                onSendMessage={(text) => {
                  setSentMessage(text);
                  setShowMatchScreen(false);
                  setShowPostMatchChat(true);
                }}
              />
            </div>
          )}
          {showPostMatchChat && (
            <div className="absolute inset-0 z-50 flex flex-col bg-white">
              <PostMatchChatScreen
                matchedProfileName="Hari"
                avatarSrc={HARI_AVATAR}
                openingMoveText={OPENING_MOVE_PLACEHOLDER}
                sentMessage={sentMessage}
                onClose={() => {
                  setShowPostMatchChat(false);
                  router.push("/chats");
                }}
              />
            </div>
          )}
          {showPassScreen && (
            <div className="absolute inset-0 z-50 flex flex-col bg-white">
              <PassScreen onClose={() => setShowPassScreen(false)} />
            </div>
          )}

          <StatusBar />

          <header className="relative flex w-full shrink-0 items-center justify-center bg-white">
            <img
              src="/icons/bumble-top-header-no-bee.svg"
              alt="Bumble"
              className="h-[42px] w-full shrink-0 object-contain object-left"
            />
            <div
              className="absolute right-[47px] top-1/2 flex h-[42px] -translate-y-1/2 items-center justify-center"
              aria-hidden={false}
            >
              <BeelineHeaderIcon
                className="h-9 w-9"
                isActive={showHeaderBeelineCard}
                onClick={() => setShowHeaderBeelineCard((prev) => !prev)}
              />
            </div>
          </header>

          <div className="relative flex min-h-0 flex-1 flex-col items-center overflow-hidden bg-white px-[var(--content-inset-x)]">
            {/* Voice wave pill when spilling the tea (card may have scrolled out of view) */}
            {showVoiceWave && (
              <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
                <VoiceWaveUI />
              </div>
            )}

            {showHeaderBeelineCard && (
              <div className="proto-profile-card w-full shrink-0 pt-2 pb-2">
                <BeelinePopoverCard
                  onClose={() => setShowHeaderBeelineCard(false)}
                />
              </div>
            )}

            <div className="proto-profile-card relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_0_12px_0_rgba(0,0,0,0.25)]">
                <ProfileCardContent
                  profile={HARI_PROFILE}
                  heroInsideScroll
                  scrollRef={profileScrollRef}
                  dogAndLocationRef={dogAndLocationRef}
                  onBeelineClick={handleBeelineClick}
                  getBeelineIconState={(id) =>
                    sectionIconState[id] ?? "default"
                  }
                  renderSectionFollowupCard={renderSectionFollowupCard}
                />
              <img
                src="/icons/like button with spacing.svg"
                alt="Like"
                className={`absolute bottom-0 right-0 z-10 h-auto w-[var(--like-button-width)] object-contain object-bottom-right transition-opacity duration-300 ease-out ${likeButtonOpacity > 0 ? "pointer-events-auto" : "pointer-events-none"}`}
                style={{ opacity: likeButtonOpacity }}
              />
            </div>
          </div>

          <BottomNav activeTab="people" onTabChange={handleTabChange} />
      </div>
    </PhoneFrame>
  );
}
