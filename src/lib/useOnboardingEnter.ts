import { useEffect } from "react";

/** Press Enter to advance onboarding (same as tapping the next button when enabled). */
export function useOnboardingEnter(onEnter: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      onEnter();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onEnter, enabled]);
}
