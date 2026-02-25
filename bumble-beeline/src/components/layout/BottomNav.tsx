"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  id: string;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { id: "profile", label: "Profile", path: "/profile" },
  { id: "discover", label: "Discover", path: "/discover" },
  { id: "people", label: "People", path: "/discover" },
  { id: "liked", label: "Liked You", path: "/liked" },
  { id: "chats", label: "Chats", path: "/chats" },
];

interface BottomNavProps {
  activeTab?: string;
  badges?: Record<string, number>;
}

const NavIcon = ({ id, active }: { id: string; active: boolean }) => {
  const color = active ? "#1A1A1A" : "#9CA3AF";
  
  switch (id) {
    case "profile":
      return (
        <svg width="27" height="27" viewBox="0 0 27 27" fill="none">
          <circle cx="13.5" cy="9" r="5" stroke={color} strokeWidth="2" fill={active ? color : "none"}/>
          <path d="M4 24c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
        </svg>
      );
    case "discover":
      return (
        <svg width="27" height="27" viewBox="0 0 27 27" fill="none">
          <circle cx="13.5" cy="13.5" r="10" stroke={color} strokeWidth="2"/>
          <path d="M16.5 10.5L10.5 13.5L13.5 16.5L16.5 10.5Z" fill={color} stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      );
    case "people":
      return (
        <svg width="27" height="24" viewBox="0 0 27 24" fill={active ? color : "none"}>
          <path 
            d="M13.5 0L20.5 4V12L13.5 16L6.5 12V4L13.5 0Z" 
            stroke={color} 
            strokeWidth="2" 
            strokeLinejoin="round"
            fill={active ? color : "none"}
          />
          <path 
            d="M13.5 16V24" 
            stroke={color} 
            strokeWidth="2" 
            strokeLinecap="round"
          />
          <path 
            d="M6.5 12L2 15V20L6.5 23" 
            stroke={color} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          />
          <path 
            d="M20.5 12L25 15V20L20.5 23" 
            stroke={color} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );
    case "liked":
      return (
        <svg width="27" height="27" viewBox="0 0 27 27" fill={active ? color : "none"} stroke={color} strokeWidth="2">
          <path d="M13.5 23.5L3.5 13.5C1 11 1 6.5 4 4C7 1.5 11 2.5 13.5 5.5C16 2.5 20 1.5 23 4C26 6.5 26 11 23.5 13.5L13.5 23.5Z" strokeLinejoin="round"/>
        </svg>
      );
    case "chats":
      return (
        <svg width="27" height="27" viewBox="0 0 27 27" fill={active ? color : "none"} stroke={color} strokeWidth="2">
          <path d="M4 4H23V18H8L4 22V4Z" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return null;
  }
};

export default function BottomNav({
  activeTab = "people",
  badges = {},
}: BottomNavProps) {
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    if (activeTab) {
      return item.id === activeTab;
    }
    return pathname === item.path;
  };

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white h-[94px] pt-[8px] pb-[30px] z-20 border-t border-gray-100">
      <div className="flex items-start justify-around h-full">
        {navItems.map((item) => {
          const active = isActive(item);
          const badge = badges[item.id];

          return (
            <Link
              key={item.id}
              href={item.path}
              className="flex flex-col items-center w-[76px] relative"
            >
              <div className="relative h-[27px] flex items-center justify-center">
                <NavIcon id={item.id} active={active} />
                {badge && badge > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-[#FF4458] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {badge > 9 ? "9+" : badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[11px] mt-[4px] ${
                  active ? "text-[#1A1A1A] font-semibold" : "text-[#9CA3AF] font-normal"
                }`}
              >
                {item.label}
              </span>
              {item.id === "profile" && (
                <span className="absolute top-0 right-[20px] w-[8px] h-[8px] bg-[#FF4458] rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
