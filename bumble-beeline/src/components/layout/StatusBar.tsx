"use client";

interface StatusBarProps {
  dark?: boolean;
}

export default function StatusBar({ dark = false }: StatusBarProps) {
  const textColor = dark ? "text-white" : "text-black";

  return (
    <div className="flex flex-col items-start w-[430px]">
      <div className="flex items-center justify-between h-[60px] w-[430px] px-[26px] pt-[22px] pb-[20px]">
        {/* Time section */}
        <div className="flex items-center gap-[1px]">
          <span
            className={`text-[18px] font-semibold leading-[24px] ${textColor}`}
            style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro', system-ui, sans-serif" }}
          >
            4:03
          </span>
          <span
            className={`text-[18px] font-semibold leading-[24px] tracking-[0.7px] ${textColor}`}
            style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro', system-ui, sans-serif" }}
          >
            {" {}"}
          </span>
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-[5px]">
          {/* Cellular */}
          <img
            src="/icons/cellular.svg"
            alt=""
            className="w-[21px] h-[13px]"
          />
          {/* WiFi */}
          <img
            src="/icons/wifi.svg"
            alt=""
            className="w-[18px] h-[13px]"
          />
          {/* Battery */}
          <img
            src="/icons/battery.svg"
            alt=""
            className="w-[29px] h-[14px]"
          />
        </div>
      </div>
    </div>
  );
}
