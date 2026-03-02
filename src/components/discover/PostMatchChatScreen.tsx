"use client";

import { Camera, ChevronLeft, MessageCircle, MoreHorizontal, Video } from "lucide-react";
import { StatusBar } from "@/components/layout";

interface PostMatchChatScreenProps {
  matchedProfileName: string;
  openingMoveText: string;
  sentMessage: string;
  onClose: () => void;
}

export function PostMatchChatScreen({
  matchedProfileName,
  openingMoveText,
  sentMessage,
  onClose,
}: PostMatchChatScreenProps) {
  return (
    <div className="flex h-full w-full flex-col bg-bumble-white">
      <StatusBar />

      {/* Chat top (Figma 1124:17957): back + avatar + name | video + more + icon */}
      <div className="flex shrink-0 items-center justify-between border-b border-[#e4e4e4] bg-white pl-[22px] pr-[17px] py-3">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-full text-bumble-black hover:bg-black/5"
            aria-label="Back"
          >
            <ChevronLeft size={24} strokeWidth={2} />
          </button>
          <div className="flex items-center gap-[7px]">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#f3f3f3] flex items-center justify-center text-bumble-black font-medium text-sm">
              {matchedProfileName.charAt(0)}
            </div>
            <p className="text-[18px] font-medium leading-normal text-bumble-black">
              {matchedProfileName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-[25px]">
          <button
            type="button"
            className="flex h-[29px] w-[29px] items-center justify-center rounded-full text-bumble-black hover:bg-black/5"
            aria-label="Video call"
          >
            <Video size={20} strokeWidth={2} />
          </button>
          <button
            type="button"
            className="flex h-[29px] w-[29px] items-center justify-center rounded-full text-bumble-black hover:bg-black/5"
            aria-label="More"
          >
            <MoreHorizontal size={20} strokeWidth={2} />
          </button>
          <button
            type="button"
            className="flex h-[29px] w-[29px] items-center justify-center rounded-full text-bumble-black hover:bg-black/5"
            aria-label="Info"
          >
            <MessageCircle size={18} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Chat content (Figma 1124:17971): bubble wrapper gap-7, exact bubble radii */}
      <div className="flex flex-1 flex-col gap-[7px] overflow-y-auto">
        {/* Opening move bubble: left-aligned, rounded-bl-[4px] rest 18px, w-[277px], bg #f3f3f3 */}
        <div className="flex flex-col items-start px-[14px] py-2">
          <div className="flex h-[59px] w-[277px] flex-col justify-center gap-1 rounded-[18px] rounded-bl-[4px] bg-[#f3f3f3] px-3 py-2.5">
            <p className="text-[14px] font-medium tracking-[-0.4px] text-bumble-black">
              {matchedProfileName}&apos;s Opening Move
            </p>
            <p className="text-[16px] tracking-[-0.44px] text-bumble-black">
              {openingMoveText}
            </p>
          </div>
        </div>

        {/* Date indicator */}
        <p className="py-1 text-center text-[13px] text-bumble-gray">Today</p>

        {/* User bubble: right-aligned, rounded-br-[4px] rest 18px, bg #ffd93a */}
        <div className="flex flex-col items-end gap-2 px-[11px] py-1.5">
          <div className="max-w-[85%] rounded-[18px] rounded-br-[4px] bg-bumble-accent px-[13px] py-3">
            <p className="text-[16px] tracking-[-0.44px] text-bumble-black whitespace-pre-wrap">
              {sentMessage}
            </p>
          </div>
          <p className="text-[14px] tracking-[-0.23px] text-bumble-gray">Delivered</p>
        </div>
      </div>

      {/* Bottom (Figma 1124:17996): time message wrapper + text ui row */}
      <div className="flex shrink-0 flex-col gap-5 border-t border-[#e4e4e4] bg-white px-4 pb-6 pt-4">
        {/* They have 24 hours to reply - rounded-[18px], h-81px, border #e4e4e4 */}
        <div className="flex h-[81px] w-full max-w-[394px] items-center justify-between gap-4 rounded-[18px] border border-[#e4e4e4] px-[18px]">
          <div className="min-w-0 flex-1">
            <p className="text-[18px] font-semibold tracking-[-0.3px] text-bumble-black">
              They have 24 hours to reply
            </p>
            <p className="text-[16px] tracking-[-0.4px] text-bumble-gray">
              It&apos;s their turn to message you back
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-full p-1 text-bumble-gray hover:bg-black/5"
            aria-label="Info"
          >
            <MessageCircle size={24} strokeWidth={2} />
          </button>
        </div>

        {/* Text input row: camera | input (Aa / GIF) | option icons */}
        <div className="flex w-full max-w-[394px] items-center gap-1.5 px-1.5">
          <button
            type="button"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-bumble-gray hover:bg-black/5"
            aria-label="Camera"
          >
            <Camera size={20} strokeWidth={2} />
          </button>
          <div className="flex h-[47px] min-w-0 flex-1 items-center justify-between rounded-full border border-[#e4e4e4] bg-white px-4">
            <span className="text-[18px] tracking-[-0.4px] text-bumble-gray">Aa</span>
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-bumble-black">
              <span className="text-[8px] font-semibold text-bumble-black">GIF</span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full text-bumble-gray hover:bg-black/5"
              aria-label="Add"
            >
              <PlusIcon />
            </button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full text-bumble-gray hover:bg-black/5"
              aria-label="Emoji"
            >
              <SmileIcon />
            </button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full text-bumble-accent"
              aria-label="Send"
            >
              <img
                src="/icons/match_process_assets/send_icon.svg"
                alt=""
                className="h-8 w-8 object-contain"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function SmileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}
