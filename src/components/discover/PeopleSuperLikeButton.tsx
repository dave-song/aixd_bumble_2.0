"use client";

const SUPERLIKE_BUTTON_SRC = "/icons/like button with spacing.svg";

interface PeopleSuperLikeButtonProps {
  onClick: () => void;
  opacity?: number;
}

/** Pinned to bottom-right of `.proto-profile-card--people`; does not scroll with profile content. */
export function PeopleSuperLikeButton({
  onClick,
  opacity = 1,
}: PeopleSuperLikeButtonProps) {
  const hidden = opacity < 0.05;

  return (
    <button
      type="button"
      onClick={onClick}
      className="people-superlike-fixed"
      style={{
        opacity,
        transition: "opacity 0.12s linear",
        pointerEvents: hidden ? "none" : "auto",
      }}
      aria-label="Super like"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
    >
      <img
        src={SUPERLIKE_BUTTON_SRC}
        alt=""
        className="h-full w-full object-contain"
      />
    </button>
  );
}
