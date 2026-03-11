import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Home", path: "/" },
  { label: "Dulcería", path: "/dulceria" },
  { label: "Login", path: "/login" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 h-16 bg-black/90 backdrop-blur-md border-b border-yellow-700/20">
      <span className="text-yellow-500 text-xl font-bold tracking-widest uppercase font-serif">
        Cineplanet
      </span>

      <div className="flex gap-8">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`
              text-xs tracking-widest uppercase font-serif transition-all duration-200 pb-1
              ${
                location.pathname === link.path
                  ? "text-yellow-500 border-b-2 border-yellow-500"
                  : "text-white/50 border-b-2 border-transparent hover:text-yellow-500/80"
              }
            `}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
