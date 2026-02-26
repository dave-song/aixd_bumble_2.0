"use client";

import { ReactNode } from "react";

interface ActionSheetProps {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
}

/**
 * Bottom sheet / modal with 18px corner radius to match app design.
 * Use for Report, share options, etc.
 */
export function ActionSheet({
  open,
  onClose,
  children,
  className = "",
}: ActionSheetProps) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40"
        aria-hidden
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed left-1/2 top-1/2 z-50 w-[calc(100%-32px)] max-w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-[18px] bg-white p-4 shadow-lg ${className}`}
      >
        {children}
      </div>
    </>
  );
}
