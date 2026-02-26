"use client";

import { ReactNode } from "react";

interface TitleSubProps {
  title: string;
  subtitle?: string | ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function TitleSub({
  title,
  subtitle,
  align = "left",
  className = "",
}: TitleSubProps) {
  return (
    <div className={`flex flex-col items-start pb-[8px] w-full ${className}`}>
      <div className="flex items-center justify-center px-[20px] py-[8px] w-full">
        <p
          className={`font-medium text-[28px] leading-[39px] text-bumble-black w-full tracking-[0.3px] ${
            align === "center" ? "text-center" : ""
          }`}
        >
          {title}
        </p>
      </div>
      {subtitle && (
        <div className="flex items-center justify-center px-[20px] py-[8px] w-full">
          <div
            className={`text-[16px] leading-[24.5px] text-bumble-gray w-full ${
              align === "center" ? "text-center" : ""
            }`}
          >
            {subtitle}
          </div>
        </div>
      )}
    </div>
  );
}
