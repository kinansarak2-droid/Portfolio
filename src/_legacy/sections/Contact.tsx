"use client";

import { useRef, useEffect, useState } from "react";

const socials = [
  { label: "LinkedIn",  href: "#" },
  { label: "Behance",   href: "#" },
  { label: "Instagram", href: "#" },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: "120px 48px 72px",
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Top */}
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: "opacity 1s ease, transform 1s ease",
      }}>
        <p style={{
          fontFamily: "var(--font-dm-sans)", fontSize: "11px",
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: "#FB9790", marginBottom: "36px",
        }}>
          Let&apos;s Connect
        </p>

        <h2 style={{
          fontFamily: "var(--font-syne)", fontWeight: 800,
          fontSize: "clamp(44px, 9vw, 124px)",
          letterSpacing: "-0.03em", lineHeight: 0.92,
          marginBottom: "56px",
        }}>
          LET&apos;S BUILD<br />
          <span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.3)" }}>
            SOMETHING
          </span>
          <br />TOGETHER.
        </h2>

        <a
          href="mailto:hello@sarakbisport.com"
          style={{
            fontFamily: "var(--font-syne)", fontWeight: 600,
            fontSize: "clamp(16px, 2.2vw, 28px)",
            color: "#B3F0CA", textDecoration: "none",
            borderBottom: "1px solid rgba(179,240,202,0.3)",
            paddingBottom: "4px",
            display: "inline-block",
            transition: "border-color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#B3F0CA")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(179,240,202,0.3)")}
        >
          hello@sarakbisport.com
        </a>
      </div>

      {/* Footer row */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "36px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        opacity: visible ? 1 : 0,
        transition: "opacity 1s ease 0.3s",
      }}>
        <span style={{
          fontFamily: "var(--font-dm-sans)", fontSize: "11px",
          color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em",
        }}>
          © 2025 Sarakbi Sport
        </span>

        <div style={{ display: "flex", gap: "32px" }}>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              style={{
                fontFamily: "var(--font-dm-sans)", fontSize: "11px",
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)", textDecoration: "none",
                transition: "color 0.25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
            >
              {s.label} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
