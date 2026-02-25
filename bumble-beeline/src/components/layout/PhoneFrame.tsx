"use client";

import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  showStatusBar?: boolean;
}

export default function PhoneFrame({
  children,
}: PhoneFrameProps) {
  return (
    <div className="relative w-[430px] h-[932px] bg-white rounded-[44px] shadow-phone overflow-hidden border border-gray-200/50">
      {/* Content area */}
      <div className="relative w-full h-full overflow-hidden">{children}</div>
    </div>
  );
}
