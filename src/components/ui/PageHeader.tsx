"use client";

/**
 * PageHeader — top of every inner page.
 *
 * Hosts the page title, optional intro copy, and a breadcrumbs trail.
 * Visual presentation is deliberately neutral; the design system can
 * be replaced without changing this component's API.
 */

import Breadcrumbs, { type Crumb } from "@/components/layout/Breadcrumbs";

interface Props {
  title:    string;
  intro?:   string;
  eyebrow?: string;
  trail?:   Crumb[];
}

export default function PageHeader({ title, intro, eyebrow, trail }: Props) {
  return (
    <header className="container-x section-y">
      {trail ? (
        <div className="mb-4">
          <Breadcrumbs trail={trail} />
        </div>
      ) : null}
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.2em] text-text-subtle">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-2 font-display text-3xl md:text-4xl">
        {title}
      </h1>
      {intro ? (
        <p className="mt-4 max-w-2xl text-md text-text-muted">
          {intro}
        </p>
      ) : null}
    </header>
  );
}
