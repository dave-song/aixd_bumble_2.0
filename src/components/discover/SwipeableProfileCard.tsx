"use client";

interface SwipeableProfileCardProps {
  children: React.ReactNode;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  className?: string;
}

/**
 * Profile card wrapper for the discover stack. Navigation is via the
 * instruction panel arrows and keyboard (left/right), not swipe gesture.
 */
export function SwipeableProfileCard({
  children,
  onSwipeLeft: _onSwipeLeft,
  onSwipeRight: _onSwipeRight,
  className = "",
}: SwipeableProfileCardProps) {
  return (
    <div
      className={`absolute inset-0 z-10 ${className}`}
    >
      <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden rounded-[18px] bg-white">
        {children}
      </div>
    </div>
  );
}
