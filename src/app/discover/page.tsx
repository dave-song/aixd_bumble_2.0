"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Settings, HelpCircle, Heart, BadgeCheck } from "lucide-react";
import { StatusBar } from "@/components/layout";
import { BottomNav } from "@/components/layout/BottomNav";
import { PhoneFrame } from "@/components/layout/PhoneFrame";

const DISCOVER_CARDS = [
  {
    id: "maya",
    name: "Maya",
    age: 26,
    imageSrc: "/icons/user_profile_assets/p1.png",
    verified: true,
  },
  {
    id: "elena",
    name: "Elena",
    age: 28,
    imageSrc: "/icons/user_profile_assets/Elena_profile_img.png",
    verified: true,
  },
] as const;

export default function DiscoverPage() {
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    if (tab === "profile") router.push("/profile");
    if (tab === "people") router.push("/people");
    if (tab === "liked") router.push("/liked");
    if (tab === "chats") router.push("/chats");
    if (tab === "discover") return;
  };

  return (
    <PhoneFrame>
      <div className="flex h-full w-full flex-col bg-white">
        <StatusBar />

        {/* Header: Discover title + icons (Figma 1265-26553) */}
        <div className="flex shrink-0 items-center justify-between bg-white px-4 pt-2">
          <h1 className="text-[32px] font-bold leading-[42px] text-bumble-black">
            Discover
          </h1>
          <div className="flex items-center gap-[15px]">
            <button
              type="button"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-bumble-black hover:bg-black/5"
              aria-label="Settings"
            >
              <Settings size={24} strokeWidth={2} />
            </button>
            <button
              type="button"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-bumble-black hover:bg-black/5"
              aria-label="Help"
            >
              <HelpCircle size={24} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Tagline */}
        <div className="shrink-0 px-[18px] py-2">
          <p className="text-[16px] leading-[21px] text-bumble-black">
            Connect over common ground with people who match your vibe,
            refreshed every day.
          </p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          {/* Beeline notification card */}
          <div className="shrink-0 px-[10px] py-2">
            <div className="flex flex-col gap-2 rounded-[10px] bg-bumble-accent p-4">
              <div className="flex items-center gap-1.5">
                <img
                  src="/icons/user_profile_assets/beeline_highlevel_tag.svg"
                  alt=""
                  className="h-[27px] w-[95px] object-contain object-left"
                />
                <span className="font-semibold italic text-bumble-yellow text-[16px]">
                  Beeline
                </span>
              </div>
              <p className="font-normal text-[16px] leading-normal text-bumble-black">
                I did the awkward small talk so you don&apos;t have to. 500
                chats later, these are the ones worth your time.
              </p>
            </div>
          </div>

          {/* Horizontal discover cards */}
          <div className="flex gap-[13px] overflow-x-auto px-[10px] pb-4 pt-1 scrollbar-hide">
            {DISCOVER_CARDS.map((card) => (
              <div
                key={card.id}
                className="flex h-[473px] w-[315px] shrink-0 flex-col gap-3 rounded-[18px] bg-white p-2.5 shadow-[0_0_9px_rgba(0,0,0,0.16)]"
              >
                <div className="relative h-[411px] w-full shrink-0 overflow-hidden rounded-[12px]">
                  <Image
                    src={card.imageSrc}
                    alt={`${card.name}, ${card.age}`}
                    fill
                    className="object-cover"
                    sizes="291px"
                    unoptimized
                  />
                </div>
                <div className="flex items-center justify-between px-0.5">
                  <div className="flex items-center gap-1">
                    <span className="text-[16px] font-medium leading-[21px] text-bumble-black">
                      {card.name}, {card.age}
                    </span>
                    {card.verified && (
                      <BadgeCheck
                        size={14}
                        className="shrink-0 text-bumble-gray"
                        strokeWidth={2}
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    className="flex h-[22px] w-6 items-center justify-center text-bumble-black hover:opacity-80"
                    aria-label="Like"
                  >
                    <Heart
                      size={22}
                      className="stroke-2"
                      fill="none"
                      stroke="currentColor"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Similar interests section */}
          <div className="mt-6 shrink-0">
            <div className="flex h-[59px] items-center bg-[#f3f3f3] px-[22px] pt-6 pb-2">
              <p className="text-[20px] font-medium leading-[26px] tracking-[-0.5px] text-bumble-black">
                Similar interests
              </p>
            </div>
          </div>
        </div>

        <BottomNav activeTab="discover" onTabChange={handleTabChange} />
      </div>
    </PhoneFrame>
  );
}
