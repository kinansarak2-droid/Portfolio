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

      {/* ── Sticky label strip ── */}
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
          mousePos={mousePos}
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
  mousePos,
}: {
  court: typeof COURTS[0];
  index: number;
  isActive: boolean;
  mousePos: { x: number; y: number };
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"],
  });

  /* Parallax on SVG while scrolling */
  const svgY     = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const svgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1.0, 1.04]);

  /* Text reveal */
  const textY       = useTransform(scrollYProgress, [0.2, 0.55], [40, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0, 1]);

  /* Mouse parallax (gentle) */
  const winW = typeof window !== "undefined" ? window.innerWidth  : 1440;
  const winH = typeof window !== "undefined" ? window.innerHeight : 900;
  const mx = (mousePos.x / winW - 0.5) * 20;
  const my = (mousePos.y / winH - 0.5) * 12;

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
      {/* SVG court — scroll + mouse parallax */}
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={court.svgSrc}
            alt={court.label}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom gradient for text legibility */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.08) 45%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Ghost index number */}
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
      }}>
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Bottom-left info block */}
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

      {/* Scroll cue — first panel only */}
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

      {/* Progress counter — bottom right */}
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
