import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faExpand } from "@fortawesome/free-solid-svg-icons";

interface UploadPreviewProps {
  selectedImage: File | null;
  loading: boolean;
  onUpload: () => void;
  onRemove: () => void;
}

export const UploadPreview: React.FC<UploadPreviewProps> = ({
  selectedImage,
  loading,
  onUpload,
  onRemove,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!selectedImage) return null;

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <div className="w-full mt-8 bg-white rounded-2xl shadow p-8 flex flex-col items-center gap-6 transition-all duration-500 ease-in-out">
      <div className="w-full flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-center text-[var(--color-primary)] mb-6 w-full">
          Image Preview
        </h2>
        <hr className="w-24 border-t-2 border-gray-200 mx-auto mb-4" />
        <div className="w-full flex justify-center bg-gray-50 rounded-lg p-4 relative">
          <div
            className="relative group cursor-pointer overflow-hidden rounded-lg"
            onClick={openModal}
          >
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Preview"
              className="max-h-[60vh] w-auto max-w-full object-contain transition-all duration-300 group-hover:brightness-90"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300">
                <FontAwesomeIcon icon={faExpand} className="text-gray-700" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-8 w-full">
          <button
            type="button"
            onClick={onRemove}
            className="px-6 py-2 border-2 border-white text-red-500 rounded-full font-medium hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50 "
            disabled={loading}
          >
            Remove
          </button>
          <button
            type="button"
            onClick={onUpload}
            disabled={loading}
            className={`px-6 py-2 rounded-full font-medium text-white shadow ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[var(--color-accent)] hover:bg-[var(--color-secondary)]"
            } transition-colors`}
          >
            {loading ? "Processing..." : "Upload and Analyze Job"}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button
            className="absolute top-6 right-6 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center text-xl hover:scale-110 transition-all duration-200 shadow-lg"
            onClick={closeModal}
            aria-label="Close modal"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="max-w-5xl w-full max-h-[90vh] flex items-center justify-center p -4">
            <div className="relative bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Full size preview"
                className="max-h-[85vh] max-w-full object-contain p-2"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
