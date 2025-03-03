import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../HOC/Hoc";
import { useCart } from "../Context.jsx/cartContext";

function Shop() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Search state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("http://localhost:3000/shoes")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // ✅ Function to filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="container mx-auto py-10 px-5">
        <h4 className="text-3xl font-bold text-center text-gray-800 mb-8">Sho Now</h4>

        {/* ✅ Search Bar */}
        {!selectedProduct && (
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-3 w-full max-w-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-red-400"
            />
          </div>
        )}

        {/* ✅ Show Product List (Hide if a Product is Selected) */}
        {!selectedProduct && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-900 rounded-lg shadow-md overflow-hidden p-4 hover:shadow-lg transition cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-md mb-4 text-red-600 "
                  />
                  <h2 className="text-xl font-semibold text-red-600">{product.name}</h2>
                  <p className="text-red-600">Brand: {product.brand}</p>
                  <p className="text-lg font-bold text-amber-700 mt-2">${product.price}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 w-full col-span-full">No products found!</p>
            )}
          </div>
        )}

        {/* ✅ Product Detail View (Only Show if a Product is Selected) */}
        {selectedProduct && (
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto mt-10 relative">
            <button
              onClick={() => setSelectedProduct(null)} // ✅ Close Detail View
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              ❌
            </button>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-64 h-64 object-cover rounded-lg"
              />
              <div className="text-left">
                <h2 className="text-3xl font-bold text-gray-800">{selectedProduct.name}</h2>
                <p className="text-gray-600 mt-2">{selectedProduct.description}</p>
                <p className="text-lg font-bold text-amber-700 mt-2">${selectedProduct.price}</p>
                <p className="text-gray-500 mt-1">Category: {selectedProduct.category}</p>
                <p className="text-gray-500 mt-1">Brand: {selectedProduct.brand}</p>
                <p className="text-gray-500 mt-1">Stock: {selectedProduct.stock}</p>

                <button
                  className="mt-4 bg-amber-700 text-white px-6 py-2 rounded-md w-full hover:bg-amber-800 transition"
                  onClick={() => addToCart(selectedProduct)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;
