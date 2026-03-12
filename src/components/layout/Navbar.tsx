"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Work",    href: "#work"    },
  { label: "About",   href: "#about"   },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? "16px 48px" : "28px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "padding 0.4s ease, background 0.4s ease, backdrop-filter 0.4s ease",
        background: scrolled ? "rgba(28,2,130,0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-syne)",
          fontWeight: 800,
          fontSize: "13px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#FFFFFF",
          textDecoration: "none",
        }}
      >
        SARAKBI SPORT
      </Link>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "12px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              textDecoration: "none",
              transition: "color 0.25s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#B3F0CA")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
          >
            {link.label}
          </a>
        ))}

        <Link
          href="/projects"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "12px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#B3F0CA",
            textDecoration: "none",
            padding: "8px 18px",
            border: "1px solid rgba(179,240,202,0.35)",
            borderRadius: "100px",
            transition: "background 0.25s, border-color 0.25s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(179,240,202,0.1)";
            e.currentTarget.style.borderColor = "#B3F0CA";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "rgba(179,240,202,0.35)";
          }}
        >
          Projects →
        </Link>
      </div>
    </nav>
  );
}
