import { useEffect } from "react";

const PageLoading = () => {
	useEffect(() => {
		// Prevent scrolling when the page is loading
		document.body.style.overflow = "hidden";
		document.documentElement.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "";
			document.documentElement.style.overflow = "";
		};
	}, []);

	return (
		<div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-10 bg-black bg-opacity-45"></div>
	);
};

export default PageLoading;
