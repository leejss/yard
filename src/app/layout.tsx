import "./globals.css";

export const metadata = {
  title: "tinyyard",
  description: "tinyyard is tinyyard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="bg-background debug1">{children}</body>
    </html>
  );
}
