import { PAGE_TITLE } from "@lib/constants";

export default function HomeTitleSection() {
  return (
    <header className="flex-col md:flex-row">
      <h1 className="text-6xl md:text-8xl font-bold leading-wide">
        {PAGE_TITLE}
      </h1>
    </header>
  );
}
