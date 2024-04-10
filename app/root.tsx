import { type LinksFunction, type LoaderFunctionArgs, json } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import FixedNavbar from "~/components/fixed-navbar";
import LenisProvider from "~/components/lenis-provider";
import { useTheme } from "~/hooks/useTheme";
import stylehseet from "~/styles/tailwind.css?url";
import { cn } from "~/utils";
import { getThemeFromRequest } from "~/utils/get-theme";

export const links: LinksFunction = () => [
	{
		rel: "stylesheet",
		href: stylehseet,
	},
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const data = {
		userPreference: {
			theme: await getThemeFromRequest(request),
		},
	};

	return json(data);
};

export type RootLoader = typeof loader;
export function Layout({ children }: { children: React.ReactNode }) {
	const theme = useTheme();
	return (
		<html lang="en" className={cn(theme)}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="antialiased bg-background transition">
				<FixedNavbar />
				<LenisProvider>
					<main className="mt-nav_height container mx-auto px-4 pb-6 flex flex-col main-height">{children}</main>
				</LenisProvider>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
