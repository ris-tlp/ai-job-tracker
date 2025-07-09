import React from "react";
import { Element } from "react-scroll";

const Testimonial: React.FC = () => (
  <Element name="testimonial" className="py-20 px-4 bg-white flex flex-col items-center">
    <div className="max-w-2xl mx-auto text-center">
      <div className="flex flex-col items-center mb-6">
        <img src="/assets/omar_picture.jpg" alt="Testimonial" className="w-16 h-16 rounded-full border-4 border-[var(--color-primary)] shadow mb-2" />
        <span className="text-lg font-bold text-[var(--color-primary)]">Omar Khan, Software Engineer</span>
      </div>
      <blockquote className="text-xl italic text-[var(--color-text-muted)]">“This platform made hiring and tracking jobs effortless. The AI summaries are spot on and the interface is gorgeous!”</blockquote>
    </div>
  </Element>
);

export default Testimonial;
