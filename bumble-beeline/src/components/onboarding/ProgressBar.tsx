"use client";

interface ProgressBarProps {
  step: 1 | 2 | 3 | 4 | 5;
  totalSteps?: number;
}

export default function ProgressBar({ step, totalSteps = 5 }: ProgressBarProps) {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="flex flex-col items-center justify-center w-[430px] h-[10px] px-[20px]">
      <div className="w-[390px] h-[1.5px] bg-[#e5e5e5] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#202020] rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
