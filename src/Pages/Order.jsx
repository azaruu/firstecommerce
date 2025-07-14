import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../../Api/ApiServices";

function Order() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      toast.error("Please log in to view your orders.");
      navigate("/login");
      return;
    }

   api
      .get(`/Orders/${userId}`)
      .then((res) => {setOrders(res.data?.data?.$values|| [] );
        console.log(res.data)}
      )
      .catch(() => toast.error("Failed to fetch orders."));
  }, [userId, navigate]);
      // console.log(orderss);
      
  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">

      {/* Header */}
      <div className="w-full max-w-5xl mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-black">🧾 Your Orders (Invoice)</h1>
        <button
          onClick={() => navigate("/shop")}
          className="border border-black px-4 py-1 rounded hover:bg-black hover:text-white transition"
        >
          Back to Shop
        </button>
      </div>

      {/* Table Layout */}
      {orders.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold text-black mb-4">No Orders Found</h2>
          <button
            onClick={() => navigate("/shop")}
            className="border border-black px-6 py-2 rounded hover:bg-black hover:text-white transition"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="w-full max-w-5xl overflow-x-auto border border-black rounded-lg">
          <table className="w-full text-left table-auto">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-4 border border-black">#</th>
                <th className="p-4 border border-black">Product</th>
                {/* <th className="p-4 border border-black">Brand</th> */}
                <th className="p-4 border border-black">Quantity</th>
                <th className="p-4 border border-black">Price</th>
                <th className="p-4 border border-black">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr key={index} className="border border-black">
                  <td className="p-4 border border-black">{index + 1}</td>
                  <td className="p-4 border border-black flex items-center gap-3">
                    <img src={item.imgUrl} alt={item.ProductName} className="w-12 h-12 object-contain border border-black" />
                    <span>{item.productName}</span>
                  </td>
                  {/* /<td className="p-4 border border-black">{item.brand || "Loading...('Resone is your Select Huge Brand')"}</td> */}
                  <td className="p-4 border border-black">{item.quantity}</td>
                  <td className="p-4 border border-black">₹ {parseFloat(item.price).toFixed(2)}</td>
                  <td className="p-4 border border-black font-bold">
                    ₹ {(item.total).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Order;
