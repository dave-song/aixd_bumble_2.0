"use client";

interface ValueTagProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function ValueTag({
  label,
  selected = false,
  onClick,
}: ValueTagProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-[4px] h-[40px] px-[12px] py-[10px] rounded-[500px] transition-colors ${
        selected ? "bg-[#ffd938]" : "bg-[#f2f3f3]"
      }`}
    >
      <span
        className="text-[14px] font-normal text-[#202020] leading-[24.5px]"
        style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
      >
        {label}
      </span>
      <img
        src={selected ? "/icons/tag-check.svg" : "/icons/tag-plus.svg"}
        alt=""
        className={selected ? "w-[20px] h-[20px]" : "w-[22px] h-[22px]"}
      />
    </button>
  );
}
