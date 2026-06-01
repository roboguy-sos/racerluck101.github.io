/**
 * Fixed, full-viewport cyber backdrop sitting behind ALL page content.
 * Pure CSS (no canvas) so it stays cheap on the lower sections: a panning
 * grid, two drifting green "aurora" glows, a slow scanline, and a vignette.
 * Animations freeze automatically under prefers-reduced-motion (globals.css).
 */
export default function SiteBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-base"
    >
      {/* panning grid */}
      <div className="absolute inset-0 animate-grid-pan bg-grid [background-size:46px_46px] opacity-50" />

      {/* faint larger grid for depth */}
      <div className="absolute inset-0 bg-grid [background-size:184px_184px] opacity-30" />

      {/* top hero glow */}
      <div className="absolute -top-48 left-1/2 h-[55rem] w-[55rem] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[130px]" />

      {/* drifting aurora glows down the page */}
      <div className="absolute left-[6%] top-[28%] h-[34rem] w-[34rem] animate-aurora-1 rounded-full bg-accent/[0.06] blur-[140px]" />
      <div className="absolute right-[4%] top-[58%] h-[30rem] w-[30rem] animate-aurora-2 rounded-full bg-[#10b981]/[0.05] blur-[140px]" />
      <div className="absolute bottom-[2%] left-1/3 h-[28rem] w-[28rem] animate-aurora-1 rounded-full bg-accent/[0.05] blur-[140px]" />

      {/* slow scanline sweeping the whole page */}
      <div className="absolute inset-x-0 top-0 h-px animate-scan-slow bg-gradient-to-r from-transparent via-accent/25 to-transparent" />

      {/* vignette to keep edges grounded and text legible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 90% at 50% 0%, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
