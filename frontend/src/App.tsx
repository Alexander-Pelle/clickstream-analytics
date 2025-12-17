import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ShopPage } from "./pages/ShopPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <nav className="flex gap-4 px-8 py-3 border-b border-gray-200 bg-white">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3 py-2 rounded transition-colors cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-transparent text-gray-900 hover:bg-gray-100"
                }`
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `px-3 py-2 rounded transition-colors cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-transparent text-gray-900 hover:bg-gray-100"
                }`
              }
            >
              Analytics
            </NavLink>
          </nav>

          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
          </Routes>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
