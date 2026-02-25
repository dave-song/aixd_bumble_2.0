'use client';

interface BumbleLogoProps {
  size?: number;
  animated?: boolean;
}

export default function BumbleLogo({ size = 80, animated = true }: BumbleLogoProps) {
  return (
    <svg
      width={size}
      height={size * 0.92}
      viewBox="0 0 100 92"
      fill="none"
      className={animated ? 'animate-pulse-scale' : ''}
    >
      {/* Hexagon shape */}
      <path
        d="M50 0L93.3 25V67L50 92L6.7 67V25L50 0Z"
        fill="#FFC629"
      />
      {/* Three horizontal lines (Bumble bee stripes) */}
      <rect x="30" y="32" width="40" height="8" rx="4" fill="white" />
      <rect x="30" y="44" width="40" height="8" rx="4" fill="white" />
      <rect x="30" y="56" width="40" height="8" rx="4" fill="white" />
    </svg>
  );
}
