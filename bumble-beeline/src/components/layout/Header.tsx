"use client";

type NotifType = "no" | "yes" | "liked you";

interface HeaderProps {
  notif?: NotifType;
  onBeelineClick?: () => void;
  onFilterClick?: () => void;
}

export default function Header({
  notif = "no",
  onBeelineClick,
  onFilterClick,
}: HeaderProps) {
  const hasNotification = notif === "yes";

  return (
    <div className="flex items-center justify-between w-[430px] px-[16px] h-[42px]">
      {/* Bumble title */}
      <h1
        className="text-[32px] font-bold leading-[42px] text-[#202020] text-center"
        style={{
          fontFamily: "'Google Sans', system-ui, -apple-system, sans-serif",
        }}
      >
        Bumble
      </h1>

      {/* Right side buttons */}
      <div className="flex items-center gap-[15px]">
        {/* Beeline button */}
        <button
          onClick={onBeelineClick}
          className="relative w-[32px] h-[32px] flex items-center justify-center"
        >
          <img
            src={hasNotification ? "/icons/header-beeline-notif.svg" : "/icons/header-beeline.svg"}
            alt="Beeline"
            className="w-[32px] h-[32px]"
          />
        </button>

        {/* Filter button */}
        <button
          onClick={onFilterClick}
          className="w-[32px] h-[32px] flex items-center justify-center"
        >
          <img
            src="/icons/header-filter.svg"
            alt="Filter"
            className="w-[32px] h-[32px]"
          />
        </button>
      </div>
    </div>
  );
}
