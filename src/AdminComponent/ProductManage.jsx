import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './SideBar';

const ProductManage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/shoes');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price) return;
    try {
      await axios.post('http://localhost:3000/shoes', newProduct);
      setNewProduct({ name:'', price:'', image:'' });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/shoes/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  const handleEditProduct = async () => {
    if (!editingProduct.name || !editingProduct.price) return;
    try {
      await axios.put(`http://localhost:3000/shoes/${editingProduct.id}`, editingProduct);
      fetchProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error('Error editing product', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Add Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Name" value={newProduct.name} 
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="border p-2 rounded" />
            <input type="number" placeholder="Price" value={newProduct.price} 
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="border p-2 rounded" />
            <input type="text" placeholder="Image URL" value={newProduct.image} 
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} className="border p-2 rounded" />
          </div>
          <button onClick={handleAddProduct} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">Add Product</button>
        </div>

        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-md p-4 rounded-lg text-center">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-xl font-bold">${product.price}</p>
              <div className="mt-4 flex justify-center space-x-2">
                <button onClick={() => setEditingProduct(product)} className="bg-black hover:bg-gray-700 text-white p-2 rounded">Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {editingProduct && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
              <input type="text" value={editingProduct.name} 
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} className="border p-2 w-full rounded mb-2" />
              <input type="number" value={editingProduct.price} 
                onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} className="border p-2 w-full rounded mb-2" />
              <input type="text" value={editingProduct.image} 
                onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })} className="border p-2 w-full rounded mb-4" />
              <div className="flex justify-end space-x-2">
                <button onClick={handleEditProduct} className="bg-green-500 hover:bg-green-600 text-white p-2 rounded">Update</button>
                <button onClick={() => setEditingProduct(null)} className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>                                                                                           
    </div>
  );
};

export default ProductManage;