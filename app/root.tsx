import { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import FixedNavbar from "~/components/fixed-navbar";
import stylehseet from "~/styles/tailwind.css?url";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: stylehseet,
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="antialiased">
        {/* Fixed navbar */}
        {/* Fixed contacts */}
        <FixedNavbar />
        <main className="mt-nav_height">{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
