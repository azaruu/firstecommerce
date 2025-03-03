import React from "react";
import { useCart } from "../Context.jsx/cartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { currentCart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();

  const TotalPrice = currentCart.reduce(
    (total, item) => total + item.price * item.quantity,
    0 
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Your Cart 🛒</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentCart.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center transition hover:shadow-2xl"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-40 h-40 object-cover mb-4 rounded-lg shadow-md"
            />
            <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
            <p className="text-gray-600 text-sm">{product.brand}</p>

            {/* Quantity Controls */}
            <div className="flex items-center mt-4 space-x-3">
              <button
                onClick={() => decreaseQuantity(product.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 shadow-md"
              >
                -
              </button>
              <span className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg shadow">
                {product.quantity}
              </span>
              <button
                onClick={() => increaseQuantity(product.id)}
                className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 shadow-md"
              >
                +
              </button>
            </div>

            {/* Remove Item */}
            <button 
              onClick={() => removeFromCart(product.id)}
              className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 shadow-md"
            >
              Remove Item
            </button>
          </div>
        ))}
      </div>

      {currentCart.length > 0 && (
        <div className="text-center mt-8">
          <p className="text-lg font-bold text-amber-700">
            Total: ${TotalPrice.toFixed(2)}
          </p>
          <button
            onClick={() => navigate("/payment")}
            className="mt-4 px-6 py-3 bg-green-400 text-black font-semibold rounded-lg hover:bg-green-600 shadow-md"
          >
            Purchase Items
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
