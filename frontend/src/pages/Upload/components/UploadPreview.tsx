import React from 'react';

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
  if (!selectedImage) return null;

  return (
    <div className="w-full mt-8 bg-white rounded-2xl shadow p-8 flex flex-col items-center gap-6 transition-all duration-500 ease-in-out">
      <div className="w-full flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-center text-[var(--color-primary)] mb-6 w-full">
          Image Preview
        </h2>
        <div className="w-full flex justify-center bg-gray-50 rounded-lg p-4 relative">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            className="max-h-[60vh] w-auto max-w-full object-contain"
          />
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
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[var(--color-accent)] hover:bg-[var(--color-secondary)]'
            } transition-colors`}
          >
            {loading ? 'Processing...' : 'Upload Image'}
          </button>
        </div>
      </div>
    </div>
  );
};
