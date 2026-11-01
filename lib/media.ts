/**
 * HERO MEDIA CONFIG
 * -----------------------------------------------------------------
 * This is the only file you need to touch to swap the hero visual.
 * Drop your files into /public/assets/cyber/ and point the paths below
 * at them (paths are relative to /public, so they start with "/assets").
 *
 * Any slot set to `null` shows a "SIGNAL PENDING" placeholder
 * (or is hidden entirely if `showEmptySlots` is false).
 *
 * See public/assets/cyber/README.md for file formats and tips.
 */

export type HeroView = "portrait" | "video" | "model";

export const heroMedia = {
  /** Still image. PNG with transparent background looks best. */
  portrait: "/assets/IMG_1983.png" as string | null,
  // portrait: "/assets/cyber/portrait.png",

  /** Short looping clip: MP4 (H.264) and/or WebM. Plays muted. */
  video: null as string | null,
  // video: "/assets/cyber/intro.mp4",
  /** Optional still shown before the video loads. */
  videoPoster: null as string | null,
  // videoPoster: "/assets/cyber/intro-poster.jpg",

  /** 3D model in .glb (binary glTF). Rotatable, auto-spins. */
  model: null as string | null,
  // model: "/assets/cyber/avatar.glb",

  /** Which tab opens first (falls back to the first slot that has a file). */
  defaultView: "portrait" as HeroView,

  /**
   * true  = show empty slots as "SIGNAL PENDING" tabs (good while you're
   *         still producing the files)
   * false = hide tabs that have no file yet
   */
  showEmptySlots: true,
};
