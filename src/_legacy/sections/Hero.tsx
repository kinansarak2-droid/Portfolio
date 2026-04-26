"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const headline = ["ARCHITECT", "OF", "EXPERIENCE"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y       = useTransform(scrollYProgress, [0, 0.6], [0, -60]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 48px",
        overflow: "hidden",
      }}
    >
      {/* Ambient orbs */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
      }}>
        <div style={{
          position: "absolute", top: "8%", right: "4%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(179,240,202,0.10) 0%, transparent 65%)",
        }} />
        <div style={{
          position: "absolute", bottom: "12%", left: "6%",
          width: 360, height: 360, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(250,241,137,0.07) 0%, transparent 65%)",
        }} />
        <div style={{
          position: "absolute", top: "40%", right: "30%",
          width: 240, height: 240, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(251,151,144,0.05) 0%, transparent 65%)",
        }} />
      </div>

      {/* Content */}
      <motion.div style={{ opacity, y, position: "relative", zIndex: 1 }}>

        {/* Role tag */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "12px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#B3F0CA",
            marginBottom: "36px",
          }}
        >
          Sarakbi Sport — Architecture · UX Design · Computation
        </motion.p>

        {/* Big headline — each word slides up from clip */}
        <div>
          {headline.map((word, i) => (
            <div key={word} style={{ overflow: "hidden", lineHeight: 0.92 }}>
              <motion.h1
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.1,
                  delay: 0.3 + i * 0.13,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  fontFamily: "var(--font-syne)",
                  fontWeight: 800,
                  fontSize: "clamp(68px, 11.5vw, 170px)",
                  letterSpacing: "-0.025em",
                  textTransform: "uppercase",
                  display: "block",
                  color: i === 1 ? "transparent" : "#FFFFFF",
                  WebkitTextStroke: i === 1 ? "1.5px rgba(255,255,255,0.35)" : "none",
                }}
              >
                {word}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "clamp(14px, 1.2vw, 17px)",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.5)",
            maxWidth: "400px",
            marginTop: "40px",
          }}
        >
          Building at the intersection of space, interface,<br />
          and computation — where architecture becomes interaction.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "44px",
          left: "48px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          zIndex: 1,
        }}
      >
        <div style={{
          width: "1px",
          height: "52px",
          background: "rgba(255,255,255,0.25)",
          animation: "scrollPulse 2.2s ease-in-out infinite",
        }} />
        <span style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "10px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)",
          writingMode: "vertical-rl",
        }}>
          Scroll
        </span>
      </motion.div>

      {/* Year stamp */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: "absolute",
          bottom: "48px",
          right: "48px",
          fontFamily: "var(--font-dm-sans)",
          fontSize: "11px",
          color: "rgba(255,255,255,0.25)",
          letterSpacing: "0.12em",
          zIndex: 1,
        }}
      >
        © 2025
      </motion.span>
    </section>
  );
}
