import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './SideBar';
import { api } from '../../Api/ApiServices';

const ManageOrders = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async (id) => {
    try {
      const response = await api.get(`Orders/${id}`);
      setUsers(response.data);
      console.log();
      
    } catch (error) {
      console.error('Error fetching orders', error);
    }
  };

  // const handleDeleteOrder = async (userId, orderIndex) => {
  //   try {
  //     const responses = await axios.get(`http://localhost:3000/user/${userId}`);
  //     const updatedOrders = responses.data.orders.filter((_, index) => index !== orderIndex);
  //     await axios.patch(`http://localhost:3000/user/${userId}`, { orders: updatedOrders });
  //     fetchOrders();
  //   } catch (error) {
  //     console.error('Error deleting order', error);
  //   }
  // };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar className="w-full md:w-1/4 lg:w-1/5" />
      <main className="flex-1 p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8 text-center">Manage Orders</h1>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4 md:mb-6 text-center">Order List</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {users.map((user) => (
            user.orders?.length > 0 && (
              <div key={user.id} className="bg-white rounded-lg shadow-md p-4 md:p-6 transition hover:shadow-lg border border-gray-200">
                <h3 className="text-md md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">Customer: {user.name}</h3>
                <p className="text-xs md:text-sm text-gray-500 mb-3">{user.email}</p>
                
                <div className="border-t pt-3 md:pt-4">
                  <h4 className="text-sm md:text-md font-semibold text-gray-800 mb-2">Orders:</h4>
                  <ul className="text-xs md:text-sm space-y-2">
                    {user.orders.map((order, orderIndex) => (
                      <li key={orderIndex} className="bg-gray-100 p-2 md:p-3 rounded-lg flex gap-3 md:gap-4 items-center">
                        <img 
                          src={order.image} 
                          alt={order.name} 
                          className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-lg shadow-sm" 
                        />
                        <div>
                          <span className="block text-gray-900 font-medium">{order.name}</span>
                          <span className="text-gray-700">${order.price}</span>
                        </div>
                        {/* <button 
                          onClick={() => handleDeleteOrder(user.id, orderIndex)}
                          className="ml-auto px-2 md:px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs md:text-sm font-semibold rounded-lg"
                        >
                          Delete
                        </button> */}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          ))}
        </div>
      </main>
    </div>
  );
};

export default ManageOrders;
