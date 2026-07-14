import { Link, NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "AI Assistant", path: "/ai-assistant" },
  { name: "Session", path: "/session" },
  { name: "Contact Us", path: "/contact" },
];

export default function Navbar() {
  return (
    <nav className="w-full py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8">
        {/* Logo */}
        <Link
          to="/"
          className="rounded-2xl bg-black px-8 py-3 font-bold text-yellow-400"
        >
          LOGO
        </Link>

        {/* Menu */}
        <div className="flex rounded-2xl bg-[#555] p-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-xl px-6 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#2f2f2f] text-yellow-400 shadow-lg"
                    : "text-white hover:text-yellow-300"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Sign In */}
        <Link
          to="/login"
          className="rounded-2xl bg-black px-8 py-3 font-semibold text-white transition hover:bg-gray-800"
        >
          SIGN IN
        </Link>
      </div>
    </nav>
  );
}
