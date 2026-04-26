"use client";

import { useInView } from "@/hooks/useInView";
import { useRef } from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;   // ms
  duration?: number; // ms
  className?: string;
}

/**
 * FadeIn
 * Wraps children and fades them in when they enter the viewport.
 * Uses the useInView hook (Intersection Observer).
 */
export default function FadeIn({ children, delay = 0, duration = 600, className }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity ${duration}ms var(--ease-smooth) ${delay}ms, transform ${duration}ms var(--ease-smooth) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
