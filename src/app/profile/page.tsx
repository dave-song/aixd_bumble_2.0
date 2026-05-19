"use client";

import { useRouter } from "next/navigation";
import { HelpCircle, Settings } from "lucide-react";
import Image from "next/image";
import { StatusBar } from "@/components/layout";
import { BottomNav } from "@/components/layout/BottomNav";
import { PhoneFrame } from "@/components/layout/PhoneFrame";
import { ProfileInsightsCarousel } from "@/components/profile/ProfileInsightsCarousel";
import { ProfilePageHero } from "@/components/profile/ProfilePageHero";

const BEELINE_ICON = "/icons/profile_page_assets/beeline_icon.png";

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

        {/* Header — Figma 1273-32014 */}
        <div className="flex shrink-0 items-center justify-between bg-white pl-4 pr-[25px] py-3">
          <h1 className="text-[32px] font-bold leading-[42px] text-bumble-black">
            Profile
          </h1>
          <div className="flex items-center gap-[15px]">
            <button
              type="button"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-bumble-black hover:bg-black/5"
              aria-label="Help"
            >
              <HelpCircle size={32} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-bumble-black hover:bg-black/5"
              aria-label="Settings"
            >
              <Settings size={32} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto">
          <div className="shrink-0 px-[10px] pt-2 pb-4">
            <ProfilePageHero />
          </div>

          <div className="flex flex-col gap-6 pb-8">
            <div className="flex gap-7 overflow-x-auto px-[10px] scrollbar-hide">
              <button
                type="button"
                className="flex h-9 shrink-0 items-center gap-2 rounded-[56px] bg-bumble-black py-2 pl-3 pr-4"
              >
                <Image
                  src={BEELINE_ICON}
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                  unoptimized
                />
                <span className="text-[15px] font-semibold text-white">
                  Beeline
                </span>
              </button>
              <button
                type="button"
                className="flex shrink-0 items-center gap-1.5"
              >
                <span className="text-[15px] font-semibold text-bumble-black">
                  Dating advice
                </span>
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#E00900]" />
              </button>
              <button type="button" className="shrink-0">
                <span className="text-[15px] font-semibold text-bumble-black">
                  Photo insights
                </span>
              </button>
              <button type="button" className="shrink-0">
                <span className="text-[15px] font-semibold text-bumble-black">
                  Safety and wellbeing
                </span>
              </button>
            </div>

            <ProfileInsightsCarousel />
          </div>
        </div>

        <BottomNav activeTab="profile" onTabChange={handleTabChange} />
      </div>
    </PhoneFrame>
  );
}
