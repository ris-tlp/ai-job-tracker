import React from 'react';

interface ParsedDataViewerProps {
  parsedData: string | null;
}

export const ParsedDataViewer: React.FC<ParsedDataViewerProps> = ({
  parsedData,
}) => {
  if (!parsedData) return null;

  return (
    <div className="w-full mt-8">
      <h3 className="text-xl font-semibold text-[var(--color-secondary)] mb-4">
        Parsed Information
      </h3>
      <div className="w-full bg-gray-100 rounded p-4 text-left text-sm font-mono whitespace-pre-wrap max-h-96 overflow-y-auto">
        {parsedData}
      </div>
    </div>
  );
};
