/** Fixed, click-through CRT layer: scanlines, vignette and a slow sweep. */
const CyberOverlay = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 z-[45]">
    <div className="absolute inset-0 crt-scanlines" />
    <div className="absolute inset-0 crt-vignette" />
    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-white/[0.025] to-transparent animate-scan-sweep" />
  </div>
);

export default CyberOverlay;
