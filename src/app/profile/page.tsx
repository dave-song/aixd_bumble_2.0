'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneFrame, StatusBar, BottomNav } from '@/components/layout';
import { userProfile } from '@/lib/mockData';
import { HelpCircle, Settings, ChevronRight, CheckCircle } from 'lucide-react';

type ProfileTab = 'beeline' | 'dating' | 'photos' | 'safety';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>('beeline');
  const [beelineReady, setBeelineReady] = useState(false);

  const tabs = [
    { id: 'beeline' as const, label: 'Beeline' },
    { id: 'dating' as const, label: 'Dating advice', hasNotification: true },
    { id: 'photos' as const, label: 'Photo insights' },
    { id: 'safety' as const, label: 'Safety' },
  ];

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-white">
        <StatusBar />

        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-2 pb-4">
          <h1 className="text-2xl font-bold text-black">Profile</h1>
          <div className="flex items-center gap-3">
            <button>
              <HelpCircle size={24} className="text-gray-600" />
            </button>
            <button>
              <Settings size={24} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Profile photo section */}
        <div className="relative mx-4 rounded-2xl overflow-hidden aspect-[4/5]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${userProfile.photos[0]})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Profile icon */}
          <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
            <img
              src={userProfile.photos[0]}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>

          {/* Edit button */}
          <button className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full text-sm font-medium">
            Edit profile
          </button>

          {/* Profile info */}
          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">
                {userProfile.name}, {userProfile.age}
              </h2>
              {userProfile.verified && (
                <CheckCircle size={20} className="text-white" fill="currentColor" />
              )}
            </div>
            <p className="text-sm text-white/90 mt-1">{userProfile.bio}</p>
          </div>

          {/* Completion percentage */}
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-white text-sm font-medium">64%</span>
          </div>

          {/* Checkmark for completion */}
          {beelineReady && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute bottom-16 right-4 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg"
            >
              <CheckCircle size={24} className="text-green-500" fill="currentColor" />
            </motion.div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-4 pt-4 overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                transition-colors relative
                ${activeTab === tab.id
                  ? 'bg-gray-100 text-black'
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              {tab.label}
              {tab.hasNotification && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-auto px-4 pt-4 pb-24">
          {activeTab === 'beeline' && (
            <div className="space-y-4">
              {/* Spill the tea CTA */}
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-bumble-yellow flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="black">
                      <circle cx="12" cy="12" r="8" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-black">
                      Spill the tea so I can find "The One"
                    </p>
                    <p className="text-xs text-gray-500">
                      I've got your basics, but I'm still guessing on your vibe.
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>

              {/* Beeline status card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="gradient-coral rounded-2xl p-6 text-white"
              >
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold mb-2">
                  Give me a second to read the room
                </h3>
                <p className="text-sm text-white/90 leading-relaxed">
                  I'm busy turning your static profile to a <span className="font-semibold">living one.</span>{' '}
                  Once I've had enough conversations with you in the feed, your insights will appear here.
                </p>
              </motion.div>
            </div>
          )}

          {activeTab === 'dating' && (
            <div className="flex items-center justify-center h-40 text-gray-400">
              Dating advice coming soon...
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="flex items-center justify-center h-40 text-gray-400">
              Photo insights coming soon...
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="flex items-center justify-center h-40 text-gray-400">
              Safety features coming soon...
            </div>
          )}
        </div>

        {/* Bottom navigation */}
        <BottomNav activeTab="profile" />
      </div>
    </PhoneFrame>
  );
}
