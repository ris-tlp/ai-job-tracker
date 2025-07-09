import React from "react";
import Navbar from "./landing/Navbar";
import Hero from "./landing/Hero";
import AlternatingFeatures from "./landing/AlternatingFeatures";

const LandingPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-0 pt-20">
        <Hero />
        <AlternatingFeatures />
      </main>
    </>
  );
};

export default LandingPage;
