'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneFrame, StatusBar, BottomNav } from '@/components/layout';
import { ProfileCard } from '@/components/cards';
import { BeelineOverlay, BeelineBanner, BeelineState } from '@/components/beeline';
import { profiles, beelineQuestions } from '@/lib/mockData';
import { Settings2 } from 'lucide-react';

export default function DiscoverPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [beelineState, setBeelineState] = useState<BeelineState>('collapsed');
  const [showBeelineBanner, setShowBeelineBanner] = useState(false);
  const [showBeeline, setShowBeeline] = useState(true);
  const [hasNotification, setHasNotification] = useState(true);

  const currentProfile = profiles[currentIndex];
  const currentQuestion = beelineQuestions[currentIndex % beelineQuestions.length];

  const handleSwipeLeft = useCallback(() => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setBeelineState('collapsed');
    }
  }, [currentIndex]);

  const handleSwipeRight = useCallback(() => {
    router.push(`/match/${currentProfile?.id}`);
  }, [currentProfile?.id, router]);

  const handleBeelineStateChange = (state: BeelineState) => {
    setBeelineState(state);
    if (state === 'done') {
      setTimeout(() => {
        setShowBeeline(false);
        setShowBeelineBanner(true);
      }, 1000);
    }
  };

  const handleBeelineAnswer = (answer: 'yes' | 'no' | 'spill') => {
    console.log('Beeline answer:', answer);
    if (answer !== 'spill') {
      handleBeelineStateChange('done');
    }
  };

  const handleBannerClick = () => {
    router.push('/profile');
  };

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-white relative">
        <StatusBar />

        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-2 pb-4">
          <h1 className="text-2xl font-bold text-black">Bumble</h1>
          <div className="flex items-center gap-3">
            {/* Beeline icon with notification */}
            <button 
              onClick={() => setShowBeeline(!showBeeline)}
              className="relative"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill="#FFC629"
                  stroke="#FFC629"
                  strokeWidth="1"
                />
              </svg>
              {hasNotification && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              )}
            </button>
            {/* Filter button */}
            <button>
              <Settings2 size={24} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Profile cards area */}
        <div className="flex-1 relative overflow-hidden">
          {/* Beeline banner */}
          <AnimatePresence>
            {showBeelineBanner && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-0 left-0 right-0 z-30 mx-4"
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
            <div className="absolute inset-4 bottom-24 flex items-center justify-center">
              <div className="text-center">
                <p className="text-xl font-semibold text-gray-800">No more profiles</p>
                <p className="text-gray-500 mt-2">Check back later for new people!</p>
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
