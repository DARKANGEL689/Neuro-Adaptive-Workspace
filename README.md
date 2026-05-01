# 🧠 Neuro-Adaptive Workspace (NAW) — OS v1.0

> *"The modern web interface is static and deaf to the physiological state of its user. NAW fundamentally rejects this."*

<br>

<div align="center">

![NAW Banner](https://img.shields.io/badge/NAW-OS%20v1.0-00d2a0?style=for-the-badge&logo=brain&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Submitted for:** Coding Skills – 2 | End-Term Project  
**Name:** Ahad SD  
**Registration Number:** AP24110010689  
**Section:** P  
**Institution:** SRM University AP, Amaravati

<br>

🔗 **[Live Demo](https://neuro-adaptive-workspace.vercel.app)** &nbsp;|&nbsp; 📁 **[GitHub Repository](https://github.com/DARKANGEL689)**

</div>

---

## 📌 Table of Contents

- [Project Overview](#-project-overview)
- [The Problem It Solves](#-the-problem-it-solves)
- [Core Concept: The Neuro-Adaptive Engine](#-core-concept-the-neuro-adaptive-engine)
- [UI States — The Four Modes](#-ui-states--the-four-modes)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Key Features](#-key-features)
- [How It Works — Under the Hood](#-how-it-works--under-the-hood)
- [Getting Started](#-getting-started)
- [File Structure](#-file-structure)
- [Concepts & References](#-concepts--references)
- [About the Developer](#-about-the-developer)

---

## 🌐 Project Overview

The **Neuro-Adaptive Workspace (NAW)** is a biologically-responsive OS-concept interface built as a React + TypeScript web application. It simulates a next-generation workspace that reads the user's physiological stress state in real time — using facial optical sensor simulation (rPPG), heart rate estimation, and HRV analysis — and **dynamically restructures its entire DOM layout, density, and visual language** in response.

This is not a theme toggle. This is not dark mode. This is an interface that *breathes with you.*

NAW proposes a paradigm shift: **the UI should serve the human's cognitive state, not the other way around.**

---

## 🔍 The Problem It Solves

Every digital workspace today — whether it's Notion, Figma, VS Code, or Gmail — presents the same information density regardless of whether you are:

- In a **deep flow state** at 10 AM, fully focused  
- Experiencing **moderate cognitive load** mid-afternoon, juggling tasks  
- Hitting a **stress peak** during a deadline crunch  
- In a state of **complete cognitive overload**, unable to process anything

The result? Cognitive friction. Notification overload. Interface blindness. NAW addresses this by introducing **biometric-driven generative UI** — a system where the interface itself is context-aware of human physiology.

---

## 🧬 Core Concept: The Neuro-Adaptive Engine

NAW implements a four-stage closed-loop system:

```
[ Biometric Sensor ] ──► [ Stress Computation ] ──► [ UI State Engine ] ──► [ DOM Restructure ]
        ▲                                                                             │
        └─────────────────────── Feedback Loop ──────────────────────────────────────┘
```

**1. Signal Acquisition** — The BiometricSensor component accesses the device camera via `getUserMedia()` and applies a simulated rPPG (remote photoplethysmography) scan overlay using Canvas API animations.

**2. Physiological Modelling** — A real-time simulation loop runs every 1000ms, updating a continuous `stressIndex` (0.0–1.0) and correlated `bpm` value using a weighted drift algorithm.

**3. State Classification** — The stress index is classified into one of four cognitive states: FLOW → BALANCED → FOCUS → RECOVERY.

**4. Generative Layout Mutation** — Upon state transition, the CSS grid layout, component visibility, opacity layers, color palettes, and widget density all change simultaneously, producing a completely different interface for each state.

---

## 🎛 UI States — The Four Modes

| State | Stress Index | Grid Layout | Description |
|-------|-------------|-------------|-------------|
| 🟢 **FLOW** | 0.0 – 0.4 | `12-col × 6-row` | All widgets visible. Maximum information density. Notifications enabled. Dot-grid ambient background. |
| 🟡 **BALANCED** | 0.4 – 0.75 | `8-col × 6-row` | Secondary panels collapse. Inbox hidden. Cleaner visual space. |
| 🟠 **FOCUS** | 0.75 – 0.9 | `1-col × 1-row` | Entire interface strips down to ONE single task. Header fades out. Warm amber color palette. |
| 🔵 **RECOVERY** | 0.9 – 1.0 | Full-screen override | All work widgets replaced with a breathing guide animation synced to cortisol-reduction protocols. |

---

## 🛠 Tech Stack

| Technology | Version | Role |
|------------|---------|------|
| **React** | 19.2.4 | Core UI framework with hooks-based state |
| **TypeScript** | 5.8 | Type-safe component architecture |
| **Vite** | 6.2 | Dev server and bundler |
| **TailwindCSS** | 3.x | Adaptive styling via dynamic class composition |
| **Recharts** | 3.7 | Real-time physiological telemetry chart |
| **Lucide React** | 0.563 | Iconography system |
| **Canvas API** | Native | rPPG scan overlay and facial landmark simulation |
| **MediaDevices API** | Native | Camera stream access for biometric simulation |
| **JetBrains Mono** | Google Fonts | Monospace typographic system for data readouts |
| **Inter** | Google Fonts | Clean sans-serif for UI copy |

---

## 🏗 Project Architecture

NAW follows a clean, component-driven architecture with a central state machine managing all physiological data and UI transitions.

```
App.tsx (Root State Machine)
│
├── AdaptiveContainer.tsx     ← Background & ambient effect layer, switches by UIState
│
├── BiometricSensor.tsx       ← Camera stream + Canvas overlay + rPPG simulation HUD
│
└── Widgets.tsx               ← Modular widgets that respond to UIState
    ├── TaskList              ← Collapses to single-task in FOCUS mode
    ├── InboxWidget           ← Hidden in BALANCED and FOCUS modes
    ├── BiometricChart        ← Real-time area chart (Recharts) of stress history
    └── BreathingGuide        ← Full-screen breathing exercise in RECOVERY mode
```

**State flows are managed through four interconnected `useEffect` hooks in `App.tsx`:**

1. Calibration trigger — fires once camera stream is active
2. Biometric simulation loop — 1-second interval with natural drift
3. History recorder — maintains a 30-point rolling window for the chart
4. UI state classifier — maps stress index to UIState enum

---

## ✨ Key Features

- **Live Camera Integration** — Uses the browser's `MediaDevices.getUserMedia()` API to activate the device camera for the biometric sensor panel.

- **Canvas-Based Scan Overlay** — A facial landmark detection simulation is drawn in real time over the camera feed using the HTML5 Canvas API, including an animated scan line and bounding box.

- **Four-Mode Adaptive Layout** — The CSS Grid reconfigures from a dense 12-column layout all the way down to a single-column focus screen, driven entirely by the stress state.

- **Real-Time Telemetry Chart** — A rolling 30-second area chart built with Recharts plots the live stress index as it evolves.

- **Breathing Guide (Recovery Mode)** — When stress exceeds 90%, the entire workspace is replaced with a full-screen breathing animation using CSS keyframes (`animate-ping`, `animate-pulse`) to guide cognitive recovery.

- **Manual Override Simulator** — A slider in the header allows interactive demonstration of all four states — drag right to escalate stress and observe the layout morphing in real time.

- **Progressive Header Fade** — In FOCUS mode, the navigation header drops to 20% opacity, removing visual clutter. In RECOVERY mode, it disappears entirely.

- **Privacy-First Architecture** — All biometric processing is simulated client-side. The footer status bar confirms `Privacy Loop: Local` — no data ever leaves the browser.

---

## ⚙ How It Works — Under the Hood

### Stress Simulation Algorithm

```typescript
// Every 1 second, stress drifts naturally using a bounded random walk
setStressIndex(prev => {
  const change = (Math.random() - 0.5) * 0.1;
  const newVal = Math.max(0, Math.min(1, prev + change));
  return newVal;
});

// BPM is derived from stress via a weighted convergence formula
setBpm(prev => {
  const targetBpm = 60 + (stressIndex * 60); // Range: 60–120 BPM
  const drift = (Math.random() - 0.5) * 4;
  return Math.floor(prev * 0.9 + targetBpm * 0.1 + drift);
});
```

### UI State Classification

```typescript
if (stressIndex < 0.4)       setUiState(UIState.FLOW);
else if (stressIndex < 0.75) setUiState(UIState.BALANCED);
else if (stressIndex < 0.9)  setUiState(UIState.FOCUS);
else                          setUiState(UIState.RECOVERY);
```

### Grid Mutation Logic

The grid reconfigures using dynamic Tailwind class composition, enabling smooth CSS transition animations across layout breakpoints — a technique that demonstrates advanced understanding of conditional rendering and CSS-in-JS paradigms.

```tsx
<div className={`grid h-full gap-6 transition-all duration-700 ease-in-out
   ${uiState === UIState.FLOW     ? 'grid-cols-12 grid-rows-6' : ''}
   ${uiState === UIState.BALANCED ? 'grid-cols-8 grid-rows-6'  : ''}
   ${uiState === UIState.FOCUS    ? 'grid-cols-1 grid-rows-1'  : ''}
`}>
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/DARKANGEL689/neuro-adaptive-workspace.git

# Navigate into the project
cd neuro-adaptive-workspace

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app runs at `http://localhost:3000` by default.

### Build for Production

```bash
npm run build
npm run preview
```

> **Note:** Camera access is required for the Optical Sensor panel. Grant permission when prompted. The app functions fully even without camera access — the simulation loop runs independently.

---

## 📁 File Structure

```
neuro-adaptive-workspace/
│
├── index.html              # Entry point with Tailwind CDN, font imports, importmap
├── index.tsx               # React root mount
├── App.tsx                 # Central state machine — all biometric logic lives here
├── types.ts                # TypeScript enums & interfaces (BiometricData, UIState, etc.)
├── constants.ts            # Mock task and notification seed data
│
├── components/
│   ├── AdaptiveContainer.tsx   # Wrapper with adaptive background themes
│   ├── BiometricSensor.tsx     # Camera + Canvas HUD + live vitals display
│   └── Widgets.tsx             # TaskList, InboxWidget, BiometricChart, BreathingGuide
│
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 📚 Concepts & References

This project draws on and demonstrates understanding of the following computer science and HCI (Human-Computer Interaction) concepts:

| Concept | Applied In |
|---------|-----------|
| **React Hooks** (`useState`, `useEffect`, `useCallback`, `useRef`) | All state management and lifecycle logic in `App.tsx` and `BiometricSensor.tsx` |
| **TypeScript Enums & Interfaces** | `types.ts` — strongly typed biometric and UI state system |
| **CSS Grid Layout** | Dynamic 12/8/1-column grid reconfiguration per state |
| **HTML5 Canvas API** | Animated scan overlay and facial landmark simulation |
| **MediaDevices API** | Camera stream acquisition via `navigator.mediaDevices.getUserMedia()` |
| **rPPG (Remote Photoplethysmography)** | Conceptual basis for contactless heart rate estimation |
| **HRV (Heart Rate Variability)** | Used as a derived stress proxy metric |
| **WebNN (Web Neural Networks API)** | Referenced in the system architecture as the target runtime for inference |
| **Recharts** | Real-time area chart with rolling data window |
| **Component Composition Pattern** | Modular widget architecture in `Widgets.tsx` |
| **Conditional Rendering** | State-driven show/hide logic across all widgets |
| **CSS Animations & Transitions** | `animate-pulse`, `animate-ping`, duration-700 transitions for UI morphing |

---

## 👤 About the Developer

<div align="center">

**Ahad SD**  
B.Tech Computer Science & Engineering (Cybersecurity)  
SRM University AP, Amaravati  
Registration No: **AP24110010689** | Section **P**

[![GitHub](https://img.shields.io/badge/GitHub-DARKANGEL689-181717?style=for-the-badge&logo=github)](https://github.com/DARKANGEL689)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-darkangel689-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/darkangel689)

</div>

This project is part of an active portfolio of production-grade web engineering work maintained at [github.com/DARKANGEL689](https://github.com/DARKANGEL689), which includes:

- **300-days-of-websites** — A 300-day daily website challenge building production-quality multi-page sites across radically different themes and industries.
- **Lovable-Multiverse-Vault** — A curated collection of 20 ultra-high-end web UI concepts spanning bioluminescent dashboards, brutalist studios, cybersecurity portfolios, and luxury fashion marketplaces.
- **EchoMind** — A real-time multimodal AI co-pilot for cognitive and emotional state monitoring using facial analysis, voice stress detection, and typing cadence signals.
- **ToolFlow** — A productivity tool built during the AIESEC Global Goals Hackathon.

The NAW project represents a convergence of frontend engineering, HCI research, and systems thinking — built to demonstrate not just technical execution but conceptual originality.

---

<div align="center">

**Neuro-Adaptive Workspace** — *Built for humans, not screens.*

© 2025 Ahad SD · AP24110010689 · SRM University AP

</div>
