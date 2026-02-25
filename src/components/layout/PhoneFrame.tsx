'use client';

import { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
  showStatusBar?: boolean;
}

export default function PhoneFrame({ children, showStatusBar = true }: PhoneFrameProps) {
  return (
    <div className="relative w-[390px] h-[844px] bg-white rounded-[44px] shadow-phone overflow-hidden">
      {/* Phone notch/dynamic island */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
      
      {/* Content area */}
      <div className="relative w-full h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}
