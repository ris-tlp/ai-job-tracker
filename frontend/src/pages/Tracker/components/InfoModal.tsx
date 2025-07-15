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
        className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-8 md:p-10 relative border border-[var(--color-primary)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-3xl font-bold rounded-full w-10 h-10 flex items-center justify-center bg-[var(--color-accent)]/20 text-[var(--color-primary)] hover:bg-[var(--color-accent)] hover:text-white transition-colors shadow"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-[var(--color-primary)] tracking-tight text-center drop-shadow-sm">
          Candidate Info
        </h2>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-6">
          <div className="flex-1 bg-[var(--color-accent)]/10 rounded-xl p-4 flex flex-col items-center justify-center">
            <h3 className="font-semibold text-[var(--color-secondary)] mb-1 text-base uppercase tracking-wide">Created At</h3>
            {createdAt ? (
              <span className="text-[var(--color-primary)] font-semibold text-lg">
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
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="flex-1 bg-[var(--color-primary)]/5 rounded-xl p-5">
            <h3 className="font-semibold text-[var(--color-primary)] mb-2 text-base uppercase tracking-wide">Tech Stack</h3>
            {techStack ? (
              <div className="flex flex-wrap gap-2">
                {techStack.split(",").map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold px-3 py-1 rounded-full text-sm shadow-sm border border-[var(--color-primary)]"
                  >
                    {item.trim()}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">No info</p>
            )}
          </div>
          <div className="flex-1 bg-[var(--color-secondary)]/10 rounded-xl p-5">
            <h3 className="font-semibold text-[var(--color-secondary)] mb-2 text-base uppercase tracking-wide">Soft Skills</h3>
            {softSkills ? (
              <div className="flex flex-wrap gap-2">
                {softSkills.split(",").map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] font-semibold px-3 py-1 rounded-full text-sm shadow-sm border border-[var(--color-secondary)]"
                  >
                    {item.trim()}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">No info</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default InfoModal;
