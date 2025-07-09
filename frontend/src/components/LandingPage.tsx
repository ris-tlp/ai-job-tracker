import React from "react";
import Navbar from "./landing/Navbar";
import Hero from "./landing/Hero";
import AlternatingFeatures from "./landing/AlternatingFeatures";
import Testimonial from "./landing/Testimonial";
import FinalCTA from "./landing/FinalCTA";

const LandingPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-0 pt-20">
        <Hero />
        <AlternatingFeatures />
        <Testimonial />
        <FinalCTA />
      </main>
    </>
  );
};

export default LandingPage;
