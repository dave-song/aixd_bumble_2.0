"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PhoneFrame, StatusBar } from "@/components/layout";
import { BumbleButton, TitleSub } from "@/components/onboarding";

export default function NotificationsPage() {
  const router = useRouter();

  const handleAllow = () => {
    router.push("/discover");
  };

  const handleNotNow = () => {
    router.push("/discover");
  };

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-white">
        <StatusBar />

        {/* Content */}
        <div className="flex-1 px-[20px] pt-[80px] flex flex-col">
          {/* Bell icon */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-[32px]"
          >
            <span className="text-[64px]">🔔</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h1
              className="text-[28px] font-medium text-[#202020] leading-[39px]"
              style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
            >
              Don't miss a beat, or a match
            </h1>
            <p
              className="text-[16px] text-[#575656] mt-[12px] leading-[24.5px]"
              style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
            >
              Turn on your notifications so we can let you know when you have
              new matches, likes, or messages.
            </p>
          </motion.div>
        </div>

        {/* Bottom actions */}
        <div className="p-[20px] flex flex-col gap-[12px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <BumbleButton variant="primary" onClick={handleAllow}>
              Allow notifications
            </BumbleButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <button
              onClick={handleNotNow}
              className="w-full py-[12px] text-[16px] font-medium text-[#575656] transition-colors"
              style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
            >
              Not now
            </button>
          </motion.div>
        </div>
      </div>
    </PhoneFrame>
  );
}
