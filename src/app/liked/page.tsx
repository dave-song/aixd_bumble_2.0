"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  BriefcaseBusiness,
  GraduationCap,
  Settings2,
  SlidersHorizontal,
} from "lucide-react";
import { StatusBar } from "@/components/layout";
import { BottomNav } from "@/components/layout/BottomNav";
import { PhoneFrame } from "@/components/layout/PhoneFrame";

const BEELINE_SPARKLE_ICON = "/icons/beeline-sparkle.svg";
const BEELINE_VETTED_ICON =
  "/icons/liked_page_assets/beeline_vetted_chip_icon.svg";

const FILTER_CHIPS = [
  { label: "All", count: 9, active: false },
  { label: "Beeline vetted", count: 2, active: true },
  { label: "New", count: 0, active: false },
  { label: "Nearby", count: 4, active: false },
  { label: "Recently active", count: 4, active: false },
] as const;

const LIKED_CARDS = [
  {
    id: "min",
    name: "Min",
    age: 27,
    job: "Venture Capital Associate",
    school: "UW",
    imageSrc: "/icons/liked_page_assets/liked_card_min.png",
  },
  {
    id: "mina",
    name: "Mina",
    age: 22,
    job: "Product Designer @ Meta",
    school: "RISD",
    imageSrc: "/icons/liked_page_assets/liked_card_hari.png",
  },
] as const;

export default function LikedPage() {
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    if (tab === "profile") router.push("/profile");
    if (tab === "people") router.push("/people");
    if (tab === "discover") router.push("/discover");
    if (tab === "chats") router.push("/chats");
    if (tab === "liked") return;
  };

  return (
    <PhoneFrame>
      <div className="flex h-full w-full flex-col bg-white">
        <StatusBar />

        <div className="flex shrink-0 items-center justify-between px-4 pt-2">
          <h1 className="text-[32px] font-bold leading-[42px] text-bumble-black">
            Liked you
          </h1>
          <div className="flex items-center gap-[15px]">
            <button
              type="button"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-black/5"
              aria-label="Beeline"
            >
              <Image
                src={BEELINE_SPARKLE_ICON}
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
                unoptimized
              />
            </button>
            <button
              type="button"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-bumble-black hover:bg-black/5"
              aria-label="Filters"
            >
              <SlidersHorizontal size={24} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="shrink-0 px-[18px] pt-2 pb-[6px]">
          <p className="text-[16px] leading-[21px] text-bumble-black">
            See who likes you and match with them instantly, with Premium.
          </p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <div className="shrink-0 overflow-x-auto px-[10px] pb-[8px] scrollbar-hide">
            <div className="flex min-w-max items-center gap-[10px]">
              {FILTER_CHIPS.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  className={`flex h-[42px] shrink-0 items-center gap-1 rounded-[8px] border px-[13px] pr-[16px] text-[13px] leading-none tracking-[-0.3px] ${
                    chip.active
                      ? "border-[#eac337] bg-bumble-accent text-bumble-black"
                      : "border-[#e4e4e4] bg-white text-bumble-black"
                  }`}
                >
                  {chip.active && (
                    <Image
                      src={BEELINE_VETTED_ICON}
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain"
                      unoptimized
                    />
                  )}
                  <span>{chip.label}</span>
                  <span
                    aria-hidden
                    className="h-1 w-1 rounded-full bg-current"
                  />
                  <span>{chip.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 px-[10px] pb-6">
            {LIKED_CARDS.map((card) => (
              <div
                key={card.id}
                className="relative h-[432px] w-full overflow-hidden rounded-[18px]"
              >
                <Image
                  src={card.imageSrc}
                  alt={`${card.name}, ${card.age}`}
                  fill
                  className="object-cover"
                  sizes="372px"
                  unoptimized
                />
                <div className="absolute inset-x-0 bottom-0 h-44 bg-linear-to-t from-black/45 via-black/15 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-[10px] p-[18px] text-white">
                  <div className="inline-flex w-fit items-center gap-1 rounded-[64px] bg-bumble-black px-[8px] py-[4px]">
                    <Settings2 size={12} strokeWidth={2} />
                    <span className="text-[15px] leading-none tracking-[-0.3px]">
                      Photo verified
                    </span>
                  </div>

                  <p className="text-[23px] font-semibold leading-[30px] tracking-[-0.55px] drop-shadow-sm">
                    {card.name}, {card.age}
                  </p>

                  <div className="flex items-center gap-1">
                    <BriefcaseBusiness size={20} strokeWidth={2} />
                    <p className="text-[16px] leading-[21px] tracking-[-0.38px] drop-shadow-sm">
                      {card.job}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <GraduationCap size={20} strokeWidth={2} />
                    <p className="text-[16px] leading-[21px] tracking-[-0.38px] drop-shadow-sm">
                      {card.school}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <BottomNav activeTab="liked" onTabChange={handleTabChange} />
      </div>
    </PhoneFrame>
  );
}
