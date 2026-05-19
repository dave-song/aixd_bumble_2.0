"use client";

import { useState } from "react";
import { StatusBar } from "@/components/layout";

/** Icon centers in match_page_top_ui_wrapper.svg (viewBox 430×20) */
const MATCH_TOP_CLOSE_X_PERCENT = (25.8729 / 430) * 100;
const MATCH_TOP_MORE_X_PERCENT = (404 / 430) * 100;

interface MatchScreenProps {
  matchedProfileId: string;
  matchedProfileName: string;
  openingMovePlaceholder?: string;
  onClose: () => void;
  onSendMessage?: (text: string) => void;
}

export function MatchScreen({
  matchedProfileId,
  matchedProfileName,
  openingMovePlaceholder = "What's your ideal first date?",
  onClose,
  onSendMessage,
}: MatchScreenProps) {
  const [message, setMessage] = useState("");

  function handleSend() {
    const trimmed = message.trim();
    if (!trimmed) return;
    onSendMessage?.(trimmed);
    setMessage("");
  }

  return (
    <div className="flex h-full w-full flex-col bg-bumble-white">
      {/* iOS status bar - same as all other pages */}
      <StatusBar />

      {/* Top navigation: match_page_top_ui_wrapper.svg (X + more) — spacing 1.53rem after status bar */}
      <div className="shrink-0 px-4 pt-[1.53rem]">
        <div className="relative h-5 w-full">
          <img
            src="/icons/match_process_assets/match_page_top_ui_wrapper.svg"
            alt=""
            className="block h-5 w-full"
            aria-hidden
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EFEFEF]/75 hover:bg-[#EFEFEF] active:bg-[#E5E5E5]"
            style={{ left: `${MATCH_TOP_CLOSE_X_PERCENT}%` }}
            aria-label="Close"
          />
          <button
            type="button"
            className="absolute top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EFEFEF]/75 hover:bg-[#EFEFEF] active:bg-[#E5E5E5]"
            style={{ left: `${MATCH_TOP_MORE_X_PERCENT}%` }}
            aria-label="More options"
          />
        </div>
      </div>

      {/* Main content: 7.38rem vertical spacing above/below block (per screenshot) */}
      <div className="flex flex-1 flex-col items-center overflow-y-auto px-4 pt-[7.38rem] pb-[7.38rem]">
        <img
          src="/icons/match_process_assets/matching%20card.svg"
          alt=""
          className="max-h-[260px] w-full max-w-[320px] object-contain"
        />
        <h1 className="mt-5 text-center text-[26px] font-bold tracking-tight text-bumble-black">
          What a match!
        </h1>
        <p className="mt-1.5 text-center text-[15px] leading-snug text-bumble-gray">
          Now you have 24 hours to start chatting.
        </p>

        {/* Opening move - gray panel with inner white prompt (per design) */}
        <div className="mt-5 w-full max-w-[320px] rounded-2xl bg-[#F5F5F5] p-4">
          <p className="text-[13px] font-semibold text-bumble-black">
            {matchedProfileName}&apos;s Opening Move
          </p>
          <div className="mt-2 rounded-2xl rounded-bl-sm bg-white px-4 py-3">
            <p className="text-[15px] leading-snug text-bumble-black">
              {openingMovePlaceholder}
            </p>
          </div>
        </div>

        {/* Spacing 7.38rem between Opening Move and text entry bar (per spec) */}
        {/* Text entry bar - exact layout/style (24.75rem × 3.3125rem, padding, border-radius 2.125rem, etc.) */}
        <div
          className="mt-[7.38rem] flex max-w-full shrink-0 items-center justify-between rounded-[2.125rem] border border-[#EEE] px-[0.5625rem] py-[0.875rem] pl-[0.875rem]"
          style={{
            width: "24.75rem",
            height: "3.3125rem",
            background: "rgba(255, 255, 255, 0.20)",
          }}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="reply here..."
            className="min-w-0 flex-1 bg-transparent text-[15px] text-bumble-black placeholder:text-bumble-gray outline-none"
            aria-label="Message input"
          />
          <button
            type="button"
            onClick={handleSend}
            className="shrink-0 rounded-full hover:opacity-90 active:opacity-80"
            aria-label="Send"
          >
            <img
              src="/icons/match_process_assets/send_icon.svg"
              alt=""
              className="h-9 w-9 object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
