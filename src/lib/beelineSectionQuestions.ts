/**
 * Section IDs that can open a Beeline follow-up card.
 * Used for profile sections and picture blocks.
 */
export type BeelineSectionId =
  | "my-bio"
  | "about-me"
  | "picture1"
  | "im-looking-for"
  | "my-interests"
  | "picture2"
  | "when-i-unplug"
  | "picture3"
  | "my-causes"
  | "picture4"
  | "my-location"
  | "my-favorite-quality";

export const BEELINE_SECTION_QUESTIONS: Record<BeelineSectionId, string> = {
  "my-bio":
    "Hari's basically a professional walker with cute running shoes. Want a partner for the stroll or someone to push the pace?",
  "about-me":
    "5'10\" and an Aries—she's basically the main character. Do you have enough fire to keep up, or are you the 'calm' she needs to balance the heat?",
  picture1:
    "The beanie says 'low-key,' but her CMU grind says 'high-achiever'. Can you handle a partner who's both ambitious and aesthetic?",
  "im-looking-for":
    "She's after 'fun, casual dates' with high EQ. Are you the 'chill walker' who can actually hold a deep conversation?",
  "my-interests":
    "Journaling and Movies—she definitely has a 'Top 5' list for everything. Want to debate cinema or just sit in silence during her unplugged hours?",
  picture2:
    "She actually unplugs—literally. Want a partner who prioritizes mental health over blue bubbles?",
  "when-i-unplug":
    "She listed 'cook?' with a question mark—the bar is on the floor. Want to teach her a 5th recipe or just keep ordering in?",
  picture3:
    "Giving 'Chaos Guardian' energy by a vintage car. Are you ready for her brand of creative high-energy, or do you prefer a more predictable life?",
  "my-causes":
    "A 'Digital Minimalist' in the Morning Person Club. Are you down for 5 AM sunrise hikes or strictly a noon-bruncher?",
  picture4:
    "She's a 'cat mom' who apparently has a very stylish dog friend. Does your vision for a match include high-fashion pet parents?",
  "my-location":
    "She's in Boston—the land of iced coffee and questionable traffic. Are you within walking distance so she doesn't ruin her 'mid-runner' streak?",
  "my-favorite-quality":
    "She wants someone who is 'really into' things. Should I prioritize niche nerds or generalist fun-havers?",
};
