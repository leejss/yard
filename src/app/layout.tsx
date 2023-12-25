import Nav from "@/components/Nav";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "@/styles/index.css";
import clsx from "clsx";

export const metadata = {
  title: "tinyyard",
  description: "tinyyard is tinyyard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={clsx("text-foreground bg-background font-sans")}>
        <div className="relative p-4 container mx-auto pt-[60px] pb-[120px]">
          <Nav />
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  );
}
