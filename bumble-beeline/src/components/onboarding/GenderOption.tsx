"use client";

interface GenderOptionProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  showExpandOption?: boolean;
}

export default function GenderOption({
  label,
  selected = false,
  onClick,
  showExpandOption = true,
}: GenderOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`w-[402px] rounded-[8px] pl-[24px] pr-[8px] transition-colors ${
        selected
          ? "bg-[#ffdb5b] flex flex-col items-start pt-[12px] pb-[13px]"
          : "bg-[#f2f3f3] flex items-center justify-between py-[12px]"
      }`}
    >
      {!selected ? (
        <>
          <span
            className="text-[16px] font-medium text-[#202020] leading-[24.5px]"
            style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
          >
            {label}
          </span>
          <img
            src="/icons/radio-unselected.svg"
            alt=""
            className="w-[30px] h-[30px]"
          />
        </>
      ) : (
        <>
          <div className="flex items-center justify-between w-[370px] mb-[-1px]">
            <span
              className="text-[16px] font-medium text-[#202020] leading-[24.5px]"
              style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
            >
              {label}
            </span>
            <img
              src="/icons/radio-selected.svg"
              alt=""
              className="w-[30px] h-[30px]"
            />
          </div>
          {showExpandOption && (
            <div className="flex items-center gap-[4px] mb-[-1px]">
              <span
                className="text-[12px] font-medium text-[#575656] leading-[24.5px]"
                style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
              >
                Add more about your gender
              </span>
              <img
                src="/icons/chevron-right-gray.svg"
                alt=""
                className="w-[16px] h-[17px]"
              />
            </div>
          )}
        </>
      )}
    </button>
  );
}
