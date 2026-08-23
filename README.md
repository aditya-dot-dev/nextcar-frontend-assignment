# NextCar — Frontend Assignment

An animated, interactive car showcase built with **Next.js 16**, **React 19**, **Tailwind CSS 4**, and **next-themes**. The application features a multi-stage timeline animation, dark/light theme toggling, and a fully component-based architecture.

---

## Demo

Run the project locally and open [http://localhost:3000](http://localhost:3000).

---

## Tech Stack

| Layer       | Technology                          |
| ----------- | ----------------------------------- |
| Framework   | Next.js 16.3.2 (App Router)        |
| UI Library  | React 19.2.8                        |
| Styling     | Tailwind CSS 4                      |
| Theming     | next-themes 0.4.6                   |
| Language    | TypeScript 5                        |
| Fonts       | Google Fonts (Shrikhand, Geist)     |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd frontend-assignment

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with ThemeProvider
│   ├── page.tsx            # Home page entry point
│   └── globals.css         # Global styles
│
├── components/
│   ├── ThemeProvider.tsx    # Client-side theme wrapper (dark/light)
│   └── home/
│       ├── HomeScreen.tsx   # Main orchestrator component
│       ├── hooks/
│       │   └── useTimelineFlow.ts  # State machine for animation flow
│       └── sections/
│           ├── BackgroundAtmosphere.tsx   # Animated background gradients
│           ├── Header.tsx                 # Logo, theme toggle, action buttons
│           ├── TitleSection.tsx           # Hero title ("Engineered for Passion")
│           ├── CenterCarDisplay.tsx       # Car image, ripple rings, timeline morph, truck
│           ├── SideNavigation.tsx         # Left & right navigation icon panels
│           ├── AnimatedTooltip.tsx        # Contextual tooltip overlays
│           ├── BottomRacingTimeline.tsx   # Racing-themed checkpoint timeline
│           └── ThankYouScreen.tsx         # Final "Thank You" screen
│
public/
└── assets/
    ├── icons/    # SVG icons (brand logo, nav icons, progress markers)
    └── images/   # Car images, truck image
```

---

## Features

### 1. Multi-Stage Animation Flow
A 15-state animation state machine (`useTimelineFlow`) drives the entire UI:
- **State 0** → Initial idle
- **States 1–2** → Car entrance with stats overlay
- **States 3–5** → Car-to-timeline morph animation
- **States 6–10** → Moving car marker along the horizontal timeline with process cards
- **States 11–13** → Truck delivery entrance and exit
- **State 14** → "Thank You" screen
- **State 15** → Fast reset to idle

### 2. Dark / Light Theme
Toggle between dark and light modes using the top-right theme switcher. The entire UI (backgrounds, text, icons, shadows, borders) transitions smoothly via Tailwind's `dark:` variant and `next-themes`.

### 3. Interactive Navigation
- **Home button** — Returns to the car showcase (State 2)
- **Timeline button** — Triggers the full timeline animation sequence
- **Check button** — Starts the animation from the header
- **Main click** — Resets from State 2 back to idle

### 4. Component Architecture
The UI is broken into focused, single-responsibility section components. Each section receives only the props it needs from the parent `HomeScreen` orchestrator.

---

## Animation Details

All animations use **CSS transitions** (no animation libraries). The timeline flow is percentage-based, meaning the car marker positions (`left: '33.33%'`, etc.) and morph dimensions scale naturally with the container width.

Key animation techniques used:
- `transition-all` with custom `duration` and `cubic-bezier` easing
- `clipPath: inset(...)` for directional reveal/hide of elements
- `transform: scale()` for ripple ring animations
- `opacity` transitions with `transitionDelay` for staggered card appearances
- CSS `border-dotted` morphing for the timeline line effect

---

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start development server (Turbopack) |
| `npm run build` | Create optimized production build    |
| `npm start`     | Serve the production build           |
| `npm run lint`  | Run ESLint checks                    |

---

## Browser Support

Tested and working on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
