"use client";

import { ReactNode } from "react";
import { CheckCircle, Briefcase, GraduationCap, MapPin } from "lucide-react";

interface ProfileCardProps {
  name: string;
  age: number;
  job?: string;
  school?: string;
  location?: string;
  verified?: boolean;
  imageUrl: string;
  children?: ReactNode;
  className?: string;
}

export function ProfileCard({
  name,
  age,
  job,
  school,
  location,
  verified = false,
  imageUrl,
  children,
  className = "",
}: ProfileCardProps) {
  return (
    <div
      className={`relative w-[391px] rounded-[16px] overflow-hidden shadow-card ${className}`}
    >
      {/* Main Image */}
      <div className="relative w-full h-[522px]">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />

        {/* Upload button */}
        <button className="absolute top-[16px] right-[16px] w-[32px] h-[32px] bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </button>

        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black/70 to-transparent" />

        {/* Profile Info */}
        <div className="absolute bottom-[16px] left-[16px] right-[16px]">
          {/* Verified Badge */}
          {verified && (
            <div className="flex items-center gap-[6px] mb-[8px]">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-[10px] py-[4px] flex items-center gap-[4px]">
                <CheckCircle size={14} className="text-white" />
                <span className="text-[12px] text-white font-medium">
                  Photo verified
                </span>
              </div>
            </div>
          )}

          {/* Name & Age */}
          <h2 className="text-[28px] font-medium text-white mb-[8px]">
            {name}, {age}
          </h2>

          {/* Job */}
          {job && (
            <div className="flex items-center gap-[8px] mb-[4px]">
              <Briefcase size={16} className="text-white/80" />
              <span className="text-[14px] text-white/90">{job}</span>
            </div>
          )}

          {/* School */}
          {school && (
            <div className="flex items-center gap-[8px]">
              <GraduationCap size={16} className="text-white/80" />
              <span className="text-[14px] text-white/90">{school}</span>
            </div>
          )}
        </div>
      </div>

      {/* Additional Content (Bio sections, etc.) */}
      {children}
    </div>
  );
}

interface BioSectionProps {
  title: string;
  children: ReactNode;
  onBeelineClick?: () => void;
  className?: string;
}

export function BioSection({
  title,
  children,
  onBeelineClick,
  className = "",
}: BioSectionProps) {
  return (
    <div
      className={`bg-white p-[16px] rounded-[16px] shadow-card ${className}`}
    >
      <div className="flex items-center justify-between mb-[16px]">
        <p className="font-medium text-[16px] text-bumble-black tracking-[-0.5px]">
          {title}
        </p>
        {onBeelineClick && (
          <button
            onClick={onBeelineClick}
            className="bg-bumble-black rounded-[10px] px-[8px] py-[7px] flex items-center justify-center"
          >
            <BeelineIcon />
          </button>
        )}
      </div>
      <div className="text-[16px] text-bumble-black tracking-[-0.5px]">
        {children}
      </div>
    </div>
  );
}

function BeelineIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 2L10 6L14 7L11 10L12 14L8 12L4 14L5 10L2 7L6 6L8 2Z"
        fill="#FFD93A"
      />
    </svg>
  );
}

interface PhotoSectionProps {
  imageUrl: string;
  caption?: string;
  className?: string;
}

export function PhotoSection({
  imageUrl,
  caption,
  className = "",
}: PhotoSectionProps) {
  return (
    <div className={`rounded-[16px] overflow-hidden ${className}`}>
      <div className="relative w-full h-[522px]">
        <img
          src={imageUrl}
          alt="Profile photo"
          className="w-full h-full object-cover"
        />
        {caption && (
          <div className="absolute bottom-[16px] left-[16px] right-[16px]">
            <p className="text-[14px] text-white font-medium text-shadow">
              {caption}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
