import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
import { api } from "../../Api/ApiServices";

const AdminDashboard = () => {
  let navigate = useNavigate();

  const [state, setState] = useState({
    TotalProduct: 0,
    TotalUsers: 0,
    TotalOrders: 0,
    TotalRevenue: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [shoes, users] = await Promise.all([
          api.get("/Products"),
          api.get("/Authentication/GetAllUsers"),
        ]);

        let totalOrders = 0;
        let totalRevenue = 0;

        users.data.forEach((user) => {
          if (user.orders) {
            totalOrders += user.orders.length;
            user.orders.forEach((order) => {
              totalRevenue += parseFloat(order.price) || 0;
            });
          }
        });

        setState({
          TotalProduct: shoes.data.length,
          TotalUsers: users.data.length,
          TotalOrders: totalOrders,
          TotalRevenue: totalRevenue.toFixed(2),
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <aside className="w-full md:w-1/5 bg-gray-900 text-white min-h-screen p-3 shadow-lg">
        <Sidebar />
      </aside>

      <main className="flex-1 p-8">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">Admin Dashboard 🚀</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Total Products", value: 5, color: "bg-gradient-to-br from-blue-500 to-indigo-600" },
            { label: "Total Users", value: 5, color: "bg-gradient-to-br from-green-500 to-teal-600" },
            // { label: "Total Orders", value: , color: "bg-gradient-to-br from-yellow-500 to-orange-600" },
            { label: "Total Revenue", value: `$ 1754.87`, color: "bg-gradient-to-br from-red-500 to-pink-600" },
          ].map((item, index) => (
            <div
              key={index}
              className={`${item.color} text-white p-8 rounded-xl text-center transform transition duration-500 hover:scale-110 shadow-xl`}
            >
              <h3 className="text-xl font-semibold mb-3 uppercase">{item.label}</h3>
              <p className="text-3xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;