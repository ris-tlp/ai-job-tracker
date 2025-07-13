import React, { useState } from "react";
import type { ParseImageResponse } from "@/services/parseImageApi";
import type { AnalyzeTextResponse } from "@/services/analyzeTextApi";
import AnalyzedResult from "./AnalyzedResult";
import { useAnalyzeTextMutation } from "@/services/analyzeTextApi";

interface ParsedDataViewerProps {
  parsedData: ParseImageResponse | null;
}

export const ParsedDataViewer: React.FC<ParsedDataViewerProps> = ({ parsedData }) => {
  const [showResult, setShowResult] = useState(false);
  const [analyzeText, mutationResult] = useAnalyzeTextMutation();
  const data: AnalyzeTextResponse | undefined = mutationResult.data;
  const isLoading = mutationResult.isLoading;
  const error = mutationResult.error;

  if (!parsedData) return null;

  const handleAnalyze = async () => {
    if (!parsedData.parsed_text) return;
    await analyzeText({ text: parsedData.parsed_text });
    setShowResult(true);
  };

  return (
    <div className="w-full mt-8 bg-white rounded-2xl shadow p-8 flex flex-col items-center gap-6 transition-all duration-500 ease-in-out">
      <h2 className="text-2xl font-semibold text-center text-[var(--color-primary)] mb-2 w-full">
        Parsed Information
      </h2>
      <div className="mb-2 text-base font-semibold w-full text-left">
        File Name: <span className="font-mono text-blue-700">{parsedData.image_name}</span>
      </div>
      <div className="w-full bg-gray-100 rounded p-4 text-left text-sm font-mono whitespace-pre-wrap max-h-96 overflow-y-auto border border-gray-300">
        {parsedData.parsed_text}
      </div>
      <button
        type="button"
        onClick={handleAnalyze}
        disabled={isLoading}
        className={`px-6 py-2 rounded-full font-medium text-white shadow mt-4 ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[var(--color-accent)] hover:bg-[var(--color-secondary)]"
        } transition-colors`}
      >
        {isLoading ? "Analyzing..." : "Analyze"}
      </button>
      {showResult && error && (
        <div className="text-red-600 mb-2">Error analyzing text. Please try again.</div>
      )}
      {showResult && data && <AnalyzedResult data={data} />}
    </div>
  );
};


