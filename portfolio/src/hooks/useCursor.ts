"use client";

import { useEffect, useState } from "react";

export type CursorState = "default" | "pointer" | "drag" | "hidden";

interface CursorData {
  x: number;
  y: number;
  state: CursorState;
}

/**
 * useCursor
 * 
 * Tracks mouse position and current cursor state.
 * State changes when hovering over elements with data-cursor attribute:
 *   <a data-cursor="pointer">Link</a>
 *   <div data-cursor="drag">Draggable</div>
 *   <div data-cursor="hidden">Hidden</div>
 */
export function useCursor(): CursorData {
  const [cursor, setCursor] = useState<CursorData>({ x: 0, y: 0, state: "default" });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const nearest = target.closest("[data-cursor]") as HTMLElement | null;
      const state = (nearest?.dataset.cursor as CursorState) ?? "default";

      setCursor({ x: e.clientX, y: e.clientY, state });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return cursor;
}
