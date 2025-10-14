export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          Score: {product.score ? product.score.toFixed(2) : "--"}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">
          {product.title}
        </h3>
        <p className="text-sm text-purple-600 font-semibold mb-3 uppercase tracking-wide">
          {product.category}
        </p>
        <p className="text-sm text-gray-600 line-clamp-3">
          {product.description}
        </p>
      </div>
    </div>
  );
}
