"use client";

interface LikeButtonProps {
  onClick?: () => void;
  className?: string;
}

export default function LikeButton({ onClick, className = "" }: LikeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-[66px] h-[66px] rounded-[33px] bg-[#ffd93a] flex items-center justify-center p-[10px] ${className}`}
    >
      <img
        src="/icons/star-like.svg"
        alt="Like"
        className="w-[32px] h-[32px]"
      />
    </button>
  );
}
