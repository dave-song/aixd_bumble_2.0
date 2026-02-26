# Bumble Beeline - AI-Powered Matchmaking Prototype

A mobile web prototype for a redesigned Bumble dating app featuring "Beeline" - an AI-powered matchmaking assistant. Built from Figma designs as part of the A-IXD (Advanced Interaction Design) Project 2.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (CSS-based config)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the prototype.

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Splash screen (/)
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Tailwind + design tokens
│   ├── onboarding/
│   │   ├── gender/page.tsx       # Gender selection
│   │   ├── interests/page.tsx    # Interest selection (5 max)
│   │   ├── life/page.tsx         # Life experiences
│   │   ├── values/page.tsx       # Values/qualities
│   │   └── notifications/page.tsx
│   └── discover/page.tsx         # Main profile view with Beeline
├── components/
│   ├── layout/
│   │   ├── PhoneFrame.tsx        # 430x932 iPhone wrapper
│   │   ├── StatusBar.tsx         # iOS status bar
│   │   └── BottomNav.tsx         # 5-tab navigation
│   ├── ui/
│   │   ├── Button.tsx            # Bumble button variants
│   │   ├── TitleSub.tsx          # Title + subtitle component
│   │   ├── Chip.tsx              # Selectable tag chips
│   │   ├── ProgressBar.tsx       # Onboarding progress
│   │   └── BumbleLogo.tsx        # Bumble bee logo
│   ├── cards/
│   │   ├── ProfileCard.tsx       # Profile card with sections
│   │   └── SwipeButtons.tsx      # Like/Pass buttons
│   └── beeline/
│       └── BeelineOverlay.tsx    # AI overlay (4 states)
├── lib/
│   └── constants.ts              # Colors, mock data, config
└── public/
    └── icons/                    # SVG icons
```

## Implemented Screens

### Onboarding Flow
1. **Splash Screen** - Bumble logo with fade-in animation
2. **Gender Selection** - "Alex is a great name"
3. **Interests** - Choose 5 interests with emoji chips
4. **Life Experiences** - Select up to 3 shared experiences
5. **Values** - Choose 3 qualities you value
6. **Notifications** - Permission prompt with bell icon

### Main App
7. **Discover/People** - Profile card with Beeline overlay
   - Collapsed state (banner)
   - Expanded with question
   - Voice recording mode
   - Done state with confirmation

## Design Tokens

```css
--bumble-black: #202020
--bumble-accent: #ffd93a
--bumble-yellow: #ffdb5b
--bumble-gray: #575656
--frame-width: 430px
--frame-height: 932px
```

## Figma Source

- File: `A-IXD:P2` (x2YbhT1OpsU23Fh7Qgqz0i)
- 11 frames implemented from node IDs:
  - 232:7260 (Splash)
  - 242:23129, 242:23135, 242:23146, 242:23152 (Onboarding headers)
  - 232:7374 (Notifications)
  - 1090:11880, 1091:12227, 1097:12808, 1100:9847, 1097:13562 (Profile + Beeline states)

## Features

- **Animated Transitions** - Framer Motion for smooth page and component animations
- **Beeline AI Overlay** - 4-state interactive overlay with voice recording UI
- **Mobile-First Design** - 430x932px iPhone frame for desktop viewing
- **iOS-Style UI** - Status bar, bottom navigation, rounded corners
- **Interactive Chips** - Animated selection with haptic-like feedback

## License

This is a prototype for educational purposes as part of A-IXD Project 2.
