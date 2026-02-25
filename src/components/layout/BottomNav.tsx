'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Compass, Users, Heart, MessageCircle } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: number;
}

const navItems: NavItem[] = [
  { id: 'profile', label: 'Profile', path: '/profile', icon: User },
  { id: 'discover', label: 'Discover', path: '/discover', icon: Compass },
  { id: 'people', label: 'People', path: '/discover', icon: Users },
  { id: 'liked', label: 'Liked You', path: '/liked', icon: Heart },
  { id: 'chats', label: 'Chats', path: '/chats', icon: MessageCircle },
];

interface BottomNavProps {
  activeTab?: string;
  badges?: Record<string, number>;
}

export default function BottomNav({ activeTab = 'people', badges = {} }: BottomNavProps) {
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    if (activeTab) {
      return item.id === activeTab;
    }
    return pathname === item.path;
  };

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-6 pt-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;
          const badge = badges[item.id];

          return (
            <Link
              key={item.id}
              href={item.path}
              className="flex flex-col items-center gap-1 min-w-[60px] relative"
            >
              <div className="relative">
                <Icon
                  size={24}
                  className={active ? 'text-black' : 'text-gray-400'}
                  fill={active ? 'currentColor' : 'none'}
                  strokeWidth={active ? 2.5 : 2}
                />
                {badge && badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {badge > 9 ? '9+' : badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] ${
                  active ? 'text-black font-medium' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
              {/* Red dot indicator for certain tabs */}
              {item.id === 'profile' && (
                <span className="absolute top-0 right-3 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
