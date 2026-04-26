"use client";

/**
 * Layout — wraps every page with header, footer, and locale-aware
 * direction. Every page should be rendered inside <Layout>.
 *
 * The root app/layout.tsx already provides <LocaleProvider>; this
 * component is a stateless presentational wrapper.
 */

import { useLocale } from "@/context/LocaleContext";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { dir } = useLocale();
  return (
    <div dir={dir} className="min-h-screen flex flex-col">
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
