"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If already in view (e.g. hero, above-the-fold, or no observer) — reveal immediately.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setRevealed(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    obs.observe(el);

    // Safety fallback — force visible after 2s in case observer never fires
    // (headless / scrape / non-scrolling agents).
    const fallback = window.setTimeout(() => setRevealed(true), 2000);

    return () => {
      obs.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", revealed && "in-view", className)}
      style={{
        animationDelay: delay ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </div>
  );
}
