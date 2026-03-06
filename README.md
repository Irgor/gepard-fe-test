# FeTask — Infinite Carousel (Mobile)

A technical test implementation: an **infinite carousel with 3 banners** for mobile screens. Built with **Angular** (latest standard pack), **no third-party libraries**, using **CSS** for styling.

## What This App Does

- **Mobile-first**: Designed for viewports **&lt; 600px**; one slide uses **100vw**.
- **Swipe navigation**: Change slides by swiping left/right (touch or mouse).
- **Abstracted slide data**: Banners are loaded via a mock API; structure is not hardcoded in the template.
- **Slide structure**: Each slide has:
  - **backgroundImage** — full-width background
  - **mainImage** — main visual
  - **title** — headline
  - **description** — body text
  - **button** — `buttonText` + `buttonLink`
- **Optional features**:
  - **Auto-advance**: Timer changes slides every 5 seconds (configurable in the carousel component).
  - **Loading simulation**: Mock API with configurable delay for testing the skeleton UI (see below).

## Tech Stack

- **Angular** (CLI 21.x) — components, signals, standalone APIs
- **RxJS** — mock API, timers, swipe handling
- **CSS** — layout and styling (no SCSS)
- **No external UI/carousel libraries**

## Getting Started

### Prerequisites

- Node.js (LTS)
- npm

### Install and run

```bash
npm install
ng serve
```

Open **http://localhost:4200/** in a browser. For the intended layout, use a **mobile viewport** (e.g. DevTools device mode, width &lt; 600px).

### Build

```bash
ng build
```

## Testing the Skeleton Loader

The app shows a **skeleton carousel** while banner data is “loading”. By default the mock API returns immediately (`delay(0)`), so the skeleton is barely visible.

To **see the skeleton** and verify loading state:

1. Open **`src/app/features/home-page/home-page.ts`**.
2. Find the constant:
   ```ts
   const SKELETON_DEBUG_DELAY_MS = 0;
   ```
3. Set it to a value in **milliseconds** (e.g. **2500** for 2.5 seconds):
   ```ts
   const SKELETON_DEBUG_DELAY_MS = 2500;
   ```
4. Save, reload the app, and you’ll see the skeleton for that duration before the carousel appears.

**Why it’s disabled by default:**  
With `SKELETON_DEBUG_DELAY_MS = 0`, the mock API resolves right away so normal usage isn’t delayed. The flag exists only so reviewers can easily enable a delay and test the skeleton without changing the mock implementation.

## Project Structure (relevant parts)

- **`src/app/features/home-page/`** — Home page; fetches banners and switches between skeleton and carousel.
- **`src/app/shared/components/carousel-banner/`** — Carousel with swipe, auto-advance, and banner rendering.
- **`src/app/shared/components/skeleton-carousel/`** — Skeleton placeholder shown while data loads.
- **`src/app/core/models/Banner.ts`** — `Banner` interface used for slide data.
