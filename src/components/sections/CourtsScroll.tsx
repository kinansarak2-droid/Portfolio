"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  motion, AnimatePresence,
  useScroll, useTransform, useMotionValueEvent,
} from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Court data
   photoSrc  → optional real-photo background (shown after click)
   outlines  → path `d` strings for the draw animation
   outlineStroke → stroke colour from Illustrator export
   viewBox   → matches the Illustrator artboard
───────────────────────────────────────────────────────────── */
const FOOTBALL_OUTLINES = [
  // Left half boundary + goal lines (large composite path)
  { d: "M324.1,255c0,37.3,30.2,67.6,67.5,67.8v185.5H1.8V405h121v-94.9c16.2-12.6,27-32.7,27-55s-10.8-42.3-27-54.9v-95.9H1.8V1.4h389.9v185.8C354.3,187.4,324.1,217.7,324.1,255z", delay: 0 },
  // Right half boundary + goal lines
  { d: "M633.7,255.1c0,22.3,10.8,42.4,27,55V405h121v103.3H391.8V322.8h0.2c37.2-0.2,67.4-30.5,67.4-67.8c0-37.3-30.1-67.6-67.4-67.8h-0.2V1.4h389.9v102.9h-121v95.9C644.5,212.8,633.7,232.8,633.7,255.1z", delay: 0.08 },
  // Centre circle
  { d: "M459.4,255c0,37.2-30,67.4-67.1,67.8h-0.6c-37.3-0.1-67.5-30.5-67.5-67.8c0-37.4,30.2-67.6,67.5-67.8h0.6C429.4,187.6,459.4,217.8,459.4,255z", delay: 0.18 },
  // Left penalty area (polygon → path)
  { d: "M122.8,104.3 L122.8,405 L1.8,405 L1.8,322.9 L41,322.9 L41,186.8 L1.8,186.8 L1.8,104.3 Z", delay: 0.28 },
  // Right penalty area
  { d: "M742.5,186.8 L742.5,322.9 L781.7,322.9 L781.7,405 L660.7,405 L660.7,104.3 L781.7,104.3 L781.7,186.8 Z", delay: 0.33 },
  // Left penalty arc
  { d: "M149.8,255.1c0,22.3-10.8,42.4-27,55V200.2C139,212.8,149.8,232.8,149.8,255.1z", delay: 0.4 },
  // Right penalty arc
  { d: "M660.7,200.2v109.9c-16.2-12.6-27-32.7-27-55S644.5,212.8,660.7,200.2z", delay: 0.44 },
  // Left goal area
  { d: "M1.8,186.8 L41,186.8 L41,322.9 L1.8,322.9 Z", delay: 0.5 },
  // Right goal area
  { d: "M742.5,186.8 L781.7,186.8 L781.7,322.9 L742.5,322.9 Z", delay: 0.5 },
  // Half-way vertical line (centre)
  { d: "M391.6,187.2 L391.6,321.8", delay: 0.14 },
];

const COURTS = [
  {
    id: "basketball",
    label: "Basketball Court",
    surface: "Maple Hardwood Parquet",
    tag: "NBA / FIBA",
    accent: "#FAF189",
    svgSrc: "/courts/basketball.svg",
    photoSrc: null,
  },
  {
    id: "football",
    label: "Football Pitch",
    surface: "Artificial Turf / Synthetic Grass",
    tag: "FIFA",
    accent: "#B3F0CA",
    svgSrc: "/courts/football.svg",
    /* user must place photo at public/courts/Images/pexels-tomfisk-3448250.jpg */
    photoSrc: "/courts/Images/pexels-tomfisk-3448250.jpg",
  },
  {
    id: "parquet",
    label: "Indoor Parquet",
    surface: "Engineered Wood Sports Floor",
    tag: "Multi-discipline",
    accent: "#FB9790",
    svgSrc: "/courts/parquet.svg",
    photoSrc: null,
  },
  {
    id: "multisport",
    label: "Multi-Sport Court",
    surface: "Polyurethane Composite",
    tag: "Versatile",
    accent: "#B3F0CA",
    svgSrc: "/courts/multisport.svg",
    photoSrc: null,
  },
  {
    id: "running",
    label: "Running Track",
    surface: "IAAF Certified Rubber Surface",
    tag: "Athletics",
    accent: "#FAF189",
    svgSrc: "/courts/running.svg",
    photoSrc: null,
  },
];

