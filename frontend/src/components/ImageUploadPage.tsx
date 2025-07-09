import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import AppNavbar from "./AppNavbar";

const ImageUploadPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setSelectedImage(acceptedFiles[0]);
      setParsedData(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
    maxFiles: 1,
  });

  // Handle upload to backend
  const handleUpload = async () => {
    if (!selectedImage) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedImage);
    try {
      const res = await fetch("http://localhost:8000/api/parse-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setParsedData(JSON.stringify(data, null, 2));
    } catch (err) {
      setParsedData("Error parsing image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppNavbar />
      <div className="min-h-screen bg-gradient-to-br from-[var(--color-bg)] via-white to-[var(--color-surface)] px-4 py-12 pt-32">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
          <div 
            className={`w-full bg-white rounded-2xl shadow p-8 flex flex-col items-center gap-6 transition-all duration-500 ease-in-out ${
              selectedImage ? 'translate-y-0' : 'translate-y-40'
            }`}
          >
            <h1 className="text-3xl font-bold mb-2 text-[var(--color-primary)]">Upload, Drag, or Paste an Image</h1>
            <div
              {...getRootProps({
                className:
                  "w-full flex flex-col items-center justify-center border-2 border-dashed border-[var(--color-primary)] rounded-xl py-10 px-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors text-center"
              })}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-lg text-[var(--color-primary)] font-semibold">Drop the image here...</p>
              ) : (
                <>
                  <p className="text-lg text-gray-700">Drag & drop, click to select, or paste an image</p>
                  <p className="text-sm text-gray-500 mt-2">PNG, JPG, JPEG, GIF, etc.</p>
                </>
              )}
            </div>
          </div>

          {selectedImage && (
            <div className="w-full mt-8 bg-white rounded-2xl shadow p-8 flex flex-col items-center gap-6 transition-all duration-500 ease-in-out">
              <div className="w-full flex flex-col items-center">
                <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-6">Preview</h2>
                <div className="w-full flex justify-center bg-gray-50 rounded-lg p-4">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Preview"
                    className="max-h-[60vh] w-auto max-w-full object-contain"
                  />
                </div>
                <button
                  className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-[var(--color-secondary)] transition-colors mt-8"
                  onClick={handleUpload}
                  disabled={loading}
                >
                  {loading ? "Parsing..." : "Upload image"}
                </button>
              </div>

              {parsedData && (
                <div className="w-full mt-8">
                  <h3 className="text-xl font-semibold text-[var(--color-secondary)] mb-4">Parsed Information</h3>
                  <div className="w-full bg-gray-100 rounded p-4 text-left text-sm font-mono whitespace-pre-wrap max-h-96 overflow-y-auto">
                    {parsedData}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageUploadPage;
