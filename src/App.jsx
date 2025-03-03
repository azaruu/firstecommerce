import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import Order from './Pages/Order';
import { CartProvider } from './Context.jsx/cartContext';
import { Toaster } from "react-hot-toast";
import Payment from './Pages/Payment';
import AdminDasboard from './AdminComponent/AdminDasboard';
import ProductManage from './AdminComponent/ProductManage';
import Sidebar from './AdminComponent/SideBar';
import ManageUsers from './AdminComponent/ManageUsers';
import ManageOrders from './AdminComponent/ManageOrders';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
        <Router>
          <CartProvider>
           <Routes>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='/shop' element={<Shop/>}/>
            <Route path='/cart' element={<Cart/>}/> 
            <Route path='/Payment' element={<Payment/>}/>
            <Route path='/order' element={<Order/>}/>
            <Route path='/adminpage' element={<AdminDasboard/>}/>
            <Route path='/productmanage' element={<ProductManage/>}/>
            <Route path='/manageusers' element={<ManageUsers/>}/>
            <Route path='/manageorders' element={<ManageOrders/>}/>
           </Routes>
          </CartProvider>
          <Toaster position="top-right" reverseOrder={false} />
        </Router>
      
    </>
  )
}

export default App
