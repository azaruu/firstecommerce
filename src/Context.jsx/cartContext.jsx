import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


const CartContext = createContext();
export const useCart = () => {
  return useContext(CartContext);
};
export const CartProvider = ({ children }) => {



  const userId = localStorage.getItem("userId");
  const [currentCart, setCurrentCart] = useState([]);
  const [order, setOrder] = useState([]);

  
  const [orders,setOrders]=useState([]) 
  
  useEffect(()=>{
    if(!userId) return; 
    axios.get(`http://localhost:3000/user/${userId}`).then((res)=>{
    setOrders(res.data.orders)
  })
  
  },[userId])



  useEffect(() => {
    if (!userId) return;
    axios
      .get(`http://localhost:3000/user/${userId}`)
      .then((res) => {
        setCurrentCart(res.data.cart||[]);
      })
      .catch((error) => console.log("Error Man",error));
  }, [userId]);
    

  const addToCart = (product) => {
    if(!userId){ toast.error("Your not loged")} 

    const existingItem = currentCart.find((item) => item.id === product.id);

    let updatedCart;
    if (existingItem) {
      updatedCart = currentCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      toast.error("Product Already Add  to Cart");
    } else {
      updatedCart = [...currentCart, { ...product, quantity: 1 }];

      axios
        .patch(`http://localhost:3000/user/${userId}`, { cart: updatedCart })
        .then(() => {
          setCurrentCart(updatedCart);
          toast.success(" Product Added Successfully  🎉");
        })
        .catch((error) => console.log("Error updating cart Man:", error));
    }
  };


  const removeFromCart = async (productId) => {
    const updatedCart = currentCart.filter((item) => item.id !== productId);
    try {
      await axios.patch(`http://localhost:3000/user/${userId}`, {
        cart: updatedCart,
      });
      setCurrentCart(updatedCart);
      toast.success("Product removed from the cart");
    } catch (error) {
      console.error("Failed to remove product from cart:", error);
      toast.error("Failed to remove product. Please try again.");
      console.log(updatedCart);
    }
  };
  


  const toPurchase = (userCart) => {    //Addorder
    console.log("UserCart:", userCart);
    // setOrder(userCart); // State update is async
  
    // Directly call confirmOrder after setting order
    confirmOrder(userCart);
  };
  
  const confirmOrder = async (userCart) => {
    try {
      // Step 1: Fetch latest orders before updating
      const response = await axios.get(`http://localhost:3000/user/${userId}`);
      const previousOrders = response.data.orders || []; // Ensure it's an array
  
      // Step 2: Update orders correctly
      const updatedOrders = [...previousOrders, ...userCart];            
      console.log("Updated Orders:", updatedOrders);    
      // Step 3: PATCH request to update database
      await axios.patch(`http://localhost:3000/user/${userId}`, { orders: updatedOrders });
  
      toast.success("Order confirmed successfully! 🎉");
  
      // Step 4: Clear the cart after successful order placement
      await axios.patch(`http://localhost:3000/user/${userId}`, { cart: [] });
      setCurrentCart([]); // Clear local cart state
    } catch (error) {
      console.error("Error confirming order:", error);
      toast.error("Network Error! Please try again.");
    }
  };
  
  const increaseQuantity = async (productId) => {
    const updatedCart = currentCart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
  
    try {
      await axios.patch(`http://localhost:3000/user/${userId}`, { cart: updatedCart });
      setCurrentCart(updatedCart);
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };
  
  const decreaseQuantity = async (productId) => {
    const updatedCart = currentCart.map((item) =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  
    try {
      await axios.patch(`http://localhost:3000/user/${userId}`, { cart: updatedCart });
      setCurrentCart(updatedCart);
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };  

  return (
    <div>
      <CartContext.Provider
        value={{ addToCart, currentCart, removeFromCart,orders, toPurchase ,decreaseQuantity,increaseQuantity}}
      >
        {children}
      </CartContext.Provider>
    </div>
  );
};



