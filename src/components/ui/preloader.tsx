"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* -------------------------------------------------------------------------- */
/*  Signature strokes — authored as single-line cursive paths in pen order.   */
/*                                                                            */
/*  Each entry is one continuous motion of the pen (one M, then a chain of    */
/*  cubic curves). Strokes are sequenced exactly as a human would write the   */
/*  name: left → right, with brief lifts only where a real hand would lift    */
/*  the pen (dots, crossbars, the gap between Rabi and Adli).                 */
/*                                                                            */
/*  viewBox 0 0 720 180 — wide aspect so the signature breathes.              */
/* -------------------------------------------------------------------------- */

interface Stroke {
  /** SVG path d-string for this single pen motion. */
  d: string;
  /** Duration (ms) for the pen to complete this stroke. */
  ms: number;
}

const STROKES: Stroke[] = [
  // 1. "Rabi" — one continuous cursive pen motion through R, a, b, i.
  {
    d:
      "M 62 50 " +
      "C 36 80 36 116 58 138 " + // R — downstroke + slight pen-curve
      "C 66 114 72 90 78 76 " + // pen swings back up
      "C 100 50 126 72 108 98 " + // R bowl
      "C 96 112 80 108 76 102 " + // close bowl
      "C 96 116 118 138 134 140 " + // R leg out, lands near baseline
      "C 150 138 154 102 162 92 " + // upstroke to 'a'
      "C 184 80 192 132 172 136 " + // 'a' right side
      "C 150 138 152 94 166 92 " + // 'a' left close
      "C 180 96 180 126 182 138 " + // 'a' exit
      "C 196 132 204 88 206 46 " + // up the 'b' ascender
      "C 204 80 204 116 204 136 " + // down the 'b'
      "C 222 110 250 98 252 124 " + // 'b' bowl right
      "C 250 142 224 138 220 134 " + // 'b' bowl close
      "C 238 134 254 112 260 96 " + // exit toward 'i'
      "C 262 114 264 130 268 138 " + // 'i' downstroke
      "C 282 138 296 128 304 120", // 'i' exit tail
    ms: 720,
  },
  // 2. Dot on first 'i'
  {
    d: "M 268 70 C 269 70 270 71 271 72",
    ms: 60,
  },
  // 3. "A" — left leg + apex + right leg, one motion
  {
    d: "M 348 138 L 388 50 L 426 138",
    ms: 280,
  },
  // 4. "A" — crossbar (pen lift before this one)
  {
    d: "M 360 108 L 414 108",
    ms: 100,
  },
  // 5. "dli" — one continuous cursive motion through d, l, i.
  {
    d:
      "M 462 102 " +
      "C 440 96 440 140 464 140 " + // 'd' bowl right
      "C 482 138 486 104 472 98 " + // 'd' bowl close
      "C 480 76 482 50 482 42 " + // 'd' ascender up
      "C 482 78 482 116 482 136 " + // back down
      "C 494 144 510 138 514 126 " + // exit to 'l'
      "C 524 96 528 68 530 46 " + // 'l' ascender up
      "C 528 80 528 116 528 134 " + // 'l' down
      "C 538 142 552 136 556 126 " + // exit to 'i'
      "C 568 100 572 94 574 100 " + // small upstroke to i
      "C 576 116 578 132 582 138 " + // 'i' downstroke
      "C 596 138 614 128 624 116", // final exit tail
    ms: 700,
  },
  // 6. Dot on second 'i'
  {
    d: "M 572 70 C 573 70 574 71 575 72",
    ms: 60,
  },
  // 7. Final flourish — a single confident underline curve under the name.
  {
    d: "M 80 164 C 240 180 460 178 640 156",
    ms: 320,
  },
];

const HOLD_MS = 700;
const FADE_MS = 700;
const TOTAL_DRAW_MS = STROKES.reduce((sum, s) => sum + s.ms, 0);

/* Pre-compute cumulative start delays so each stroke fires sequentially. */
const DELAYS: number[] = STROKES.reduce<number[]>((acc, s, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + STROKES[i - 1].ms);
  return acc;
}, []);

interface PreloaderProps {
  /** Skip on subsequent visits within the same browser session. */
  oncePerSession?: boolean;
}

/**
 * Live-signature preloader.
 *
 * Renders an authored set of cursive pen strokes for "Rabi Adli" and draws
 * them in natural writing order using framer-motion's `pathLength`
 * animation. Each stroke is a single continuous pen motion; multi-stroke
 * letters (the A crossbar, the dots) get their own pen-lift between
 * paths. Total writing time stays under ~2.3s so the preloader doesn't
 * delay the user but still feels intentional.
 *
 * Respects `prefers-reduced-motion` by hard-cutting the writing phase.
 */
export function Preloader({ oncePerSession = false }: PreloaderProps) {
  const [visible, setVisible] = useState(true);
  const [allDone, setAllDone] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (oncePerSession && sessionStorage.getItem("rabi-preloader-shown")) {
      setVisible(false);
      return;
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setReducedMotion(prefersReduced);

    document.body.style.overflow = "hidden";

    const drawDuration = prefersReduced ? 350 : TOTAL_DRAW_MS;
    const completion = window.setTimeout(() => {
      setAllDone(true);
      if (oncePerSession) sessionStorage.setItem("rabi-preloader-shown", "1");
      window.setTimeout(() => setVisible(false), HOLD_MS);
    }, drawDuration);

    return () => clearTimeout(completion);
  }, [oncePerSession]);

  /* Speed factor — pulls all strokes into a single fast pass when the user
     prefers reduced motion. */
  const speed = reducedMotion ? TOTAL_DRAW_MS / 350 : 1;

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
          transition={{ duration: FADE_MS / 1000, ease: [0.42, 0, 0.58, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#050505" }}
        >
          {/* Signature + label stack */}
          <div className="relative flex flex-col items-center">
            <div className="relative w-[min(560px,84vw)] sm:w-[min(640px,72vw)] md:w-[min(760px,58vw)]">
              <svg
                viewBox="0 0 720 180"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto block"
                aria-label="Rabi Adli signature"
              >
                {STROKES.map((stroke, i) => (
                  <motion.path
                    key={i}
                    d={stroke.d}
                    fill="none"
                    stroke="#F5F5F0"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: {
                        duration: stroke.ms / 1000 / speed,
                        delay: DELAYS[i] / 1000 / speed,
                        ease: [0.45, 0.05, 0.55, 0.95],
                      },
                      opacity: {
                        duration: 0.04,
                        delay: DELAYS[i] / 1000 / speed,
                      },
                    }}
                  />
                ))}
              </svg>
            </div>

            {/* Tiny spaced-out wordmark — appears only after the
                signature has fully been written, confirms identity. */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: allDone ? 1 : 0,
                y: allDone ? 0 : 10,
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
