"use client";

/**
 * CategoryGrid — responsive grid of preview cards for a category list.
 *
 * Defensive: renders nothing if the items array is empty, so a category
 * page never breaks if its data file is empty.
 */

import { useLocale, localise } from "@/context/LocaleContext";
import type { ContentCategory } from "@/types";
import PreviewCard from "./PreviewCard";

interface Props {
  items:     ContentCategory[];
  hrefBase:  string;     // e.g. "/sportanlagen", "/products", "/company"
  emptyMessage?: string;
  /** Optional max columns; defaults to 3. */
  columns?: 2 | 3 | 4;
}

export default function CategoryGrid({
  items, hrefBase, emptyMessage, columns = 3,
}: Props) {
  const { locale } = useLocale();

  if (!items?.length) {
    return emptyMessage ? (
      <p className="text-sm text-text-muted">{emptyMessage}</p>
    ) : null;
  }

  const colClass =
    columns === 4 ? "lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
    : columns === 2 ? "md:grid-cols-2"
    : "lg:grid-cols-3 sm:grid-cols-2";

  return (
    <div className={`grid gap-6 ${colClass}`}>
      {items.map((cat) => (
        <PreviewCard
          key={cat.id}
          title={localise(cat.title, locale)}
          description={cat.shortDesc ? localise(cat.shortDesc, locale) : undefined}
          href={`${hrefBase}/${cat.slug}`}
          imageSrc={cat.coverImage}
          imageLabel={localise(cat.title, locale)}
        />
      ))}
    </div>
  );
}
