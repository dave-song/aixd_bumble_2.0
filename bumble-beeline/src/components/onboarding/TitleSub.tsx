"use client";

interface TitleSubProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function TitleSub({
  title,
  subtitle,
  align = "left",
}: TitleSubProps) {
  const alignmentClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className="flex flex-col items-start pb-[8px] w-[430px]">
      <div className="flex items-center justify-center w-full px-[20px] py-[8px] mb-[-8px]">
        <h1
          className={`text-[28px] font-medium text-[#202020] leading-[39px] w-[390px] ${alignmentClass}`}
          style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
        >
          {title}
        </h1>
      </div>
      {subtitle && (
        <div className="flex items-center justify-center w-full px-[20px] py-[8px] mb-[-8px]">
          <p
            className={`text-[16px] font-normal text-[#575656] leading-[24.5px] w-[388px] ${alignmentClass}`}
            style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
          >
            {subtitle}
          </p>
        </div>
      )}
    </div>
  );
}
