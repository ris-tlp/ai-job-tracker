import React, { useCallback } from "react";
import { useCreateJobMutation, VisaSponsorshipStatus, type ApiError } from "@/services/jobApi";
import type { AnalyzeTextResponse } from "@/services/analyzeTextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jobIcons } from "./fontAwesomeJobIcons";
import { toast } from "sonner";

interface AnalyzedResultProps {
  data: AnalyzeTextResponse;
}

const AnalyzedResult: React.FC<AnalyzedResultProps> = ({ data }) => {
  const [createJob, { isLoading }] = useCreateJobMutation();

  const handleAddToTracker = useCallback(async () => {
    try {
      if (!data.job_title) {
        toast.error('Job title is required');
        return;
      }

      const jobData = {
        job_title: data.job_title,
        company_name: data.company_name || '',
        location: data.location || '',
        visa_sponsorship: data.visa_sponsorship || VisaSponsorshipStatus.UNAVAILABLE,
        tech_stack: data.tech_stack || '',
        soft_skills: data.soft_skills || '',
        years_experience: data.years_experience || '',
      };

      await createJob(jobData).unwrap();
      toast.success('Job added to tracker successfully!');
    } catch (error) {
      console.error('Failed to add job to tracker:', error);
      const apiError = error as { data?: ApiError };
      const errorMessage = apiError.data?.error?.message || 'Failed to add job to tracker';
      toast.error(errorMessage);
    }
  }, [data, createJob]);

  return (
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
              className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${
                data.visa_sponsorship === VisaSponsorshipStatus.AVAILABLE
                  ? "bg-green-100 text-green-700"
                  : data.visa_sponsorship === VisaSponsorshipStatus.NOT_AVAILABLE
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
              }`}
            >
              {data.visa_sponsorship === VisaSponsorshipStatus.AVAILABLE
                ? "Available"
                : data.visa_sponsorship === VisaSponsorshipStatus.NOT_AVAILABLE
                  ? "Not Available"
                  : "Unavailable"}
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
        {data.tech_stack && data.tech_stack.length > 0 && (
          <div className="flex items-center flex-wrap">
            <FontAwesomeIcon
              icon={jobIcons.tech}
              className="text-lg mr-2 text-[var(--color-accent)]"
            />
            <span className="font-semibold mr-2">Tech Stack:</span>
            <div className="flex flex-wrap gap-1">
              {data.tech_stack.split(",").map((tech, idx) => (
                <span
                  key={tech + idx}
                  className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium mr-1 mb-1"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
        {data.soft_skills && data.soft_skills.length > 0 && (
          <div className="flex items-center flex-wrap">
            <FontAwesomeIcon
              icon={jobIcons.soft}
              className="text-lg mr-2 text-[var(--color-accent)]"
            />
            <span className="font-semibold mr-2">Soft Skills:</span>
            <div className="flex flex-wrap gap-1">
              {data.soft_skills.split(",").map((skill, idx) => (
                <span
                  key={skill + idx}
                  className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-medium mr-1 mb-1"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
        <button
          onClick={handleAddToTracker}
          disabled={isLoading}
          className="mt-4 px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 self-start"
        >
          <FontAwesomeIcon icon={jobIcons.add} className="text-lg" />
          {isLoading ? 'Adding...' : 'Add to Tracker'}
        </button>
      </div>
    </div>
  );
};

export default AnalyzedResult;
