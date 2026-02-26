"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PhoneFrame, StatusBar } from "@/components/layout";
import { BumbleLogo } from "@/components/ui";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/onboarding/name");
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <PhoneFrame>
      <div className="relative w-full h-full bg-white flex flex-col">
        <StatusBar />
        
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.16, 1, 0.3, 1] 
            }}
          >
            <BumbleLogo size={109} />
          </motion.div>
        </div>
      </div>
    </PhoneFrame>
  );
}
