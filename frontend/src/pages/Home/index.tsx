import React from "react";
import { Element } from "react-scroll";
import Hero from "./components/Hero";
import AlternatingFeatures from "./components/AlternatingFeatures";
import Testimonial from "./components/Testimonial";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <Element name="home">
          <Hero />
        </Element>

        <Element name="features">
          <AlternatingFeatures />
        </Element>

        <Element name="testimonials">
          <Testimonial />
        </Element>

        <Element name="cta">
          <FinalCTA />
        </Element>

        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
