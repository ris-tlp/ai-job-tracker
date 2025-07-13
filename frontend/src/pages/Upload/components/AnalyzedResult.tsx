import React from "react";
import type { AnalyzeTextResponse } from "@/services/analyzeTextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jobIcons } from "./fontAwesomeJobIcons";

interface AnalyzedResultProps {
  data: AnalyzeTextResponse;
}

const AnalyzedResult: React.FC<AnalyzedResultProps> = ({ data }) => (
  <div className="w-full p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-md">
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <FontAwesomeIcon
          icon={jobIcons.jobTitle}
          className="text-lg mr-2 text-[var(--color-accent)]"
        />
        <span className="font-semibold">Job Title:</span>
        <span className="ml-2 text-gray-800">{data.job_title}</span>
      </div>
      {data.company_name && (
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={jobIcons.company}
            className="text-lg mr-2 text-[var(--color-accent)]"
          />
          <span className="font-semibold">Company:</span>
          <span className="ml-2 text-gray-800">{data.company_name}</span>
        </div>
      )}
      {data.location && (
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={jobIcons.location}
            className="text-lg mr-2 text-[var(--color-accent)]"
          />
          <span className="font-semibold">Location:</span>
          <span className="ml-2 text-gray-800">{data.location}</span>
        </div>
      )}
      {typeof data.visa_sponsorship !== "undefined" && (
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={jobIcons.visa}
            className="text-lg mr-2 text-[var(--color-accent)]"
          />
          <span className="font-semibold">Visa Sponsorship:</span>
          <span
            className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${data.visa_sponsorship ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {data.visa_sponsorship ? "Yes" : "No"}
          </span>
        </div>
      )}
      {data.years_experience && (
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={jobIcons.experience}
            className="text-lg mr-2 text-[var(--color-accent)]"
          />
          <span className="font-semibold">Years Experience:</span>
          <span className="ml-2 text-gray-800">{data.years_experience}</span>
        </div>
      )}
      {data.tech_stack?.length > 0 && (
        <div className="flex items-center flex-wrap">
          <FontAwesomeIcon
            icon={jobIcons.tech}
            className="text-lg mr-2 text-[var(--color-accent)]"
          />
          <span className="font-semibold mr-2">Tech Stack:</span>
          <div className="flex flex-wrap gap-1">
            {data.tech_stack.map((tech, idx) => (
              <span
                key={tech + idx}
                className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium mr-1 mb-1"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
      {data.soft_skills?.length > 0 && (
        <div className="flex items-center flex-wrap">
          <FontAwesomeIcon
            icon={jobIcons.soft}
            className="text-lg mr-2 text-[var(--color-accent)]"
          />
          <span className="font-semibold mr-2">Soft Skills:</span>
          <div className="flex flex-wrap gap-1">
            {data.soft_skills.map((skill, idx) => (
              <span
                key={skill + idx}
                className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-medium mr-1 mb-1"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default AnalyzedResult;
