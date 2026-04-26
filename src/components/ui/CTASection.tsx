"use client";

/**
 * CTASection — call-to-action band.
 * Used at the bottom of pages and on the homepage to drive contact.
 * Strings are passed in pre-localised; callers resolve them.
 */

import Link from "next/link";

interface Props {
  title:    string;
  body?:    string;
  ctaLabel: string;
  ctaHref:  string;
}

export default function CTASection({ title, body, ctaLabel, ctaHref }: Props) {
  return (
    <section className="bg-accent text-accent-fg">
      <div className="container-x section-y flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl md:text-3xl">{title}</h2>
          {body ? (
            <p className="mt-3 text-accent-fg/80">{body}</p>
          ) : null}
        </div>
        <div>
          <Link
            href={ctaHref}
            className="inline-block px-5 py-3 rounded-full bg-accent-fg text-accent text-sm uppercase tracking-wider hover:opacity-90 transition-opacity duration-base"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
