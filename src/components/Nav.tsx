import Link from "next/link";

const links = ["posts"];
const sns = {
  github: "https://github.com/leejss",
  // linkedIn: "",
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
        {Object.keys(sns).map((k) => (
          <li key={k}>
            <Link className="link" href={sns[k as keyof typeof sns]}>
              {k}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
