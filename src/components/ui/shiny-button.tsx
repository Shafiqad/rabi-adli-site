"use client";

import type React from "react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { cn } from "@/lib/utils";

type Size = "sm" | "md";

/** Padding + type size per size variant. Look (rounded pill, animated
 *  hover-border, bg-background fill, foreground uppercase text) stays
 *  identical across sizes so all CTAs read as the same button. */
const SIZE_CLASS: Record<Size, string> = {
  sm: "px-4 py-1.5 text-[10px]",
  md: "px-8 py-4 text-[11px]",
};

interface ShinyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  size?: Size;
}

export function ShinyButton({
  children,
  onClick,
  href,
  target,
  rel,
  className,
  size = "md",
}: ShinyButtonProps) {
  const inner = cn(
    "bg-background text-foreground tracking-[0.32em] uppercase font-medium whitespace-nowrap",
    SIZE_CLASS[size],
    className
  );

  if (href) {
    return (
      <HoverBorderGradient
        as="a"
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={inner}
      >
        {children}
      </HoverBorderGradient>
    );
  }
  return (
    <HoverBorderGradient as="button" type="button" onClick={onClick} className={inner}>
      {children}
    </HoverBorderGradient>
  );
}
