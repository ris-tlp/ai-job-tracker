import React from "react";
import type { ParseImageResponse } from "@/services/parseImageApi";
import type { AnalyzeTextResponse } from "@/services/analyzeTextApi";
import AnalyzedResult from "./AnalyzedResult";

interface ParsedDataViewerProps {
  parsedData: ParseImageResponse | null;
  analyzedData: AnalyzeTextResponse | null;
  isAnalyzing: boolean;
  analyzeError: string | null;
}

export const ParsedDataViewer: React.FC<ParsedDataViewerProps> = ({
  parsedData,
  analyzedData,
  isAnalyzing,
  analyzeError,
}) => {
  if (!parsedData) return null;

  return (
    <div className="w-full mt-8 bg-white rounded-2xl shadow p-8 flex flex-col items-center gap-6 transition-all duration-500 ease-in-out">
      <h2 className="text-2xl font-semibold text-center text-[var(--color-primary)] mb-2 w-full">
        Parsed and Analyzed Job
      </h2>
      <hr className="w-24 border-t-2 border-gray-200 mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-left text-[var(--color-secondary)] w-full">
        Parsed Image
      </h2>
      <div className="mb-2 text-base font-semibold w-full text-left">
        File Name: <span className="font-mono text-blue-700">{parsedData.image_name}</span>
      </div>
      <div className="w-full bg-gray-100 rounded p-4 text-left text-sm font-mono whitespace-pre-wrap max-h-96 overflow-y-auto border border-gray-300">
        {parsedData.parsed_text}
      </div>
      <h2 className="text-xl font-semibold text-left text-[var(--color-secondary)] w-full mb-1 mt-6">
        Analyzed Job
      </h2>
      {isAnalyzing && <div className="text-blue-600">Analyzing job description...</div>}
      {analyzeError && (
        <div className="text-red-600 mb-2">Error analyzing text. Please try again.</div>
      )}
      {analyzedData && <AnalyzedResult data={analyzedData} />}
    </div>
  );
};
