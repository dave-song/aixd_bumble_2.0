"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessageCircle, Search, SlidersHorizontal } from "lucide-react";
import { StatusBar } from "@/components/layout";
import { BottomNav } from "@/components/layout/BottomNav";
import { PhoneFrame } from "@/components/layout/PhoneFrame";

const CHATS = [
  {
    id: "loopy",
    name: "Loopy",
    avatar: "/icons/chats_page_assets/loopy_prof_pic.png",
    lastMessage:
      "I'm just here to find someone to help me carry my groceries. What's your deadlift PR?",
    isYourMove: true,
  },
  {
    id: "tom",
    name: "Tom Lizard",
    avatar: "/icons/chats_page_assets/tom_prof_pic.png",
    lastMessage: "Let me just press the button",
    isYourMove: true,
  },
] as const;

export default function ChatsPage() {
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    if (tab === "profile") router.push("/profile");
    if (tab === "people") router.push("/people");
    if (tab === "discover") router.push("/discover");
    if (tab === "liked") router.push("/liked");
    if (tab === "chats") return;
  };

  return (
    <PhoneFrame>
      <div className="flex h-full w-full flex-col bg-white">
        <StatusBar />

        {/* Header: Chats title + search (Figma 1273-41614: pl-[14px] pr-[24px]) */}
        <div className="flex shrink-0 items-center justify-between bg-white pl-[14px] pr-[24px] py-3">
          <h1 className="text-[29px] font-semibold leading-[40.5px] text-bumble-black">
            Chats
          </h1>
          <button
            type="button"
            className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full text-bumble-black hover:bg-black/5"
            aria-label="Search"
          >
            <Search size={24} strokeWidth={2} />
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto">
          {/* Your matches (2) – Figma 1273-41618: px-[16px] py-[8px] */}
          <div className="shrink-0 px-[16px] py-[8px]">
            <p className="text-[18px] leading-[25.155px] text-bumble-black">
              Your matches <span className="text-bumble-gray">(2)</span>
            </p>
          </div>
          {/* Match thumbnails – Figma 1273-41620: gap-[11px] px-[18px], vertically center-aligned */}
          <div className="flex items-center gap-[11px] overflow-x-auto px-[18px] pb-4 scrollbar-hide">
            {/* Chats top icon with "6" */}
            <div className="relative h-[82px] w-[78px] shrink-0 overflow-hidden">
              <Image
                src="/icons/chats_page_assets/chats_top_icon.png"
                alt=""
                width={78}
                height={82}
                className="h-full w-full object-contain"
                unoptimized
              />
            </div>
            {/* Person 1 profile image */}
            <div className="relative h-[95px] w-[95px] shrink-0 overflow-hidden">
              <Image
                src="/icons/chats_page_assets/person2.png"
                alt=""
                width={95}
                height={95}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
            {/* Person 2 profile image */}
            <div className="relative h-[95px] w-[95px] shrink-0 overflow-hidden">
              <Image
                src="/icons/chats_page_assets/person1.png"
                alt=""
                width={95}
                height={95}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* Chats (Recent) + filter – Figma 1273-41647: px-[14px], filter 24px */}
          <div className="flex shrink-0 items-center justify-between px-[14px] py-1">
            <p className="text-[18px] leading-[25.155px] text-bumble-black">
              Chats <span className="text-bumble-gray">(Recent)</span>
            </p>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full text-bumble-black hover:bg-black/5"
              aria-label="Filter"
            >
              <SlidersHorizontal size={24} strokeWidth={2} />
            </button>
          </div>

          {/* Opening Moves card – illustration from first_move.png, single arrow */}
          <Link
            href="#"
            className="mx-[18px] mb-4 flex items-center justify-between rounded-[18px] border border-[#e4e4e4] bg-white px-[18px] py-[14px] shadow-sm transition hover:bg-gray-50"
          >
            <div className="flex items-center gap-[11px]">
              <div className="relative h-[84px] w-[74px] shrink-0 overflow-hidden rounded-lg">
                <Image
                  src="/icons/chats_page_assets/first_move.png"
                  alt=""
                  width={74}
                  height={84}
                  className="h-full w-full object-contain object-left"
                  unoptimized
                />
              </div>
              <div className="flex flex-col gap-[4px]">
                <p className="text-[18px] font-medium leading-tight text-bumble-black tracking-[-0.3px]">
                  Need help with the
                  <br />
                  first message?
                </p>
                <p className="text-[16px] font-normal text-bumble-black tracking-[-0.3px]">
                  Try Opening Moves.
                </p>
              </div>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-bumble-black" aria-hidden>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>

          {/* Chat list – Figma 1273-41661: pl-[22px] pr-[8px], gap-[111px] → justify-between, gap-[26px] avatar–text */}
          <div className="flex flex-col pl-[22px] pr-[8px]">
            {CHATS.map((chat) => (
              <Link
                key={chat.id}
                href={`/chats/${chat.id}`}
                className="flex items-start justify-between gap-4 border-b border-[#e4e4e4] py-4 last:border-0"
              >
                <div className="flex min-w-0 flex-1 items-center gap-[26px]">
                  <div className="relative h-[77px] w-[77px] shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={chat.avatar}
                      alt=""
                      width={77}
                      height={77}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0 flex-1 pb-[11px]">
                    <p className="text-[18px] font-medium leading-tight text-bumble-black tracking-[-0.3px]">
                      {chat.name}
                    </p>
                    <p className="max-w-[211px] truncate text-[16px] font-normal text-bumble-gray tracking-[-0.3px]">
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
                {chat.isYourMove && (
                  <div className="flex shrink-0 flex-col items-end pt-[10px]">
                    <div className="flex min-h-[23px] min-w-[83px] items-center justify-center rounded-[8px] bg-[#f3f3f3] px-[8px] py-1.5">
                      <p className="text-[14px] font-medium leading-normal text-bumble-black tracking-[-0.3px]">
                        Your move
                      </p>
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

        <BottomNav activeTab="chats" onTabChange={handleTabChange} />
      </div>
    </PhoneFrame>
  );
}
