"use client";

interface ComplimentButtonProps {
  onClick?: () => void;
  className?: string;
}

export default function ComplimentButton({ onClick, className = "" }: ComplimentButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative w-[44px] h-[44px] ${className}`}
    >
      <img
        src="/icons/compliment-button-bg.svg"
        alt=""
        className="absolute inset-0 w-full h-full"
      />
      <div className="absolute inset-[22%] flex items-center justify-center">
        <img
          src="/icons/compliment-icon.svg"
          alt="Compliment"
          className="w-full h-full"
        />
      </div>
    </button>
  );
}
