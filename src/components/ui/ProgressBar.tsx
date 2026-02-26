"use client";

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressBar({ current, total, className = "" }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className={`w-full h-[4px] bg-neutral-100 rounded-full ${className}`}>
      <div
        className="h-full bg-bumble-accent rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
