import React from "react";

const Footer: React.FC = () => (
  <footer className="py-8 px-6 bg-white border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
    <span>© {new Date().getFullYear()} AI Job Portal. All rights reserved.</span>
    <div className="flex gap-4 mt-2 md:mt-0">
      <a href="#privacy" className="hover:text-[var(--color-primary)]">Privacy Policy</a>
      <a href="#terms" className="hover:text-[var(--color-primary)]">Terms of Service</a>
      <a href="#contact" className="hover:text-[var(--color-primary)]">Contact</a>
    </div>
  </footer>
);

export default Footer;
