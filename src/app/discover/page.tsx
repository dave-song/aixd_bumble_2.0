"use client";

import { PhoneFrame, StatusBar } from "@/components/layout";
import {
  ProfileSectionLocation,
  ProfileSectionTags,
  ProfileSectionText,
} from "@/components/profile";

export default function DiscoverPage() {
  return (
    <PhoneFrame>
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-white">
        <StatusBar />

        <header className="flex w-full shrink-0 items-center justify-center bg-white">
          <img
            src="/icons/bumble top header.svg"
            alt="Bumble"
            className="h-[42px] w-full shrink-0 object-contain object-left"
          />
        </header>

        <div className="flex min-h-0 flex-1 justify-center bg-white">
          <div
            className="flex h-full min-h-[512px] w-[411px] min-w-[411px] max-w-[411px] flex-col overflow-hidden rounded-[18px] bg-white"
            style={{ boxSizing: "border-box" }}
          >
            <div className="profile-scroll flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden px-[10px] pb-4 pt-0">
              <img
                src="/icons/haris profile card.svg"
                alt="Hari, 27 - Project Manager at Tech, Carnegie Mellon"
                className="block w-full shrink-0 object-contain object-top"
              />

              {/* Profile sections from Figma flow (node 1068-8435) */}
              <ProfileSectionText
                title="My bio"
                body="cat mom, mid runner, and can cook 4 different things"
              />
              <ProfileSectionTags
                title="About me"
                tags={[
                  { label: "5'10\"", emoji: "📏" },
                  { label: "Active", emoji: "🤸" },
                  { label: "undergraduate degree", emoji: "🎓" },
                  { label: "Woman", emoji: "🚺" },
                  { label: "Open to kids", emoji: "🍼" },
                  { label: "Aries", emoji: "♈" },
                  { label: "Liberal", emoji: "🏛️" },
                ]}
              />
              <img
                src="/icons/user_profile_assets/p1.png"
                alt=""
                className="w-full rounded-2xl object-cover"
              />
              <ProfileSectionTags
                title="I'm looking for"
                tags={[
                  { label: "Early morning", emoji: "🌄" },
                  { label: "Ambition", emoji: "🎯" },
                  { label: "Humor", emoji: "😁" },
                  { label: "Emotional intelligence", emoji: "❤️" },
                ]}
              />
              <ProfileSectionTags
                title="My interests"
                tags={[
                  { label: "Art", emoji: "🎨" },
                  { label: "Foodie", emoji: "🍜" },
                  { label: "Journaling", emoji: "✍️" },
                  { label: "Movies", emoji: "🍿" },
                  { label: "Cats", emoji: "🐱" },
                ]}
              />
              <img
                src="/icons/user_profile_assets/p2.png"
                alt=""
                className="w-full rounded-2xl object-cover"
              />
              <ProfileSectionText
                title="When I unplug I like to"
                body="Read, draw, journal, play guitar or cello, cook?, meditate"
              />
              <img
                src="/icons/user_profile_assets/p3.png"
                alt=""
                className="w-full rounded-2xl object-cover"
              />
              <ProfileSectionTags
                title="My causes and communities"
                tags={[
                  { label: "Mental health in tech" },
                  { label: "UX" },
                  { label: "Digital minimalist" },
                  { label: "Morning person club" },
                  { label: "Community gardens" },
                  { label: "Slow food" },
                ]}
              />
              <ProfileSectionText
                title="My favorite quality in a person is"
                body="Passion- I love when people have hobbies they're really into or social causes they participate in"
              />
              <img
                src="/icons/user_profile_assets/p4.png"
                alt=""
                className="w-full rounded-2xl object-cover"
              />
              <ProfileSectionLocation location="Boston" />

              {/* Bottom decision bar (pass / super like / like) - same width as cards, Figma 1068-8451 */}
              <div className="flex w-full max-w-[24.4375rem] flex-col items-center justify-center gap-2 py-6">
                <img
                  src="/icons/user_profile_assets/bottom decision bar section.svg"
                  alt="Pass, Super like, Like"
                  className="h-auto w-full object-contain object-center"
                />
                <div className="flex flex-col items-center gap-0.5 text-center">
                  <button
                    type="button"
                    className="text-[14px] font-normal text-bumble-black"
                  >
                    Block
                  </button>
                  <button
                    type="button"
                    className="text-[14px] font-normal text-red-600"
                  >
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav className="w-full shrink-0 bg-white">
          <img
            src="/icons/bottom navbar.svg"
            alt="Navigation"
            className="block w-full object-contain object-bottom"
          />
        </nav>
      </div>
    </PhoneFrame>
  );
}
