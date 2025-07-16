import React from "react";
import { Element } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faBolt, faChartLine } from "@fortawesome/free-solid-svg-icons";

const sections = [
  {
    img: "/assets/landing_1.png",
    title: "Effortless Uploads",
    desc: "Drag and drop or paste your job screenshots taken from browser's native screenshot tool. Our AI does the rest, no manual entry required.",
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
    desc: "Get instant, actionable summaries that detail job requirements, visa sponsorship availability, and more.",
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
    desc: "Stay organized with a beautiful, interactive tracker. Instantly add jobs of interest right after generating an AI summary, no more forgetting important details or manually copying information.",
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
  <section className="w-full bg-[var(--color-bg)]">
    {sections.map((section, idx) => (
      <Element
        name={section.name}
        key={section.title}
        className={`flex flex-col ${section.reverse ? "md:flex-row-reverse" : "md:flex-row"} items-stretch min-h-[50vh] w-full mb-16 ${idx === 0 ? "mt-16" : ""}`}
      >
        <div className="md:w-1/2 w-full h-[50vh] flex items-center justify-center">
          <img
            src={section.img}
            alt={section.title}
            className={`w-full h-full object-contain
  ${section.reverse
    ? "rounded-tl-[6rem] rounded-br-[4rem] rounded-tr-md rounded-bl-sm md:-translate-x-10 md:-translate-y-6 md:-rotate-3"
    : "rounded-tr-[6rem] rounded-bl-[4rem] rounded-tl-md rounded-br-sm md:translate-x-10 md:-translate-y-6 md:rotate-3"}
  `}
            style={{
              boxShadow: `0 2px 12px 0 var(--color-${section.color}, rgba(0,0,0,0.06))`,
              border: '2px solid rgba(0,0,0,0.04)',
              borderColor: `var(--color-${section.color})`,
            }}
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
