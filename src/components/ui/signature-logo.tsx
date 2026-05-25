"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SignatureLogoProps {
  className?: string;
  /** Kept for backwards compatibility — no-op on a text logo. */
  animate?: boolean;
  width?: number;
  height?: number;
  /** Kept for backwards compatibility — no-op on a text logo. */
  color?: string;
}

/**
 * Rabi Adli wordmark.
 * Renders as styled serif text. If `/images/logosignature.png` exists it is
 * shown instead — drop a white-on-transparent PNG with that name
 * to swap site-wide without code changes.
 */
export function SignatureLogo({
  className,
  width = 110,
  height = 28,
}: SignatureLogoProps) {
  const [imgFailed, setImgFailed] = React.useState(false);

  if (imgFailed) {
    return (
      <span
        className={cn(
          "inline-flex items-center font-serif italic text-[17px] tracking-[0.005em] leading-none select-none",
          className
        )}
      >
        Rabi Adli
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logosignature.png"
      alt="Rabi Adli"
      width={width}
      height={height}
      draggable={false}
      onError={() => setImgFailed(true)}
      className={cn("object-contain select-none", className)}
    />
  );
}
