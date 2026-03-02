"use client";

function ArrowKey({
  direction,
  highlighted,
  onClick,
}: {
  direction: "left" | "right";
  highlighted: boolean;
  onClick?: () => void;
}) {
  const className = `flex h-11 w-11 items-center justify-center rounded-xl border-2 transition-colors ${
    highlighted
      ? "border-bumble-accent bg-bumble-yellow-light text-bumble-black"
      : "border-[#E5E5E5] bg-white text-bumble-gray"
  } ${onClick ? "cursor-pointer hover:opacity-90 active:opacity-80" : ""}`;

  const content = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "left" ? (
        <path d="M19 12H5M12 5l-7 7 7 7" />
      ) : (
        <path d="M5 12h14M12 5l7 7-7 7" />
      )}
    </svg>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={className}
        aria-label={
          direction === "right"
            ? "Match with this person"
            : "Look at other candidates"
        }
      >
        {content}
      </button>
    );
  }
  return (
    <div className={className} aria-hidden>
      {content}
    </div>
  );
}

interface SwipeExplanationPanelProps {
  onLeftArrowClick?: () => void;
  onRightArrowClick?: () => void;
}

export function SwipeExplanationPanel({
  onLeftArrowClick,
  onRightArrowClick,
}: SwipeExplanationPanelProps) {
  return (
    <div
      className="flex shrink-0 flex-col rounded-2xl border border-[#E5E5E5] bg-white px-6 py-5 shadow-lg"
      style={{ minWidth: "280px" }}
      role="region"
      aria-label="Swipe controls explanation"
    >
      <p className="mb-4 text-center text-sm font-medium text-bumble-gray">
        Use arrows
      </p>
      <div className="flex items-center justify-center gap-4">
        <ArrowKey
          direction="left"
          highlighted={true}
          onClick={onLeftArrowClick}
        />
        <ArrowKey
          direction="right"
          highlighted={true}
          onClick={onRightArrowClick}
        />
      </div>
      <div className="mt-4 flex flex-col gap-2 border-t border-[#E5E5E5] pt-4">
        <p className="flex items-center gap-2 text-sm text-bumble-black">
          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 border-bumble-accent bg-bumble-yellow-light">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ transform: "rotate(-90deg)" }}
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </span>
          Press left to look at other candidates.
        </p>
        <p className="flex items-center gap-2 text-sm text-bumble-black">
          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 border-bumble-accent bg-bumble-yellow-light">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ transform: "rotate(90deg)" }}
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </span>
          Press right to match with this person.
        </p>
      </div>
    </div>
  );
}
