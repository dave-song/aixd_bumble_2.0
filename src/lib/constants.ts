// Bumble color palette
export const colors = {
  bumble: {
    yellow: '#FFC629',
    yellowLight: '#FFE082',
  },
  beeline: {
    yellow: '#FFF4D4',
    yellowDark: '#FFE082',
  },
  coral: {
    start: '#FF6B6B',
    end: '#FF8E53',
  },
  text: {
    primary: '#1A1A1A',
    secondary: '#6B6B6B',
    light: '#9CA3AF',
  },
  background: {
    white: '#FFFFFF',
    gray: '#F5F5F5',
  },
} as const;

// Phone dimensions (iPhone 14 Pro)
export const phoneSize = {
  width: 390,
  height: 844,
} as const;

// Navigation tabs
export const navTabs = [
  { id: 'profile', label: 'Profile', path: '/profile' },
  { id: 'discover', label: 'Discover', path: '/discover' },
  { id: 'people', label: 'People', path: '/discover' },
  { id: 'liked-you', label: 'Liked You', path: '/liked' },
  { id: 'chats', label: 'Chats', path: '/chats' },
] as const;

// Onboarding steps
export const onboardingSteps = [
  { path: '/onboarding/gender', label: 'Gender' },
  { path: '/onboarding/interests', label: 'Interests' },
  { path: '/onboarding/life', label: 'Life' },
  { path: '/onboarding/values', label: 'Values' },
  { path: '/onboarding/notifications', label: 'Notifications' },
] as const;

// Swipe thresholds
export const swipeConfig = {
  threshold: 100,
  velocity: 0.5,
} as const;

// Animation durations
export const animations = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
} as const;
