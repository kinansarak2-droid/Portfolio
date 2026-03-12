"use client";

import { useRef, useEffect, useState } from "react";

const skills = [
  "Architecture", "UX Design", "Computational Design",
  "Motion Design", "Interaction Design", "Parametric Modeling",
  "User Research", "Design Systems", "Spatial Computing",
  "Prototyping", "Creative Direction", "Design Thinking",
];

const stats = [
  { value: "7+",  label: "Years" },
  { value: "30+", label: "Projects" },
  { value: "4",   label: "Industries" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "120px 48px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "80px",
        alignItems: "start",
      }}
    >
      {/* Left — text */}
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-32px)",
        transition: "opacity 0.9s ease, transform 0.9s ease",
      }}>
        <p style={{
          fontFamily: "var(--font-dm-sans)", fontSize: "11px",
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: "#FAF189", marginBottom: "24px",
        }}>
          About
        </p>

        <h2 style={{
          fontFamily: "var(--font-syne)", fontWeight: 800,
          fontSize: "clamp(32px, 3.8vw, 52px)", letterSpacing: "-0.02em",
          lineHeight: 1.1, marginBottom: "32px",
        }}>
          Space is Interface.<br />Interface is Space.
        </h2>

        <p style={{
          fontFamily: "var(--font-dm-sans)", fontSize: "16px",
          lineHeight: 1.78, color: "rgba(255,255,255,0.6)", marginBottom: "20px",
        }}>
          I&apos;m Sarakbi Sport — an architect and UX designer who believes the best
          interactions are architectural: structured, purposeful, and alive with possibility.
        </p>
        <p style={{
          fontFamily: "var(--font-dm-sans)", fontSize: "16px",
          lineHeight: 1.78, color: "rgba(255,255,255,0.6)",
        }}>
          My practice lives at the intersection of spatial thinking and digital
          interaction, guided by computational logic and a deep love for motion,
          form, and the experience of moving through designed space.
        </p>

        {/* Stats */}
        <div style={{
          display: "flex", gap: "48px",
          marginTop: "52px", paddingTop: "36px",
          borderTop: "1px solid rgba(255,255,255,0.09)",
        }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{
                fontFamily: "var(--font-syne)", fontWeight: 800,
                fontSize: "42px", color: "#B3F0CA",
                lineHeight: 1, marginBottom: "6px",
              }}>
                {s.value}
              </div>
              <div style={{
                fontFamily: "var(--font-dm-sans)", fontSize: "11px",
                color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — skills */}
      <div style={{
        paddingTop: "56px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(32px)",
        transition: "opacity 0.9s ease 0.18s, transform 0.9s ease 0.18s",
      }}>
        <p style={{
          fontFamily: "var(--font-dm-sans)", fontSize: "11px",
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.28)", marginBottom: "24px",
        }}>
          Disciplines
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {skills.map((skill) => (
            <span
              key={skill}
              data-cursor
              style={{
                fontFamily: "var(--font-dm-sans)", fontSize: "13px",
                padding: "9px 18px",
                border: "1px solid rgba(255,255,255,0.13)",
                borderRadius: "100px",
                color: "rgba(255,255,255,0.6)",
                cursor: "default",
                transition: "border-color 0.3s, color 0.3s, background 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#B3F0CA";
                e.currentTarget.style.color = "#B3F0CA";
                e.currentTarget.style.background = "rgba(179,240,202,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.13)";
                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
