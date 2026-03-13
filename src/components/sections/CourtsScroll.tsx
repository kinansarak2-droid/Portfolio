"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Court data ─────────────────────────────────────────── */
const COURTS = [
  {
    id: "basketball",
    label: "Basketball Court",
    surface: "Maple Hardwood Parquet",
    tag: "NBA / FIBA",
    accent: "#FAF189",
    svgSrc: "/courts/basketball.svg",
  },
  {
    id: "football",
    label: "Football Pitch",
    surface: "Artificial Turf / Synthetic Grass",
    tag: "FIFA",
    accent: "#B3F0CA",
    svgSrc: "/courts/football.svg",
  },
  {
    id: "parquet",
    label: "Indoor Parquet",
    surface: "Engineered Wood Sports Floor",
    tag: "Multi-discipline",
    accent: "#FB9790",
    svgSrc: "/courts/parquet.svg",
  },
  {
    id: "multisport",
    label: "Multi-Sport Court",
    surface: "Polyurethane Composite",
    tag: "Versatile",
    accent: "#B3F0CA",
    svgSrc: "/courts/multisport.svg",
  },
  {
    id: "running",
    label: "Running Track",
    surface: "IAAF Certified Rubber Surface",
    tag: "Athletics",
    accent: "#FAF189",
    svgSrc: "/courts/running.svg",
  },
];

/* ─── Placeholder project data (6 per court) ─────────────── */
const PROJECTS = [
  { id: 1, label: "Project 01", year: "2024" },
  { id: 2, label: "Project 02", year: "2024" },
  { id: 3, label: "Project 03", year: "2023" },
  { id: 4, label: "Project 04", year: "2023" },
  { id: 5, label: "Project 05", year: "2022" },
  { id: 6, label: "Project 06", year: "2022" },
];

