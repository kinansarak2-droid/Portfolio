"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const projects = [
  {
    id: "01",
    name: "Urban Flow",
    type: "UX Design",
    year: "2024",
    accent: "#B3F0CA",
    desc: "A digital wayfinding system for high-density urban environments, merging spatial cognition with interaction design.",
  },
  {
    id: "02",
    name: "Habitat Interface",
    type: "Architecture",
    year: "2024",
    accent: "#FAF189",
    desc: "Computational design process for adaptive living spaces — parametric form-finding at human scale.",
  },
  {
    id: "03",
    name: "Motion System",
    type: "Interaction Design",
    year: "2023",
    accent: "#FB9790",
    desc: "A generative motion language for digital products — animation as a design system, not an afterthought.",
  },
  {
    id: "04",
    name: "Spatial UI",
    type: "UX + AR",
    year: "2023",
    accent: "#B3F0CA",
    desc: "Augmented reality interface for spatial computing — architecture and digital overlay, unified.",
  },
];

export default function Work() {
  const sectionRef   = useRef<HTMLElement>(null);
  const [visible, setVisible]     = useState(false);
  const [hovered, setHovered]     = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="work" ref={sectionRef} style={{ padding: "120px 0", minHeight: "90vh" }}>

      {/* Header */}
      <div
        style={{
          padding: "0 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "64px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <div>
          <p style={{
            fontFamily: "var(--font-dm-sans)", fontSize: "11px",
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "#B3F0CA", marginBottom: "14px",
          }}>
            Selected Work
          </p>
          <h2 style={{
            fontFamily: "var(--font-syne)", fontWeight: 800,
            fontSize: "clamp(38px, 5.5vw, 72px)", letterSpacing: "-0.025em", lineHeight: 1,
          }}>
            Projects
          </h2>
        </div>
        <Link
          href="/projects"
          style={{
            fontFamily: "var(--font-dm-sans)", fontSize: "12px",
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)", textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#B3F0CA")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
        >
          View All →
        </Link>
      </div>

      {/* Project rows */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        {projects.map((p, i) => (
          <div
            key={p.id}
            data-cursor
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              padding: "0 48px",
              display: "grid",
              gridTemplateColumns: "56px 1fr auto auto",
              gap: "24px",
              alignItems: "center",
              minHeight: hovered === i ? "100px" : "76px",
              cursor: "pointer",
              background: hovered === i ? "rgba(255,255,255,0.025)" : "transparent",
              transition: "background 0.35s, min-height 0.4s cubic-bezier(0.23,1,0.32,1)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transitionDelay: `${i * 0.08}s`,
            }}
          >
            {/* Number */}
            <span style={{
              fontFamily: "var(--font-dm-sans)", fontSize: "11px",
              color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em",
            }}>
              {p.id}
            </span>

            {/* Name + desc */}
            <div style={{ overflow: "hidden" }}>
              <h3 style={{
                fontFamily: "var(--font-syne)", fontWeight: 700,
                fontSize: "clamp(20px, 2.8vw, 34px)", letterSpacing: "-0.015em",
                color: hovered === i ? "#FFFFFF" : "rgba(255,255,255,0.82)",
                transition: "color 0.3s",
              }}>
                {p.name}
              </h3>
              <p style={{
                fontFamily: "var(--font-dm-sans)", fontSize: "13px",
                color: "rgba(255,255,255,0.45)", lineHeight: 1.5,
                maxHeight: hovered === i ? "44px" : "0px",
                overflow: "hidden",
                opacity: hovered === i ? 1 : 0,
                transition: "max-height 0.45s cubic-bezier(0.23,1,0.32,1), opacity 0.35s",
                marginTop: hovered === i ? "6px" : "0",
              }}>
                {p.desc}
              </p>
            </div>

            {/* Type */}
            <span style={{
              fontFamily: "var(--font-dm-sans)", fontSize: "11px",
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: hovered === i ? p.accent : "rgba(255,255,255,0.3)",
              transition: "color 0.3s", whiteSpace: "nowrap",
            }}>
              {p.type}
            </span>

            {/* Year + arrow */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <span style={{
                fontFamily: "var(--font-dm-sans)", fontSize: "12px",
                color: "rgba(255,255,255,0.25)",
              }}>
                {p.year}
              </span>
              <span style={{
                fontSize: "18px",
                color: hovered === i ? p.accent : "rgba(255,255,255,0.2)",
                transform: hovered === i ? "translateX(6px)" : "translateX(0)",
                transition: "color 0.3s, transform 0.35s cubic-bezier(0.23,1,0.32,1)",
                display: "inline-block",
              }}>
                →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
