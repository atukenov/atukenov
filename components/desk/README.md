# 3D developer desk (home page)

The home page is an interactive three.js scene built with
`@react-three/fiber` + `@react-three/drei`. It is loaded with
`next/dynamic` (no SSR), so the other pages never download three.js.

| Object on the desk | Opens | File |
| --- | --- | --- |
| Monitor | profile + links, live terminal | `objects/Monitor.tsx`, `MonitorScreen.tsx` |
| Folders | one folder per project in `lib/content` | `objects/Folders.tsx` |
| PC tower | skills, services, experience, education | `objects/PcTower.tsx` |
| PC power button | boots / shuts down the monitor | `objects/PcTower.tsx` |
| Desk lamp, wall switch | lamp light, room lights | `objects/Lamp.tsx`, `objects/Room.tsx` |
| Keyboard | typing anywhere goes to the terminal | `objects/Keyboard.tsx`, `terminal.ts` |
| Phone, sticky notes | contact panel | `objects/Extras.tsx`, `objects/Monitor.tsx` |
| Coffee cup | AltynCup project | `objects/Extras.tsx` |
| Calendar | flips through work history | `objects/Extras.tsx` |
| Headphones | lo-fi loop made with Web Audio (`lofi.ts`) | `objects/Extras.tsx` |
| Soccer ball | bounces | `objects/Extras.tsx` |

- Content (projects, services, experience) still comes from `lib/content/*`,
  so editing those files updates the desk too. Contact details are in
  `lib/profile.ts`.
- `store.ts` holds the shared state (camera focus, open panel, power, lights).
- `DeskPanel.tsx` is the readable DOM panel (side drawer on desktop, bottom
  sheet on phones). The bottom HUD buttons reach everything without the 3D
  scene, for keyboard and screen-reader users.
- Browsers without WebGL, or visitors who press **2D view**, get the classic
  hero (`components/ClassicHome.tsx`). The choice is remembered in
  `localStorage` (`desk-view`).
- 3D text uses self-hosted JetBrains Mono (`public/fonts`), Latin + Cyrillic,
  so nothing is fetched from a CDN.
