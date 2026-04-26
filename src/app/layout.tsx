import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { LocaleProvider } from "@/context/LocaleContext";
import { siteIdentity } from "@/config/site";
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
  title: {
    default: `${siteIdentity.name} — Sports facility construction & systems`,
    template: `%s · ${siteIdentity.name}`,
  },
  description: siteIdentity.description.en,
  metadataBase: new URL(siteIdentity.url),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
