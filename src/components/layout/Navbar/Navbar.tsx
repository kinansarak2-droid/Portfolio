"use client";

import { nav } from "@/data/nav";

/**
 * Navbar
 * 
 * TODO: Build your navigation here.
 * Nav links are defined in src/data/nav.ts
 */

export default function Navbar() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "20px var(--spacing-gutter)",
      }}
    >
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* TODO: Logo */}
        <span style={{ fontWeight: 700 }}>Logo</span>

        {/* TODO: Nav links */}
        <ul style={{ display: "flex", gap: 32, listStyle: "none" }}>
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} style={{ color: "var(--color-text-muted)" }}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
