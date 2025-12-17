import type { Product } from "../types/product"


const EmptyGrid = ({ visibleProducts, search, setSearch }: { visibleProducts: Product[], search: string, setSearch: (search: string) => void }) => {
  return (
    <>
        {visibleProducts.length === 0 && (
                <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                    We couldn't find any products matching "{search}"
                </p>
                <button
                    onClick={() => setSearch("")}
                    className="px-6 py-3 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    Clear Search
                </button>
                </div>
        )}
    </>
  )
}

export default EmptyGrid
