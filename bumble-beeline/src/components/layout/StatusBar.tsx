"use client";

interface StatusBarProps {
  dark?: boolean;
}

export default function StatusBar({ dark = false }: StatusBarProps) {
  const textColor = dark ? "text-white" : "text-black";
  const iconColor = dark ? "#FFFFFF" : "#000000";

  return (
    <div
      className={`flex items-center justify-between px-[26px] h-[54px] ${textColor}`}
    >
      {/* Time */}
      <div className="flex items-center gap-[4px]">
        <span className="text-[17px] font-semibold tracking-tight">4:03</span>
        <span className="text-[17px] font-semibold">{"{}"}</span>
      </div>

      {/* Right side icons */}
      <div className="flex items-center gap-[5px]">
        {/* Signal bars - iOS style */}
        <svg width="21" height="13" viewBox="0 0 21 13" fill="none">
          <rect x="0" y="9" width="4" height="4" rx="1" fill={iconColor} />
          <rect x="5.5" y="6" width="4" height="7" rx="1" fill={iconColor} />
          <rect x="11" y="3" width="4" height="10" rx="1" fill={iconColor} />
          <rect x="16.5" y="0" width="4" height="13" rx="1" fill={iconColor} />
        </svg>

        {/* WiFi */}
        <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
          <path
            d="M9 3C12.3 3 15.2 4.4 17 6.8L9 13L1 6.8C2.8 4.4 5.7 3 9 3Z"
            fill={iconColor}
          />
        </svg>

        {/* Battery */}
        <div className="flex items-center">
          <div className="relative w-[29px] h-[14px] border-[1.5px] border-current rounded-[4px] flex items-center p-[2px]">
            <div className="w-full h-full bg-current rounded-[2px]" />
          </div>
          <div className="w-[3px] h-[6px] bg-current rounded-r-[2px] ml-[1px] opacity-50" />
        </div>
      </div>
    </div>
  );
}
