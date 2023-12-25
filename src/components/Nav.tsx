import Link from "next/link";

const links = [""];
const sns = {
  github: "https://github.com/leejss",
};

const Nav = () => {
  return (
    <nav className="flex justify-between my-4">
      {links.map((link) => (
        <Link className="link" key={link} href={"/" + link}>
          {link}
        </Link>
      ))}
      <ul className="flex gap-2">
        {Object.keys(sns).map((link) => (
          <li key={link}>
            <Link className="text-emerald-700 dark:text-emerald-500" href={sns[link as keyof typeof sns]}>
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
