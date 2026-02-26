"use client";

interface StatusBarProps {
  className?: string;
}

export function StatusBar({ className = "" }: StatusBarProps) {
  return (
    <div className={`w-full ${className}`}>
      <img 
        src="/icons/ios-status-bar.svg" 
        alt="Status Bar" 
        className="w-full h-auto"
        style={{ display: "block" }}
      />
    </div>
  );
}
