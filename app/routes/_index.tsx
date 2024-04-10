import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "tinyyard" },
		// { name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {
	return (
		<section className="flex-1 flex flex-col justify-center items-center">
			<div className="text-foreground">Ready to install</div>
		</section>
	);
}
