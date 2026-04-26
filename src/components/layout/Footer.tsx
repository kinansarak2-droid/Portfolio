"use client";

/**
 * Footer — config-driven.
 * Columns and items come from src/config/site.ts → footerColumns.
 * Adding a column is a config-only change.
 */

import Link from "next/link";
import { useLocale, localise } from "@/context/LocaleContext";
import { siteIdentity, footerColumns, navigation, socialLinks } from "@/config/site";

export default function Footer() {
  const { locale, t } = useLocale();
  const year = new Date().getFullYear();

  /** Flatten top-level navigation by id for column lookup. */
  const navById = new Map(navigation.map((n) => [n.id, n]));

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-x section-y grid gap-10 md:grid-cols-4">
        <div>
          <p className="font-display tracking-[0.18em] text-sm uppercase font-extrabold">
            {siteIdentity.name}
          </p>
          <p className="mt-3 text-sm text-text-muted max-w-xs">
            {localise(siteIdentity.tagline, locale)}
          </p>
        </div>

        {footerColumns.map((col) => (
          <div key={col.id}>
            <h4 className="text-xs uppercase tracking-wider text-text-subtle">
              {localise(col.label, locale)}
            </h4>
            <ul className="mt-3 space-y-1.5">
              {col.items
                .map((id) => navById.get(id))
                .filter(Boolean)
                .map((item) => (
                  <li key={item!.id}>
                    <Link
                      href={item!.href}
                      className="text-sm hover:underline"
                    >
                      {localise(item!.label, locale)}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}

        {socialLinks.length > 0 ? (
          <div>
            <h4 className="text-xs uppercase tracking-wider text-text-subtle">
              {localise(
                { en: "Follow", fr: "Suivre", ar: "تابعنا" },
                locale,
              )}
            </h4>
            <ul className="mt-3 space-y-1.5">
              {socialLinks.map((s) => (
                <li key={s.id}>
                  <a href={s.href} className="text-sm hover:underline" rel="noopener noreferrer" target="_blank">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="border-t border-border">
        <div className="container-x py-4 text-xs text-text-subtle flex flex-wrap items-center justify-between gap-2">
          <span>
            © {year} {siteIdentity.legalName}. {t.footer.rights}
          </span>
        </div>
      </div>
    </footer>
  );
}
