"use client";

/**
 * SectionBlock — generic section wrapper used across all templates.
 * Provides consistent vertical rhythm, an optional eyebrow / heading,
 * and a `tone` flag that maps to a few base background variants.
 */

import { cn } from "@/lib/utils";

type Tone = "default" | "muted" | "accent";

interface Props {
  id?:       string;
  eyebrow?:  string;
  title?:    string;
  intro?:    string;
  tone?:     Tone;
  className?: string;
  children?: React.ReactNode;
}

export default function SectionBlock({
  id, eyebrow, title, intro, tone = "default", className, children,
}: Props) {
  const toneClass: Record<Tone, string> = {
    default: "bg-bg",
    muted:   "bg-surface",
    accent:  "bg-accent text-accent-fg",
  };

  return (
    <section id={id} className={cn(toneClass[tone], className)}>
      <div className="container-x section-y">
        {eyebrow ? (
          <p className={cn(
            "text-xs uppercase tracking-[0.2em]",
            tone === "accent" ? "text-accent-fg/70" : "text-text-subtle",
          )}>
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="mt-2 font-display text-2xl md:text-3xl">
            {title}
          </h2>
        ) : null}
        {intro ? (
          <p className={cn(
            "mt-4 max-w-2xl",
            tone === "accent" ? "text-accent-fg/80" : "text-text-muted",
          )}>
            {intro}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
