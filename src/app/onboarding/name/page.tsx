"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PhoneFrame, StatusBar } from "@/components/layout";

export default function NamePage() {
  const router = useRouter();
  const [name, setName] = useState("");

  /** Capitalize first letter, lowercase the rest (e.g. DAVE → Dave, dave → Dave) */
  function formatName(value: string): string {
    const trimmed = value.trim();
    if (!trimmed) return trimmed;
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  }

  const handleContinue = () => {
    if (name.trim()) {
      localStorage.setItem("userName", formatName(name));
      router.push("/onboarding/gender");
    }
  };

  return (
    <PhoneFrame>
      <div className="relative w-full h-full bg-white flex flex-col">
        <StatusBar />

        {/* Progress Bar - tap left side to go back */}
        <div className="relative w-full h-[10px] px-[20px] flex items-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="absolute left-0 top-0 bottom-0 w-1/3 min-w-[80px] z-10 cursor-pointer"
            aria-label="Go back"
          />
          <div className="flex-1 h-[3px] bg-[#D2D2D2] rounded-full" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col px-[20px] pt-[24px]">
          {/* Title */}
          <h1 className="text-[28px] font-medium text-bumble-black leading-[34px] mb-[12px]">
            {"What's your first name?"}
          </h1>
          <p className="text-[16px] text-bumble-gray leading-[22px] mb-[32px]">
            {"This is how you'll appear on Bumble. You won't be able to change it later."}
          </p>

          {/* Name Input */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full py-[16px] px-[20px] rounded-[12px] bg-[#F5F5F5] text-[16px] text-bumble-black placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-bumble-accent"
            autoFocus
          />

          {/* Spacer */}
          <div className="flex-1" />

          {/* Next Button */}
          <div className="flex justify-end pb-[24px]">
            <button
              onClick={handleContinue}
              disabled={!name.trim()}
              className={`w-[48px] h-[48px] rounded-full bg-bumble-black flex items-center justify-center transition-opacity ${!name.trim() ? "opacity-30" : "opacity-100"}`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.887 12.0005L7.20098 5.31477C6.88665 5.00043 6.72898 4.60043 6.72898 4.11477C6.72898 3.6291 6.88665 3.2291 7.20098 2.91477C7.51531 2.60043 7.91531 2.44277 8.40098 2.44277C8.88665 2.44277 9.28665 2.60043 9.60098 2.91477L17.4873 10.8005C17.6583 10.9719 17.7793 11.1576 17.8506 11.3576C17.922 11.5576 17.9576 11.7719 17.9576 12.0005C17.9576 12.2291 17.922 12.4434 17.8506 12.6434C17.7793 12.8434 17.6583 13.0291 17.4873 13.2005L9.60098 21.0861C9.28665 21.4005 8.88665 21.5576 8.40098 21.5576C7.91531 21.5576 7.51531 21.4005 7.20098 21.0861C6.88665 20.7718 6.72898 20.3718 6.72898 19.8861C6.72898 19.4005 6.88665 19.0005 7.20098 18.6861L13.887 12.0005Z" fill="white"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
