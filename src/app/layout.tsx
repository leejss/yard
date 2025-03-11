import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: "tinyyard",
  description: "tinyyard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={cn(GeistSans.variable, GeistMono.variable)}>
      <body className="overflow-x-hidden antialiased">{children}</body>
    </html>
  );
}
