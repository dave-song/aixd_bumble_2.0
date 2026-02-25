export interface Profile {
  id: string;
  name: string;
  age: number;
  verified: boolean;
  occupation: string;
  company?: string;
  school: string;
  photos: string[];
  bio?: string;
  openingMove?: string;
}

export interface Interest {
  id: string;
  emoji: string;
  label: string;
  selected?: boolean;
}

export interface LifeExperience {
  id: string;
  emoji: string;
  label: string;
  category: 'travel' | 'education' | 'working';
  selected?: boolean;
}

export interface Quality {
  id: string;
  label: string;
  selected?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  delivered?: boolean;
}

export interface Match {
  id: string;
  profile: Profile;
  messages: ChatMessage[];
  hasNewMatch?: boolean;
  yourMove?: boolean;
  lastActivity?: Date;
}

// Profile data from Figma designs
export const profiles: Profile[] = [
  {
    id: 'hari',
    name: 'Hari',
    age: 27,
    verified: true,
    occupation: 'Project Manager at Tech',
    school: 'Carnegie Mellon',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1200&fit=crop',
    ],
    openingMove: "What's your ideal first date?",
  },
  {
    id: 'elena',
    name: 'Elena',
    age: 28,
    verified: true,
    occupation: 'Pediatric Resident',
    school: 'Johns Hopkins University',
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1200&fit=crop',
    ],
  },
];

// User's own profile
export const userProfile: Profile = {
  id: 'kyle',
  name: 'Kyle',
  age: 27,
  verified: true,
  occupation: 'The Domestic Daredevil',
  school: '',
  photos: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop',
  ],
  bio: 'The Domestic Daredevil',
};

// Interests from Figma
export const interests: Interest[] = [
  { id: 'rnb', emoji: '🎵', label: 'R&B' },
  { id: 'writing', emoji: '📝', label: 'Writing' },
  { id: 'horror', emoji: '📺', label: 'Horror' },
  { id: 'feminism', emoji: '🤝', label: 'Feminism' },
  { id: 'concerts', emoji: '🎫', label: 'Concerts' },
  { id: 'art', emoji: '🎨', label: 'Art' },
  { id: 'crafts', emoji: '🖌️', label: 'Crafts' },
  { id: 'dogs', emoji: '🐕', label: 'Dogs' },
  { id: 'camping', emoji: '⛺', label: 'Camping' },
  { id: 'cats', emoji: '🐱', label: 'Cats' },
  { id: 'dancing', emoji: '💃', label: 'Dancing' },
  { id: 'foodie', emoji: '🍜', label: 'Foodie' },
  { id: 'festivals', emoji: '🎉', label: 'Festivals' },
  { id: 'vegetarian', emoji: '🥗', label: 'Vegetarian' },
  { id: 'lgbtq', emoji: '🏳️‍🌈', label: 'LGBTQ+ rights' },
  { id: 'museums', emoji: '🏛️', label: 'Museums & galleries' },
  { id: 'country', emoji: '🎵', label: 'Country' },
  { id: 'gardening', emoji: '🌱', label: 'Gardening' },
];

// Life experiences from Figma
export const lifeExperiences: LifeExperience[] = [
  { id: 'new-in-town', emoji: '👋', label: 'New in town', category: 'travel' },
  { id: 'living-abroad', emoji: '✈️', label: 'Living abroad', category: 'travel' },
  { id: 'new-country', emoji: '🎉', label: 'New country', category: 'travel' },
  { id: 'traveling', emoji: '🌍', label: 'Traveling', category: 'travel' },
  { id: 'in-college', emoji: '🎓', label: 'In college', category: 'education' },
  { id: 'university', emoji: '🎓', label: 'University', category: 'education' },
  { id: 'just-graduated', emoji: '🎓', label: 'Just graduated', category: 'education' },
  { id: 'back-to-school', emoji: '📚', label: 'Going back to school', category: 'education' },
  { id: 'working-studying', emoji: '🏢', label: 'Working & studying', category: 'education' },
  { id: 'gap-year', emoji: '🌍', label: 'Gap year', category: 'education' },
  { id: 'career-focused', emoji: '💼', label: 'Career focused', category: 'working' },
  { id: 'new-job', emoji: '🎉', label: 'New job', category: 'working' },
  { id: 'first-job', emoji: '💼', label: 'First job', category: 'working' },
];

// Qualities/values from Figma
export const qualities: Quality[] = [
  { id: 'ambition', label: 'Ambition' },
  { id: 'confidence', label: 'Confidence' },
  { id: 'curiosity', label: 'Curiosity' },
  { id: 'emotional-intelligence', label: 'Emotional intelligence' },
  { id: 'empathy', label: 'Empathy' },
  { id: 'generosity', label: 'Generosity' },
  { id: 'gratitude', label: 'Gratitude' },
  { id: 'humility', label: 'Humility' },
  { id: 'humor', label: 'Humor' },
  { id: 'kindness', label: 'Kindness' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'loyalty', label: 'Loyalty' },
  { id: 'openness', label: 'Openness' },
  { id: 'optimism', label: 'Optimism' },
  { id: 'playfulness', label: 'Playfulness' },
  { id: 'sarcasm', label: 'Sarcasm' },
  { id: 'sassiness', label: 'Sassiness' },
];

// Beeline questions
export const beelineQuestions = [
  "Does seeing another CMU alum with a 'tech-grind' career feel like a match for your vibe?",
  "Do you value someone who's career-focused like you?",
  "Would you prefer someone who loves the outdoors?",
];

// Mock matches for chat screen
export const matches: Match[] = [
  {
    id: 'hari-match',
    profile: profiles[0],
    messages: [
      {
        id: 'm1',
        senderId: 'kyle',
        text: 'Hey!',
        timestamp: new Date(),
        delivered: true,
      },
    ],
    yourMove: false,
    lastActivity: new Date(),
  },
  {
    id: 'loopy-match',
    profile: {
      id: 'loopy',
      name: 'Loopy',
      age: 25,
      verified: false,
      occupation: '',
      school: '',
      photos: ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'],
      bio: "I'm just here to find someone...",
    },
    messages: [],
    yourMove: true,
    lastActivity: new Date(Date.now() - 3600000),
  },
  {
    id: 'tom-match',
    profile: {
      id: 'tom',
      name: 'Tom Lizard',
      age: 28,
      verified: false,
      occupation: '',
      school: '',
      photos: ['https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'],
      bio: 'Let me just press the button...',
    },
    messages: [],
    yourMove: true,
    lastActivity: new Date(Date.now() - 7200000),
  },
];
