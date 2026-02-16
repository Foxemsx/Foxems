<div align="center">

![Hero Background](./public/hero-bg.webp)

# **FOXEMS**

### **Leveling Up Every Day 🚀**

[![Website](https://img.shields.io/badge/Live%20Site-foxems.dev-5865F2?style=for-the-badge)](https://foxems.dev)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

> *My personal dashboard tracking anime, gaming, and development journey.*

</div>

---

## ⚠️ | Personal Project Notice

| ⚡ Quick Info |
|:---|
| **This is a personal website** — highly customized for my specific use case. It will **NOT** work out of the box without significant modifications. |

### 🔧 What You Need to Change:

| Item | Description | Location |
|:---|:---|:---|
| 🔑 **MyAnimeList Username** | Hardcoded in data export | `public/data.json` |
| 🎮 **Steam Profile** | Requires your own Steam ID | `Navbar.tsx` |
| 📁 **Data Source Paths** | File paths specific to my setup | `hooks/useApiData.ts` |
| 🦊 **Personal Branding** | All Foxems branding | Entire codebase |

> [!TIP]
> This repository is primarily for **my own reference and backup**. Feel free to use it as inspiration, but expect to do significant customization work.

---

## 🦊 | What is Foxems?

**Foxems is me** — my personal brand and digital identity. This is my living, breathing dashboard that tracks my journey through anime, gaming, and development.

| Feature | Description |
|:---|:---|
| 🏰 **Hero Section** | Dynamic now-watching card with smooth animations |
| ⛩️ **Anime Stats** | MAL integration with genre distribution & tier lists |
| 🕹️ **Gaming Library** | Steam integration with playtime tracking |
| 🎨 **Modern Design** | Dark theme with glassmorphism & 60fps animations |

---

## 🎭 | Features

### 🏰 Hero Section

| Status | Feature | Description |
|:---:|:---|:---|
| ✅ | Dynamic Now Watching | Floats in with smooth animations |
| ✅ | Live Stats Dashboard | Gaming hours, anime count at a glance |
| ✅ | Epic Gradient Design | Purple-to-pink-to-orange glassmorphism |

### ⛩️ Anime Stats

| Status | Feature | Description |
|:---:|:---|:---|
| ✅ | MAL Integration | Real-time stats from MyAnimeList |
| ✅ | Genre Distribution | Visual breakdown of preferences |
| ✅ | Top 10 & Tier Lists | S-F tier rankings |
| ✅ | Achievement System | Gamified badges for milestones |

### 🕹️ Gaming Library

| Status | Feature | Description |
|:---:|:---|:---|
| ✅ | Steam Integration | Live library stats and playtime |
| ✅ | Game Cards | Beautiful cover art with hover effects |
| ✅ | Library Statistics | Total games, recent playtime |

### 🎨 Design Highlights

| Status | Feature | Description |
|:---:|:---|:---|
| ✅ | Dark Theme | Deep `#0F1014` background |
| ✅ | Framer Motion | Smooth 60fps animations |
| ✅ | Responsive | Perfect on desktop, tablet, mobile |
| ✅ | Glassmorphism | Backdrop blur effects |
| ✅ | Interactive | Hover states, micro-interactions |

---

## 📸 | Preview

<div align="center">
  
| Hero Section | Anime Stats |
|:---:|:---:|
| ![Hero](public/hero-bg.webp) | Coming Soon |

</div>

---

## 🏗️ | Architecture

```
src/
├── 📦 components/
│   ├── 🦊 Hero.tsx              # Epic landing section
│   ├── 📊 AnimeStats.tsx        # MAL statistics dashboard
│   ├── 📈 TierDisplay.tsx       # S-F tier list visualization
│   ├── 🎮 GamingLibrary.tsx     # Steam library showcase
│   ├── 🚀 Navbar.tsx            # Animated navigation
│   ├── 📱 SidebarNavigation.tsx # Floating side nav dots
│   └── ✨ SectionReveal.tsx     # Scroll animation wrapper
├── ⚙️ hooks/
│   └── 📡 useApiData.ts         # Data fetching hooks
├── 🔧 types/
│   └── 📝 api.ts                # TypeScript definitions
└── 💅 styles/
    └── 🎨 index.css             # Global styles + CSS vars
```

---

## ⚡ | Tech Stack

| Category | Technology | Version |
|:---|:---|:---|
| 🔲 **Framework** | React | 18 |
| 🔷 **Language** | TypeScript | 5.0 |
| ⚡ **Build Tool** | Vite | 5 |
| 🎨 **Styling** | Tailwind CSS | 3.4 |
| 🎬 **Animations** | Framer Motion | 10 |
| 📦 **Icons** | Lucide React | 0.312 |
| 📡 **Data Fetching** | TanStack Query | 5 |

---

## 🔌 | API Integrations

### ⛩️ MyAnimeList (MAL)

```
┌─────────────────────────────────────────────────────────┐
│  ✓ User statistics                                     │
│  ✓ Currently watching                                  │
│  ✓ Anime list & ratings                                │
│  ✓ Genre preferences                                    │
└─────────────────────────────────────────────────────────┘
```

### 🎮 Steam

```
┌─────────────────────────────────────────────────────────┐
│  ✓ Library statistics                                   │
│  ✓ Total playtime                                      │
│  ✓ Recently played                                     │
│  ✓ Owned games count                                   │
└─────────────────────────────────────────────────────────┘
```

---

## 🎨 | Design Philosophy

### Colors
```
┌────────────────────────────────────────────────────────┐
│  🖤 bg-primary:      #0F1014                         │
│  💜 bg-secondary:    #15171C                         │
│  💙 accent-primary:  #5865F2                         │
│  🤍 text-primary:    #ffffff                         │
│  💬 text-secondary: #8B8D93                         │
└────────────────────────────────────────────────────────┘
```

### Typography
```
┌────────────────────────────────────────────────────────┐
│  📝 Headings:     Inter (Bold, Black)                 │
│  📄 Body:         System font stack                    │
│  ✨ Accents:      Gradient text effects                │
└────────────────────────────────────────────────────────┘
```

### Animations
```
┌────────────────────────────────────────────────────────┐
│  🎬 Page transitions:  0.3s ease                      │
│  🖱️  Hover effects:     scale(1.02)                  │
│  🌊 Floating cards:    6s infinite loop               │
│  ⏱️  Stagger reveals:  0.1s delay per item           │
└────────────────────────────────────────────────────────┘
```

---

## 📊 | Key Stats

<div align="center">

```
     ╔═══════════════════════════════════════════════════╗
     ║     📈 Project Statistics                      ║
     ╠═══════════════════════════════════════════════════╣
     ║  📺 Anime Tracked     ➜    180+ series          ║
     ║  ⏰ Time Watched     ➜    37+ days              ║
     ║  🎮 Gaming Hours     ➜    1,200+ hours          ║
     ║  🎫 Steam Games      ➜    150+ titles           ║
     ║  💻 Lines of Code    ➜    3,500+                ║
     ╚═══════════════════════════════════════════════════╝
```

</div>

---

## 🌐 | Connect

<div align="center">

| | |
|:---:|:---:|
| 🐙 **GitHub** | [![][GitHub badge]](https://github.com/Foxems) |
| 🎮 **Steam** | [![][Steam badge]](https://steamcommunity.com/id/Foxemss/) |
| ⛩️ **MAL** | [![][MAL badge]](https://myanimelist.net/profile/Foxems) |

[GitHub badge]: https://img.shields.io/badge/GitHub-@Foxems-181717?style=for-the-badge&logo=github
[Steam badge]: https://img.shields.io/badge/Steam-Foxemss-1b2838?style=for-the-badge&logo=steam
[MAL badge]: https://img.shields.io/badge/MAL-Foxems-2E51A2?style=for-the-badge&logo=myanimelist

</div>

---

## 📝 | License

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**MIT License** — See the [LICENSE](../LICENSE) file for details

```
┌─────────────────────────────────────────────────────────┐
│  ✅ Use this code for free, forever                    │
│  ✅ Modify it                                          │
│  ✅ Distribute it                                      │
│  ✅ Use in commercial projects                         │
│  ✅ Private use is allowed                             │
│  ⚠️  Include license and copyright notice             │
│  ⚠️  Can't hold the author liable                     │
│  ⚠️  No warranty                                      │
└─────────────────────────────────────────────────────────┘
```

> [!NOTE]
> While the license allows reuse, this codebase contains personal configurations and hardcoded values that require significant customization to work for others.

</div>

---

<div align="center">

**Made with** 🦊 **and** ☕

*Powered by [FoxCLI](https://github.com/Foxems/foxcli)*

---

⭐ Star this repo if you found it useful!

</div>
