import React, { useRef } from "react";
import { Element } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Hero: React.FC = () => {
  const mockupRef = useRef<HTMLDivElement>(null);

  return (
    <Element name="hero" className="relative overflow-hidden min-h-screen bg-white md:pt-15 px-24">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img 
          src="/assets/blob-scene-haikei.svg" 
          alt="Background" 
          className="w-full h-full object-cover"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col lg:flex-row items-center justify-between py-20 lg:py-0">

        <div className="lg:w-1/2 text-center lg:text-left mb-16 lg:mb-0">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-[var(--color-accent)] leading-tight">
            Land Your Dream Job <span className="text-[var(--color-primary)]">Faster</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 text-[var(--color-text-muted)] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Transform your job search with AI-powered tracking. Upload screenshots, get instant insights, and never miss an opportunity again.
          </p>
          
          <div className="cta-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a 
              href="/upload" 
              className="bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-bold px-8 py-4 rounded-full shadow-lg text-lg transition-colors duration-200 inline-flex items-center justify-center transform active:scale-95"
            >
              <span>Get Started Free</span>
              <FontAwesomeIcon 
                icon={faArrowRight} 
                className="ml-2 h-4 w-4" 
              />
            </a>
            
            <a 
              href="https://github.com/ris-tlp/job-portal" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-2 bg-white border-2 border-[var(--color-primary)] hover:border-[var(--color-secondary)] text-[var(--color-primary)] font-bold px-8 py-4 rounded-full shadow text-lg hover:bg-[var(--color-secondary)] hover:text-white transition-colors duration-200 transform active:scale-95"
            >
              <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
              <span>GitHub</span>
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-xl mx-auto lg:mx-0">
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--color-primary)] mb-1">10x</div>
              <div className="text-sm text-[var(--color-text-muted)]">Faster Tracking</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--color-secondary)] mb-1">24/7</div>
              <div className="text-sm text-[var(--color-text-muted)]">AI Insights</div>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              <div className="text-3xl font-bold text-[var(--color-accent)] mb-1">100+</div>
              <div className="text-sm text-[var(--color-text-muted)]">Happy Users</div>
            </div>
          </div>
        </div>

        <div ref={mockupRef} className="lg:w-1/2 relative flex items-center justify-center min-h-[500px]">
          <div className="relative w-full max-w-lg mx-auto">
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <div className="transform -scale-x-100">
                <img 
                  src="/assets/working_in_the_park.png" 
                  alt="Person working on laptop in the park"
                  className="w-full max-w-md h-full object-contain"
                />
              </div>
            </div>
            
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--color-accent)]/10 blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-[var(--color-primary)]/10 blur-xl"></div>
            
            {/* Floating elements */}
            <div className="absolute top-20 right-20 w-6 h-6 rounded-full bg-[var(--color-secondary)]/30 animate-float"></div>
            <div className="absolute top-1/3 left-10 w-5 h-5 rounded-full bg-[var(--color-accent)]/30 animate-float animation-delay-2000"></div>
            <div className="absolute bottom-20 right-20 w-4 h-4 rounded-full bg-[var(--color-primary)]/30 animate-float animation-delay-3000"></div>
            <div className="absolute bottom-1/3 left-1/4 w-3 h-3 rounded-full bg-[var(--color-secondary)]/30 animate-float animation-delay-1000"></div>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default Hero;
