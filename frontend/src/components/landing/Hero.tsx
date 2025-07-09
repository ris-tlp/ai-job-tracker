import React from "react";
import { Element } from "react-scroll";

const Hero: React.FC = () => (
  <Element name="hero" className="relative flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-[var(--color-bg)] via-white to-[var(--color-surface)] overflow-hidden h-screen">
    {/* Polka dot SVG background */}
    <svg
      className="absolute left-0 top-0 z-0 pointer-events-none"
      width="100vw"
      height="100vh"
      viewBox="0 0 1920 1080"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ objectFit: 'cover', minWidth: '100vw', minHeight: '100vh' }}
    >
      <defs>
        <pattern id="polka" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="8" cy="8" r="4" fill="var(--color-accent)" fillOpacity="0.155" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#polka)" />
    </svg>
    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-[var(--color-primary)] drop-shadow-lg">Find Your Dream Career</h1>
    <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-[var(--color-text-muted)]">The fastest way to land your next job. Upload a screenshot, let AI do the rest, and track every opportunity in one place.</p>
    <div className="flex flex-col md:flex-row gap-4 justify-center">
      <a href="#signup" className="bg-[var(--color-primary)] text-white font-bold px-8 py-4 rounded-full shadow-lg text-lg hover:bg-[var(--color-secondary)] transition-colors duration-200">Get Started</a>
      <a href="#demo" className="bg-white border border-[var(--color-primary] hover:border-[var(--color-secondary)] text-[var(--color-primary)] font-bold px-8 py-4 rounded-full shadow text-lg hover:bg-[var(--color-secondary)] hover:text-white transition-colors duration-200">Learn More</a>
    </div>
    <div className="absolute -top-32 -left-32 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-3xl z-0" />
    <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl z-0" />
  </Element>
);

export default Hero;
