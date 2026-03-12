import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import Cursor from "@/components/layout/Cursor";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sarakbi Sport — Architect & UX Designer",
  description:
    "Portfolio of Sarakbi Sport — Architecture, UX Design, and Computational Interaction.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body>
        <Cursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
