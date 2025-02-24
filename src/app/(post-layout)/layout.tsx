import LenisProvider from "@/components/LenisProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageLayout from "@/components/layouts/page-layout";
import { Analytics } from "@vercel/analytics/react";

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <LenisProvider>
          <PageLayout>{children}</PageLayout>
        </LenisProvider>
      </ThemeProvider>
      <Analytics />
    </>
  );
}
