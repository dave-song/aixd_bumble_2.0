"use client";

import { User, Compass, Heart, MessageCircle } from "lucide-react";
import { BumbleLogo } from "@/components/ui/BumbleLogo";

type TabId = "profile" | "discover" | "people" | "liked" | "chats";

interface BottomNavProps {
  activeTab?: TabId;
  onTabChange?: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon?: typeof User }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "discover", label: "Discover", icon: Compass },
  { id: "people", label: "People" },
  { id: "liked", label: "Liked You", icon: Heart },
  { id: "chats", label: "Chats", icon: MessageCircle },
];

export function BottomNav({ activeTab = "people", onTabChange }: BottomNavProps) {
  return (
    <div className="w-full h-[83px] bg-white border-t border-neutral-100 flex items-start justify-around pt-[10px] px-[16px]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        const isPeople = tab.id === "people";

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className="flex flex-col items-center gap-[4px] min-w-[60px]"
          >
            <div className="relative">
              {isPeople ? (
                <BumbleLogo
                  size={24}
                  useCurrentColor
                  className={isActive ? "text-bumble-black" : "text-neutral-400"}
                />
              ) : Icon ? (
                <Icon
                  size={24}
                  className={isActive ? "text-bumble-black" : "text-neutral-400"}
                  strokeWidth={1.5}
                />
              ) : null}
              {tab.id === "discover" && (
                <div className="absolute -top-0.5 -right-0.5 w-[6px] h-[6px] bg-red-500 rounded-full" />
              )}
            </div>
            <span
              className={`text-[11px] ${
                isActive ? "text-bumble-black font-medium" : "text-neutral-400"
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
