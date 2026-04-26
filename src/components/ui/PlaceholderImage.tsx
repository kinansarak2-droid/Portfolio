"use client";

/**
 * PlaceholderImage — neutral image placeholder.
 * Renders a labeled box that respects an aspect ratio.
 *
 * Replaceable later with `<Image />` once real assets are available.
 * If `src` is provided AND non-empty, renders an actual <img>; else a
 * neutral block. This means switching to real images is a content-only
 * change at the data layer.
 */

import { cn } from "@/lib/utils";

interface Props {
  /** Optional real image URL — when set, the placeholder vanishes. */
  src?: string;
  /** Visible / aria label for the box. */
  label?: string;
  /** CSS aspect-ratio string, e.g. "16/9", "4/3", "1/1". */
  ratio?: string;
  className?: string;
}

export default function PlaceholderImage({
  src,
  label = "Image placeholder",
  ratio = "16/9",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "w-full bg-surface-alt overflow-hidden rounded-md border border-border",
        className,
      )}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={label}
    >
      {src ? (
        // Plain <img> avoids next/image config requirements; can be
        // upgraded later by swapping this single element.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={label}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full grid place-items-center text-xs uppercase tracking-wider text-text-subtle">
          {label}
        </div>
      )}
    </div>
  );
}
