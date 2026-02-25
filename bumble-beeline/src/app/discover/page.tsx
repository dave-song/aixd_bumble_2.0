"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneFrame, StatusBar, BottomNav } from "@/components/layout";
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

  return (
    <PhoneFrame>
      <div className="h-full bg-white relative">
        {/* Status bar wrapper */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <StatusBar />
        </div>

        {/* Header - matches Figma Bumble top main section */}
        <div className="absolute top-[54px] left-0 right-0 flex items-center justify-between px-[10px] h-[42px] bg-white z-10">
          <h1 className="text-[28px] font-bold text-black tracking-[-0.02em]" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>Bumble</h1>
          <div className="flex items-center gap-[15px]">
            {/* Beeline icon with notification - star with center dot */}
            <button
              onClick={() => setShowBeeline(!showBeeline)}
              className="relative w-[32px] h-[32px] flex items-center justify-center"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z"
                  fill="#1A1A1A"
                  stroke="#1A1A1A"
                  strokeWidth="0.5"
                />
                <circle cx="12" cy="12.5" r="2.5" fill="white"/>
              </svg>
              {hasNotification && (
                <span className="absolute top-0 right-0 w-[10px] h-[10px] bg-[#FF4458] rounded-full border-2 border-white" />
              )}
            </button>
            {/* Filter button - sliders icon */}
            <button className="w-[32px] h-[32px] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <line x1="4" y1="6" x2="20" y2="6" stroke="#1A1A1A" strokeWidth="1.5"/>
                <line x1="4" y1="12" x2="20" y2="12" stroke="#1A1A1A" strokeWidth="1.5"/>
                <line x1="4" y1="18" x2="20" y2="18" stroke="#1A1A1A" strokeWidth="1.5"/>
                <circle cx="8" cy="6" r="2" fill="white" stroke="#1A1A1A" strokeWidth="1.5"/>
                <circle cx="16" cy="12" r="2" fill="white" stroke="#1A1A1A" strokeWidth="1.5"/>
                <circle cx="10" cy="18" r="2" fill="white" stroke="#1A1A1A" strokeWidth="1.5"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Profile cards area - full height container for absolute positioning */}
        <div className="absolute inset-0">
          {/* Beeline banner */}
          <AnimatePresence>
            {showBeelineBanner && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-[100px] left-[10px] right-[10px] z-30"
              >
                <BeelineBanner
                  title="Your Beeline profile is now ready."
                  subtitle="Everything I've learned while you were yapping."
                  onClick={handleBannerClick}
                />
              </motion.div>
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
          badges={{ profile: hasNotification ? 1 : 0 }}
        />
      </div>
    </PhoneFrame>
  );
}
