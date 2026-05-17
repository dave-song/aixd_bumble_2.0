"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PhoneFrame, StatusBar } from "@/components/layout";
import { BumbleLogo } from "@/components/ui";

const SPLASH_AUTO_ADVANCE_MS = 2500;

export default function SplashPage() {
  const router = useRouter();
  const hasAdvanced = useRef(false);

  const goToOnboarding = useCallback(() => {
    if (hasAdvanced.current) return;
    hasAdvanced.current = true;
    router.push("/onboarding/name");
  }, [router]);

  useEffect(() => {
    const timer = setTimeout(goToOnboarding, SPLASH_AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [goToOnboarding]);

  return (
    <PhoneFrame>
      <button
        type="button"
        onClick={goToOnboarding}
        className="relative flex h-full w-full flex-col overflow-hidden bg-white text-left"
        aria-label="Continue to onboarding"
      >
        <StatusBar />

        <div className="flex flex-1 items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <BumbleLogo size={109} />
          </motion.div>
        </div>
      </button>
    </PhoneFrame>
  );
}
