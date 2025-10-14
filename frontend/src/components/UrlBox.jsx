import { useState } from "react";
import { Search, X } from "lucide-react";
import { searchByUrl } from "../lib/api";

export default function UrlBox({ disabled, setLoading, onResults, onError }) {
  const [url, setUrl] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const validateImageUrl = (u) => {
    return /^https?:\/\/.+\.(jpe?g|png|webp|gif)$/i.test(u);
  };

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    // Show preview if URL looks valid
    if (validateImageUrl(newUrl)) {
      setShowPreview(true);
    } else {
      setShowPreview(false);
    }
  };

  const handleClear = () => {
    setUrl("");
    setShowPreview(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateImageUrl(url)) {
      onError && onError("Enter a valid image URL (jpg/png/webp/gif).");
      return;
    }
    setLoading(true);
    onError && onError("");
    try {
      const result = await searchByUrl(url);
      onResults && onResults(result.results || []);
    } catch (err) {
      onError && onError(err.message || "URL search failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Or Enter Image URL
      </label>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="url"
          value={url}
          onChange={handleUrlChange}
          placeholder="https://example.com/image.jpg"
          disabled={disabled}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
        />

        {url && showPreview && (
          <div className="mt-4 relative">
            <img
              src={url}
              alt="URL Preview"
              className="w-full h-48 object-contain rounded-xl border border-gray-200"
              onError={() => setShowPreview(false)}
            />
            <button
              type="button"
              onClick={handleClear}
              disabled={disabled}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={disabled || !url}
          className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          Search by URL
        </button>
      </form>
    </div>
  );
}
