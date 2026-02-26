// Design tokens
export const colors = {
  bumbleBlack: "#202020",
  bumbleAccent: "#ffd93a",
  bumbleYellow: "#ffdb5b",
  bumbleYellowLight: "#fff4d4",
  bumbleGray: "#575656",
  bumbleGrayLight: "#f5f5f5",
  bumbleWhite: "#ffffff",
} as const;

// Frame dimensions (iPhone 14 Pro Max)
export const dimensions = {
  frameWidth: 430,
  frameHeight: 932,
  statusBarHeight: 60,
  bottomNavHeight: 83,
} as const;

// Mock profile data
export const mockProfiles = [
  {
    id: "hari",
    name: "Hari",
    age: 27,
    job: "Project Manager at Tech",
    school: "Carnegie Mellon",
    location: "Boston",
    verified: true,
    bio: "📍 Boston",
    images: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
    ],
  },
];

// Beeline questions
export const beelineQuestions = [
  {
    id: 1,
    question: "Does seeing another CMU alum with a 'tech-grind' career feel like a match for your vibe?",
  },
  {
    id: 2,
    question: "She seems like the type who'd appreciate a good coffee debate. Worth a swipe?",
  },
];

// Interests data
export const interests = [
  { id: "cooking", label: "Cooking", emoji: "🍳" },
  { id: "hiking", label: "Hiking", emoji: "🥾" },
  { id: "reading", label: "Reading", emoji: "📚" },
  { id: "travel", label: "Travel", emoji: "✈️" },
  { id: "music", label: "Music", emoji: "🎵" },
  { id: "fitness", label: "Fitness", emoji: "💪" },
  { id: "movies", label: "Movies", emoji: "🎬" },
  { id: "gaming", label: "Gaming", emoji: "🎮" },
  { id: "art", label: "Art", emoji: "🎨" },
  { id: "photography", label: "Photography", emoji: "📷" },
  { id: "yoga", label: "Yoga", emoji: "🧘" },
  { id: "dancing", label: "Dancing", emoji: "💃" },
];

// Life experiences
export const lifeExperiences = {
  travel: [
    { id: "solo-travel", label: "Solo traveled" },
    { id: "lived-abroad", label: "Lived abroad" },
    { id: "road-trip", label: "Epic road trip" },
  ],
  education: [
    { id: "grad-school", label: "Grad school" },
    { id: "study-abroad", label: "Studied abroad" },
    { id: "career-change", label: "Career change" },
  ],
  personal: [
    { id: "pet-parent", label: "Pet parent" },
    { id: "homeowner", label: "Homeowner" },
    { id: "entrepreneur", label: "Started a business" },
  ],
};

// Values/Qualities
export const qualities = [
  { id: "honesty", label: "Honesty" },
  { id: "humor", label: "Sense of humor" },
  { id: "ambition", label: "Ambition" },
  { id: "kindness", label: "Kindness" },
  { id: "intelligence", label: "Intelligence" },
  { id: "creativity", label: "Creativity" },
  { id: "loyalty", label: "Loyalty" },
  { id: "empathy", label: "Empathy" },
  { id: "confidence", label: "Confidence" },
  { id: "spontaneity", label: "Spontaneity" },
  { id: "patience", label: "Patience" },
  { id: "independence", label: "Independence" },
];
