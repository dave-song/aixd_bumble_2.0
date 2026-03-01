"use client";

import { PhoneFrame, StatusBar } from "@/components/layout";
import { ProfileSectionText, ProfileSectionTags } from "@/components/profile";

function Separator() {
  return <div className="h-px w-full bg-[#F3F3F3]" />;
}

export default function DiscoverPage() {
  return (
    <PhoneFrame>
      <div className="relative w-full h-full bg-white flex flex-col overflow-hidden">
        <StatusBar />

        <header className="w-full shrink-0 flex items-center justify-center bg-white">
          <img
            src="/icons/bumble top header.svg"
            alt="Bumble"
            className="w-full h-[42px] object-contain object-left shrink-0"
          />
        </header>

        <div className="flex-1 min-h-0 flex justify-center bg-white">
          <div
            className="h-full min-h-[512px] w-[411px] min-w-[411px] max-w-[411px] rounded-[18px] overflow-hidden bg-white flex flex-col"
            style={{ boxSizing: "border-box" }}
          >
            <div className="profile-scroll flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
              <img
                src="/icons/haris profile card.svg"
                alt="Hari, 27 - Project Manager at Tech, Carnegie Mellon"
                className="block w-full h-auto object-contain object-top"
              />

              {/* Profile sections from Figma flow (node 1068-8435) */}
              <ProfileSectionText
                title="My bio"
                body="not many, old runway realness kinda different thingy"
              />
              <Separator />
              <ProfileSectionTags
                title="About me"
                tags={[
                  { label: "Virgo" },
                  { label: "Anime" },
                  { label: "spontaneous trips" },
                  { label: "Minimalist" },
                  { label: "Open to kids" },
                  { label: "Aries" },
                  { label: "Liberal" },
                ]}
              />
              <Separator />
              <ProfileSectionTags
                title="I'm looking for"
                tags={[
                  { label: "Deep conversation" },
                  { label: "Ambition" },
                  { label: "Humor" },
                  { label: "Emotional intelligence" },
                ]}
              />
              <Separator />
              <ProfileSectionTags
                title="My interests"
                tags={[
                  { label: "Art" },
                  { label: "Foodie" },
                  { label: "Animals" },
                  { label: "Music" },
                  { label: "DIY" },
                ]}
              />
              <Separator />
              <ProfileSectionText
                title="When I'm happy, I like to"
                body="Road-trips (caravan, plan, unplanned, or solo, couple, magnets)"
              />
              <Separator />
              <ProfileSectionTags
                title="My causes & communities"
                tags={[
                  { label: "Mental health & tech" },
                  { label: "PR" },
                  { label: "Digital minimalist" },
                  { label: "Morning person club" },
                  { label: "Community gardens" },
                  { label: "New Trier" },
                ]}
              />
              <Separator />
              <ProfileSectionText
                title="My favorite quality in a partner is"
                body="Passion: I love that when people have hobbies they're really into or would introduce others they're passionate in"
              />
              <Separator />
              <ProfileSectionText title="My dream" body="F fashion" />
            </div>
          </div>
        </div>

        <nav className="w-full shrink-0 bg-white">
          <img
            src="/icons/bottom navbar.svg"
            alt="Navigation"
            className="w-full h-auto object-contain object-bottom block"
          />
        </nav>
      </div>
    </PhoneFrame>
  );
}
