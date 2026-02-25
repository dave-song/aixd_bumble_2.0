"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PhoneFrame, StatusBar, BottomNav } from "@/components/layout";
import { matches } from "@/lib/mockData";
import { Search, ChevronRight, Heart } from "lucide-react";

export default function ChatsPage() {
  const router = useRouter();

  const handleChatClick = (matchId: string) => {
    router.push(`/chats/${matchId}`);
  };

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-white">
        <StatusBar />

        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-2 pb-4">
          <h1 className="text-2xl font-bold text-black">Chats</h1>
          <button>
            <Search size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Matches row */}
        <div className="px-4 mb-4">
          <p className="text-sm font-medium text-gray-600 mb-3">
            Your matches ({matches.length})
          </p>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            {matches.map((match, index) => (
              <motion.button
                key={match.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleChatClick(match.profile.id)}
                className="relative flex-shrink-0"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                  <img
                    src={match.profile.photos[0]}
                    alt={match.profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {match.hasNewMatch && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-bumble-yellow rounded-full px-2 py-0.5">
                    <Heart size={12} className="text-white" fill="white" />
                  </div>
                )}
                {index === 0 && (
                  <div className="absolute -top-1 -left-1 w-5 h-5 bg-bumble-yellow rounded-full flex items-center justify-center text-[10px] font-bold">
                    6
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Chats list */}
        <div className="flex-1 overflow-auto pb-24">
          {/* Opening moves prompt */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex items-center gap-4 p-4 border-b border-gray-100"
          >
            <div className="relative">
              <div className="w-16 h-12 flex items-center justify-center">
                <div className="absolute w-10 h-12 bg-bumble-yellow rounded-lg transform -rotate-6" />
                <div className="absolute w-10 h-12 bg-yellow-300 rounded-lg transform rotate-6" />
              </div>
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-black">
                Need help with the first message?
              </p>
              <p className="text-xs text-gray-500">Try Opening Moves.</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </motion.button>

          {/* Chat section header */}
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-sm font-medium text-gray-600">Chats (Recent)</p>
            <button className="text-gray-400">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
          </div>

          {/* Chat items */}
          {matches.map((match, index) => (
            <motion.button
              key={match.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => handleChatClick(match.profile.id)}
              className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <img
                  src={match.profile.photos[0]}
                  alt={match.profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-left">
                <p className="text-base font-semibold text-black">
                  {match.profile.name}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {match.messages.length > 0
                    ? match.messages[match.messages.length - 1].text
                    : match.profile.bio || "Start a conversation..."}
                </p>
              </div>
              {match.yourMove && (
                <span className="text-xs font-medium text-bumble-yellow">
                  Your move
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Bottom navigation */}
        <BottomNav activeTab="chats" />
      </div>
    </PhoneFrame>
  );
}
