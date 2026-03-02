/**
 * Profile data for the discover stack (hero + section content).
 * Hero: either a composite asset (e.g. SVG) or image + overlay text.
 */
export type ProfileHero =
  | { type: "composite"; src: string }
  | {
      type: "imageWithOverlay";
      imageSrc: string;
      name: string;
      age: number;
      job: string;
      school: string;
      verified?: boolean;
    };

export type ProfileSectionTag = { label: string; emoji?: string };

export interface ProfileSections {
  bio: { title: string; body: string };
  aboutMe: { title: string; tags: ProfileSectionTag[] };
  imLookingFor: { title: string; tags: ProfileSectionTag[] };
  myInterests: { title: string; tags: ProfileSectionTag[] };
  whenIUnplug: { title: string; body: string };
  myCauses: { title: string; tags: ProfileSectionTag[] };
  myFavoriteQuality: { title: string; body: string };
  location: string;
  /** Photo placeholders (p1.png, p2.png, etc.) - can vary per profile */
  photoSlots: string[];
}

export interface DiscoverProfile {
  id: string;
  displayName: string;
  hero: ProfileHero;
  sections: ProfileSections;
}

const HARI_SECTIONS: ProfileSections = {
  bio: {
    title: "My bio",
    body: "cat mom, mid runner, and can cook 4 different things",
  },
  aboutMe: {
    title: "About me",
    tags: [
      { label: "5'10\"", emoji: "📏" },
      { label: "Active", emoji: "🤸" },
      { label: "undergraduate degree", emoji: "🎓" },
      { label: "Woman", emoji: "🚺" },
      { label: "Open to kids", emoji: "🍼" },
      { label: "Aries", emoji: "♈" },
      { label: "Liberal", emoji: "🏛️" },
    ],
  },
  imLookingFor: {
    title: "I'm looking for",
    tags: [
      { label: "Early morning", emoji: "🌄" },
      { label: "Ambition", emoji: "🎯" },
      { label: "Humor", emoji: "😁" },
      { label: "Emotional intelligence", emoji: "❤️" },
    ],
  },
  myInterests: {
    title: "My interests",
    tags: [
      { label: "Art", emoji: "🎨" },
      { label: "Foodie", emoji: "🍜" },
      { label: "Journaling", emoji: "✍️" },
      { label: "Movies", emoji: "🍿" },
      { label: "Cats", emoji: "🐱" },
    ],
  },
  whenIUnplug: {
    title: "When I unplug I like to",
    body: "Read, draw, journal, play guitar or cello, cook?, meditate",
  },
  myCauses: {
    title: "My causes and communities",
    tags: [
      { label: "Mental health in tech" },
      { label: "UX" },
      { label: "Digital minimalist" },
      { label: "Morning person club" },
      { label: "Community gardens" },
      { label: "Slow food" },
    ],
  },
  myFavoriteQuality: {
    title: "My favorite quality in a person is",
    body:
      "Passion- I love when people have hobbies they're really into or social causes they participate in",
  },
  location: "Boston",
  photoSlots: ["p1.png", "p2.png", "p3.png", "p4.png"],
};

/** Elena: variation of Hari's sections (Figma: Elena, 28, Pediatric Resident, Johns Hopkins) */
const ELENA_SECTIONS: ProfileSections = {
  ...HARI_SECTIONS,
  bio: {
    title: "My bio",
    body: "Pediatric resident by day, café hopper by weekend. Always hunting for the best iced oat latte.",
  },
  aboutMe: {
    title: "About me",
    tags: [
      { label: "5'7\"", emoji: "📏" },
      { label: "Active", emoji: "🤸" },
      { label: "Advanced degree", emoji: "🎓" },
      { label: "Woman", emoji: "🚺" },
      { label: "Open to kids", emoji: "🍼" },
      { label: "Libra", emoji: "♎" },
      { label: "Moderate", emoji: "🏛️" },
    ],
  },
  imLookingFor: {
    title: "I'm looking for",
    tags: [
      { label: "Weekend brunch", emoji: "🌄" },
      { label: "Empathy", emoji: "🎯" },
      { label: "Humor", emoji: "😁" },
      { label: "Emotional intelligence", emoji: "❤️" },
    ],
  },
  myInterests: {
    title: "My interests",
    tags: [
      { label: "Art", emoji: "🎨" },
      { label: "Foodie", emoji: "🍜" },
      { label: "Reading", emoji: "✍️" },
      { label: "Movies", emoji: "🍿" },
      { label: "Dogs", emoji: "🐕" },
    ],
  },
  whenIUnplug: {
    title: "When I unplug I like to",
    body: "Hike, try new recipes, and actually finish a book for once.",
  },
  myCauses: {
    title: "My causes and communities",
    tags: [
      { label: "Healthcare access" },
      { label: "Women in medicine" },
      { label: "Digital minimalist" },
      { label: "Morning person club" },
      { label: "Community gardens" },
      { label: "Slow food" },
    ],
  },
  myFavoriteQuality: {
    title: "My favorite quality in a person is",
    body: "Kindness and curiosity—someone who asks good questions and actually listens.",
  },
  location: "Baltimore",
  photoSlots: ["p1.png", "p2.png", "p3.png", "p4.png"],
};

export const DISCOVER_PROFILES: DiscoverProfile[] = [
  {
    id: "hari",
    displayName: "Hari",
    hero: { type: "composite", src: "/icons/haris profile card.svg" },
    sections: HARI_SECTIONS,
  },
  {
    id: "elena",
    displayName: "Elena",
    hero: {
      type: "imageWithOverlay",
      imageSrc: "/icons/user_profile_assets/Elena_profile_img.png",
      name: "Elena",
      age: 28,
      job: "Pediatric Resident",
      school: "Johns Hopkins University",
      verified: true,
    },
    sections: ELENA_SECTIONS,
  },
];
