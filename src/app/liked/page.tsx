'use client';

import { PhoneFrame, StatusBar, BottomNav } from '@/components/layout';
import { Heart } from 'lucide-react';

export default function LikedYouPage() {
  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-white">
        <StatusBar />

        {/* Header */}
        <div className="px-4 pt-2 pb-4">
          <h1 className="text-2xl font-bold text-black">Liked You</h1>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="w-20 h-20 rounded-full bg-beeline-yellow flex items-center justify-center mb-6">
            <Heart size={40} className="text-bumble-yellow" />
          </div>
          <h2 className="text-xl font-bold text-black text-center mb-2">
            See who likes you
          </h2>
          <p className="text-gray-500 text-center text-sm">
            Upgrade to Bumble Premium to see everyone who's already liked you.
          </p>
          <button className="mt-6 px-8 py-3 bg-bumble-yellow text-black font-semibold rounded-full">
            Upgrade to Premium
          </button>
        </div>

        {/* Bottom navigation */}
        <BottomNav activeTab="liked" />
      </div>
    </PhoneFrame>
  );
}
