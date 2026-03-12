import React from "react";

interface IconProps {
  src: string;       // path to SVG in public/assets/illustrations/icons/
  alt?: string;
  size?: number;     // px
  className?: string;
}

/**
 * Icon
 * Drop SVG illustrations into public/assets/illustrations/icons/
 * and reference them here: <Icon src="/assets/illustrations/icons/arrow.svg" size={24} />
 */
export default function Icon({ src, alt = "", size = 24, className }: IconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={size} height={size} className={className} />
  );
}
