"use client";

import { useEffect, useState, type RefObject } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean; // only trigger once (default: true)
}

/**
 * useInView
 * Returns true when the ref element is visible in the viewport.
 */
export function useInView(
  ref: RefObject<Element | null>,
  { threshold = 0.1, rootMargin = "0px", once = true }: UseInViewOptions = {}
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, once]);

  return inView;
}
