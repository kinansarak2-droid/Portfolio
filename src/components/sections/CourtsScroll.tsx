"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ─── Court data ─────────────────────────────────────────── */
const COURTS = [
  {
    id: "basketball",
    label: "Basketball Court",
    surface: "Maple Hardwood Parquet",
    tag: "NBA / FIBA",
    accent: "#FAF189",
    bg: "#C8860A",
    component: BasketballCourt,
  },
  {
    id: "football",
    label: "Football Pitch",
    surface: "Artificial Turf / Synthetic Grass",
    tag: "FIFA",
    accent: "#B3F0CA",
    bg: "#1F6B32",
    component: FootballCourt,
  },
  {
    id: "parquet",
    label: "Indoor Parquet",
    surface: "Engineered Wood Sports Floor",
    tag: "Multi-discipline",
    accent: "#FB9790",
    bg: "#8B5E2C",
    component: ParquetCourt,
  },
  {
    id: "multisport",
    label: "Multi-Sport Court",
    surface: "Polyurethane Composite",
    tag: "Versatile",
    accent: "#B3F0CA",
    bg: "#1C4FA8",
    component: MultiSportCourt,
  },
  {
    id: "running",
    label: "Running Track",
    surface: "IAAF Certified Rubber Surface",
    tag: "Athletics",
    accent: "#FAF189",
    bg: "#B84B20",
    component: RunningTrack,
  },
];

/* ─── SVG Courts ─────────────────────────────────────────── */

function BasketballCourt({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 940 500" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      {/* Floor */}
      <rect width="940" height="500" fill="#C8860A" />
      {/* Board planks — subtle lines */}
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={i} x1="0" y1={i * 26} x2="940" y2={i * 26}
          stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
      ))}
      {/* Outer boundary */}
      <rect x="30" y="20" width="880" height="460" fill="none" stroke="white" strokeWidth="3" />
      {/* Centre line */}
      <line x1="470" y1="20" x2="470" y2="480" stroke="white" strokeWidth="2.5" />
      {/* Centre circle */}
      <circle cx="470" cy="250" r="60" fill="none" stroke="white" strokeWidth="2.5" />
      <circle cx="470" cy="250" r="3" fill="white" />
      {/* Left paint */}
      <rect x="30" y="148" width="188" height="204" fill="rgba(0,0,0,0.15)" stroke="white" strokeWidth="2.5" />
      {/* Left free-throw arc */}
      <path d="M218,148 A60,60 0 0 1 218,352" fill="none" stroke="white" strokeWidth="2.5" />
      {/* Left basket */}
      <circle cx="58" cy="250" r="22" fill="none" stroke="white" strokeWidth="2.5" />
      <line x1="30" y1="250" x2="80" y2="250" stroke="white" strokeWidth="2" />
      {/* Left 3-point arc */}
      <path d="M30,86 A300,300 0 0 1 30,414" fill="none" stroke="white" strokeWidth="2.5" />
      <line x1="30" y1="86" x2="240" y2="86" stroke="white" strokeWidth="2.5" />
      <line x1="30" y1="414" x2="240" y2="414" stroke="white" strokeWidth="2.5" />
      {/* Right paint */}
      <rect x="722" y="148" width="188" height="204" fill="rgba(0,0,0,0.15)" stroke="white" strokeWidth="2.5" />
      {/* Right free-throw arc */}
      <path d="M722,148 A60,60 0 0 0 722,352" fill="none" stroke="white" strokeWidth="2.5" />
      {/* Right basket */}
      <circle cx="882" cy="250" r="22" fill="none" stroke="white" strokeWidth="2.5" />
      <line x1="910" y1="250" x2="860" y2="250" stroke="white" strokeWidth="2" />
      {/* Right 3-point arc */}
      <path d="M910,86 A300,300 0 0 0 910,414" fill="none" stroke="white" strokeWidth="2.5" />
      <line x1="910" y1="86" x2="700" y2="86" stroke="white" strokeWidth="2.5" />
      <line x1="910" y1="414" x2="700" y2="414" stroke="white" strokeWidth="2.5" />
      {/* Restricted area arcs */}
      <path d="M30,234 A16,16 0 0 1 30,266" fill="none" stroke={accent} strokeWidth="2" />
      <path d="M910,234 A16,16 0 0 0 910,266" fill="none" stroke={accent} strokeWidth="2" />
    </svg>
  );
}

