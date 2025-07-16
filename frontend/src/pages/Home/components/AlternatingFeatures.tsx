import React from "react";
import { Element } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faBolt, faChartLine } from "@fortawesome/free-solid-svg-icons";

const sections = [
  {
    img: "/assets/landing_1.png",
    title: "Effortless Uploads",
    desc: "Drag and drop your job screenshots. Our AI does the rest—no manual entry required.",
    color: "primary",
    reverse: false,
    name: "upload",
    icon: (
      <FontAwesomeIcon
        icon={faUpload}
        className="text-3xl"
        style={{ color: `var(--color-primary)` }}
      />
    ),
  },
  {
    img: "/assets/landing_2.png",
    title: "AI Summaries",
    desc: "Get instant, actionable summaries and recommendations tailored to you.",
    color: "secondary",
    reverse: true,
    name: "summaries",
    icon: (
      <FontAwesomeIcon
        icon={faBolt}
        className="text-3xl"
        style={{ color: `var(--color-secondary)` }}
      />
    ),
  },
  {
    img: "/assets/landing_3.png",
    title: "Track Every Opportunity",
    desc: "Stay organized with a beautiful, interactive tracker. Monitor your applications, interviews, and offers—all in one place.",
    color: "accent",
    reverse: false,
    name: "tracker",
    icon: (
      <FontAwesomeIcon
        icon={faChartLine}
        className="text-3xl"
        style={{ color: `var(--color-accent)` }}
      />
    ),
  },
];

const AlternatingFeatures: React.FC = () => (
  <section className="w-full">
    {sections.map((section) => (
      <Element
        name={section.name}
        key={section.title}
        className={`flex flex-col ${section.reverse ? "md:flex-row-reverse" : "md:flex-row"} items-stretch min-h-[50vh] w-full`}
      >
        <div className="md:w-1/2 w-full h-[50vh] flex items-center justify-center">
          <img
            src={section.img}
            alt={section.title}
            className={`w-full h-full object-contain rounded-none md:shadow-xl
    ${section.reverse ? "md:rounded-l-xl md:border-l-4" : "md:rounded-r-xl md:border-r-4"}
  `}
            style={{ borderColor: `var(--color-${section.color})` }}
          />
        </div>
        <div
          className={`md:w-1/2 w-full flex flex-col justify-center items-center px-8 py-16 ${section.reverse ? "bg-[var(--color-bg)]" : "bg-[var(--color-surface)]"}`}
        >
          <div
            className="w-16 h-16 flex items-center justify-center rounded-full mb-6"
            style={{
              color: "white",
            }}
          >
            {section.icon}
          </div>
          <h2
            className="text-4xl font-extrabold mb-6"
            style={{ color: `var(--color-${section.color})` }}
          >
            {section.title}
          </h2>
          <p className="text-lg text-[var(--color-text-muted)] max-w-xl text-center">
            {section.desc}
          </p>
        </div>
      </Element>
    ))}
  </section>
);

export default AlternatingFeatures;
