"use client";

import { useState } from "react";
import Link from "next/link";

const allProjects = [
  { id: "01", name: "Urban Flow",          type: "UX Design",          year: "2024", accent: "#B3F0CA", tags: ["UX", "Urban", "Wayfinding"],       desc: "A digital wayfinding system for high-density urban environments." },
  { id: "02", name: "Habitat Interface",   type: "Architecture",       year: "2024", accent: "#FAF189", tags: ["Architecture", "Computational"],    desc: "Computational design process for adaptive living spaces." },
  { id: "03", name: "Motion System",       type: "Interaction Design", year: "2023", accent: "#FB9790", tags: ["Motion", "Design Systems"],         desc: "A generative motion language for digital products." },
  { id: "04", name: "Spatial UI",          type: "UX + AR",            year: "2023", accent: "#B3F0CA", tags: ["UX", "AR", "Spatial"],              desc: "AR interface for spatial computing environments." },
  { id: "05", name: "Form Study",          type: "Architecture",       year: "2022", accent: "#FAF189", tags: ["Architecture", "Parametric"],       desc: "Parametric exploration of non-Euclidean structural form." },
  { id: "06", name: "Interaction Atlas",   type: "UX Design",          year: "2022", accent: "#B3F0CA", tags: ["UX", "Research", "Systems"],        desc: "Mapping interaction patterns across digital touchpoints." },
];

const filters = ["All", "UX Design", "Architecture", "Interaction Design", "UX + AR"];

export default function ProjectsPage() {
  const [active, setActive] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);

  const list = active === "All" ? allProjects : allProjects.filter((p) => p.type === active);

  return (
    <main style={{ padding: "140px 48px 80px" }}>

      {/* Back */}
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-dm-sans)", fontSize: "12px",
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)", textDecoration: "none",
          display: "inline-flex", alignItems: "center", gap: "8px",
          marginBottom: "60px", transition: "color 0.25s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#B3F0CA")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
      >
        ← Back
      </Link>

      {/* Header */}
      <div style={{ marginBottom: "56px" }}>
        <p style={{
          fontFamily: "var(--font-dm-sans)", fontSize: "11px",
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: "#B3F0CA", marginBottom: "16px",
        }}>
          All Work
        </p>
        <h1 style={{
          fontFamily: "var(--font-syne)", fontWeight: 800,
          fontSize: "clamp(44px, 8vw, 96px)", letterSpacing: "-0.025em", lineHeight: 1,
        }}>
          Projects
        </h1>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "52px", flexWrap: "wrap" }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            style={{
              fontFamily: "var(--font-dm-sans)", fontSize: "12px",
              padding: "8px 20px",
              border: `1px solid ${active === f ? "#B3F0CA" : "rgba(255,255,255,0.13)"}`,
              borderRadius: "100px",
              background: active === f ? "rgba(179,240,202,0.1)" : "transparent",
              color: active === f ? "#B3F0CA" : "rgba(255,255,255,0.45)",
              cursor: "pointer",
              transition: "all 0.25s", letterSpacing: "0.06em",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "2px",
      }}>
        {list.map((p, i) => (
          <div
            key={p.id}
            data-cursor
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              padding: "44px 36px",
              border: `1px solid ${hovered === i ? "rgba(179,240,202,0.18)" : "rgba(255,255,255,0.06)"}`,
              background: hovered === i ? "rgba(179,240,202,0.03)" : "rgba(255,255,255,0.01)",
              cursor: "pointer",
              transition: "background 0.3s, border-color 0.3s",
            }}
          >
            {/* Tags */}
            <div style={{ display: "flex", gap: "7px", flexWrap: "wrap", marginBottom: "28px" }}>
              {p.tags.map((tag) => (
                <span key={tag} style={{
                  fontFamily: "var(--font-dm-sans)", fontSize: "10px",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  padding: "4px 10px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "4px", color: "rgba(255,255,255,0.35)",
                }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{
              fontFamily: "var(--font-dm-sans)", fontSize: "11px",
              color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em", marginBottom: "10px",
            }}>
              {p.id}
            </div>

            <h2 style={{
              fontFamily: "var(--font-syne)", fontWeight: 700,
              fontSize: "26px", letterSpacing: "-0.01em",
              lineHeight: 1.1, marginBottom: "12px",
            }}>
              {p.name}
            </h2>

            <p style={{
              fontFamily: "var(--font-dm-sans)", fontSize: "14px",
              lineHeight: 1.6, color: "rgba(255,255,255,0.4)", marginBottom: "32px",
            }}>
              {p.desc}
            </p>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{
                fontFamily: "var(--font-dm-sans)", fontSize: "11px",
                color: "rgba(255,255,255,0.22)",
              }}>
                {p.year}
              </span>
              <span style={{
                fontFamily: "var(--font-dm-sans)", fontSize: "13px",
                color: hovered === i ? p.accent : "rgba(255,255,255,0.3)",
                transition: "color 0.3s",
              }}>
                View →
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
