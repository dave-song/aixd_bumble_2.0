"use client";

interface ShareButtonProps {
  onClick?: () => void;
  className?: string;
}

export default function ShareButton({ onClick, className = "" }: ShareButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-[#202020] flex items-center justify-center p-[9px] rounded-[64px] overflow-hidden ${className}`}
    >
      <img
        src="/icons/share-icon.svg"
        alt="Share"
        className="w-[12px] h-[12px]"
      />
    </button>
  );
}
