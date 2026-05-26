"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* easeInOutQuart — natural pen motion (gentle approach, confident draw,
 * soft landing). */
const EASE_PEN = (t: number) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

/* Rabi Adli signature path — same artwork as /images/logosignature.svg,
 * inlined here so we can drive the draw animation directly on the path. */
const SIGNATURE_PATH_RAW =
  "M 175 83 L 176 82 L 177 83 L 176 84 Z M 213 81 L 214 80 L 215 81 L 214 82 Z M 209 81 L 210 80 L 211 81 L 210 82 Z M 237 80 L 239 83 L 248 83 L 249 82 L 253 82 L 254 81 L 257 81 L 258 80 L 261 80 L 262 79 L 267 78 L 268 76 L 266 77 L 263 77 L 259 79 L 252 80 L 251 81 L 246 81 L 245 82 L 241 82 L 239 80 L 242 76 L 242 75 L 241 75 L 238 78 Z M 250 65 L 248 64 L 246 65 L 246 67 L 247 68 L 249 68 L 250 67 Z M 364 56 L 365 55 L 366 56 L 365 57 Z M 222 52 L 213 52 L 212 53 L 199 53 L 198 54 L 185 54 L 184 55 L 170 55 L 169 56 L 156 56 L 155 57 L 149 57 L 149 58 L 150 59 L 162 59 L 163 60 L 167 60 L 171 62 L 173 65 L 173 62 L 171 60 L 168 59 L 167 58 L 168 57 L 178 57 L 179 56 L 192 56 L 193 55 L 206 55 L 207 54 L 220 54 L 222 53 Z M 414 49 L 413 51 L 414 52 L 416 52 L 417 50 L 416 49 Z M 246 42 L 244 42 L 228 59 L 228 60 L 209 79 L 208 79 L 204 83 L 203 83 L 201 85 L 200 85 L 196 88 L 194 88 L 193 87 L 193 85 L 194 84 L 194 81 L 193 81 L 191 83 L 183 87 L 178 87 L 177 86 L 183 81 L 187 79 L 189 79 L 192 77 L 194 77 L 196 76 L 196 75 L 193 75 L 192 76 L 190 76 L 189 77 L 187 77 L 186 78 L 184 78 L 180 80 L 177 80 L 176 81 L 174 81 L 173 82 L 170 82 L 169 83 L 160 84 L 159 85 L 154 85 L 153 86 L 132 86 L 131 85 L 128 85 L 122 82 L 118 78 L 116 74 L 116 72 L 115 71 L 115 60 L 116 58 L 114 58 L 114 61 L 113 62 L 113 70 L 114 71 L 114 74 L 116 78 L 122 84 L 126 86 L 129 86 L 130 87 L 134 87 L 135 88 L 150 88 L 151 87 L 157 87 L 158 86 L 162 86 L 163 85 L 167 85 L 168 84 L 175 83 L 176 84 L 176 88 L 177 89 L 182 89 L 183 88 L 185 88 L 191 85 L 192 86 L 191 87 L 193 90 L 195 90 L 196 89 L 198 89 L 209 81 L 210 82 L 210 84 L 209 86 L 211 86 L 213 84 L 214 84 L 216 82 L 217 82 L 221 79 L 223 79 L 224 78 L 228 78 L 229 79 L 226 82 L 222 84 L 220 84 L 217 86 L 215 86 L 214 87 L 216 88 L 222 85 L 224 85 L 230 81 L 231 79 L 229 76 L 225 76 L 224 77 L 222 77 L 215 81 L 214 79 L 216 77 L 216 76 L 221 71 L 221 70 L 235 56 L 235 55 L 242 48 L 242 47 L 246 43 Z M 117 36 L 114 43 L 112 45 L 111 48 L 109 50 L 107 50 L 106 49 L 102 49 L 101 48 L 98 48 L 94 46 L 92 46 L 91 47 L 93 48 L 95 48 L 96 49 L 98 49 L 99 50 L 103 50 L 104 51 L 107 51 L 108 52 L 108 54 L 106 56 L 98 72 L 96 74 L 95 77 L 93 79 L 92 78 L 92 71 L 91 70 L 91 68 L 89 64 L 82 57 L 81 57 L 79 55 L 71 51 L 69 51 L 65 49 L 62 49 L 61 48 L 58 48 L 57 47 L 53 47 L 52 46 L 45 46 L 44 45 L 38 45 L 37 44 L 38 43 L 46 43 L 47 42 L 56 42 L 57 41 L 65 41 L 66 40 L 74 40 L 75 39 L 84 39 L 85 38 L 93 38 L 94 37 L 103 37 L 104 36 L 112 36 L 113 35 L 116 35 Z M 382 30 L 383 31 L 383 33 L 381 37 L 379 39 L 377 43 L 374 46 L 374 47 L 366 56 L 365 54 L 370 44 L 372 42 L 374 38 L 377 35 L 377 34 L 380 31 Z M 380 70 L 381 71 L 386 71 L 387 70 L 389 70 L 409 60 L 410 61 L 410 65 L 413 67 L 415 67 L 416 68 L 421 68 L 422 67 L 429 67 L 430 66 L 434 66 L 435 65 L 444 64 L 445 63 L 448 63 L 449 62 L 452 62 L 453 61 L 457 61 L 458 60 L 461 60 L 462 59 L 466 59 L 467 58 L 471 58 L 472 57 L 476 57 L 477 56 L 481 56 L 482 55 L 487 55 L 488 54 L 495 54 L 496 53 L 507 53 L 508 52 L 519 52 L 520 53 L 528 53 L 529 54 L 533 54 L 534 55 L 537 55 L 537 54 L 536 53 L 532 53 L 531 52 L 526 52 L 525 51 L 500 51 L 499 52 L 491 52 L 490 53 L 485 53 L 484 54 L 479 54 L 478 55 L 474 55 L 473 56 L 469 56 L 468 57 L 459 58 L 458 59 L 455 59 L 454 60 L 451 60 L 450 61 L 446 61 L 445 62 L 442 62 L 441 63 L 437 63 L 436 64 L 432 64 L 431 65 L 426 65 L 425 66 L 414 66 L 411 63 L 411 61 L 412 60 L 412 57 L 411 57 L 390 68 L 388 68 L 387 69 L 385 69 L 383 70 L 382 69 L 383 64 L 385 62 L 387 57 L 389 55 L 390 52 L 392 50 L 396 42 L 398 40 L 401 34 L 403 32 L 403 30 L 402 30 L 399 34 L 398 37 L 396 39 L 395 42 L 391 47 L 387 55 L 385 57 L 380 67 Z M 188 29 L 169 39 L 167 39 L 164 41 L 162 41 L 159 43 L 157 43 L 156 44 L 154 44 L 150 46 L 147 46 L 146 47 L 143 47 L 142 48 L 139 48 L 138 49 L 133 49 L 132 50 L 113 50 L 112 49 L 114 45 L 116 43 L 119 36 L 122 34 L 131 34 L 132 33 L 140 33 L 141 32 L 150 32 L 151 31 L 159 31 L 160 30 L 169 30 L 170 29 L 178 29 L 179 28 L 187 28 Z M 385 29 L 383 28 L 380 29 L 374 35 L 374 36 L 368 44 L 362 56 L 362 58 L 360 62 L 356 66 L 355 66 L 352 69 L 351 69 L 347 72 L 345 72 L 344 73 L 341 71 L 346 67 L 355 63 L 355 62 L 352 62 L 344 66 L 340 70 L 340 73 L 342 74 L 346 74 L 352 71 L 357 67 L 358 68 L 358 75 L 359 75 L 359 71 L 360 70 L 360 66 L 361 64 L 365 60 L 365 59 L 373 51 L 373 50 L 379 43 L 379 42 L 381 40 L 381 39 L 384 35 L 384 33 L 385 32 Z M 195 25 L 193 25 L 192 26 L 184 26 L 183 27 L 175 27 L 174 28 L 165 28 L 164 29 L 156 29 L 155 30 L 146 30 L 145 31 L 137 31 L 136 32 L 128 32 L 127 33 L 123 33 L 122 31 L 124 27 L 126 25 L 130 17 L 130 15 L 129 15 L 128 18 L 126 20 L 120 32 L 117 34 L 109 34 L 108 35 L 99 35 L 98 36 L 90 36 L 89 37 L 80 37 L 79 38 L 71 38 L 70 39 L 61 39 L 60 40 L 52 40 L 51 41 L 42 41 L 41 42 L 33 42 L 32 43 L 23 43 L 22 44 L 14 44 L 13 45 L 7 45 L 6 47 L 11 47 L 12 46 L 37 46 L 38 47 L 47 47 L 48 48 L 54 48 L 55 49 L 59 49 L 60 50 L 63 50 L 64 51 L 69 52 L 72 54 L 74 54 L 76 55 L 78 57 L 82 59 L 86 63 L 86 64 L 88 66 L 90 70 L 90 73 L 91 74 L 91 80 L 90 81 L 90 85 L 89 86 L 89 88 L 87 90 L 83 99 L 81 101 L 79 105 L 79 106 L 81 106 L 84 100 L 86 98 L 94 81 L 96 79 L 99 72 L 101 70 L 105 61 L 107 59 L 109 54 L 111 52 L 129 52 L 130 51 L 136 51 L 137 50 L 141 50 L 142 49 L 149 48 L 150 47 L 152 47 L 153 46 L 155 46 L 156 45 L 161 44 L 164 42 L 166 42 L 173 38 L 175 38 L 183 34 L 185 32 L 192 29 L 194 27 L 195 27 Z M 353 8 L 354 7 L 355 8 L 354 9 Z M 432 75 L 430 76 L 420 76 L 419 77 L 410 77 L 409 78 L 400 78 L 399 79 L 389 79 L 388 80 L 379 80 L 378 81 L 368 81 L 367 82 L 358 82 L 357 83 L 348 83 L 347 84 L 337 84 L 336 85 L 327 85 L 326 86 L 317 86 L 316 87 L 306 87 L 305 88 L 296 88 L 295 89 L 286 89 L 285 90 L 277 90 L 276 89 L 282 83 L 282 82 L 302 62 L 302 61 L 317 46 L 319 45 L 329 45 L 329 43 L 325 43 L 324 44 L 321 44 L 320 43 L 321 41 L 342 20 L 342 19 L 353 8 L 354 10 L 350 18 L 348 20 L 339 39 L 337 41 L 326 64 L 324 66 L 320 74 L 320 75 L 322 75 L 330 58 L 332 56 L 340 39 L 342 37 L 354 12 L 356 10 L 361 0 L 358 0 L 316 44 L 310 44 L 309 45 L 295 45 L 294 46 L 280 46 L 279 47 L 265 47 L 264 48 L 250 48 L 248 49 L 249 50 L 258 50 L 259 49 L 273 49 L 274 48 L 288 48 L 289 47 L 303 47 L 304 46 L 312 46 L 313 47 L 309 51 L 309 52 L 289 72 L 289 73 L 271 91 L 265 91 L 264 92 L 255 92 L 254 93 L 245 93 L 244 94 L 235 94 L 234 95 L 225 95 L 224 96 L 215 96 L 214 97 L 205 97 L 204 98 L 194 98 L 193 99 L 184 99 L 183 100 L 174 100 L 173 101 L 163 101 L 162 102 L 153 102 L 152 103 L 143 103 L 142 104 L 132 104 L 131 105 L 129 105 L 129 106 L 137 106 L 138 105 L 147 105 L 148 104 L 157 104 L 158 103 L 168 103 L 169 102 L 178 102 L 179 101 L 188 101 L 189 100 L 199 100 L 200 99 L 209 99 L 210 98 L 219 98 L 220 97 L 230 97 L 231 96 L 240 96 L 241 95 L 250 95 L 251 94 L 261 94 L 262 93 L 268 93 L 269 94 L 254 109 L 254 111 L 255 111 L 273 92 L 281 92 L 282 91 L 291 91 L 292 90 L 301 90 L 302 89 L 311 89 L 312 88 L 322 88 L 323 87 L 332 87 L 333 86 L 342 86 L 343 85 L 352 85 L 353 84 L 362 84 L 363 83 L 372 83 L 373 82 L 383 82 L 384 81 L 393 81 L 394 80 L 399 80 L 400 81 L 396 83 L 389 84 L 388 85 L 386 85 L 385 86 L 383 86 L 382 87 L 377 88 L 374 90 L 372 90 L 358 97 L 356 99 L 355 99 L 348 105 L 348 106 L 350 106 L 355 101 L 356 101 L 358 99 L 363 97 L 365 95 L 367 95 L 379 89 L 381 89 L 382 88 L 384 88 L 388 86 L 391 86 L 395 84 L 398 84 L 399 83 L 406 82 L 407 81 L 411 81 L 412 80 L 416 80 L 417 79 L 421 79 L 422 78 L 427 78 L 428 77 L 432 77 Z";

