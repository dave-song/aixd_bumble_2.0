"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BeelineFollowupCard } from "@/components/beeline/BeelineFollowupCard";
import { PeopleTopHeader, StatusBar } from "@/components/layout";
import { BottomNav } from "@/components/layout/BottomNav";
import { PhoneFrame } from "@/components/layout/PhoneFrame";
import type { BeelineIconState } from "@/components/profile";
import { MatchScreen } from "@/components/discover/MatchScreen";
import { PassScreen } from "@/components/discover/PassScreen";
import { PostMatchChatScreen } from "@/components/discover/PostMatchChatScreen";
import { PeopleProfileSwipeLayer } from "@/components/discover/PeopleProfileSwipeLayer";
import { PeopleSuperLikeButton } from "@/components/discover/PeopleSuperLikeButton";
import { ProfileCardContent } from "@/components/discover/ProfileCardContent";
import type { BeelineSectionId } from "@/lib/beelineSectionQuestions";
import { BEELINE_SECTION_QUESTIONS } from "@/lib/beelineSectionQuestions";
import { DISCOVER_PROFILES } from "@/lib/profileData";
import { usePeopleSuperLikeFade } from "@/lib/usePeopleSuperLikeFade";

const HARI_PROFILE = DISCOVER_PROFILES[0];
const OPENING_MOVE_PLACEHOLDER = "What's your ideal first date?";
const HARI_AVATAR = "/icons/match_process_assets/haris_profile_pic.png";

export default function PeoplePage() {
  const router = useRouter();
  const followupCardRef = useRef<HTMLDivElement>(null);
  const profileScrollRef = useRef<HTMLDivElement>(null);
  const dogAndLocationRef = useRef<HTMLDivElement>(null);
  const profileBottomRef = useRef<HTMLDivElement>(null);
  const superLikeOpacity = usePeopleSuperLikeFade(
    profileScrollRef,
    dogAndLocationRef,
    profileBottomRef,
  );

  const [openBeelineSection, setOpenBeelineSection] =
    useState<BeelineSectionId | null>(null);
  const [sectionIconState, setSectionIconState] = useState<
    Partial<Record<BeelineSectionId, BeelineIconState>>
  >({});
  const [showMatchScreen, setShowMatchScreen] = useState(false);
  const [showPassScreen, setShowPassScreen] = useState(false);
  const [showPostMatchChat, setShowPostMatchChat] = useState(false);
  const [sentMessage, setSentMessage] = useState("");

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
  };

  const handleSpillingStateChange =
    (sectionId: BeelineSectionId) => (isSpilling: boolean) => {
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

  if (!HARI_PROFILE) return null;

  return (
    <PhoneFrame>
      <div className="relative flex h-full w-full flex-col bg-white">
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

        <div className="people-page-shell flex min-h-0 flex-1 flex-col">
          <PeopleTopHeader />

          <div className="people-profile-card-host flex min-h-0 flex-1 flex-col">
            <PeopleProfileSwipeLayer
              onSwipeRight={() => setShowMatchScreen(true)}
              disabled={
                showMatchScreen ||
                showPassScreen ||
                showPostMatchChat ||
                openBeelineSection !== null
              }
            >
              <div className="proto-profile-card proto-profile-card--people relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[18px] bg-white">
              <div
                ref={profileScrollRef}
                className="people-profile-scroll flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto"
              >
                <ProfileCardContent
                  profile={HARI_PROFILE}
                  heroInsideScroll
                  heroLayout="people"
                  disableInternalScroll
                  dogAndLocationRef={dogAndLocationRef}
                  profileBottomRef={profileBottomRef}
                  onBeelineClick={handleBeelineClick}
                  getBeelineIconState={(id) =>
                    sectionIconState[id] ?? "default"
                  }
                  renderSectionFollowupCard={renderSectionFollowupCard}
                />
              </div>
              <PeopleSuperLikeButton
                opacity={superLikeOpacity}
                onClick={() => setShowMatchScreen(true)}
              />
            </div>
            </PeopleProfileSwipeLayer>
          </div>
        </div>

        <BottomNav activeTab="people" onTabChange={handleTabChange} />
      </div>
    </PhoneFrame>
  );
}
