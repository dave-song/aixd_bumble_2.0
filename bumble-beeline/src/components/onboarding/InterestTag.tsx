"use client";

interface InterestTagProps {
  emoji: string;
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function InterestTag({
  emoji,
  label,
  selected = false,
  onClick,
}: InterestTagProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-[4px] h-[40px] px-[12px] rounded-[600px] transition-colors ${
        selected ? "bg-[#ffd938]" : "bg-[#f3f3f3]"
      }`}
    >
      <span className="text-[20px] leading-[40px] tracking-[0.21px]">
        {emoji}
      </span>
      <span
        className="text-[14px] text-[#202020] leading-[29px] tracking-[0.15px]"
        style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
      >
        {label}
      </span>
    </button>
  );
}
