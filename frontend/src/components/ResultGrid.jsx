import ProductCard from "./ProductCard";

export default function ResultGrid({ results }) {
  if (!results || results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">
          No similar products found. Try a different image!
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Similar Products Found ({results.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {results.map((product) => (
          <ProductCard
            key={product._id || product.imageUrl}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
