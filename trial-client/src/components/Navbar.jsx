import { useState } from "react";

const navItems = ["Home", "About Us", "AI Assistant", "Session", "Contact Us"];

export default function Navbar() {
  const [active, setActive] = useState(2);

  return (
    <nav className="w-full py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8">
        {/* Logo */}
        <button className="rounded-2xl bg-black px-8 py-3 font-bold text-yellow-400">
          LOGO
        </button>

        {/* Menu */}
        <div className="relative flex rounded-2xl bg-[#555] p-2">
          {/* Active Background */}
          <div
            className="absolute top-2 bottom-2 rounded-xl bg-[#2f2f2f] shadow-lg transition-all duration-300 ease-in-out"
            style={{
              width: "120px",
              left: `${8 + active * 120}px`,
            }}
          />

          {navItems.map((item, index) => (
            <button
              key={item}
              onClick={() => setActive(index)}
              className={`relative z-10 w-[120px] rounded-xl py-2 text-sm font-medium transition-colors duration-300 ${
                active === index
                  ? "text-yellow-400"
                  : "text-white hover:text-yellow-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Sign In */}
        <button className="rounded-2xl bg-black px-8 py-3 font-semibold text-white">
          SIGN IN
        </button>
      </div>
    </nav>
  );
}
