"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type TabType = "profile" | "discover" | "people" | "likedyou" | "chats";

interface BottomNavProps {
  activeTab?: TabType;
  showProfileBadge?: boolean;
}

const NavIcon = ({ tab, active }: { tab: TabType; active: boolean }) => {
  switch (tab) {
    case "profile":
      return (
        <img
          src={active ? "/icons/profile-icon-active.svg" : "/icons/profile-icon.svg"}
          alt=""
          className="w-[27px] h-[25px]"
        />
      );
    case "discover":
      return (
        <img
          src="/icons/discover-icon.svg"
          alt=""
          className="w-[25px] h-[25px]"
        />
      );
    case "people":
      return (
        <img
          src="/icons/bumble-logo-nav.svg"
          alt=""
          className={`w-[27px] h-[23px] ${active ? "" : "opacity-60"}`}
        />
      );
    case "likedyou":
      return (
        <img
          src="/icons/liked-you-icon.svg"
          alt=""
          className="w-[25px] h-[24px]"
        />
      );
    case "chats":
      return (
        <img
          src="/icons/chats-icon.svg"
          alt=""
          className="w-[24px] h-[22px]"
        />
      );
  }
};

const tabs: { id: TabType; label: string; path: string }[] = [
  { id: "profile", label: "Profile", path: "/profile" },
  { id: "discover", label: "Discover", path: "/discover" },
  { id: "people", label: "People", path: "/discover" },
  { id: "likedyou", label: "Liked You", path: "/liked" },
  { id: "chats", label: "Chats", path: "/chats" },
];

export default function BottomNav({
  activeTab = "people",
  showProfileBadge = false,
}: BottomNavProps) {
  const pathname = usePathname();

  const isActive = (tab: TabType) => {
    if (activeTab) return tab === activeTab;
    const tabItem = tabs.find((t) => t.id === tab);
    return tabItem?.path === pathname;
  };

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white w-[430px] h-[94px] flex items-start justify-between pb-[31px] z-20">
      {tabs.map((tab) => {
        const active = isActive(tab.id);
        return (
          <Link
            key={tab.id}
            href={tab.path}
            className="flex flex-col items-center gap-[4px] py-[8px] w-[76px] relative"
          >
            <div className="relative flex items-center justify-center h-[25px]">
              <NavIcon tab={tab.id} active={active} />
              {tab.id === "profile" && showProfileBadge && (
                <span className="absolute -top-[2px] -right-[6px] w-[8px] h-[8px] bg-[#FF4458] rounded-full" />
              )}
            </div>
            <span
              className={`text-[12px] leading-[17px] text-center ${
                active
                  ? "text-[#202020] font-medium"
                  : "text-[#575656] font-medium"
              }`}
              style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