/**
 * Reorder the path's subpaths so the pen traces strictly from left → right.
 *
 * The raw signature artwork was authored in a middle-out order. We split
 * on the `M` (move-to) command boundaries, sort each subpath by its
 * starting X coordinate, then rejoin. When the stroke-dashoffset
 * animation runs, it draws subpaths in path-data order — so this re-sort
 * makes the pen visually start at the left edge of the wordmark and
 * advance rightward across "Rabi Adli", landing on the final exit
 * flourish last.
 */
function sortSubpathsLeftToRight(pathData: string): string {
  const subpaths = pathData
    .split(/(?=M\s)/)
    .map((s) => s.trim())
    .filter(Boolean);

  return subpaths
    .map((sub) => {
      const m = sub.match(/^M\s+(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/);
      const startX = m ? parseFloat(m[1]) : Number.POSITIVE_INFINITY;
      return { sub, startX };
    })
    .sort((a, b) => a.startX - b.startX)
    .map((s) => s.sub)
    .join(" ");
}

/* Pre-compute the sorted path once at module load — deterministic on both
 * server and client, so no risk of hydration mismatch. */
const SIGNATURE_PATH = sortSubpathsLeftToRight(SIGNATURE_PATH_RAW);

/* Absolute safety ceiling — if anything goes sideways with the animation
 * the preloader still gets out of the way. */
const ABSOLUTE_FAIL_SAFE_MS = 6000;

interface PreloaderProps {
  /** Skip on subsequent visits within the same browser session. */
  oncePerSession?: boolean;
}

/**
 * Signature-writing preloader.
 *
 * Uses the real Rabi Adli signature artwork (vectorised from the brand
 * wordmark) and draws it from left → right using a single stroke-dashoffset
 * animation. The path's subpaths are pre-sorted by their start-X so the
 * pen visually advances across the wordmark instead of jumping around in
 * the order the artwork was authored.
 *
 * Stays as stroke-only — no outline → fill cross-fade. Once the pen
 * finishes its final exit, the wordmark holds briefly, then the panel
 * blurs and fades to reveal the hero.
 *
 * Respects `prefers-reduced-motion` by snapping the whole sequence onto
 * a much faster timeline.
 */
export function Preloader({ oncePerSession = false }: PreloaderProps) {
  const [visible, setVisible] = useState(true);
  const [reveal, setReveal] = useState(0); // 0 — 1
  const [signatureDone, setSignatureDone] = useState(false);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [pathLength, setPathLength] = useState(0);

  // Measure total path length once on mount — needed for the
  // stroke-dasharray/-offset math.
  useEffect(() => {
    if (pathRef.current) {
      try {
        setPathLength(pathRef.current.getTotalLength());
      } catch {
        setPathLength(4000); // fallback
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (oncePerSession && sessionStorage.getItem("rabi-preloader-shown")) {
      setVisible(false);
      return;
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const drawDuration = prefersReduced ? 350 : 2400;
    const holdAfterDraw = prefersReduced ? 200 : 750;

    document.body.style.overflow = "hidden";

    const startTime = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / drawDuration);
      setReveal(EASE_PEN(t));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setSignatureDone(true);
        if (oncePerSession) sessionStorage.setItem("rabi-preloader-shown", "1");
        window.setTimeout(() => setVisible(false), holdAfterDraw);
      }
    };
    raf = requestAnimationFrame(tick);

    /* Absolute fail-safe — no matter what, hide the preloader within
     * 6s so a bad ref / crashed RAF / weird browser quirk can never
     * leave the user staring at a black screen. */
    const failSafe = window.setTimeout(() => {
      setVisible(false);
    }, ABSOLUTE_FAIL_SAFE_MS);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(failSafe);
    };
  }, [oncePerSession]);

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
          transition={{ duration: 0.75, ease: [0.42, 0, 0.58, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#050505" }}
        >
          {/* Signature + label stack */}
          <div className="relative flex flex-col items-center">
            <div className="relative w-[min(360px,82vw)] sm:w-[min(440px,75vw)] md:w-[min(520px,55vw)]">
              <svg
                viewBox="0 0 544 118"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto block"
                aria-label="Rabi Adli signature"
              >
                <path
                  ref={pathRef}
                  d={SIGNATURE_PATH}
                  fill={signatureDone ? "#F5F5F0" : "none"}
                  fillRule="evenodd"
                  stroke="#F5F5F0"
                  strokeWidth={signatureDone ? 0 : 1.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: pathLength || 4000,
                    strokeDashoffset: (pathLength || 4000) * (1 - reveal),
                    transition:
                      "fill 600ms cubic-bezier(0.22,1,0.36,1), stroke-width 600ms cubic-bezier(0.22,1,0.36,1)",
                  }}
                />
              </svg>
            </div>

            {/* Subtle "RABI ADLI" label — appears only after the
                signature is fully written. */}
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
