import Nav from "@/components/Nav";
import { Analytics } from "@vercel/analytics/react";
import "@/styles/index.css";

export const metadata = {
  title: "tinyyard",
  description: "tinyyard is tinyyard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="text-foreground bg-background">
        <div className="relative p-4 container mx-auto pt-[60px] pb-[120px]">
          <Nav />
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  );
}
