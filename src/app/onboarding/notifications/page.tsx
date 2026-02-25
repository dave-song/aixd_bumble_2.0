'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PhoneFrame, StatusBar } from '@/components/layout';
import { Button } from '@/components/ui';

export default function NotificationsPage() {
  const router = useRouter();

  const handleAllow = () => {
    router.push('/discover');
  };

  const handleNotNow = () => {
    router.push('/discover');
  };

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-white">
        <StatusBar />

        {/* Content */}
        <div className="flex-1 px-6 pt-20 flex flex-col">
          {/* Bell icon */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="mb-8"
          >
            <span className="text-6xl">🔔</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h1 className="text-[28px] font-bold text-black leading-tight">
              Don't miss a beat, or a match
            </h1>
            <p className="text-gray-600 mt-3 text-base leading-relaxed">
              Turn on your notifications so we can let you know when you have new matches, likes, or messages.
            </p>
          </motion.div>
        </div>

        {/* Bottom actions */}
        <div className="p-6 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleAllow}
            >
              Allow notifications
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <button
              onClick={handleNotNow}
              className="w-full py-3 text-base font-semibold text-gray-500 hover:text-gray-700 transition-colors"
            >
              Not now
            </button>
          </motion.div>
        </div>
      </div>
    </PhoneFrame>
  );
}
