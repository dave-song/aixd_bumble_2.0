import { redirect } from "next/navigation";

/** Redirect /onboarding to the splash screen at root. */
export default function OnboardingIndex() {
  redirect("/");
}
