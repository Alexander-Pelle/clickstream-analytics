import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnalytics } from "../hooks/useAnalytics";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../mock/products";
import type { Product } from "../types/product";
import SearchBar from "../components/SearchBar";
import ShoppingCart from "../components/ShoppingCart";
import ProductGrid from "../components/ProductGrid";
import EmptyGrid from "../components/EmptyGrid";

export const ShopPage: React.FC = () => {
  const navigate = useNavigate();
  const track = useAnalytics("/shop");
  const { cart, addToCart, removeFromCart, clearCart, cartTotal } = useCart();
  const [search, setSearch] = useState("");

  // Track initial page view
  useEffect(() => {
    track({
      eventType: "page_view",
      element: "shop_page",
      metadata: { route: "/shop" },
    });
  }, [track]);

  // Filtered products
  const visibleProducts = useMemo(
    () =>
      PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  // Track product impressions when visible products change
  useEffect(() => {
    visibleProducts.forEach((product, index) => {
      track({
        eventType: "product_impression",
        element: "product_card",
        metadata: {
          productId: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          currency: product.currency,
          position: index,
          source: "shop_grid",
        },
      });
    });
  }, [visibleProducts, track]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    track({
      eventType: "search",
      element: "search_bar",
      metadata: {
        query: search,
        resultsCount: visibleProducts.length,
      },
    });
  };

  const handleViewProduct = (product: Product, index: number) => {
    track({
      eventType: "product_click",
      element: "product_card_click",
      metadata: {
        productId: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        currency: product.currency,
        position: index,
        source: "shop_grid",
      },
    });
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (product: Product, index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation to product detail
    addToCart(product);

    track({
      eventType: "add_to_cart_from_list",
      element: "add_to_cart_list_button",
      metadata: {
        productId: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        currency: product.currency,
        position: index,
        source: "shop_grid",
      },
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);

    track({
      eventType: "remove_from_cart",
      element: "remove_from_cart_button",
      metadata: { productId },
    });
  };

  const handleBeginCheckout = () => {
    if (cart.length === 0) return;

    track({
      eventType: "begin_checkout",
      element: "checkout_button",
      metadata: {
        items: cart.map((c) => ({
          productId: c.id,
          quantity: c.quantity,
          price: c.price,
        })),
        total: cartTotal,
        currency: cart[0]?.currency ?? "USD",
      },
    });

    // Mock purchase
    setTimeout(() => {
      track({
        eventType: "purchase",
        element: "mock_order_complete",
        metadata: {
          orderId: `ORDER-${Math.floor(Math.random() * 1000000)}`,
          items: cart.map((c) => ({
            productId: c.id,
            quantity: c.quantity,
            price: c.price,
          })),
          total: cartTotal,
          currency: cart[0]?.currency ?? "USD",
        },
      });
      alert("Mock purchase completed!");
      clearCart();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ShopLite</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Discover amazing products with seamless shopping experience
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          {/* Left: Products Section */}
          <div>
            {/* Search Bar */}
            <SearchBar search={search} setSearch={setSearch} handleSearchSubmit={handleSearchSubmit} />

            {/* Products Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{visibleProducts.length}</span> products
              </p>
            </div>

            {/* Products Grid */}
            <ProductGrid visibleProducts={visibleProducts} handleViewProduct={handleViewProduct} handleAddToCart={handleAddToCart} />

            {/* Empty State */}
            <EmptyGrid visibleProducts={visibleProducts} search={search} setSearch={setSearch} />
            
          </div>

          {/* Right: Shopping Cart */}
          <ShoppingCart cart={cart} cartTotal={cartTotal} handleRemoveFromCart={handleRemoveFromCart} handleBeginCheckout={handleBeginCheckout} />
        </div>
      </div>
    </div>
  );
};
