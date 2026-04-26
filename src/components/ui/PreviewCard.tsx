"use client";

/**
 * PreviewCard — generic card used by category grids and previews.
 *
 * Inputs are deliberately string-typed (already-localised) to keep
 * this component free of locale logic. The caller resolves the
 * LocalizedString.
 */

import Link from "next/link";
import PlaceholderImage from "./PlaceholderImage";

interface Props {
  title:        string;
  description?: string;
  href?:        string;
  imageSrc?:    string;
  imageLabel?:  string;
  imageRatio?:  string;
  meta?:        string; // small label below title
}

export default function PreviewCard({
  title, description, href, imageSrc, imageLabel, imageRatio = "4/3", meta,
}: Props) {
  const Card = (
    <article className="group rounded-md border border-border bg-bg overflow-hidden transition-all duration-base hover:shadow-sm">
      <PlaceholderImage
        src={imageSrc}
        label={imageLabel ?? title}
        ratio={imageRatio}
        className="rounded-none border-0 border-b border-border"
      />
      <div className="p-4">
        {meta ? (
          <p className="text-xs uppercase tracking-wider text-text-subtle mb-1">
            {meta}
          </p>
        ) : null}
        <h3 className="text-md font-display">{title}</h3>
        {description ? (
          <p className="mt-1.5 text-sm text-text-muted">{description}</p>
        ) : null}
      </div>
    </article>
  );

  return href ? (
    <Link href={href} className="block focus:outline-none focus:ring-2 focus:ring-text rounded-md">
      {Card}
    </Link>
  ) : Card;
}
