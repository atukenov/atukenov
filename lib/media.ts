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
  portrait: "/assets/cyber/portrait.webp" as string | null,
  /**
   * "cover"   = fill the frame (for a full illustration with its own background)
   * "contain" = fit inside the frame (for a cut-out PNG with transparency)
   */
  portraitFit: "cover" as "cover" | "contain",

  /** Short looping clip: MP4 (H.264) and/or WebM. Plays muted. */
  video: "/assets/cyber/intro.mp4" as string | null,
  /** Optional still shown before the video loads. */
  videoPoster: "/assets/cyber/intro-poster.jpg" as string | null,

  /** 3D model in .glb (binary glTF). Rotatable, auto-spins. */
  model: "/assets/cyber/avatar.glb" as string | null,

  /** Which tab opens first (falls back to the first slot that has a file). */
  defaultView: "portrait" as HeroView,

  /**
   * true  = show empty slots as "SIGNAL PENDING" tabs (good while you're
   *         still producing the files)
   * false = hide tabs that have no file yet
   */
  showEmptySlots: true,
};
