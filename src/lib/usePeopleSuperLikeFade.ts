"use client";

import { useLayoutEffect, useState, type RefObject } from "react";

/**
 * Fades the pinned super-like button from 1 → 0 as the user scrolls from the
 * location section through the bottom decision bar.
 */
export function usePeopleSuperLikeFade(
  scrollRef: RefObject<HTMLDivElement | null>,
  fadeStartRef: RefObject<HTMLDivElement | null>,
  fadeEndRef: RefObject<HTMLDivElement | null>,
): number {
  const [opacity, setOpacity] = useState(1);

  useLayoutEffect(() => {
    let cancelled = false;
    let scrollEl: HTMLDivElement | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const computeOpacity = (): number => {
      const startEl = fadeStartRef.current;
      const endEl = fadeEndRef.current;
      if (!scrollEl || !startEl || !endEl) return 1;

      const viewport = scrollEl.getBoundingClientRect();
      const startTop = startEl.getBoundingClientRect().top;
      const endTop = endEl.getBoundingClientRect().top;

      // Begin as location enters the card; finish once the bottom actions are on screen
      const fadeStartLine = viewport.bottom - viewport.height * 0.08;
      const fadeEndLine = viewport.top + viewport.height * 0.28;

      if (startTop >= fadeStartLine) return 1;
      if (endTop <= fadeEndLine || startTop <= fadeEndLine) return 0;

      const span = fadeStartLine - fadeEndLine;
      const progress = (fadeStartLine - startTop) / span;
      return 1 - Math.min(1, Math.max(0, progress));
    };

    const update = () => {
      if (cancelled) return;
      setOpacity(computeOpacity());
    };

    const attach = () => {
      scrollEl = scrollRef.current;
      const startEl = fadeStartRef.current;
      const endEl = fadeEndRef.current;
      if (!scrollEl || !startEl || !endEl) {
        requestAnimationFrame(attach);
        return;
      }

      update();
      scrollEl.addEventListener("scroll", update, { passive: true });

      resizeObserver = new ResizeObserver(update);
      resizeObserver.observe(scrollEl);
      resizeObserver.observe(startEl);
      resizeObserver.observe(endEl);
    };

    attach();

    return () => {
      cancelled = true;
      scrollEl?.removeEventListener("scroll", update);
      resizeObserver?.disconnect();
    };
  }, [scrollRef, fadeStartRef, fadeEndRef]);

  return opacity;
}
