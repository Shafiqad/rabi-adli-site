"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Luxe site-wide custom cursor.
 *
 * Renders a champagne dot with a soft trailing ring that follows the pointer
 * via spring physics. Native cursor is hidden globally on hover-capable
 * devices via the `using-custom-cursor` body class (see globals.css). Touch
 * devices fall back to the native interaction model.
 *
 * Click affordance: the dot + ring expand whenever the pointer is over an
 * interactive element (links, buttons, summary, label, inputs, or any
 * `data-cursor="hover"` element you opt-in).
 */
export function GlobalCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, {
    stiffness: 420,
    damping: 30,
    mass: 0.35,
  });
  const springY = useSpring(cursorY, {
    stiffness: 420,
    damping: 30,
    mass: 0.35,
  });

  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setCanHover(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    );
  }, []);

  useEffect(() => {
    if (!canHover) return;

    document.body.classList.add("using-custom-cursor");

    const interactiveSelector =
      "a, button, [role='button'], input, textarea, select, label, summary, [data-cursor='hover']";

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
      const target = e.target as HTMLElement | null;
      setHover(!!target?.closest(interactiveSelector));
    };
    const onDocLeave = () => setVisible(false);
    const onDocEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onDocLeave);
    document.addEventListener("mouseenter", onDocEnter);

    return () => {
      document.body.classList.remove("using-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onDocLeave);
      document.removeEventListener("mouseenter", onDocEnter);
    };
    // `visible` excluded intentionally — included only to short-circuit the
    // setState on every move; the listener itself doesn't need to re-attach.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canHover, cursorX, cursorY]);

  if (!canHover) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.25 } }}
    >
      <motion.span
        animate={{ scale: hover ? 2.2 : 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className="block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_rgba(184, 58, 58,0.75)]"
        style={{ mixBlendMode: "screen" }}
      />
      <motion.span
        animate={{
          scale: hover ? 1.65 : 1,
          opacity: hover ? 0.95 : 0.45,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        className="absolute inset-0 block h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/45"
      />
    </motion.div>
  );
}