const PROJECTS = [
  { id: 1, label: "Project 01", year: "2024" },
  { id: 2, label: "Project 02", year: "2024" },
  { id: 3, label: "Project 03", year: "2023" },
  { id: 4, label: "Project 04", year: "2023" },
  { id: 5, label: "Project 05", year: "2022" },
  { id: 6, label: "Project 06", year: "2022" },
];

/* ─────────────────────────────────────────────────────────────
   Main section
───────────────────────────────────────────────────────────── */
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
        position: "fixed", right: "32px", top: "50%",
        transform: "translateY(-50%)", zIndex: 100,
        display: "flex", flexDirection: "column", gap: "14px",
        mixBlendMode: "difference",
      }}>
        {COURTS.map((c, i) => (
          <button key={c.id}
            onClick={() => document.querySelector(`[data-court-index="${i}"]`)?.scrollIntoView({ behavior: "smooth" })}
            title={c.label}
            style={{
              width: activeIndex === i ? 28 : 8, height: 8, borderRadius: 4,
              background: activeIndex === i ? c.accent : "rgba(255,255,255,0.35)",
              border: "none", cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)", padding: 0,
            }}
          />
        ))}
      </div>

      {/* Sticky label */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, pointerEvents: "none", padding: "28px 48px 0" }}>
        <motion.p
          animate={{ color: COURTS[activeIndex].accent }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase" }}
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

/* ─────────────────────────────────────────────────────────────
   Court panel
───────────────────────────────────────────────────────────── */
function CourtPanel({
  court,
  index,
}: {
  court: (typeof COURTS)[0];
  index: number;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  /* Scroll-driven height */
  const { scrollYProgress } = useScroll({ target: panelRef, offset: ["start end", "end start"] });
  const heightPct    = useTransform(scrollYProgress, [0.18, 0.52], ["50%", "100%"]);
  const edgeOpacity  = useTransform(scrollYProgress, [0.18, 0.45], [1, 0]);
  const infoOpacity  = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const infoY        = useTransform(scrollYProgress, [0.25, 0.45], [24, 0]);
  const counterOpacity = useTransform(scrollYProgress, [0.32, 0.49], [0, 1]);

  /* Expansion + interaction state */
  const [isExpanded,   setIsExpanded]   = useState(false);
  const [isHovering,   setIsHovering]   = useState(false);
  const [showPulse,    setShowPulse]    = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);

  /* Football-specific click phases */
  const [bgPhase,      setBgPhase]      = useState<"bg" | "photo">("bg");
  const [drawKey,      setDrawKey]      = useState(0);
  const [toolbarReady, setToolbarReady] = useState(false);
  const toolbarTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIsExpanded(v >= 0.51);
    if (v < 0.3) {
      /* Scrolled away — reset football to default state */
      setBgPhase("bg");
      setDrawKey(0);
      setToolbarReady(false);
      setProjectsOpen(false);
    }
    if (v < 0.38) setProjectsOpen(false);
  });

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    if (isExpanded && !projectsOpen) {
      hoverTimer.current = setTimeout(() => setShowPulse(true), 500);
    }
  }, [isExpanded, projectsOpen]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setShowPulse(false);
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  }, []);

  useEffect(() => {
    if (!isExpanded || projectsOpen) {
      setShowPulse(false);
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    }
  }, [isExpanded, projectsOpen]);

  const handleClick = useCallback(() => {
    if (!isExpanded) return;

    if (court.photoSrc) {
      /* ── Football layered flow ── */
      if (bgPhase === "bg") {
        setBgPhase("photo");
        setDrawKey((k) => k + 1);
        setToolbarReady(false);
        setShowPulse(false);
        if (toolbarTimer.current) clearTimeout(toolbarTimer.current);
        /* Toolbar appears after lines finish drawing (~1.5 s) */
        toolbarTimer.current = setTimeout(() => setToolbarReady(true), 1500);
      } else {
        /* Already in photo state: toggle toolbar */
        setProjectsOpen((p) => !p);
      }
    } else {
      /* Regular courts: toggle toolbar immediately */
      setProjectsOpen((p) => !p);
      setShowPulse(false);
    }
  }, [isExpanded, court.photoSrc, bgPhase]);

  /* Show toolbar for football once lines are drawn */
  useEffect(() => {
    if (toolbarReady && court.photoSrc) setProjectsOpen(true);
  }, [toolbarReady, court.photoSrc]);

  return (
    <div
      ref={panelRef}
      data-court-index={index}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        position: "relative", width: "100%", height: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", background: "#1C0282",
        cursor: isExpanded ? "pointer" : "default",
      }}
    >

      {/* ── SVG layer wrapper — scroll-driven height ── */}
      <motion.div style={{
        position: "absolute", left: 0, right: 0,
        top: "50%", translateY: "-50%",
        height: heightPct, overflow: "hidden",
      }}>

        {court.photoSrc ? (
          /* ── Football: three stacked layers ── */
          <>
            {/* Layer 1 — illustrated background (fades out on click) */}
            <motion.img
              src={court.svgSrc}
              alt="Football background"
              draggable={false}
              animate={{ opacity: bgPhase === "bg" ? 1 : 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
            />

            {/* Layer 2 — photo (fades in on click) */}
            <motion.img
              src={court.photoSrc}
              alt="Football photo"
              draggable={false}
              animate={{ opacity: bgPhase === "photo" ? 1 : 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
            />

            {/* Layer 3 — animated outline SVG */}
            <FootballOutlines drawKey={drawKey} />
          </>
        ) : (
          /* ── Regular courts: single image ── */
          <img
            src={court.svgSrc}
            alt={court.label}
            draggable={false}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", userSelect: "none" }}
          />
        )}

        {/* Bottom vignette */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.04) 50%, transparent 100%)",
        }} />
      </motion.div>

      {/* ── Crop edge lines ── */}
      <motion.div style={{
        position: "absolute", left: 0, right: 0,
        top: "50%", translateY: "-50%",
        height: heightPct, pointerEvents: "none", zIndex: 4,
      }}>
        <motion.div style={{
          position: "absolute", top: 0, left: "5%", right: "5%", height: "1px",
          background: `linear-gradient(to right, transparent, ${court.accent}60, transparent)`,
          opacity: edgeOpacity,
        }} />
        <motion.div style={{
          position: "absolute", bottom: 0, left: "5%", right: "5%", height: "1px",
          background: `linear-gradient(to right, transparent, ${court.accent}60, transparent)`,
          opacity: edgeOpacity,
        }} />
      </motion.div>

      {/* ── Sonar pulse ── */}
      <AnimatePresence>
        {isExpanded && showPulse && !projectsOpen && isHovering && (
          <motion.div
            key="pulse"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute", inset: 0, display: "flex",
              alignItems: "center", justifyContent: "center",
              pointerEvents: "none", zIndex: 15,
            }}
          >
            {[0, 0.45, 0.9].map((delay, ri) => (
              <motion.div key={ri}
                animate={{ scale: [0.4, 2.2], opacity: [0.7, 0] }}
                transition={{ duration: 2, delay, repeat: Infinity, ease: "easeOut" }}
                style={{
                  position: "absolute", width: 72, height: 72,
                  borderRadius: "50%", border: `1.5px solid ${court.accent}`,
                }}
              />
            ))}
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: court.accent, boxShadow: `0 0 12px ${court.accent}` }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Ghost index ── */}
      <span style={{
        position: "absolute", top: "28px", left: "48px",
        fontFamily: "var(--font-syne)", fontWeight: 800,
        fontSize: "clamp(72px, 12vw, 160px)", lineHeight: 1,
        color: "rgba(255,255,255,0.06)", userSelect: "none",
        pointerEvents: "none", zIndex: 3,
      }}>
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* ── Info block ── */}
      <motion.div style={{
        position: "absolute", bottom: "56px", left: "48px",
        zIndex: 10, pointerEvents: "none", maxWidth: "520px",
        opacity: infoOpacity, y: infoY,
      }}>
        <motion.span
          animate={{ backgroundColor: court.accent, color: "#1C0282" }}
          transition={{ duration: 0.5 }}
          style={{
            display: "inline-block", fontFamily: "var(--font-dm-sans)",
            fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em",
            textTransform: "uppercase", padding: "5px 14px",
            borderRadius: "100px", marginBottom: "16px",
          }}
        >
          {court.tag}
        </motion.span>
        <h2 style={{
          fontFamily: "var(--font-syne)", fontWeight: 800,
          fontSize: "clamp(36px, 6vw, 80px)", lineHeight: 0.95,
          letterSpacing: "-0.025em", color: "#FFFFFF",
          marginBottom: "12px", textTransform: "uppercase",
        }}>
          {court.label}
        </h2>
        <p style={{
          fontFamily: "var(--font-dm-sans)", fontSize: "13px",
          color: "rgba(255,255,255,0.6)", letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}>
          {court.surface}
        </p>
      </motion.div>

      {/* ── Counter ── */}
      <motion.div style={{
        position: "absolute", right: "48px", bottom: "56px",
        textAlign: "right", zIndex: 10, pointerEvents: "none",
        opacity: counterOpacity,
      }}>
        <motion.p animate={{ color: court.accent }} style={{
          fontFamily: "var(--font-syne)", fontWeight: 700,
          fontSize: "11px", letterSpacing: "0.18em",
          textTransform: "uppercase", marginBottom: "4px",
        }}>
          {String(index + 1).padStart(2, "0")} / {String(COURTS.length).padStart(2, "0")}
        </motion.p>
        <p style={{
          fontFamily: "var(--font-dm-sans)", fontSize: "10px",
          color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em",
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
              position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 20,
              padding: "20px 32px 28px",
              background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 100%)",
              backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
              borderTop: `1px solid ${court.accent}25`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: court.accent }}>
                Projects — {court.label}
              </p>
              <button
                onClick={() => setProjectsOpen(false)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-dm-sans)",
                  fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 0",
                }}
              >
                Close ✕
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "10px" }}>
              {PROJECTS.map((proj, pi) => (
                <motion.div key={proj.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.04 + pi * 0.055, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ borderColor: `${court.accent}70`, background: `${court.accent}12` }}
                  style={{
                    aspectRatio: "1 / 1", background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)", borderRadius: "4px",
                    display: "flex", flexDirection: "column",
                    justifyContent: "flex-end", padding: "10px",
                    cursor: "pointer", overflow: "hidden", position: "relative",
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${court.accent}0D 0%, transparent 55%)` }} />
                  <p style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "11px", color: "#FFFFFF", lineHeight: 1.2, position: "relative" }}>{proj.label}</p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", color: "rgba(255,255,255,0.38)", letterSpacing: "0.08em", marginTop: "3px", position: "relative" }}>{proj.year}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Football outline SVG — animated paths
   drawKey increment → all paths remount → animate 0 → 1
───────────────────────────────────────────────────────────── */
function FootballOutlines({ drawKey }: { drawKey: number }) {
  const isFirstRender = drawKey === 0;

  return (
    <svg
      viewBox="0 0 783.7 509.6"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
      }}
    >
      {FOOTBALL_OUTLINES.map((p, i) => (
        <motion.path
          /* key change re-mounts → triggers animation from 0 */
          key={`${drawKey}-${i}`}
          d={p.d}
          fill="none"
          stroke="#E02239"
          strokeWidth="2.8346"
          initial={{ pathLength: isFirstRender ? 1 : 0, opacity: isFirstRender ? 1 : 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 1.1, delay: p.delay, ease: "easeInOut" },
            opacity:    { duration: 0.01, delay: p.delay },
          }}
        />
      ))}
    </svg>
  );
}
