"use client";

import { useRef, useEffect, useState } from "react";

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // 0 = no parallax, 1 = full scroll speed (default: 0.3)
  className?: string;
}

/**
 * Parallax
 * Applies a vertical parallax offset to children based on scroll position.
 */
export default function Parallax({ children, speed = 0.3, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      setOffset(scrolled * speed * -0.5);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      <div style={{ transform: `translateY(${offset}px)` }}>
        {children}
      </div>
    </div>
  );
}
