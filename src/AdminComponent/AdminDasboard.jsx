// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "./SideBar";

// const AdminDashboard = () => {
//   let navigate = useNavigate();

//   const [state, setState] = useState({
//     TotalProduct: 0,
//     TotalUsers: 0,
//     TotalOrders: 0,
//     TotalRevenue: 0,
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [shoes, users] = await Promise.all([
//           axios.get("http://localhost:3000/shoes"),
//           axios.get("http://localhost:3000/user"),
//         ]);

//         console.log("shoes:", shoes.data, "users:", users.data);

//         let totalOrders = 0;
//         let totalRevenue = 0;

//         users.data.forEach((user) => {
//           if (user.orders) {
//             totalOrders += user.orders.length;

//             user.orders.forEach((order) => {
//               if (order.price) {
//                 totalRevenue += parseFloat(order.price) || 0; // ✅ Ensure it's a number
//               }
//             });
//           }
//         });      

//         setState({
//           TotalProduct: shoes.data.length,
//           TotalUsers: users.data.length,
//           TotalOrders: totalOrders,
//           TotalRevenue: totalRevenue.toFixed(2), // ✅ Fix decimal issue
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <div className="w-1/5 bg-gray-800 min-h-screen">
//         <Sidebar />
//       </div>

//       {/* Dashboard Content */}
//       <div className="flex-1 p-6">
//         <h2 className="text-3xl font-bold text-center mb-6">Admin Dashboard 📊</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           <div className="bg-blue-500 text-white p-4 rounded-lg text-center">
//             <h3 className="text-xl font-semibold">Total Products</h3>
//             <p className="text-2xl">{state.TotalProduct}</p>
//           </div>
//           <div className="bg-green-500 text-white p-4 rounded-lg text-center">
//             <h3 className="text-xl font-semibold">Total Users</h3>
//             <p className="text-2xl">{state.TotalUsers}</p>
//           </div>
//           <div className="bg-yellow-500 text-white p-4 rounded-lg text-center">
//             <h3 className="text-xl font-semibold">Total Orders</h3>
//             <p className="text-2xl">{state.TotalOrders}</p>
//           </div>
//           <div className="bg-red-500 text-white p-4 rounded-lg text-center">
//             <h3 className="text-xl font-semibold">Total Revenue</h3>
//             <p className="text-2xl">${state.TotalRevenue}</p> {/* ✅ Now displays properly */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;







import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";

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
          axios.get("http://localhost:3000/shoes"),
          axios.get("http://localhost:3000/user"),
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
            { label: "Total Products", value: state.TotalProduct, color: "bg-gradient-to-br from-blue-500 to-indigo-600" },
            { label: "Total Users", value: state.TotalUsers, color: "bg-gradient-to-br from-green-500 to-teal-600" },
            { label: "Total Orders", value: state.TotalOrders, color: "bg-gradient-to-br from-yellow-500 to-orange-600" },
            { label: "Total Revenue", value: `$${state.TotalRevenue}`, color: "bg-gradient-to-br from-red-500 to-pink-600" },
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