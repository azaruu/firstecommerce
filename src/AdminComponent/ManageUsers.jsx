import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/user/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const toggleBlockUser = async (id, isBlocked) => {
    try {
      await axios.patch(`http://localhost:3000/user/${id}`, { blocked: !isBlocked });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user status", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Users</h1>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
              
              {/* User Info */}
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className={`mt-2 text-sm font-medium ${user.blocked ? "text-red-500" : "text-green-500"}`}>
                  {user.blocked ? "Blocked" : "Active"}
                </p>
              </div>

              {/* Buttons - Responsive */}
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => toggleBlockUser(user.id, user.blocked)}
                  className={`w-full sm:w-1/2 px-4 py-2 rounded-lg font-medium text-white ${
                    user.blocked ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
                >
                  {user.blocked ? "Unblock" : "Block"}
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="w-full sm:w-1/2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg"
                >
                  Delete
                </button>
              </div>

              {/* Order Details - Responsive */}
              {user.orders && user.orders.length > 0 && (
                <div className="mt-5 border-t pt-3">
                  <h4 className="text-md font-semibold text-gray-800 mb-2">Order Details:</h4>
                  <ul className="text-sm space-y-2">
                    {user.orders.map((order, index) => (
                      <li key={index} className="flex flex-col sm:flex-row items-center gap-4 bg-gray-100 p-3 rounded-md">
                        <img
                          src={order.image}
                          alt={order.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="text-center sm:text-left">
                          <span className="block text-gray-900 font-medium">{order.name}</span>
                          <span className="text-gray-600">${order.price}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ManageUsers;
