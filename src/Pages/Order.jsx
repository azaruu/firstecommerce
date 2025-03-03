import React, { useEffect, useState } from "react";
import { useCart } from "../Context.jsx/cartContext";
import axios from "axios";

function Order() {
const {orders}= useCart()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          🎉 Thank You! Order Placed 🎉
        </h1>
        <p className="text-gray-500 mb-6">Your items will be delivered soon!</p>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((orderProduct,index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
              >
                <img
                  src={orderProduct.image}
                  alt={orderProduct.name}
                  className="w-40 h-40 object-cover rounded-lg mb-4"
                />
                <h1 className="text-lg font-semibold">{orderProduct.name}</h1>
                <p className="text-gray-600">{orderProduct.brand}</p>
                <p className="text-lg font-bold text-amber-700 mt-2">
                  ${orderProduct.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;
