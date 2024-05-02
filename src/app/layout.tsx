import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import { cn } from "@/src/lib/utils";
import "./globals.css";
import GoogleAnalytics from "./GoogleAnalytics";
import BaiDuAnalytics from "./BaiDuAnalytics";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "Ask Your Bookmarks",
  description: "Simple and Smart Bookmark Manager. Great AI-powered search capability, find the bookmark you want through fuzzy descriptions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body
        className={cn(
          "grainy flex min-h-screen flex-col font-sans antialiased",
          GeistSans.className,
        )}
      >
        {children}
        {process.env.NODE_ENV === "development" ? (
          <></>
        ) : (
          <>
            <Analytics />
            <GoogleAnalytics />
            <BaiDuAnalytics />
          </>
        )}
      </body>
    </html>
  );
}