/* ─── Main Section ───────────────────────────────────────── */
export default function CourtsScroll() {
  const [activeIndex, setActiveIndex] = useState(0);

  /* Intersection observer — mark active court */
  useEffect(() => {
    const sections = document.querySelectorAll("[data-court-index]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(
              entry.target.getAttribute("data-court-index") ?? "0"
            );
            setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="courts" style={{ position: "relative" }}>

      {/* ── Fixed side nav dots ── */}
      <div style={{
        position: "fixed",
        right: "32px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        mixBlendMode: "difference",
      }}>
        {COURTS.map((c, i) => (
          <button
            key={c.id}
            onClick={() =>
              document
                .querySelector(`[data-court-index="${i}"]`)
                ?.scrollIntoView({ behavior: "smooth" })
            }
            title={c.label}
            style={{
              width: activeIndex === i ? 28 : 8,
              height: 8,
              borderRadius: 4,
              background:
                activeIndex === i ? c.accent : "rgba(255,255,255,0.35)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* ── Sticky label ── */}
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        pointerEvents: "none",
        padding: "28px 48px 0",
      }}>
        <motion.p
          animate={{ color: COURTS[activeIndex].accent }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "11px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Sarakbi Sport — Courts &amp; Surfaces
        </motion.p>
      </div>

      {/* ── Court panels ── */}
      {COURTS.map((court, i) => (
        <CourtPanel
          key={court.id}
          court={court}
          index={i}
          isActive={activeIndex === i}
        />
      ))}

      {/* ── Closing fade ── */}
      <div style={{
        height: "60px",
        background: "linear-gradient(to bottom, #B84B20, #1C0282)",
      }} />
    </section>
  );
}

/* ─── Individual court panel ─────────────────────────────── */
function CourtPanel({
  court,
  index,
  isActive,
}: {
  court: (typeof COURTS)[0];
  index: number;
  isActive: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const expandTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* When panel becomes active → start expansion timer */
  useEffect(() => {
    if (isActive) {
      /* Reset so it animates in fresh each time you arrive */
      setExpanded(false);
      setProjectsOpen(false);
      expandTimer.current = setTimeout(() => {
        setExpanded(true);
      }, 1400); // 1.4 s dwell before expanding
    } else {
      if (expandTimer.current) clearTimeout(expandTimer.current);
      setExpanded(false);
      setProjectsOpen(false);
    }
    return () => {
      if (expandTimer.current) clearTimeout(expandTimer.current);
    };
  }, [isActive]);

  const handleClick = useCallback(() => {
    if (expanded) setProjectsOpen((p) => !p);
  }, [expanded]);

  return (
    <div
      ref={panelRef}
      data-court-index={index}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#1C0282", /* indigo bg shows during collapsed state */
        cursor: expanded ? "pointer" : "default",
      }}
      onClick={handleClick}
    >

      {/* ── Court SVG — expands from centre ── */}
      <motion.div
        animate={{
          height: expanded ? "100%" : "50%",
        }}
        transition={{
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          overflow: "hidden",
        }}
      >
        <img
          src={court.svgSrc}
          alt={court.label}
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            userSelect: "none",
          }}
        />

        {/* Vignette — stronger while collapsed */}
        <motion.div
          animate={{ opacity: expanded ? 0.45 : 0.72 }}
          transition={{ duration: 0.9 }}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.04) 45%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
      </motion.div>

      {/* ── Hint lines visible during collapsed state ── */}
      <AnimatePresence>
        {!expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            {/* Top edge line */}
            <motion.div
              animate={{ scaleX: isActive ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                position: "absolute",
                top: "25%",
                left: 0,
                right: 0,
                height: "1px",
                background: `linear-gradient(to right, transparent, ${court.accent}55, transparent)`,
                transformOrigin: "left",
              }}
            />
            {/* Bottom edge line */}
            <motion.div
              animate={{ scaleX: isActive ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                position: "absolute",
                bottom: "25%",
                left: 0,
                right: 0,
                height: "1px",
                background: `linear-gradient(to right, transparent, ${court.accent}55, transparent)`,
                transformOrigin: "right",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Click hint (appears when expanded, before first click) ── */}
      <AnimatePresence>
        {expanded && !projectsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              position: "absolute",
              bottom: "68px",
              right: "48px",
              zIndex: 10,
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: court.accent,
              }}
            >
              Tap to explore projects
            </motion.span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke={court.accent} strokeWidth="1.2"/>
              <line x1="7" y1="4" x2="7" y2="10" stroke={court.accent} strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="4" y1="7" x2="10" y2="7" stroke={court.accent} strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Ghost index number ── */}
      <span style={{
        position: "absolute",
        top: "28px",
        left: "48px",
        fontFamily: "var(--font-syne)",
        fontWeight: 800,
        fontSize: "clamp(72px, 12vw, 160px)",
        lineHeight: 1,
        color: "rgba(255,255,255,0.06)",
        userSelect: "none",
        pointerEvents: "none",
        zIndex: 3,
      }}>
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* ── Bottom-left info block ── */}
      <motion.div
        animate={{
          y: expanded ? 0 : 16,
          opacity: expanded ? 1 : 0,
        }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          bottom: "56px",
          left: "48px",
          zIndex: 10,
          pointerEvents: "none",
          maxWidth: "520px",
        }}
      >
        <motion.span
          animate={{ backgroundColor: court.accent, color: "#1C0282" }}
          transition={{ duration: 0.5 }}
          style={{
            display: "inline-block",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "5px 14px",
            borderRadius: "100px",
            marginBottom: "16px",
          }}
        >
          {court.tag}
        </motion.span>

        <h2 style={{
          fontFamily: "var(--font-syne)",
          fontWeight: 800,
          fontSize: "clamp(36px, 6vw, 80px)",
          lineHeight: 0.95,
          letterSpacing: "-0.025em",
          color: "#FFFFFF",
          marginBottom: "12px",
          textTransform: "uppercase",
        }}>
          {court.label}
        </h2>

        <p style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "13px",
          color: "rgba(255,255,255,0.6)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}>
          {court.surface}
        </p>
      </motion.div>

      {/* ── Progress counter ── */}
      <motion.div
        animate={{ opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{
          position: "absolute",
          right: "48px",
          bottom: "56px",
          textAlign: "right",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <motion.p
          animate={{ color: court.accent }}
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 700,
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "4px",
          }}
        >
          {String(index + 1).padStart(2, "0")} / {String(COURTS.length).padStart(2, "0")}
        </motion.p>
        <p style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "10px",
          color: "rgba(255,255,255,0.4)",
          letterSpacing: "0.1em",
        }}>
          Sarakbi Sport
        </p>
      </motion.div>

      {/* ── Projects toolbar ── */}
      <AnimatePresence>
        {projectsOpen && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 20,
              padding: "20px 32px 28px",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.62) 100%)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderTop: `1px solid ${court.accent}22`,
            }}
          >
            {/* Toolbar header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}>
              <p style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "10px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: court.accent,
              }}>
                Projects — {court.label}
              </p>
              <button
                onClick={() => setProjectsOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "4px 0",
                }}
              >
                Close ✕
              </button>
            </div>

            {/* 6 project squares */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: "10px",
            }}>
              {PROJECTS.map((proj, pi) => (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.05 + pi * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    aspectRatio: "1 / 1",
                    background: "rgba(255,255,255,0.06)",
                    border: `1px solid rgba(255,255,255,0.1)`,
                    borderRadius: "4px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "10px",
                    cursor: "pointer",
                    transition: "background 0.2s, border-color 0.2s",
                    overflow: "hidden",
                    position: "relative",
                  }}
                  whileHover={{
                    background: `${court.accent}18`,
                    borderColor: `${court.accent}55`,
                  }}
                >
                  {/* Placeholder square fill */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(135deg, ${court.accent}10 0%, transparent 60%)`,
                  }} />

                  <p style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 700,
                    fontSize: "11px",
                    color: "#FFFFFF",
                    lineHeight: 1.2,
                    position: "relative",
                    zIndex: 1,
                  }}>
                    {proj.label}
                  </p>
                  <p style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "9px",
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.08em",
                    marginTop: "2px",
                    position: "relative",
                    zIndex: 1,
                  }}>
                    {proj.year}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scroll cue on first panel only ── */}
      {index === 0 && !expanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: 0.5 }}
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            pointerEvents: "none",
            zIndex: 5,
          }}
        >
          <span style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: court.accent,
          }}>Scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <rect x="6" y="1" width="4" height="8" rx="2" stroke={court.accent} strokeWidth="1.5"/>
            <circle cx="8" cy="4" r="1.5" fill={court.accent}>
              <animateTransform attributeName="transform" type="translate"
                values="0,0;0,3;0,0" dur="1.6s" repeatCount="indefinite"/>
            </circle>
            <path d="M4 18 L8 22 L12 18" stroke={court.accent} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </motion.div>
      )}

    </div>
  );
}
