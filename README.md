<div align="center">

![Hero Background](./public/hero-bg.png)

# <span style="font-size: 72px; font-weight: 900;"><span style="color: #ffffff;">FOX</span><span style="background: linear-gradient(to right, #c084fc, #ec4899, #fb923c); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">EMS</span></span>

### **Leveling Up Every Day**

[![Website](https://img.shields.io/badge/Live%20Site-foxems.dev-5865F2?style=for-the-badge)](https://foxems.dev)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

##  What is Foxems?

Welcome to my personal universe - a **living, breathing dashboard** that tracks my journey through anime, gaming, and development. This isn't just a portfolio; it's a real-time reflection of my digital life.

> *"I track my anime journey, gaming achievements, and development projects. Explore my stats and see what I'm up to."*

---

##  Features

###  Hero Section
- **Dynamic Now Watching Card** - Floats in with smooth animations showing currently watching anime
- **Live Stats Dashboard** - Gaming hours, anime count, and days watched at a glance
- **Epic Gradient Design** - Purple-to-pink-to-orange gradients with glassmorphism effects

###  Anime Stats
- **MAL Integration** - Real-time stats from MyAnimeList (180+ anime tracked)
- **Genre Distribution** - Visual breakdown of preferred genres (Action, Fantasy, Shounen...)
- **Top 10 & Tier Lists** - S-F tier rankings with beautiful card layouts
- **Achievement System** - Gamified badges for milestones

###  Gaming Library
- **Steam Integration** - Live library stats and playtime tracking (1,200+ hours)
- **Game Cards** - Beautiful cover art displays with hover effects
- **Library Statistics** - Total games, recent playtime, most played
- **Quick Deal Finder** - Built-in price comparison

###  Design Highlights
- **Dark Theme** - Deep `#0F1014` background with subtle gradients
- **Framer Motion** - Smooth 60fps animations throughout
- **Responsive** - Perfect on desktop, tablet, and mobile
- **Glassmorphism** - Backdrop blur effects and subtle borders
- **Interactive Elements** - Hover states, micro-interactions, scroll reveals

---

##  Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite 5 |
| **Styling** | Tailwind CSS 3.4 |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Data Fetching** | TanStack Query |
| **API Integration** | MyAnimeList API + Steam Web API |

---

##  Architecture

```
src/
├── components/
│   ├── Hero.tsx              # Epic landing section
│   ├── AnimeStats.tsx        # MAL statistics dashboard
│   ├── TierDisplay.tsx       # S-F tier list visualization
│   ├── GamingLibrary.tsx     # Steam library showcase
│   ├── Navbar.tsx            # Animated navigation
│   ├── Footer.tsx            # Social links & quick nav
│   ├── NowWatching.tsx       # Live anime status card
│   ├── SidebarNavigation.tsx # Floating side nav dots
│   ├── BackToTop.tsx         # Smooth scroll button
│   └── SectionReveal.tsx     # Scroll animation wrapper
├── hooks/
│   └── useApiData.ts         # Data fetching hooks
├── types/
│   └── api.ts                # TypeScript definitions
└── styles/
    └── index.css             # Global styles + CSS vars
```

---

##  API Integrations

### MyAnimeList
- User statistics
- Currently watching
- Anime list & ratings
- Genre preferences

### Steam
- Library statistics
- Total playtime
- Recently played
- Owned games count

---

##  Design Philosophy

### Colors
```css
--bg-primary: #0F1014;
--bg-secondary: #15171C;
--accent-primary: #5865F2;
--text-primary: #ffffff;
--text-secondary: #8B8D93;
```

### Typography
- **Headings**: Inter (Bold, Black)
- **Body**: System font stack
- **Accents**: Gradient text effects

### Animations
- Page transitions: 0.3s ease
- Hover effects: scale(1.02)
- Floating cards: 6s infinite loop
- Stagger reveals: 0.1s delay per item

---

##  Key Stats

| Metric | Count |
|--------|-------|
| **Anime Tracked** | 180+ series |
| **Anime Watched** | 37+ days |
| **Gaming Hours** | 1,247+ hours |
| **Steam Games** | 150+ titles |
| **Lines of Code** | 3,500+ |

---

##  Connect

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-@Foxems-181717?style=flat-square&logo=github)](https://github.com/Foxems)
[![Steam](https://img.shields.io/badge/Steam-Foxemss-1b2838?style=flat-square&logo=steam)](https://steamcommunity.com/id/Foxemss/)
[![MAL](https://img.shields.io/badge/MAL-Foxems-2E51A2?style=flat-square&logo=myanimelist)](https://myanimelist.net/profile/Foxems)

</div>

---

<div align="center">

**Made with**  **by Foxems**

*Powered by [FoxCLI](https://github.com/Foxems/foxcli)*

</div>
