"use client";

import Cursor from "@/components/ui/Cursor";

/**
 * PageWrapper
 * 
 * Wraps the entire app. Add global UI here:
 * - Custom cursor
 * - Navbar (when ready)
 * - Smooth scroll provider
 * - Theme provider
 */

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Cursor />
      {children}
    </>
  );
}
