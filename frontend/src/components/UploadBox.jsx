import { useRef, useState } from "react";
import { Upload, X, Search } from "lucide-react";
import { searchByImage } from "../lib/api";

export default function UploadBox({
  disabled,
  setLoading,
  onResults,
  onError,
}) {
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [k, setK] = useState(10);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f && f.type.startsWith("image/")) {
      setFile(f);
      setPreviewUrl(URL.createObjectURL(f));
    } else {
      setFile(null);
      setPreviewUrl(null);
      onError && onError("Please select a valid image file.");
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreviewUrl(null);
    if (fileInput.current) fileInput.current.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return onError && onError("No image selected.");
    setLoading(true);
    onError && onError("");
    try {
      const topK = Math.max(1, Math.min(10, Number(k) || 10)); // Ensure 1–10 range
      const result = await searchByImage(file, topK);
      onResults && onResults(result.results || []);
    } catch (err) {
      onError && onError(err.message || "Upload/search failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Upload Image
      </label>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
          id="file-upload-input"
        />

        <label
          htmlFor="file-upload-input"
          className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-purple-300 rounded-xl ${
            disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          } bg-purple-50 hover:bg-purple-100 transition-colors`}
        >
          {previewUrl ? (
            <div className="relative w-full h-full">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-contain rounded-xl"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleClear();
                }}
                disabled={disabled}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 text-purple-400 mb-2" />
              <p className="text-sm text-gray-600">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-1">Max. File Size: 15MB</p>
            </>
          )}
        </label>

        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700">
            Results count: {k}
          </label>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={k}
            onChange={(e) => setK(e.target.value)}
            disabled={disabled}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={disabled || !file}
          className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          Search by Image
        </button>
      </form>
    </div>
  );
}