function FootballCourt({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 940 500" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      {/* Turf base */}
      <rect width="940" height="500" fill="#1F6B32" />
      {/* Turf stripes */}
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x="0" y={i * 50} width="940" height="25" fill="rgba(0,0,0,0.06)" />
      ))}
      {/* Outer boundary */}
      <rect x="30" y="30" width="880" height="440" fill="none" stroke="white" strokeWidth="3" />
      {/* Centre line */}
      <line x1="470" y1="30" x2="470" y2="470" stroke="white" strokeWidth="2.5" />
      {/* Centre circle */}
      <circle cx="470" cy="250" r="73" fill="none" stroke="white" strokeWidth="2.5" />
      <circle cx="470" cy="250" r="4" fill="white" />
      {/* Centre spot */}
      <circle cx="470" cy="250" r="3" fill="white" />
      {/* Left penalty area */}
      <rect x="30" y="140" width="165" height="220" fill="rgba(255,255,255,0.04)" stroke="white" strokeWidth="2.5" />
      {/* Left goal area */}
      <rect x="30" y="195" width="55" height="110" fill="rgba(255,255,255,0.04)" stroke="white" strokeWidth="2.5" />
      {/* Left goal */}
      <rect x="8" y="210" width="22" height="80" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="2.5" />
      {/* Left penalty spot */}
      <circle cx="142" cy="250" r="3" fill="white" />
      {/* Left penalty arc */}
      <path d="M195,216 A73,73 0 0 1 195,284" fill="none" stroke="white" strokeWidth="2.5" />
      {/* Right penalty area */}
      <rect x="745" y="140" width="165" height="220" fill="rgba(255,255,255,0.04)" stroke="white" strokeWidth="2.5" />
      {/* Right goal area */}
      <rect x="855" y="195" width="55" height="110" fill="rgba(255,255,255,0.04)" stroke="white" strokeWidth="2.5" />
      {/* Right goal */}
      <rect x="910" y="210" width="22" height="80" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="2.5" />
      {/* Right penalty spot */}
      <circle cx="798" cy="250" r="3" fill="white" />
      {/* Right penalty arc */}
      <path d="M745,216 A73,73 0 0 0 745,284" fill="none" stroke="white" strokeWidth="2.5" />
      {/* Corner arcs */}
      <path d="M30,30 A10,10 0 0 1 40,20" fill="none" stroke={accent} strokeWidth="2" />
      <path d="M910,30 A10,10 0 0 0 900,20" fill="none" stroke={accent} strokeWidth="2" />
      <path d="M30,470 A10,10 0 0 0 40,480" fill="none" stroke={accent} strokeWidth="2" />
      <path d="M910,470 A10,10 0 0 1 900,480" fill="none" stroke={accent} strokeWidth="2" />
    </svg>
  );
}

