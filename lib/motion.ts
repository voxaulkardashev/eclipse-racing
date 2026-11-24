// One switch for the whole site's motion.
//
// The team asked for every animation to play even when a device asks for reduced motion
// (Windows: Settings > Accessibility > Visual effects > Animation effects off; macOS/iOS:
// Reduce motion). With this false, the loading screen, page-turn, scroll reveals, Lenis and
// the cursor all run for everyone.
//
// Set it to true to honour that setting again across the whole site: Lenis and the page-turn
// switch off, the loading screen fades instead of wiping, reveals are skipped and CSS
// transitions go still (the cursor keeps easing either way).
export const RESPECT_REDUCED_MOTION = false;

/** True when motion should be reduced: the switch is on and the device asks for it. */
export function reducedMotion(): boolean {
  return (
    RESPECT_REDUCED_MOTION &&
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
