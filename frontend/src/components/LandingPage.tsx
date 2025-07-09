import React from "react";
import Navbar from "./landing/Navbar";
import Hero from "./landing/Hero";

const LandingPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-0 pt-20">
        <Hero />
      </main>
    </>
  );
};

export default LandingPage;
