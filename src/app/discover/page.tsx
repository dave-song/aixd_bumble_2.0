"use client";

import { PhoneFrame, StatusBar } from "@/components/layout";

export default function DiscoverPage() {
  return (
    <PhoneFrame>
      <div className="relative w-full h-full bg-white flex flex-col">
        <StatusBar />

        {/* Bumble top header - matches reference exactly */}
        <div className="w-full shrink-0">
          <img
            src="/icons/bumble top header.svg"
            alt="Bumble"
            className="w-full h-[42px] object-contain object-left"
          />
        </div>

        {/* Profile card wrapper: 411px wide, 712px tall, 18px radius */}
        <div className="flex-1 min-h-0 flex justify-center bg-white">
          <div
            className="h-[712px] flex-none rounded-[18px] overflow-hidden bg-white"
            style={{
              width: "411px",
              minWidth: "411px",
              maxWidth: "411px",
              boxSizing: "border-box",
            }}
          >
            <div className="profile-scroll h-full w-full min-w-0 overflow-y-auto overflow-x-hidden">
              {/* First landing picture: Hari's profile card */}
              <section className="w-full flex-shrink-0">
                <img
                  src="/icons/haris profile card.svg"
                  alt="Hari"
                  className="block w-full h-auto object-contain object-top"
                />
              </section>
              {/* More cards and pictures can be added below */}
            </div>
          </div>
        </div>

        {/* Bottom navigation bar - matches reference exactly */}
        <div className="w-full shrink-0">
          <img
            src="/icons/bottom navbar.svg"
            alt="Navigation"
            className="w-full h-auto object-contain object-bottom"
          />
        </div>
      </div>
    </PhoneFrame>
  );
}
