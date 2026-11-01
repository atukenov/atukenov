# Hero media drop folder

Put your cyberpunk portrait, video and 3D model here, then point
`lib/media.ts` at them. That file is the only thing you need to edit.

The home page hero has three tabs, **IMG / VID / 3D**. A tab with no file
shows a "SIGNAL PENDING" placeholder. Once all your files are in, set
`showEmptySlots: false` in `lib/media.ts` to hide any tab you don't use.

| Slot | Drop file as | Format | Tips |
|------|--------------|--------|------|
| Portrait | `portrait.png` | PNG (transparent background) or WebP | Portrait crop, about **4:5**, at least 1000×1250. Subject near the bottom edge looks best. Neon rim light and chromatic edges are added in CSS, so the raw render can stay clean. |
| Video | `intro.mp4` (+ optional `intro-poster.jpg`) | MP4 (H.264), 4:5 or 9:16, 5–10 s seamless loop | It plays **muted** on loop, so no audio is needed. Keep it under ~5 MB (`ffmpeg -i in.mov -vf scale=800:-2 -c:v libx264 -crf 26 -an -movflags +faststart intro.mp4`). |
| 3D model | `avatar.glb` | Binary glTF (`.glb`) | Visitors can drag to rotate, and it spins slowly on its own. Keep it under ~10 MB and use Draco or meshopt compression if you can (`npx gltf-transform optimize in.glb avatar.glb`). The viewer library only loads when someone opens the 3D tab. |

## Steps

1. Copy the file(s) into `public/assets/cyber/`.
2. Open `lib/media.ts` and set the paths, for example:

   ```ts
   portrait: "/assets/cyber/portrait.png",
   video: "/assets/cyber/intro.mp4",
   videoPoster: "/assets/cyber/intro-poster.jpg",
   model: "/assets/cyber/avatar.glb",
   defaultView: "video", // which tab opens first
   showEmptySlots: false,
   ```

3. Run `npm run dev` and check http://localhost:3000.

## Ideas for producing the assets

- **Portrait:** run your photo through an image model with a prompt like
  *"cyberpunk street portrait, neon magenta and cyan rim light, rain,
  chrome cybernetic jaw implant, holographic HUD glints, night city bokeh"*,
  then remove the background.
- **Video:** animate the portrait (image-to-video) with a subtle head turn,
  flickering neon signs and rain. A short loop works best.
- **3D:** an image-to-3D tool can turn the portrait into a `.glb` bust, or you
  can export a stylised avatar from Blender or Ready-Player-Me-style tools.
