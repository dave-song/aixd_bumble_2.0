"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { StatusBar } from "@/components/layout";
import { PhoneFrame } from "@/components/layout/PhoneFrame";

const CHAT_IDS: Record<string, { name: string; avatar: string }> = {
  loopy: {
    name: "Loopy",
    avatar: "/icons/chats_page_assets/loopy_prof_pic.png",
  },
  tom: {
    name: "Tom Lizard",
    avatar: "/icons/chats_page_assets/tom_prof_pic.png",
  },
};

/** Tom Lizard chat: Tom sent two messages, then user replied "Let me just press the button". */
const TOM_CHAT_MESSAGES: { from: "them" | "you"; text: string }[] = [
  { from: "them", text: "Hey! How’s it going?" },
  { from: "them", text: "Ready when you are 😊" },
  { from: "you", text: "Let me just press the button" },
];

export default function ChatDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const chat = CHAT_IDS[id] ?? { name: "Chat", avatar: "" };
  const messages = id === "tom" ? TOM_CHAT_MESSAGES : [];

  return (
    <PhoneFrame>
      <div className="flex h-full w-full flex-col bg-white">
        <StatusBar />
        <div className="flex shrink-0 items-center justify-between border-b border-[#e4e4e4] bg-white pl-[22px] pr-[17px] py-3">
          <div className="flex items-center gap-4">
            <Link
              href="/chats"
              className="flex h-[30px] w-[30px] items-center justify-center rounded-full text-bumble-black hover:bg-black/5"
              aria-label="Back to Chats"
            >
              <ChevronLeft size={24} strokeWidth={2} />
            </Link>
            <div className="flex items-center gap-[7px]">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#f3f3f3]">
                {chat.avatar ? (
                  <Image
                    src={chat.avatar}
                    alt=""
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-sm font-medium text-bumble-black">
                    {chat.name.charAt(0)}
                  </span>
                )}
              </div>
              <p className="text-[18px] font-medium leading-normal text-bumble-black">
                {chat.name}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-[7px] overflow-y-auto">
          {messages.length === 0 ? (
            <p className="p-4 text-center text-bumble-gray">No messages yet.</p>
          ) : (
            <>
              {messages.map((msg, i) =>
                msg.from === "them" ? (
                  <div
                    key={i}
                    className="flex flex-col items-start px-[14px] py-1"
                  >
                    <div className="max-w-[85%] rounded-[18px] rounded-bl-[4px] bg-[#f3f3f3] px-3 py-2.5">
                      <p className="text-[16px] tracking-[-0.44px] text-bumble-black whitespace-pre-wrap">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    key={i}
                    className="flex flex-col items-end gap-0.5 px-[11px] py-1"
                  >
                    <div className="max-w-[85%] rounded-[18px] rounded-br-[4px] bg-bumble-accent px-[13px] py-3">
                      <p className="text-[16px] tracking-[-0.44px] text-bumble-black whitespace-pre-wrap">
                        {msg.text}
                      </p>
                    </div>
                    <p className="text-[14px] tracking-[-0.23px] text-bumble-gray">
                      Delivered
                    </p>
                  </div>
                ),
              )}
            </>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
