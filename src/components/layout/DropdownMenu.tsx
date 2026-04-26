"use client";

/**
 * DropdownMenu — single-column dropdown for the main Header.
 * Pure presentational. The Header decides when it's open.
 */

import Link from "next/link";
import { useLocale, localise } from "@/context/LocaleContext";
import type { NavItem } from "@/types/navigation";

interface Props {
  items: NavItem[];
  open: boolean;
  onItemClick?: () => void;
}

export default function DropdownMenu({ items, open, onItemClick }: Props) {
  const { locale } = useLocale();
  if (!open) return null;
  const visible = items.filter((i) => !i.hidden);
  if (visible.length === 0) return null;

  return (
    <div
      className="absolute top-full start-0 mt-1 min-w-[260px] bg-bg border border-border shadow-md rounded-md py-2 z-[var(--z-overlay)]"
      role="menu"
    >
      <ul>
        {visible.map((item) => (
          <li key={item.id} role="none">
            <Link
              role="menuitem"
              href={item.href}
              onClick={onItemClick}
              className="block px-4 py-2 text-sm hover:bg-surface transition-colors duration-fast"
            >
              {localise(item.label, locale)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
