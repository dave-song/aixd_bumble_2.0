"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { PhoneFrame, StatusBar, BottomNav, Header } from "@/components/layout";
import { ProfileCard } from "@/components/cards";
import {
  BeelineOverlay,
  BeelineBanner,
  BeelineState,
} from "@/components/beeline";
import { profiles, beelineQuestions } from "@/lib/mockData";

export default function DiscoverPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [beelineState, setBeelineState] = useState<BeelineState>("collapsed");
  const [showBeelineBanner, setShowBeelineBanner] = useState(false);
  const [showBeeline, setShowBeeline] = useState(true);
  const [hasNotification, setHasNotification] = useState(true);

  const currentProfile = profiles[currentIndex];
  const currentQuestion =
    beelineQuestions[currentIndex % beelineQuestions.length];

  const handleSwipeLeft = useCallback(() => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setBeelineState("collapsed");
    }
  }, [currentIndex]);

  const handleSwipeRight = useCallback(() => {
    router.push(`/match/${currentProfile?.id}`);
  }, [currentProfile?.id, router]);

  const handleBeelineStateChange = (state: BeelineState) => {
    setBeelineState(state);
    if (state === "done") {
      setTimeout(() => {
        setShowBeeline(false);
        setShowBeelineBanner(true);
      }, 1000);
    }
  };

  const handleBeelineAnswer = (answer: "yes" | "no" | "spill") => {
    console.log("Beeline answer:", answer);
    if (answer !== "spill") {
      handleBeelineStateChange("done");
    }
  };

  const handleBannerClick = () => {
    router.push("/profile");
  };

  const handleBeelineClick = () => {
    setShowBeeline(!showBeeline);
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-white relative">
        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <StatusBar />
        </div>

        {/* Header */}
        <div className="absolute top-[54px] left-0 right-0 bg-white z-10">
          <Header
            notif={hasNotification ? "yes" : "no"}
            onBeelineClick={handleBeelineClick}
          />
        </div>

        {/* Profile cards area */}
        <div className="absolute inset-0">
          {/* Beeline banner */}
          <AnimatePresence>
            {showBeelineBanner && (
              <BeelineBanner
                title="Your Beeline profile is now ready."
                subtitle="Everything I've learned while you were yapping."
                onClick={handleBannerClick}
              />
            )}
          </AnimatePresence>

          {/* Beeline overlay */}
          <AnimatePresence>
            {showBeeline && !showBeelineBanner && (
              <BeelineOverlay
                state={beelineState}
                question={currentQuestion}
                onStateChange={handleBeelineStateChange}
                onAnswer={handleBeelineAnswer}
              />
            )}
          </AnimatePresence>

          {/* Profile card stack */}
          <AnimatePresence mode="popLayout">
            {currentProfile && (
              <ProfileCard
                key={currentProfile.id}
                profile={currentProfile}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
                isTop={true}
              />
            )}
          </AnimatePresence>

          {/* No more profiles message */}
          {!currentProfile && (
            <div className="absolute top-[114px] bottom-[94px] left-[10px] right-[10px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-xl font-semibold text-gray-800">
                  No more profiles
                </p>
                <p className="text-gray-500 mt-2">
                  Check back later for new people!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom navigation */}
        <BottomNav
          activeTab="people"
          showProfileBadge={hasNotification}
        />
      </div>
    </PhoneFrame>
  );
}
