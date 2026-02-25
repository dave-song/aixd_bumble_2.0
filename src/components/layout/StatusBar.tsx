'use client';

interface StatusBarProps {
  dark?: boolean;
}

export default function StatusBar({ dark = false }: StatusBarProps) {
  const textColor = dark ? 'text-white' : 'text-black';
  const iconColor = dark ? '#FFFFFF' : '#000000';

  return (
    <div className={`flex items-center justify-between px-6 pt-3 pb-2 ${textColor}`}>
      {/* Time */}
      <div className="flex items-center gap-1">
        <span className="text-[17px] font-semibold">4:03</span>
        <span className="text-[17px] font-semibold">{'{}'}</span>
      </div>

      {/* Right side icons */}
      <div className="flex items-center gap-1">
        {/* Signal bars */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="8" width="3" height="4" rx="1" fill={iconColor} />
          <rect x="5" y="5" width="3" height="7" rx="1" fill={iconColor} />
          <rect x="10" y="2" width="3" height="10" rx="1" fill={iconColor} />
          <rect x="15" y="0" width="3" height="12" rx="1" fill={iconColor} fillOpacity="0.3" />
        </svg>

        {/* WiFi */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" className="ml-1">
          <path
            d="M8.5 2.5C11.5 2.5 14 3.8 15.5 6L8.5 12L1.5 6C3 3.8 5.5 2.5 8.5 2.5Z"
            fill={iconColor}
          />
        </svg>

        {/* Battery */}
        <div className="flex items-center ml-1">
          <div className="relative w-[25px] h-[12px] border border-current rounded-[3px] flex items-center p-[2px]">
            <div className="w-full h-full bg-current rounded-[1px]" />
          </div>
          <div className="w-[2px] h-[5px] bg-current rounded-r-[1px] ml-[1px]" />
        </div>
      </div>
    </div>
  );
}
