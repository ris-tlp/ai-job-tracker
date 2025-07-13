import { useState, useCallback } from "react";
import type { ParseImageResponse } from "@/services/parseImageApi";
import type { AnalyzeTextResponse } from "@/services/analyzeTextApi";
import { useDropzone, type FileWithPath } from "react-dropzone";
import { useParseImageMutation } from "../../services/parseImageApi";
import { useAnalyzeTextMutation } from "../../services/analyzeTextApi";
import { AppNavbar } from "../../components/layout/AppNavbar";
import { UploadPreview } from "./components/UploadPreview";
import { ParsedDataViewer } from "./components/ParsedDataViewer";

const UploadPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<ParseImageResponse | null>(null);
  const [analyzedData, setAnalyzedData] = useState<AnalyzeTextResponse | null>(null);
  const [parseImage, { isLoading: isParsing }] = useParseImageMutation();
  const [analyzeText, { isLoading: isAnalyzing, error: rawAnalyzeError }] = useAnalyzeTextMutation();

  // Convert analyzeError to string | null
  let analyzeError: string | null = null;
  if (rawAnalyzeError) {
    if (typeof rawAnalyzeError === 'string') {
      analyzeError = rawAnalyzeError;
    } else if ('message' in rawAnalyzeError && typeof rawAnalyzeError.message === 'string') {
      analyzeError = rawAnalyzeError.message;
    } else {
      analyzeError = 'An error occurred while analyzing.';
    }
  }

  const handlePaste = (event: React.ClipboardEvent) => {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.match("image/(jpeg|jpg|png)")) {
        const file = item.getAsFile();
        if (file) {
          setSelectedImage(file);
          setParsedData(null);
          break;
        }
      }
    }
  };

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type.match("image/(jpeg|jpg|png)")) {
        setSelectedImage(file);
        setParsedData(null);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!selectedImage) return;
    setParsedData(null);
    setAnalyzedData(null);
    try {
      const parsed = await parseImage(selectedImage).unwrap();
      setParsedData(parsed);
      if (parsed && parsed.parsed_text) {
        const analyzed = await analyzeText({ text: parsed.parsed_text }).unwrap();
        setAnalyzedData(analyzed);
      }
    } catch (err) {
      console.error("Upload or analyze error:", err);
      setParsedData(null);
      setAnalyzedData(null);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setParsedData(null);
  };

  return (
    <div onPaste={handlePaste} className="relative min-h-screen bg-white">
      <AppNavbar />
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          src="/assets/circle-scatter-haikei.svg"
          alt="Background"
          className="w-full h-full object-cover opacity-70"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="relative z-10 min-h-screen bg-gradient-to-br from-[var(--color-bg)]/30 via-white/30 to-[var(--color-surface)]/30 backdrop-blur-sm px-4 py-12 pt-32">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center min-h-[60vh] justify-center">
          <div
            className={`w-full bg-white rounded-2xl shadow p-8 flex flex-col items-center gap-6 transition-all duration-500 ease-in-out`}
          >
            <h1 className="text-3xl font-bold mb-2 text-[var(--color-primary)]">
              Upload, Drag, or Paste an Image
            </h1>
            <div
              {...getRootProps({
                className:
                  "w-full flex flex-col items-center justify-center border-2 border-dashed border-[var(--color-primary)] rounded-xl py-10 px-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors text-center",
              })}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-lg text-[var(--color-primary)] font-semibold">
                  Drop the image here...
                </p>
              ) : (
                <>
                  <p className="text-lg text-gray-700">
                    Drag & drop, click to select, or paste an image
                  </p>
                  <p className="text-sm text-gray-500 mt-2">PNG, JPG, or JPEG only</p>
                </>
              )}
            </div>
          </div>

          {selectedImage && (
            <>
              <UploadPreview
                selectedImage={selectedImage}
                loading={isParsing}
                onUpload={handleUpload}
                onRemove={handleRemoveImage}
              />
              <ParsedDataViewer parsedData={parsedData} analyzedData={analyzedData} isAnalyzing={isAnalyzing} analyzeError={analyzeError} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
