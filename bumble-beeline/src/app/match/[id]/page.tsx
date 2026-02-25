"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { PhoneFrame, StatusBar } from "@/components/layout";
import { profiles, userProfile } from "@/lib/mockData";
import { X, MoreVertical, Send } from "lucide-react";

export default function MatchPage() {
  const router = useRouter();
  const params = useParams();
  const [message, setMessage] = useState("");
  const [showAnimation, setShowAnimation] = useState(true);

  const matchedProfile =
    profiles.find((p) => p.id === params.id) || profiles[0];

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    router.push("/discover");
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      router.push(`/chats/${matchedProfile.id}`);
    }
  };

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-white">
        <StatusBar />

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2">
          <button onClick={handleClose}>
            <X size={24} className="text-gray-600" />
          </button>
          <button>
            <MoreVertical size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Photo overlap animation */}
          <div className="relative w-64 h-48 mb-8">
            {/* User's photo (left, behind) */}
            <motion.div
              initial={{ x: 40, rotate: -5, scale: 0.9 }}
              animate={{ x: -20, rotate: -8, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.2,
              }}
              className="absolute left-0 top-0 w-36 h-44 rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={userProfile.photos[0]}
                alt={userProfile.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Match's photo (right, in front) */}
            <motion.div
              initial={{ x: -40, rotate: 5, scale: 0.9 }}
              animate={{ x: 20, rotate: 8, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.2,
              }}
              className="absolute right-0 top-0 w-36 h-44 rounded-2xl overflow-hidden shadow-lg z-10"
            >
              <img
                src={matchedProfile.photos[0]}
                alt={matchedProfile.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Bumble icon in center */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.5,
              }}
              className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center z-20"
            >
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
                <div className="absolute w-6 h-6 rounded-full border-2 border-white" />
              </div>
            </motion.div>
          </div>

          {/* Match text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-3xl font-bold text-black mb-2"
          >
            What a match!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-gray-500 text-center"
          >
            Now you have 24 hours to start chatting.
          </motion.p>

          {/* Opening move */}
          {matchedProfile.openingMove && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="w-full mt-8 p-4 bg-gray-50 rounded-2xl"
            >
              <p className="text-xs font-semibold text-gray-500 mb-1">
                {matchedProfile.name}'s Opening Move
              </p>
              <p className="text-sm text-gray-800">
                {matchedProfile.openingMove}
              </p>
            </motion.div>
          )}
        </div>

        {/* Message input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="p-4"
        >
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-3">
            <input
              type="text"
              placeholder={message ? message : "Send a message..."}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 bg-transparent text-sm placeholder:text-gray-400 focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center
                transition-colors
                ${message.trim() ? "bg-bumble-yellow" : "bg-gray-200"}
              `}
            >
              <Send
                size={18}
                className={message.trim() ? "text-black" : "text-gray-400"}
              />
            </button>
          </div>
        </motion.div>
      </div>
    </PhoneFrame>
  );
}
