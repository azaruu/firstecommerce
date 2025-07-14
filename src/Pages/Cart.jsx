import React from "react";
import { useCart } from "../Context.jsx/cartContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, removeItem } from "framer-motion";
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus, FiArrowRight } from "react-icons/fi";

function Cart() {
  const { currentCart, removeFromCart, decreaseQuantity, clearCart ,addToCart} = useCart();
  const navigate = useNavigate();
        
  const validCart = Array.isArray(currentCart) ? currentCart : [];

  const subtotal = validCart.reduce((total, item) => total + item.Price * item.Quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + tax + shipping;
  const handleProceedToPayment = () => {
    if (validCart.length > 0) navigate("/Payment");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FiShoppingCart className="mr-3 text-indigo-600" /> Your Shopping Cart
          </h1>
          {validCart.length > 0 && (
            <button onClick={clearCart} className="text-red-500 hover:text-red-700 flex items-center">
              <FiTrash2 className="mr-1" /> Clear Cart
            </button>
          )}
        </div>

        {validCart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="mx-auto h-24 w-24 text-gray-300 mb-6">
              <FiShoppingCart className="w-full h-full" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <button onClick={() => navigate("/shop")} className="px-6 py-3 bg-indigo-600 text-white rounded-lg">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-200">
                  <AnimatePresence>
                    {validCart.map((product, index) => (
  <motion.div
    key={product.productId || index}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, x: -100 }}
    className="p-6 flex flex-col sm:flex-row"
  >
    <div className="flex-shrink-0">
      <img src={product.imgUrl} alt={product.productName} className="h-32 w-32 object-contain rounded-lg" />
    </div>
    <div className="mt-4 sm:mt-0 sm:ml-6 flex-grow">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium text-gray-900">{product.productName}</h3>
        <p className="text-lg font-medium text-gray-900 ml-4">
          ${(product.price * product.quantity).toFixed(2)}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => decreaseQuantity(product.productId)}
            className="p-2 hover:bg-gray-100 text-gray-500"
            disabled={product.quantity <= 1}
          >
            <FiMinus className={`${product.quantity <= 1 ? "opacity-30" : ""}`} />
          </button>
          <span className="mx-4 text-gray-700">{product.quantity}</span>
          <button
            onClick={() => addToCart(product.productId)}
            className="p-2 hover:bg-gray-100 text-gray-500"
          >
            <FiPlus />
          </button>
        </div>
        <button
          onClick={() => removeFromCart(product.productId)}
          className="text-red-500 hover:text-red-700 flex items-center"
        >
          <FiTrash2 className="mr-1" /> Remove
        </button>
      </div>
    </div>
  </motion.div>
))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (10%)</span>
                    <span className="text-gray-900">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="text-lg font-medium text-gray-900">Total</span>
                    <span className="text-lg font-medium text-indigo-600">${total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handleProceedToPayment}
                  className="mt-6 w-full bg-indigo-600 py-3 px-4 text-white rounded-md"
                >
                  Proceed to Payment <FiArrowRight className="ml-2" />
                </button>
                <div className="mt-4 text-center">
                  <button onClick={() => navigate("/shop")} className="text-indigo-600 hover:text-indigo-500 font-medium">
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
