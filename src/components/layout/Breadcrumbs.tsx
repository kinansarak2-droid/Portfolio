"use client";

/**
 * Breadcrumbs — small navigation aid for inner pages.
 * Receives a list of crumbs; renders nothing if only the root crumb
 * is given. Locale-aware via the optional `LocalizedString` labels.
 */

import Link from "next/link";
import { useLocale, localise } from "@/context/LocaleContext";
import type { LocalizedString } from "@/i18n";

export interface Crumb {
  label: string | LocalizedString;
  href?: string;
}

interface Props {
  trail: Crumb[];
}

export default function Breadcrumbs({ trail }: Props) {
  const { locale, t } = useLocale();
  if (!trail || trail.length <= 1) return null;

  const renderLabel = (label: Crumb["label"]) =>
    typeof label === "string" ? label : localise(label, locale);

  const homeCrumb: Crumb = { label: t.breadcrumbs.home, href: "/" };
  const items = trail[0]?.href === "/" ? trail : [homeCrumb, ...trail];

  return (
    <nav aria-label="Breadcrumb" className="text-xs text-text-subtle">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((crumb, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${crumb.href ?? ""}-${i}`} className="flex items-center gap-1">
              {crumb.href && !last ? (
                <Link href={crumb.href} className="hover:text-text">
                  {renderLabel(crumb.label)}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? "text-text" : ""}>
                  {renderLabel(crumb.label)}
                </span>
              )}
              {!last ? <span aria-hidden="true">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
