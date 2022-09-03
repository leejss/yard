import { PAGE_TITLE } from "lib/constants";
import Link from "next/link";

const MainTitle = () => {
  return (
    <header className="mb-4">
      <h1 className="px-4 text-6xl font-bold text-center transition-colors md:text-left md:text-8xl leading-wide hover:text-gray-500">
        <Link href="/">{PAGE_TITLE}</Link>
      </h1>
    </header>
  );
};

export default MainTitle;
