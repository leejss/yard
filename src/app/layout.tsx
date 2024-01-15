import Nav from "@/components/Nav";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "@/styles/index.css";
import clsx from "clsx";
import TopRight from "@/components/TopRight";
import WithSidebar from "@/components/WithSidebar";

export const metadata = {
  title: "tinyyard",
  description: "tinyyard is tinyyard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <div>
          <WithSidebar>{children}</WithSidebar>
          <Analytics />
        </div>
      </body>
    </html>
  );
}
