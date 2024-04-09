import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useFetcher } from "@remix-run/react";
import { useTheme } from "~/hooks/useTheme";
import { cn } from "~/utils";

export const FETCH_SELECT_THEME_KEY = "FETCH_TOGGLE_THEME_KEY";
const SelectTheme = () => {
	const fetcher = useFetcher({ key: FETCH_SELECT_THEME_KEY });
	const theme = useTheme();
	const nextTheme = theme === "dark" ? "light" : "dark";
	const iconTransformOrigin = { transformOrigin: "50% 100px" };
	const isDarkMode = theme === "dark";
	const isLightMode = theme === "light";
	return (
		<fetcher.Form method="POST" action="/action/set-theme">
			<input type="hidden" value={nextTheme} name="theme" />
			<button
				type="submit"
				className="bg-background hover:border-foreground border-2 border-transparent focus:border-foreground inline-flex size-10 items-center justify-center overflow-hidden rounded-full p-1 transition focus:outline-none"
			>
				<div className="relative size-4">
					<span
						style={iconTransformOrigin}
						className={cn("absolute inset-0 transform transition-transform duration-700 motion-reduce:duration-[0s]", {
							"rotate-0": isDarkMode,
							"rotate-90": !isDarkMode,
						})}
					>
						<MoonIcon color="white" className="size-4 font-bold" />
					</span>
					<span
						style={iconTransformOrigin}
						className={cn(
							"absolute inset-0 transform transition-transform duration-700 motion-reduce:duration-[0s] rotate-90 ",
							{
								"rotate-0": isLightMode,
								"-rotate-90": !isLightMode,
							},
						)}
					>
						<SunIcon color="black" className="size-4 font-bold" />
					</span>
				</div>
			</button>
		</fetcher.Form>
	);
};

export default SelectTheme;
