import { Link } from "@remix-run/react";
import SelectTheme from "~/components/select-theme";
const FixedNavbar = () => {
	return (
		<div className="fixed top-0 left-0 right-0 w-full">
			<nav className="h-nav_height container mx-auto px-4 bg-red-500 rounded-b-lg text-white">
				<div className="flex justify-between h-full items-center">
					<Link to="/">
						<h1 className="text-3xl md:text-4xl font-bold font-mono">tinyyard</h1>
					</Link>

					<div className="flex items-center gap-4 text-lg md:text-xl">
						<Link className="font-bold" to="/posts">
							Posts
						</Link>
						<Link className="font-bold" to="/me">
							Me
						</Link>
						<SelectTheme />
					</div>
				</div>
			</nav>
		</div>
	);
};

export default FixedNavbar;
