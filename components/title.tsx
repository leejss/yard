import { PAGE_TITLE } from "@lib/constants";
import Link from "next/link";

const Title = () => {
  return (
    <header className="mb-4">
      <h1 className="text-center md:text-left text-6xl md:text-8xl font-bold leading-wide px-4">
        <Link href="/">{PAGE_TITLE}</Link>
      </h1>
    </header>
  );
};

export default Title;
