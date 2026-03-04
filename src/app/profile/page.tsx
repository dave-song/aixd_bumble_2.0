"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRight, MessageCircle, Settings } from "lucide-react";
import { StatusBar } from "@/components/layout";
import { BottomNav } from "@/components/layout/BottomNav";
import { PhoneFrame } from "@/components/layout/PhoneFrame";

const PROFILE_IMAGE = "/icons/profile_page_assets/user profile building card.png";
const BEELINE_ICON = "/icons/profile_page_assets/beeline_icon.png";
const INSIGHTS_CARD_IMAGE = "/icons/profile_page_assets/insights card pending.png";
const TIME_ICON = "/icons/profile_page_assets/time_icon.png";

export default function ProfilePage() {
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    if (tab === "profile") return;
    if (tab === "people") router.push("/people");
    if (tab === "discover") router.push("/discover");
    if (tab === "liked") router.push("/liked");
    if (tab === "chats") router.push("/chats");
  };

  return (
    <PhoneFrame>
      <div className="flex h-full w-full flex-col bg-white">
        <StatusBar />

        {/* Header: Profile title + icons (Figma 1273-32014) */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#e4e4e4] bg-white pl-[16px] pr-[25px] py-3">
          <h1 className="text-[32px] font-bold leading-[42px] text-bumble-black">
            Profile
          </h1>
          <div className="flex items-center gap-[15px]">
            <button
              type="button"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-bumble-black hover:bg-black/5"
              aria-label="Settings"
            >
              <Settings size={32} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-bumble-black hover:bg-black/5"
              aria-label="More"
            >
              <MessageCircle size={32} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          {/* User profile card – single image with everything (no overlay elements) */}
          <div className="shrink-0 px-[10px] pt-[8px] pb-[16px]">
            <div className="relative h-[378px] w-full max-w-[410px] overflow-hidden rounded-[18px]">
              <Image
                src={PROFILE_IMAGE}
                alt=""
                fill
                className="object-cover object-top"
                sizes="410px"
                unoptimized
              />
            </div>
          </div>

          {/* Beeline section (Figma 1273-32042) */}
          <div className="flex flex-col gap-4 px-[10px] pb-8">
            {/* Profile section menu bar */}
            <div className="flex gap-7 overflow-x-auto scrollbar-hide">
              <button
                type="button"
                className="flex shrink-0 items-center gap-2 rounded-[56px] bg-bumble-black pl-[12px] pr-[16px] py-[10px] text-[15px] font-semibold text-white"
              >
                <Image
                  src={BEELINE_ICON}
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                  unoptimized
                />
                Beeline
              </button>
              <button
                type="button"
                className="shrink-0 text-[15px] font-semibold text-bumble-black"
              >
                Dating advice
              </button>
              <button
                type="button"
                className="shrink-0 text-[15px] font-semibold text-bumble-black"
              >
                Photo insights
              </button>
              <button
                type="button"
                className="shrink-0 text-[15px] font-semibold text-bumble-black"
              >
                Safety and wellbeing
              </button>
            </div>

            {/* Beeline alert CTA (Figma 1273-32055) */}
            <div className="w-full max-w-[410px]">
              <div className="flex items-center justify-between rounded-[18px] bg-[#f2f3f3] px-[15px] py-[12px]">
                <div className="flex items-center gap-[10px]">
                  <div className="relative h-[25px] w-[25px] shrink-0">
                    <Image
                      src={BEELINE_ICON}
                      alt=""
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[15px] font-bold leading-tight text-bumble-black">
                      Spill the tea so I can find &quot;The One&quot;
                    </p>
                    <p className="text-[13px] font-medium leading-tight text-bumble-black/80">
                      I&apos;ve got your basics, but I&apos;m still guessing on your vibe.
                    </p>
                  </div>
                </div>
                <ChevronRight size={32} className="shrink-0 text-bumble-black" strokeWidth={1.5} />
              </div>
            </div>

            {/* Insights card pending (Figma 1273-32066) */}
            <div className="relative flex h-[339px] w-full max-w-[410px] flex-col justify-between overflow-hidden rounded-[18px] p-[18px]">
              <Image
                src={INSIGHTS_CARD_IMAGE}
                alt=""
                fill
                className="object-cover object-center"
                sizes="410px"
                unoptimized
              />
              <div className="relative z-10 flex flex-1 min-h-0 flex-col justify-between gap-4">
                <div className="flex flex-col gap-3">
                  <div className="relative h-[25px] w-[25px] shrink-0">
                    <Image
                      src={TIME_ICON}
                      alt=""
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <p className="text-[23px] font-semibold leading-[30px] tracking-[-0.55px] text-white drop-shadow-sm">
                    Give me a second to read the room
                  </p>
                  <p className="text-[16px] font-medium leading-[21px] tracking-[-0.38px] text-white drop-shadow-sm">
                    I&apos;m busy turning your static profile to a{" "}
                    <span className="font-bold">living one</span>. Once I&apos;ve had
                    enough conversations with you in the feed, your insights will
                    appear here.
                  </p>
                </div>
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-bumble-black py-[7px] px-[8px] text-[16px] font-medium text-white"
                >
                  <Image
                    src={BEELINE_ICON}
                    alt=""
                    width={20}
                    height={20}
                    className="object-contain"
                    unoptimized
                  />
                  Talk to Beeline
                </button>
              </div>
            </div>
          </div>
        </div>

        <BottomNav activeTab="profile" onTabChange={handleTabChange} />
      </div>
    </PhoneFrame>
  );
}
