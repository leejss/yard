import { Link } from "@remix-run/react";

// Outer div is used to fix the navbar at the top of the page
// And inner div is used to style the navbar

// Navbar has the fixed height

const FixedNavbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 w-full">
      <nav className="h-nav_height container mx-auto px-4 bg-red-500 rounded-b-lg">
        <div className="flex justify-between h-full items-center">
          <Link to="/">
            <h1 className="text-3xl font-bold font-mono">tinyyard</h1>
          </Link>

          <ul className="flex items-center gap-4">
            <Link to="/posts">Posts</Link>
            <Link to="/me">Me</Link>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default FixedNavbar;
