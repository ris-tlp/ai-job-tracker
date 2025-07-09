import React from "react";
import { Element } from "react-scroll";

const FinalCTA: React.FC = () => (
  <Element name="signup" className="py-16 flex flex-col items-center justify-center bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-primary)]">Ready to land your next job?</h2>
    <p className="mb-8 text-lg text-[var(--color-text-muted)]">Sign up now and let AI supercharge your job search journey.</p>
    <a href="#signup" className="bg-[var(--color-primary)] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:bg-[var(--color-secondary)] transition-colors duration-200 text-lg">Create Free Account</a>
  </Element>
);

export default FinalCTA;
