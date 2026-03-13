"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

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

/* ─── Placeholder projects ───────────────────────────────── */
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

  useEffect(() => {
    const sections = document.querySelectorAll("[data-court-index]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute("data-court-index") ?? "0");
            setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="courts" style={{ position: "relative" }}>

      {/* Side nav dots */}
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
              document.querySelector(`[data-court-index="${i}"]`)
                ?.scrollIntoView({ behavior: "smooth" })
            }
            title={c.label}
            style={{
              width: activeIndex === i ? 28 : 8,
              height: 8,
              borderRadius: 4,
              background: activeIndex === i ? c.accent : "rgba(255,255,255,0.35)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Sticky label */}
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

      {COURTS.map((court, i) => (
        <CourtPanel key={court.id} court={court} index={i} />
      ))}

      <div style={{ height: "60px", background: "linear-gradient(to bottom, #B84B20, #1C0282)" }} />
    </section>
  );
}

/* ─── Court panel ────────────────────────────────────────── */
function CourtPanel({
  court,
  index,
}: {
  court: (typeof COURTS)[0];
  index: number;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [isExpanded, setIsExpanded]     = useState(false);
  const [isHovering, setIsHovering]     = useState(false);
  const [showPulse, setShowPulse]       = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Scroll-driven height ──────────────────────────────── */
  /* offset: section enters from below → section exits above
     scrollYProgress 0   = top of panel touches bottom of viewport
     scrollYProgress 0.5 = panel is centred in viewport
     scrollYProgress 1   = bottom of panel touches top of viewport      */
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"],
  });

  /* 50 % → 100 % as the user scrolls the court to the centre.
     Fast scroll = partial reveal; slow scroll = full open.             */
  const heightPct = useTransform(scrollYProgress, [0.18, 0.52], ["50%", "100%"]);

  /* Track whether the court is fully open so clicks are enabled */
  useMotionValueEvent(heightPct, "change", (v) => {
    const num = parseFloat(v as string);
    setIsExpanded(num >= 98);
    /* Close projects if user scrolls away */
    if (num < 80) setProjectsOpen(false);
  });

  /* ── Hover → delayed pulse indicator ──────────────────── */
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    if (isExpanded) {
      hoverTimer.current = setTimeout(() => setShowPulse(true), 500);
    }
  }, [isExpanded]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setShowPulse(false);
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  }, []);

  /* Reset pulse timer when expansion state changes */
  useEffect(() => {
    if (!isExpanded) {
      setShowPulse(false);
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    }
  }, [isExpanded]);

  /* ── Click ─────────────────────────────────────────────── */
  const handleClick = useCallback(() => {
    if (!isExpanded) return;
    setProjectsOpen((p) => !p);
    setShowPulse(false);
  }, [isExpanded]);

  return (
    <div
      ref={panelRef}
      data-court-index={index}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#1C0282",
        cursor: isExpanded ? "pointer" : "default",
      }}
    >

      {/* ── Court SVG — scroll-driven height centred ── */}
      <motion.div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          translateY: "-50%",
          height: heightPct,
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
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

        {/* Bottom vignette */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.04) 50%, transparent 100%)",
          pointerEvents: "none",
        }} />
      </motion.div>

      {/* ── Crop edge lines (visible while collapsed) ── */}
      <motion.div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          translateY: "-50%",
          height: heightPct,
          pointerEvents: "none",
          zIndex: 4,
        }}
      >
        {/* Top edge */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: "5%",
            right: "5%",
            height: "1px",
            background: `linear-gradient(to right, transparent, ${court.accent}60, transparent)`,
            opacity: useTransform(heightPct, ["50%", "90%"], [1, 0]),
          }}
        />
        {/* Bottom edge */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            left: "5%",
            right: "5%",
            height: "1px",
            background: `linear-gradient(to right, transparent, ${court.accent}60, transparent)`,
            opacity: useTransform(heightPct, ["50%", "90%"], [1, 0]),
          }}
        />
      </motion.div>

      {/* ── Sonar pulse — appears after hovering on expanded court ── */}
      <AnimatePresence>
        {isExpanded && showPulse && !projectsOpen && (
          <motion.div
            key="pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              zIndex: 15,
            }}
          >
            {/* Three expanding rings */}
            {[0, 0.45, 0.9].map((delay, ri) => (
              <motion.div
                key={ri}
                animate={{ scale: [0.4, 2.2], opacity: [0.7, 0] }}
                transition={{
                  duration: 2,
                  delay,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                style={{
                  position: "absolute",
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  border: `1.5px solid ${court.accent}`,
                }}
              />
            ))}
            {/* Centre dot */}
            <div style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: court.accent,
              boxShadow: `0 0 12px ${court.accent}`,
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Ghost index ── */}
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

      {/* ── Info block — fades in as court expands ── */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "56px",
          left: "48px",
          zIndex: 10,
          pointerEvents: "none",
          maxWidth: "520px",
          opacity: useTransform(heightPct, ["60%", "90%"], [0, 1]),
          y: useTransform(heightPct, ["60%", "90%"], [24, 0]),
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

      {/* ── Counter ── */}
      <motion.div
        style={{
          position: "absolute",
          right: "48px",
          bottom: "56px",
          textAlign: "right",
          zIndex: 10,
          pointerEvents: "none",
          opacity: useTransform(heightPct, ["70%", "95%"], [0, 1]),
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

      {/* ── Projects toolbar — only when clicked ── */}
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
              background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.65) 100%)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              borderTop: `1px solid ${court.accent}25`,
            }}
          >
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
                  color: "rgba(255,255,255,0.45)",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "4px 0",
                }}
              >
                Close ✕
              </button>
            </div>

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
                  transition={{ duration: 0.4, delay: 0.04 + pi * 0.055, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ borderColor: `${court.accent}70`, background: `${court.accent}12` }}
                  style={{
                    aspectRatio: "1 / 1",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: "4px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "10px",
                    cursor: "pointer",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(135deg, ${court.accent}0D 0%, transparent 55%)`,
                  }} />
                  <p style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 700,
                    fontSize: "11px",
                    color: "#FFFFFF",
                    lineHeight: 1.2,
                    position: "relative",
                  }}>
                    {proj.label}
                  </p>
                  <p style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "9px",
                    color: "rgba(255,255,255,0.38)",
                    letterSpacing: "0.08em",
                    marginTop: "3px",
                    position: "relative",
                  }}>
                    {proj.year}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
