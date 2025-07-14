import React, { createContext, useContext, useEffect, useState } from "react";

import { api } from "../../Api/ApiServices";
import toast from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [currentCart, setCurrentCart] = useState([]);

  // Fetch Cart - no userId needed
  const fetchCart = async () => {
       try {
    const res = await api.get("/Cart");
    console.log("Fetched Cart:", res.data);

    const items = res.data?.data?.items?.$values || [];
    setCurrentCart(items);
    
  } catch (err) {
    console.error("Fetch Cart Error:", err);
  }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId) => {
    const payload = {
       ProductId:productId,
       Quantity: 1};
    console.log("Adding to Cart:", payload);
    try {
      const res = await api.post("/Cart", payload);
      console.log("Added to cart:", res.data);
      toast.success("Added to cart");
      fetchCart(); // Refresh cart
    } catch (err) {
      console.error("Add to Cart Error:", err);
      toast.error("Error adding to cart");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/Cart/${productId}`);
      toast.success("Item removed");
      fetchCart();
    } catch (err) {
      console.error("Remove from Cart Error:", err);
      toast.error("not Removed from Cart")
    }
  };


 const clearCart = async () => {
  try {
    const id = localStorage.getItem("userId");
    if (!userId) throw new Error("User not logged in");
    console.log('hy');
    
   var data = await api.delete(`/Cart/Clear/${id}`);  
   console.log(data.data);
   
    toast.success("Cart cleared");
    setCurrentCart([]);
  } catch (err) {
    console.error("Clear Cart Error:", err);
    toast.error("Failed to clear cart");
  }
};


// const increaseQuantity = (productId) => {
//   const item = currentCart.find((p) => p.ProductId === productId.id);
//   if (item) addToCart(productId, item.Quantity + 1);
// };

const decreaseQuantity = (productId) => {
  const item = currentCart.find((p) => p.ProductId === productId);
  if (item && item.Quantity > 1) addToCart(productId, item.Quantity - 1);
};

  return (
    <CartContext.Provider
      value={{
        currentCart,
        addToCart,
        removeFromCart,
        clearCart,
        //increaseQuantity,
        decreaseQuantity,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
