import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useCart } from "../Context.jsx/cartContext";

const OrderPlaced = () => {
  const navigate = useNavigate();



  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      <CheckCircle size={80} className="text-green-600 mb-6" />
      <h1 className="text-4xl font-bold mb-2 text-black">Order Placed Successfully!</h1>
      <p className="text-lg text-gray-600 mb-6">
        Thank you for your purchase. We’ve received your order and will process it soon.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/orders")}
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          View Orders
        </button>
        <button
          onClick={() => navigate("/shop")}
          className="border border-black text-black px-6 py-2 rounded-lg hover:bg-black hover:text-white transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderPlaced;
