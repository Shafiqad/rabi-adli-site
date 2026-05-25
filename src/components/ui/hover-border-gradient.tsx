"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

const movingMap: Record<Direction, string> = {
  TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  BOTTOM:
    "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  RIGHT:
    "radial-gradient(16.2% 41.2% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
};

// Hover highlight — kept neutral white-on-white (no gold) to honour the
// "less champagne" direction. Swap the rgba(...) below for a champagne tint
// if you ever want the hover state to warm up.
const highlight =
  "radial-gradient(75% 181.16% at 50% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)";

type ElementProps = React.HTMLAttributes<HTMLElement> & {
  href?: string;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
};

interface HoverBorderGradientProps
  extends React.PropsWithChildren<ElementProps> {
  as?: React.ElementType;
  containerClassName?: string;
  className?: string;
  duration?: number;
  clockwise?: boolean;
}

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Element = "button",
  duration = 1.2,
  clockwise = true,
  ...props
}: HoverBorderGradientProps) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("BOTTOM");

  const rotateDirection = (current: Direction): Direction => {
    const dirs: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const i = dirs.indexOf(current);
    const next = clockwise
      ? (i - 1 + dirs.length) % dirs.length
      : (i + 1) % dirs.length;
    return dirs[next];
  };

  useEffect(() => {
    if (hovered) return;
    const interval = setInterval(() => {
      setDirection((prev) => rotateDirection(prev));
    }, duration * 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered, duration]);

  return (
    <Element
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative inline-flex h-min w-fit content-center items-center justify-center overflow-visible rounded-full bg-black/40 box-decoration-clone p-px backdrop-blur-sm transition duration-500 hover:bg-black/60",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "z-10 w-auto rounded-[inherit] bg-background px-8 py-4 text-foreground text-[11px] tracking-[0.32em] uppercase font-medium whitespace-nowrap transition-colors duration-500",
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className="absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit]"
        style={{ filter: "blur(2px)", width: "100%", height: "100%" }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />
      <div className="absolute inset-0.5 z-[1] flex-none rounded-[100px] bg-background" />
    </Element>
  );
}
