import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAnalytics } from "../hooks/useAnalytics";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../mock/products";

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const track = useAnalytics(`/product/${productId}`);
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  const product = PRODUCTS.find((p) => p.id === productId);

  useEffect(() => {
    if (!product) return;

    // Track product detail page view
    track({
      eventType: "product_detail_view",
      element: "product_detail_page",
      metadata: {
        productId: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        currency: product.currency,
        source: "direct_link",
      },
    });
  }, [product, track]);

  if (!product) {
    return (
      <div className="px-8 py-6 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);

    // Track add to cart from product detail page
    track({
      eventType: "add_to_cart_from_detail",
      element: "add_to_cart_detail_button",
      metadata: {
        productId: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        currency: product.currency,
        source: "product_detail_page",
      },
    });

    // Reset the "added" state after 2 seconds
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="px-8 py-6 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link to="/" className="hover:text-blue-600 transition-colors">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Product Image Placeholder */}
        <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-500">Product Image</p>
          </div>
        </div>

        {/* Right: Product Details */}
        <div>
          <div className="mb-2">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              {product.category}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          
          <div className="text-3xl font-bold text-blue-600 mb-6">
            {product.currency} {product.price.toFixed(2)}
          </div>

          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            {product.description}
          </p>

          {product.features && product.features.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Key Features</h2>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className={`flex-1 cursor-pointer px-6 py-3 rounded-md font-medium transition-colors ${
                addedToCart
                  ? "bg-green-600 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {addedToCart ? "✓ Added to Cart!" : "Add to Cart"}
            </button>
            <Link
              to="/"
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-md hover:border-gray-400 transition-colors flex items-center justify-center"
            >
              Continue Shopping
            </Link>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Product Information</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• Free shipping on orders over $50</p>
              <p>• 30-day return policy</p>
              <p>• 1-year warranty included</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

