'use client';

interface ProgressBarProps {
  steps: number;
  currentStep: number;
}

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="flex gap-2 w-full">
      {Array.from({ length: steps }).map((_, index) => (
        <div
          key={index}
          className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
            index < currentStep ? 'bg-black' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
}
