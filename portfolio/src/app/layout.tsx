import type { Metadata } from "next";
import { meta } from "@/data/meta";
import PageWrapper from "@/components/layout/PageWrapper";
import "@/styles/variables.css";
import "@/styles/typography.css";
import "@/styles/animations.css";
import "@/styles/cursor.css";
import "./globals.css";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    images: [{ url: "/assets/images/og/og-default.jpg" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  );
}
