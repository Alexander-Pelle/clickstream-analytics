
import type { Product } from '../types/product'

const ShoppingCart = ({ cart, cartTotal, handleRemoveFromCart, handleBeginCheckout }: { cart: (Product & { quantity: number })[], cartTotal: number, handleRemoveFromCart: (id: string) => void, handleBeginCheckout: () => void }) => {
  return (
    <aside className="lg:sticky lg:top-24 h-fit">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Cart Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Shopping Cart
                    {cart.length > 0 && (
                        <span className="ml-auto bg-blue-600 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center">
                            {cart.length}
                        </span>
                    )}
                </h2>
            </div>

            {/* Cart Content */}
            <div className="p-6">
                {cart.length === 0 ? (
                    <div className="text-center py-8">
                    
                        <p className="text-gray-500">Your cart is empty</p>
                        <p className="text-sm text-gray-400 mt-1">Add items to get started</p>
                    </div>
                ) : (
                    <>
                    {/* Cart Items */}
                    <ul className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                        {cart.map((item) => (
                        <li
                            key={item.id}
                            className="flex gap-3 pb-4 border-b border-gray-100 last:border-0"
                        >
                            {/* Item Image Placeholder */}
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                                <span className="text-2xl">📦</span>
                            </div>

                            {/* Item Details */}
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 truncate">
                                    {item.name}
                                </h4>
                                <p className="text-sm text-gray-500">
                                    Qty: {item.quantity}
                                </p>
                                <div className="flex items-center justify-between mt-1">
                                    <span className="font-semibold text-gray-900">
                                    ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                    <button
                                    className="text-xs cursor-pointer text-red-600 hover:text-red-700 font-medium transition-colors"
                                    onClick={() => handleRemoveFromCart(item.id)}
                                    >
                                    Remove
                                    </button>
                                </div>
                            </div>
                        </li>
                        ))}
                    </ul>

                    {/* Cart Summary */}
                    <div className="border-t-2 border-gray-200 pt-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Shipping</span>
                            <span className="font-semibold text-green-600">Free</span>
                        </div>
                        <div className="flex justify-between items-center text-lg font-bold pt-2 border-t border-gray-100">
                            <span>Total</span>
                            <span className="text-blue-600">${cartTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                        onClick={handleBeginCheckout}
                        className="w-full cursor-pointer px-6 py-3.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-bold text-lg shadow-md hover:shadow-lg"
                    >
                        Proceed to Checkout
                    </button>

                    {/* Trust Badges */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Secure Checkout
                        </div>
                    </div>
                    </>
                )}
            </div>
        </div>
    </aside>
  )
}

export default ShoppingCart
