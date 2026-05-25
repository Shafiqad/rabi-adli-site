"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* easeInOutCubic — natural pen movement (slow start, smooth middle, soft end) */
const EASE_IN_OUT_CUBIC = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Signature-drawing preloader.
 *
 * The wordmark PNG at `/images/logosignature.png` is revealed left → right via
 * an animated CSS mask, simulating a calligraphic stroke being drawn. A small
 * champagne pen-tip follows the leading edge and fades out once the signature
 * is fully drawn. The whole panel then slides up to reveal the page.
 *
 * Respects `prefers-reduced-motion` by collapsing the draw on a fast timeline.
 */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [reveal, setReveal] = useState(0); // 0 — 100

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const duration = prefersReduced ? 400 : 2100;
    const tailHold = prefersReduced ? 80 : 520;

    document.body.style.overflow = "hidden";

    const startTime = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      setReveal(EASE_IN_OUT_CUBIC(t) * 100);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => setVisible(false), tailHold);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Mask with a soft 2% trailing edge — feels like wet-ink rather than a hard cut.
  const maskHead = Math.max(0, reveal - 2);
  const maskImage = `linear-gradient(90deg, #000 0%, #000 ${maskHead}%, transparent ${reveal}%)`;

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
      }}
    >
      {visible && (
        <motion.div
          aria-hidden
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.95, ease: [0.83, 0, 0.17, 1] }}
          className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background — soft champagne wash + grid */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 50%, rgba(184, 58, 58,0.10), transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)",
              backgroundSize: "120px 120px",
              maskImage:
                "radial-gradient(ellipse 60% 60% at center, black 30%, transparent 85%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 60% 60% at center, black 30%, transparent 85%)",
            }}
          />

          {/* ====================== SIGNATURE STAGE ====================== */}
          <div
            className="relative w-[min(560px,82vw)]"
            style={{
              filter:
                "drop-shadow(0 18px 36px rgba(0,0,0,0.55)) drop-shadow(0 4px 8px rgba(0,0,0,0.35))",
            }}
          >
            {/* Aspect-locked wrapper — keeps the dot aligned with the image */}
            <div
              className="relative w-full"
              style={{ aspectRatio: "560 / 150" }}
            >
              {/* Signature PNG with animated reveal mask */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logosignature.png"
                alt=""
                draggable={false}
                className="absolute inset-0 w-full h-full object-contain select-none"
                style={{
                  maskImage,
                  WebkitMaskImage: maskImage,
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                }}
                onError={(e) => {
                  // PNG missing — graceful fallback to italic serif wordmark.
                  const img = e.currentTarget as HTMLImageElement;
                  img.style.display = "none";
                  img.nextElementSibling?.classList.remove("hidden");
                }}
              />

              {/* Fallback wordmark — hidden by default, shown if PNG fails */}
              <span
                aria-hidden
                className="hidden absolute inset-0 flex items-center justify-center font-serif italic text-foreground"
                style={{
                  fontSize: "clamp(48px, 8vw, 96px)",
                  letterSpacing: "0.005em",
                  maskImage,
                  WebkitMaskImage: maskImage,
                }}
              >
                Rabi Adli
              </span>

              {/* Pen-tip dot — follows the leading edge, fades out at 100% */}
              <span
                aria-hidden
                className="absolute top-1/2 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_14px_rgba(184, 58, 58,0.8)] transition-opacity duration-500"
                style={{
                  left: `${reveal}%`,
                  transform: "translate(-50%, -50%)",
                  opacity: reveal >= 99 ? 0 : 1,
                }}
              />
            </div>

            {/* Thin champagne progress hairline directly under the signature */}
            <div className="mt-10 h-px w-full bg-white/[0.08] overflow-hidden">
              <div
                className="h-full bg-accent"
                style={{
                  width: `${reveal}%`,
                  boxShadow: "0 0 10px rgba(184, 58, 58,0.6)",
                }}
              />
            </div>
          </div>

          {/* Bottom italic tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 font-serif italic text-[15px] md:text-[16px] text-foreground/55 tracking-tight whitespace-nowrap"
          >
            Geld<span className="text-accent">.</span>{" "}
            Controle<span className="text-accent">.</span>{" "}
            Vrijheid<span className="text-accent">.</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
