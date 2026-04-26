"use client";

/**
 * Header — top navigation bar
 *
 * Reads the navigation tree from src/config/site.ts. Renders a
 * dropdown when an item has children. Adding / removing nav items
 * is a config-only change.
 */

import Link from "next/link";
import { useState } from "react";
import { useLocale, localise } from "@/context/LocaleContext";
import { navigation, siteIdentity } from "@/config/site";
import DropdownMenu from "./DropdownMenu";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { cn } from "@/lib/utils";

export default function Header() {
  const { locale, t } = useLocale();
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const visible = navigation.filter((n) => !n.hidden);

  return (
    <header
      className="sticky top-0 z-[var(--z-header)] bg-bg/90 backdrop-blur border-b border-border"
      aria-label={siteIdentity.name}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-accent focus:text-accent-fg focus:px-3 focus:py-2 focus:rounded-md"
      >
        {t.nav.skipToContent}
      </a>

      <div className="container-x flex items-center justify-between py-4 gap-6">
        <Link
          href="/"
          className="font-display tracking-[0.18em] text-sm uppercase font-extrabold"
        >
          {siteIdentity.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main">
          {visible.map((item) => (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => item.children?.length && setOpenId(item.id)}
              onMouseLeave={() => setOpenId((id) => (id === item.id ? null : id))}
            >
              <Link
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm uppercase tracking-wider text-text-muted hover:text-text transition-colors duration-fast",
                  openId === item.id && "text-text",
                )}
                onFocus={() => item.children?.length && setOpenId(item.id)}
              >
                {localise(item.label, locale)}
              </Link>
              {item.children?.length ? (
                <DropdownMenu
                  items={item.children}
                  open={openId === item.id}
                  onItemClick={() => setOpenId(null)}
                />
              ) : null}
            </div>
          ))}
          <div className="ml-3">
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden text-sm uppercase tracking-wider"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
        </button>
      </div>

      {/* Mobile nav (simple stacked list) */}
      {mobileOpen ? (
        <nav
          id="mobile-nav"
          className="md:hidden border-t border-border bg-bg"
          aria-label="Mobile"
        >
          <ul className="container-x py-4 flex flex-col gap-2">
            {visible.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="block py-2 text-sm uppercase tracking-wider"
                  onClick={() => setMobileOpen(false)}
                >
                  {localise(item.label, locale)}
                </Link>
                {item.children?.length ? (
                  <ul className="ms-4 border-s border-border ps-3 my-1">
                    {item.children
                      .filter((c) => !c.hidden)
                      .map((child) => (
                        <li key={child.id}>
                          <Link
                            href={child.href}
                            className="block py-1 text-sm text-text-muted"
                            onClick={() => setMobileOpen(false)}
                          >
                            {localise(child.label, locale)}
                          </Link>
                        </li>
                      ))}
                  </ul>
                ) : null}
              </li>
            ))}
            <li className="pt-3 border-t border-border mt-2">
              <LanguageSwitcher />
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
