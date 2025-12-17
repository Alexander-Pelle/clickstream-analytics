import type { Product } from '../types/product'

const ProductGrid = ({ visibleProducts, handleViewProduct, handleAddToCart }: { visibleProducts: Product[], handleViewProduct: (product: Product, index: number) => void, handleAddToCart: (product: Product, index: number, e: React.MouseEvent) => void }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProducts.map((product, index) => (
        <div
            key={product.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
        >
            {/* Product Image Placeholder */}
            <div 
            className="bg-gradient-to-br from-gray-100 to-gray-200 aspect-square flex items-center justify-center cursor-pointer group-hover:from-gray-200 group-hover:to-gray-300 transition-all"
            onClick={() => handleViewProduct(product, index)}
            >
                <div className="text-center p-6">
                    <div className="text-5xl mb-2">📦</div>
                    <p className="text-sm text-gray-500">View Details</p>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
                {/* Category Badge */}
                <div className="mb-2">
                    <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                        {product.category}
                    </span>
                </div>

                {/* Product Name */}
                <h3
                    className="font-bold text-lg mb-2 cursor-pointer hover:text-blue-600 transition-colors line-clamp-2"
                    onClick={() => handleViewProduct(product, index)}
                >
                    {product.name}
                </h3>

                {/* Product Description */}
                {product.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                    </p>
                )}

                {/* Price */}
                <div className="mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                    </span>
                    
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={(e) => handleAddToCart(product, index, e)}
                        className="flex-1 cursor-pointer px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
                        >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add
                    </button>
                    <button
                        onClick={() => handleViewProduct(product, index)}
                        className="px-4 cursor-pointer py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors font-medium"
                        >
                        View
                    </button>
                </div>
            </div>
        </div>
        ))}
    </div>
  )
}

export default ProductGrid
