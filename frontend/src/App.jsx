import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Visual Product Matcher
          </h1>
          <p className="text-gray-600 mt-2">
            Upload an image or paste a URL to find similar products
          </p>
        </div>
      </header>
      <main className="p-4">
        <Home />
      </main>
    </div>
  );
}

export default App;
