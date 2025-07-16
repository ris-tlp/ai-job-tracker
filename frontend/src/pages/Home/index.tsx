import React from "react";
import { Element } from "react-scroll";
import Hero from "@/pages/Home/components/Hero";
import AlternatingFeatures from "@/pages/Home/components/AlternatingFeatures";
import Testimonial from "@/pages/Home/components/Testimonial";
import FinalCTA from "@/pages/Home/components/FinalCTA";
import Footer from "@/pages/Home/components/Footer";
import Navbar from "@/pages/Home/components/Navbar";

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
