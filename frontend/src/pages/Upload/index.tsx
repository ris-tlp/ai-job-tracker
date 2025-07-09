import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import type { FileWithPath } from 'react-dropzone';
import { AppNavbar } from '../../components/layout/AppNavbar';
import { UploadPreview } from './components/UploadPreview';
import { ParsedDataViewer } from './components/ParsedDataViewer';

const UploadPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle paste event for clipboard images
  const handlePaste = (event: React.ClipboardEvent) => {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.match('image/(jpeg|jpg|png)')) {
        const file = item.getAsFile();
        if (file) {
          setSelectedImage(file);
          setParsedData(null);
          break;
        }
      }
    }
  };

  // Handle file drop/selection
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type.match('image/(jpeg|jpg|png)')) {
        setSelectedImage(file);
        setParsedData(null);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png']
    },
    maxFiles: 1
  });

  const handleUpload = async () => {
    if (!selectedImage) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const res = await fetch('http://localhost:8000/api/parse-image', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setParsedData(JSON.stringify(data, null, 2));
    } catch (err) {
      setParsedData(`Error parsing image: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setParsedData(null);
  };

  return (
    <div onPaste={handlePaste}>
      <AppNavbar />
      <div className="min-h-screen bg-gradient-to-br from-[var(--color-bg)] via-white to-[var(--color-surface)] px-4 py-12 pt-32">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
          <div
            className={`w-full bg-white rounded-2xl shadow p-8 flex flex-col items-center gap-6 transition-all duration-500 ease-in-out ${selectedImage ? 'translate-y-0' : 'translate-y-40'
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
                  <p className="text-sm text-gray-500 mt-2">PNG, JPG, or JPEG only</p>
                </>
              )}
            </div>
          </div>

          {selectedImage && (
            <>
              <UploadPreview
                selectedImage={selectedImage}
                loading={loading}
                onUpload={handleUpload}
                onRemove={handleRemoveImage}
              />
              <ParsedDataViewer parsedData={parsedData} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
