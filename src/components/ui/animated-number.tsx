"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  /** Target value to count up to. */
  to: number;
  /** Text prepended before the number (e.g. "€", "$"). Rendered inside the
   *  same span so background-clip / gradient styles apply uniformly. */
  prefix?: string;
  /** Text appended after the number (e.g. "K+", "+"). */
  suffix?: string;
  /** Animation duration in milliseconds. */
  duration?: number;
  /** Delay before the count-up starts (ms after intersection). */
  delay?: number;
  /** Optional decimal places. */
  decimals?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Counts from 0 up to `to` once the element enters the viewport.
 * Respects prefers-reduced-motion by snapping to the final value.
 */
export function AnimatedNumber({
  to,
  prefix = "",
  suffix = "",
  duration = 2200,
  delay = 0,
  decimals = 0,
  className,
  style,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(to);
      return;
    }

    const start = () => {
      if (started.current) return;
      started.current = true;
      const startTime = performance.now() + delay;
      const tick = (now: number) => {
        if (now < startTime) {
          requestAnimationFrame(tick);
          return;
        }
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        // easeOutQuart — fast start, smooth landing
        const eased = 1 - Math.pow(1 - t, 4);
        // Only re-render when the visible value actually changes — avoids
        // unnecessary work + the visual jitter that comes with it.
        const next =
          decimals > 0
            ? Number((to * eased).toFixed(decimals))
            : Math.round(to * eased);
        setDisplay((prev) => (next !== prev ? next : prev));
        if (t < 1) requestAnimationFrame(tick);
        else setDisplay(to);
      };
      requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            start();
            obs.unobserve(entry.target);
          }
        });
      },
      // Fires when ~20% of the number is in view, slightly inset from the
      // viewport edge so the user actually catches the count-up in motion.
      { threshold: 0.2, rootMargin: "0px 0px -5% 0px" }
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
    };
  }, [to, duration, delay]);

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString("en-US");

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
