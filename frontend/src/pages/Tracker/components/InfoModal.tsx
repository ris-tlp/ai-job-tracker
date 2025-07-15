import React from "react";

interface InfoModalProps {
  open: boolean;
  onClose: () => void;
  techStack?: string;
  softSkills?: string;
  createdAt?: string;
}

const InfoModal: React.FC<InfoModalProps> = ({
  open,
  onClose,
  techStack,
  softSkills,
  createdAt,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 text-primary">Candidate Info</h2>
        <div className="mb-4">
          <h3 className="font-medium text-gray-700 mb-2">Created At</h3>
          {createdAt ? (
            <span className="text-gray-800">
              {(() => {
                const date = new Date(createdAt);
                return isNaN(date.getTime())
                  ? createdAt
                  : date.toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    });
              })()}
            </span>
          ) : (
            <span className="text-gray-400 italic">No info</span>
          )}
        </div>
        <div className="mb-4">
          <h3 className="font-medium text-gray-700 mb-2">Tech Stack</h3>
          {techStack ? (
            <ul className="list-disc pl-5 text-gray-800">
              {techStack.split(",").map((item, idx) => (
                <li key={idx}>{item.trim()}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 italic">No info</p>
          )}
        </div>
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Soft Skills</h3>
          {softSkills ? (
            <ul className="list-disc pl-5 text-gray-800">
              {softSkills.split(",").map((item, idx) => (
                <li key={idx}>{item.trim()}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 italic">No info</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
