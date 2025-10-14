import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import UploadBox from "../components/UploadBox";
import UrlBox from "../components/UrlBox";
import ResultGrid from "../components/ResultGrid";

export default function Home() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleResults = (res) => {
    setResults(res);
    setError("");
    setHasSearched(true);
  };

  const handleError = (err) => {
    setError(err);
    setResults([]);
    setHasSearched(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload Area */}
          <UploadBox
            disabled={loading}
            setLoading={setLoading}
            onResults={handleResults}
            onError={handleError}
          />

          {/* URL Input */}
          <UrlBox
            disabled={loading}
            setLoading={setLoading}
            onResults={handleResults}
            onError={handleError}
          />
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="w-16 h-16 text-purple-600 animate-spin mb-4" />
          <p className="text-gray-600 text-lg">Finding similar products...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8">
          {error}
        </div>
      )}

      {/* Results Grid */}
      {hasSearched && !loading && !error && <ResultGrid results={results} />}

      {/* Empty State */}
      {!hasSearched && !loading && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Ready to Find Similar Products?
          </h3>
          <p className="text-gray-500">
            Upload an image or enter a URL to get started
          </p>
        </div>
      )}
    </div>
  );
}
