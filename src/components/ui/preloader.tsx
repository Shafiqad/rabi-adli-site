"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* easeInOutQuart — natural pen motion (gentle approach, confident middle,
 * soft landing). Closer to how a hand actually draws a signature than a
 * linear or single-eased reveal would feel.                              */
const EASE_PEN = (t: number) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

const SIGNATURE_PNG = "/images/logosignature.png";

interface PreloaderProps {
  /** Skip on subsequent visits within the same browser session. */
  oncePerSession?: boolean;
}

/**
 * Premium signature-draw preloader.
 *
 * The PNG signature at `/images/logosignature.png` is unveiled left → right
 * via an animated CSS mask with a soft trailing edge — visually identical
 * to a pen stroking the wordmark across the page. Once the draw completes
 * a small spaced-out "Rabi Adli" label fades in beneath. The whole panel
 * then fades softly away to reveal the hero.
 *
 * If you later add an actual SVG version of the signature
 * (`/images/logosignature.svg` with `<path>` elements that have a stroke),
 * swap the body of this component to render that SVG with a
 * `stroke-dasharray` + `stroke-dashoffset` animation — the surrounding
 * choreography (fade-in label, fade-out panel, body-lock) stays identical.
 *
 * Respects `prefers-reduced-motion` by collapsing the whole sequence into
 * a fast snap so motion-sensitive users aren't held up.
 */
export function Preloader({ oncePerSession = false }: PreloaderProps) {
  const [visible, setVisible] = useState(true);
  const [reveal, setReveal] = useState(0);
  const [signatureDone, setSignatureDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (oncePerSession && sessionStorage.getItem("rabi-preloader-shown")) {
      setVisible(false);
      return;
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const drawDuration = prefersReduced ? 350 : 2200;
    const holdAfterDraw = prefersReduced ? 200 : 750;

    document.body.style.overflow = "hidden";

    const startTime = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / drawDuration);
      setReveal(EASE_PEN(t) * 100);

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setSignatureDone(true);
        if (oncePerSession) sessionStorage.setItem("rabi-preloader-shown", "1");
        window.setTimeout(() => setVisible(false), holdAfterDraw);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [oncePerSession]);

  /* Soft 3% trailing edge on the reveal mask — feels like fresh ink
   * settling rather than a hard wipe.                                  */
  const maskHead = Math.max(0, reveal - 3);
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
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.85, ease: [0.42, 0, 0.58, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#050505" }}
        >
          {/* Subtle film-grain texture */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.45] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.96 0 0 0 0 0.94 0 0 0 0 0.88 0 0 0 0.045 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
              backgroundSize: "220px 220px",
            }}
          />

          {/* Centered stack — signature + label */}
          <div className="relative flex flex-col items-center">
            {/* SIGNATURE — drawn left to right via animated mask */}
            <div
              className="relative w-[min(340px,80vw)] sm:w-[min(420px,75vw)] md:w-[min(500px,55vw)]"
              style={{
                filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.35))",
              }}
            >
              <div
                className="relative w-full"
                style={{ aspectRatio: "1536 / 1024" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SIGNATURE_PNG}
                  alt=""
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-contain select-none"
                  style={{
                    maskImage,
                    WebkitMaskImage: maskImage,
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                  }}
                />
              </div>
            </div>

            {/* Subtle "RABI ADLI" label — fades in only after signature
                is fully drawn, then sits quietly during the hold.       */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: signatureDone ? 1 : 0,
                y: signatureDone ? 0 : 10,
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 md:mt-10 text-[10px] md:text-[11px] tracking-[0.45em] uppercase font-medium"
              style={{ color: "#A8A8A8" }}
            >
              Rabi Adli
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
