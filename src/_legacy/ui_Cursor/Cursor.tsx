"use client";

import { useEffect, useRef, useState } from "react";
import { useCursor } from "@/hooks/useCursor";

/**
 * Cursor
 * 
 * Replaces the native OS cursor with a custom image.
 * Image files live in public/assets/cursor/
 * 
 * States: "default" | "pointer" | "drag" | "hidden"
 * 
 * TODO: Drop your cursor PNGs into public/assets/cursor/ and
 *       update the imageSrc map below.
 */

const cursorImages: Record<string, string> = {
  default: "/assets/cursor/default.png",
  pointer: "/assets/cursor/pointer.png",
  drag:    "/assets/cursor/drag.png",
  hidden:  "/assets/cursor/hidden.png",
};

export default function Cursor() {
  const { x, y, state } = useCursor();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.add("custom-cursor");
    return () => {
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 9999,
        transition: "opacity 0.2s ease",
        opacity: state === "hidden" ? 0 : 1,
      }}
    >
      {/* TODO: Replace with <Image> once you have cursor PNGs */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          backgroundColor: "var(--color-accent)",
          mixBlendMode: "difference",
        }}
      />
    </div>
  );
}
