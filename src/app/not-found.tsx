/**
 * Global 404 — used whenever a page calls `notFound()` and no
 * scoped not-found.tsx is found. Keeps the app shell visible so
 * users can recover via the main nav.
 */

import Layout from "@/components/layout/Layout";
import Link from "next/link";

export default function NotFound() {
  return (
    <Layout>
      <div className="container-x section-y">
        <p className="text-xs uppercase tracking-[0.2em] text-text-subtle">404</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl">Page not found</h1>
        <p className="mt-4 text-md text-text-muted max-w-xl">
          The page you're looking for doesn't exist or has moved. You can
          return to the homepage, or browse the main sections from the
          navigation above.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-block px-5 py-3 rounded-full bg-accent text-accent-fg text-sm uppercase tracking-wider hover:opacity-90 transition-opacity duration-base"
          >
            Back to home
          </Link>
        </div>
      </div>
    </Layout>
  );
}
