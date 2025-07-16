import { Link as ScrollLink } from "react-scroll";
import Logo from "@/components/ui/Logo";

const NAV_LINKS = [
  { name: "Features", to: "upload" },
  { name: "Get Started", to: "upload", cta: true },
];

const Navbar: React.FC = () => (
  <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm">
    <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      <a href="/" className="flex items-center space-x-2 group">
        <Logo className="h-8 w-auto text-[var(--color-primary)] group-hover:opacity-80 transition" />
        <span className="text-2xl font-extrabold text-[var(--color-primary)] tracking-tight group-hover:underline">
          AI Job Portal
        </span>
      </a>
      <div className="hidden md:flex gap-6 items-center">
        {NAV_LINKS.map((link) => (
          link.cta ? (
            <a
              key={link.name}
              href="/upload"
              className="cursor-pointer text-base font-semibold px-4 py-2 rounded transition-colors duration-150 bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)] shadow"
            >
              {link.name}
            </a>
          ) : (
            <ScrollLink
              key={link.name}
              to={link.to}
              smooth={true}
              duration={500}
              offset={-80}
              className="cursor-pointer text-base font-semibold px-4 py-2 rounded transition-colors duration-150 text-gray-700 hover:text-[var(--color-primary)]"
              activeClass="!text-[var(--color-primary)] font-bold"
              spy={true}
            >
              {link.name}
            </ScrollLink>
          )
        ))}
      </div>
    </div>
  </nav>
);

export default Navbar;
