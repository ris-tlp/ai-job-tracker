import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/components/ui/Logo";

const NAV_LINKS = [
  { name: "Job Tracker", to: "/tracker" },
  { name: "Upload", to: "/upload" },
];

const AppNavbar: React.FC = () => {
  const location = useLocation();
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center space-x-2 group">
          <Logo className="h-8 w-auto text-[var(--color-primary)] group-hover:opacity-80 transition" />
          <span className="text-2xl font-extrabold text-[var(--color-primary)] tracking-tight">
            AI Job Portal
          </span>
        </Link>
        <div className="hidden md:flex gap-6 items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className={`text-base font-semibold px-4 py-2 rounded transition-colors duration-150 cursor-pointer ${
                location.pathname === link.to
                  ? "text-[var(--color-primary)] font-bold"
                  : "text-gray-700 hover:text-[var(--color-primary)]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export { AppNavbar };
