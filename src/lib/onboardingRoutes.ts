/** Ordered onboarding steps and explicit back targets for reliable navigation. */
export const ONBOARDING_BACK: Record<string, string> = {
  "/onboarding/name": "/",
  "/onboarding/gender": "/onboarding/name",
  "/onboarding/interested-in": "/onboarding/gender",
  "/onboarding/life": "/onboarding/interested-in",
  "/onboarding/interests": "/onboarding/life",
  "/onboarding/values": "/onboarding/interests",
  "/onboarding/notifications": "/onboarding/values",
};

export function getOnboardingBackPath(pathname: string): string | null {
  return ONBOARDING_BACK[pathname] ?? null;
}
