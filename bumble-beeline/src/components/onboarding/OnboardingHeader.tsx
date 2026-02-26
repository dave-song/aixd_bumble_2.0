"use client";

interface OnboardingHeaderProps {
  showSkip?: boolean;
  showBack?: boolean;
  stepNumber?: number;
  onBack?: () => void;
  onSkip?: () => void;
}

export default function OnboardingHeader({
  showSkip = true,
  showBack = true,
  stepNumber,
  onBack,
  onSkip,
}: OnboardingHeaderProps) {
  return (
    <div className="flex items-center justify-between w-[430px] h-[72px] px-[16px]">
      {/* Left side - Back button */}
      <div className="w-[60px]">
        {showBack && (
          <button
            onClick={onBack}
            className="flex items-center justify-center w-[40px] h-[40px]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="#202020"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Center - Step number */}
      <div className="flex-1 flex items-center justify-center">
        {stepNumber && (
          <span
            className="text-[14px] font-medium text-[#575656]"
            style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
          >
            {stepNumber}
          </span>
        )}
      </div>

      {/* Right side - Skip button */}
      <div className="w-[60px] flex justify-end">
        {showSkip && (
          <button
            onClick={onSkip}
            className="text-[16px] font-medium text-[#202020]"
            style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
