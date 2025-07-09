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
      // Update this URL to your backend endpoint
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
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[var(--color-bg)] via-white to-[var(--color-surface)] px-4 py-12 pt-32"
      >
        <div className="w-full max-w-xl bg-white rounded-2xl shadow p-8 flex flex-col items-center gap-6">
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
        {selectedImage && (
          <div className="flex flex-col items-center gap-2">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Preview"
              className="max-h-64 rounded shadow mb-2"
            />
            <button
              className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-[var(--color-secondary)] transition-colors"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? "Parsing..." : "Upload & Parse"}
            </button>
          </div>
        )}
        {parsedData && (
          <div className="w-full mt-4 bg-gray-100 rounded p-4 text-left text-sm font-mono whitespace-pre-wrap">
            {parsedData}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default ImageUploadPage;
