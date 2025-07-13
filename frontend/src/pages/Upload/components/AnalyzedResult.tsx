import React from "react";
import type { AnalyzeTextResponse } from "@/services/analyzeTextApi";

interface AnalyzedResultProps {
  data: AnalyzeTextResponse;
}

const AnalyzedResult: React.FC<AnalyzedResultProps> = ({ data }) => (
  <div className="w-full mt-6 p-6 rounded-xl bg-gray-50 border border-gray-200">
    <h3 className="text-xl font-bold mb-2">Analysis Result</h3>
    <div className="space-y-1">
      <div>
        <span className="font-semibold">Job Title:</span> {data.job_title}
      </div>
      {data.company_name && (
        <div>
          <span className="font-semibold">Company:</span> {data.company_name}
        </div>
      )}
      {data.location && (
        <div>
          <span className="font-semibold">Location:</span> {data.location}
        </div>
      )}
      {typeof data.visa_sponsorship !== 'undefined' && (
        <div>
          <span className="font-semibold">Visa Sponsorship:</span> {data.visa_sponsorship ? "Yes" : "No"}
        </div>
      )}
      {data.tech_stack?.length > 0 && (
        <div>
          <span className="font-semibold">Tech Stack:</span> {data.tech_stack.join(", ")}
        </div>
      )}
      {data.soft_skills?.length > 0 && (
        <div>
          <span className="font-semibold">Soft Skills:</span> {data.soft_skills.join(", ")}
        </div>
      )}
      {data.years_experience && (
        <div>
          <span className="font-semibold">Years Experience:</span> {data.years_experience}
        </div>
      )}
    </div>
  </div>
);

export default AnalyzedResult;