function ParquetCourt({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 940 500" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      {/* Wood floor */}
      <rect width="940" height="500" fill="#8B5E2C" />
      {/* Parquet plank pattern */}
      {Array.from({ length: 19 }).map((_, row) =>
        Array.from({ length: 24 }).map((_, col) => {
          const x = col * 40;
          const y = row * 28;
          const isOdd = (row + col) % 2 === 0;
          return (
            <g key={`${row}-${col}`}>
              {isOdd ? (
                <>
                  <line x1={x} y1={y} x2={x + 40} y2={y} stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
                  <line x1={x + 20} y1={y} x2={x + 20} y2={y + 28} stroke="rgba(0,0,0,0.07)" strokeWidth="0.5" />
                </>
              ) : (
                <>
                  <line x1={x} y1={y} x2={x} y2={y + 28} stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
                  <line x1={x} y1={y + 14} x2={x + 40} y2={y + 14} stroke="rgba(0,0,0,0.07)" strokeWidth="0.5" />
                </>
              )}
            </g>
          );
        })
      )}
      {/* Volleyball court overlay */}
      <rect x="80" y="60" width="780" height="380" fill="none" stroke="white" strokeWidth="3" />
      {/* Net line */}
      <line x1="470" y1="60" x2="470" y2="440" stroke="white" strokeWidth="3" />
      {/* Attack lines */}
      <line x1="230" y1="60" x2="230" y2="440" stroke="white" strokeWidth="2" strokeDasharray="10 6" />
      <line x1="710" y1="60" x2="710" y2="440" stroke="white" strokeWidth="2" strokeDasharray="10 6" />
      {/* Service zones */}
      <line x1="80" y1="180" x2="80" y2="320" stroke={accent} strokeWidth="2" strokeDasharray="8 5" />
      <line x1="860" y1="180" x2="860" y2="320" stroke={accent} strokeWidth="2" strokeDasharray="8 5" />
      {/* Centre mark */}
      <line x1="455" y1="248" x2="485" y2="248" stroke="white" strokeWidth="2" />
      <line x1="470" y1="233" x2="470" y2="267" stroke="white" strokeWidth="2" />
      {/* Badminton lines (inner) */}
      <rect x="160" y="100" width="620" height="300" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.5" />
      <line x1="160" y1="250" x2="780" y2="250" stroke={accent} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function MultiSportCourt({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 940 500" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      {/* Blue polyurethane base */}
      <rect width="940" height="500" fill="#1C4FA8" />
      {/* Texture dots */}
      {Array.from({ length: 20 }).map((_, row) =>
        Array.from({ length: 32 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={col * 30 + 15} cy={row * 26 + 13} r="1.5"
            fill="rgba(255,255,255,0.06)" />
        ))
      )}
      {/* Basketball outer boundary */}
      <rect x="30" y="30" width="880" height="440" fill="none" stroke="white" strokeWidth="2.5" />
      {/* Basketball centre line */}
      <line x1="470" y1="30" x2="470" y2="470" stroke="white" strokeWidth="2" />
      {/* Centre circle */}
      <circle cx="470" cy="250" r="60" fill="none" stroke="white" strokeWidth="2" />
      {/* Basketball key left */}
      <rect x="30" y="160" width="168" height="180" fill="rgba(251,151,144,0.15)" stroke="#FB9790" strokeWidth="2" />
      <path d="M198,160 A60,60 0 0 1 198,340" fill="none" stroke="#FB9790" strokeWidth="2" />
      <circle cx="56" cy="250" r="20" fill="none" stroke="#FB9790" strokeWidth="2" />
      {/* Basketball key right */}
      <rect x="742" y="160" width="168" height="180" fill="rgba(251,151,144,0.15)" stroke="#FB9790" strokeWidth="2" />
      <path d="M742,160 A60,60 0 0 0 742,340" fill="none" stroke="#FB9790" strokeWidth="2" />
      <circle cx="884" cy="250" r="20" fill="none" stroke="#FB9790" strokeWidth="2" />
      {/* Netball/volleyball lines */}
      <rect x="130" y="80" width="680" height="340" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="14 7" />
      <line x1="470" y1="80" x2="470" y2="420" stroke={accent} strokeWidth="1.5" strokeDasharray="10 6" />
      {/* Badminton singles */}
      <rect x="200" y="110" width="540" height="280" fill="none" stroke="rgba(179,240,202,0.5)" strokeWidth="1.5" />
      {/* Badminton net */}
      <line x1="200" y1="250" x2="740" y2="250" stroke="rgba(179,240,202,0.5)" strokeWidth="1.5" />
      {/* 3x3 basketball half */}
      <rect x="470" y="30" width="440" height="440" fill="rgba(250,241,137,0.03)" />
      {/* Penalty spot symbols */}
      <circle cx="470" cy="250" r="4" fill={accent} />
    </svg>
  );
}

function RunningTrack({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 940 500" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      {/* Rubber base */}
      <rect width="940" height="500" fill="#B84B20" />
      {/* Track texture */}
      {Array.from({ length: 16 }).map((_, i) => (
        <line key={i} x1="0" y1={i * 32} x2="940" y2={i * 32}
          stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" />
      ))}
      {/* Outer track boundary */}
      <ellipse cx="470" cy="250" rx="420" ry="210" fill="none" stroke="white" strokeWidth="3" />
      {/* Inner field */}
      <ellipse cx="470" cy="250" rx="278" ry="138" fill="#2E7D32" stroke="white" strokeWidth="2.5" />
      {/* Field lines */}
      <rect x="237" y="195" width="466" height="110" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <line x1="470" y1="195" x2="470" y2="305" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      {/* Lane lines — 8 lanes */}
      {[1, 2, 3, 4, 5, 6, 7].map((lane) => {
        const rx = 420 - lane * 20;
        const ry = 210 - lane * 10;
        return (
          <ellipse key={lane} cx="470" cy="250" rx={rx} ry={ry}
            fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
        );
      })}
      {/* Start/Finish line */}
      <line x1="470" y1="42" x2="470" y2="458" stroke={accent} strokeWidth="3" />
      {/* Stagger start lines */}
      {[1, 2, 3, 4, 5, 6, 7].map((lane) => {
        const offset = lane * 18;
        return (
          <line key={lane}
            x1={470 + offset} y1={250 - (210 - lane * 10)}
            x2={470 + offset} y2={250 - (210 - (lane + 1) * 10) + 5}
            stroke={accent} strokeWidth="2" opacity="0.7" />
        );
      })}
      {/* Long jump / throw sector mark */}
      <circle cx="470" cy="250" r="5" fill={accent} />
      {/* Sector lines (field events) */}
      <line x1="192" y1="250" x2="310" y2="140" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="8 5" />
      <line x1="192" y1="250" x2="310" y2="360" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="8 5" />
      <line x1="748" y1="250" x2="630" y2="140" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="8 5" />
      <line x1="748" y1="250" x2="630" y2="360" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="8 5" />
    </svg>
  );
}

/* ─── Main Section ───────────────────────────────────────── */

export default function CourtsScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  /* Track mouse for parallax */
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  /* Intersection observer — mark active court */
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
      { threshold: 0.5 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} id="courts" style={{ position: "relative" }}>

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
            onClick={() => {
              document.querySelector(`[data-court-index="${i}"]`)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
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

      {/* ── Intro header (sticky across all courts) ── */}
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
      {COURTS.map((court, i) => {
        const CourtSVG = court.component;
        return (
          <CourtPanel
            key={court.id}
            court={court}
            index={i}
            isActive={activeIndex === i}
            mousePos={mousePos}
            CourtSVG={CourtSVG}
          />
        );
      })}

      {/* ── Closing transition ── */}
      <div style={{
        height: "60px",
        background: `linear-gradient(to bottom, ${COURTS[COURTS.length - 1].bg}, #1C0282)`,
      }} />
    </section>
  );
}

/* ─── Individual court panel ─────────────────────────────── */

function CourtPanel({
  court,
  index,
  isActive,
  mousePos,
  CourtSVG,
}: {
  court: typeof COURTS[0];
  index: number;
  isActive: boolean;
  mousePos: { x: number; y: number };
  CourtSVG: React.ComponentType<{ accent: string }>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"],
  });

  /* Subtle parallax on SVG */
  const svgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const svgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1.0, 1.04]);

  /* Text reveal */
  const textY = useTransform(scrollYProgress, [0.2, 0.55], [40, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0, 1]);

  /* Mouse parallax offset */
  const [winSize] = useState({ w: typeof window !== "undefined" ? window.innerWidth : 1440, h: typeof window !== "undefined" ? window.innerHeight : 900 });
  const mx = (mousePos.x / winSize.w - 0.5) * 20;
  const my = (mousePos.y / winSize.h - 0.5) * 12;

  return (
    <div
      ref={panelRef}
      data-court-index={index}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background colour fill */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundColor: court.bg,
      }} />

      {/* SVG court with parallax */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          y: svgY,
          scale: svgScale,
        }}
      >
        <motion.div
          animate={{ x: mx, y: my }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
          style={{ width: "100%", height: "100%" }}
        >
          <CourtSVG accent={court.accent} />
        </motion.div>
      </motion.div>

      {/* Overlay gradient — bottom darkening for legibility */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.08) 45%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Top-left index number */}
      <motion.span
        style={{
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
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      {/* Bottom-left text block */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "56px",
          left: "48px",
          y: textY,
          opacity: textOpacity,
          maxWidth: "560px",
        }}
      >
        {/* Tag pill */}
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
            marginBottom: "18px",
          }}
        >
          {court.tag}
        </motion.span>

        {/* Court name */}
        <h2 style={{
          fontFamily: "var(--font-syne)",
          fontWeight: 800,
          fontSize: "clamp(36px, 6vw, 80px)",
          lineHeight: 0.95,
          letterSpacing: "-0.025em",
          color: "#FFFFFF",
          marginBottom: "14px",
          textTransform: "uppercase",
        }}>
          {court.label}
        </h2>

        {/* Surface material */}
        <p style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "14px",
          color: "rgba(255,255,255,0.65)",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}>
          {court.surface}
        </p>
      </motion.div>

      {/* Scroll cue (only first panel) */}
      {index === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: 1.5 }}
          style={{
            position: "absolute",
            bottom: "32px",
            right: "48px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: court.accent,
          }}>Scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24">
            <rect x="6" y="1" width="4" height="8" rx="2" fill="none" stroke={court.accent} strokeWidth="1.5" />
            <circle cx="8" cy="4" r="1.5" fill={court.accent}>
              <animateTransform attributeName="transform" type="translate"
                values="0,0;0,3;0,0" dur="1.6s" repeatCount="indefinite" />
            </circle>
            <path d="M4 18 L8 22 L12 18" stroke={court.accent} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>
      )}

      {/* Right-side stats bar */}
      <div style={{
        position: "absolute",
        right: "48px",
        bottom: "56px",
        textAlign: "right",
      }}>
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
      </div>
    </div>
  );
}
