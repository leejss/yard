import Link from "next/link";
import styles from "./PageNav.module.css";
import SelectTheme from "../select-theme";

export default function PageNav() {
  return (
    <nav className={styles.PageNav}>
      <header className="mx-auto flex h-full w-full max-w-[--page-width] flex-1  items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link className="text-xl hover:underline" href="/">
            Posts
          </Link>
        </div>
        <div className="flex h-full flex-col items-center">
          <div className="flex-1">
            <SelectTheme />
          </div>
        </div>
      </header>
    </nav>
  );
}
