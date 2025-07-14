import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './SideBar';
import { api } from '../../Api/ApiServices';

const ProductManage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, Brand: '', image: null });
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/Products');
      setProducts(response.data.data?.$values || []);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  const handleAddProduct = async () => {
    // if (!newProduct.name || !newProduct.price || !newProduct.Brand || !newProduct.image) return;

    try {
      const formData = new FormData();
      formData.append('ProductName', newProduct.name);
      formData.append('ProductPrice', parseFloat(newProduct.price));
      formData.append('Brand', newProduct.Brand);
      formData.append('ImageFile', newProduct.image);

      for (let pair of formData.entries()) {
      console.log(pair[0], ':', pair[1]);
    }

      await api.post('/Products', formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

      setNewProduct({ name: '', price: 0, Brand: '', image: null });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product', error.response?.data?.errors || error.message);
    }
  };

  const handleDeleteProduct = async (productID) => {
    console.log('productId',productID);
    
    try {
      await api.delete(`/Products/${productID}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };



const handleEditProduct = async () => {
  try {
    const formData = new FormData();
    formData.append('ProductName', editingProduct.name || '');
    formData.append('ProductPrice', parseFloat(editingProduct.price) || 0);
    formData.append('Brand', editingProduct.Brand || '');

    if (editingProduct.image instanceof File) {
      formData.append('ImageFile', editingProduct.image);
    }

   for (const [k, v] of formData.entries()) console.log(`${k}:`, v);

    await api.put(`/Products/${editingProduct.productID}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    setEditingProduct(null);
    fetchProducts();
  } catch (error) {
    console.error('Full error response:', error.response?.data);
    alert('Failed to update: ' + JSON.stringify(error.response?.data?.errors || error.message));
  }
};





  return (
<div className="flex min-h-screen bg-gray-50">
  <Sidebar />
  <main className="flex-1 p-6 lg:p-8">
    {/* Header */}
    <div className="mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Manage Products</h1>
      <p className="text-gray-600 mt-1">          </p>
    </div>

    {/* Add Product Card */}
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Add Product</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            placeholder="Product name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              type="number"
              placeholder="0.00"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="w-full border border-gray-300 rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
          <input
            type="text"
            placeholder="Brand name"
            value={newProduct.Brand}
            onChange={(e) => setNewProduct({ ...newProduct, Brand: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="border border-gray-300 rounded-lg px-3 py-2 flex items-center justify-between">
              <span className="text-gray-500 truncate">
                {newProduct.image ? newProduct.image.name : "Choose file"}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleAddProduct}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Add Product
      </button>
    </div>

    {/* Product List */}
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">Product List</h2>
        <div className="relative w-64">
          {/* <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg> */}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-48 bg-gray-100">
              <img
                src={product.imgUrl}
                alt={product.productName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-gray-900">{product.productName}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {product.Brand}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-2">SKU: {product.productID}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">${product.productPrice}</span>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setEditingProduct({...product,
                    name: product.productName,
    price: product.productPrice,
    Brand: product.brand,
    image: null,
                  })}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-lg transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.productID)}
                  className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Edit Modal */}
    {editingProduct && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Product</h3>
              <button 
                onClick={() => setEditingProduct(null)} 
                className="text-gray-400 hover:text-gray-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  placeholder="Price"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                <input
                  type="text"
                  placeholder="Brand"
                  value={editingProduct.Brand}
                  onChange={(e) => setEditingProduct({ ...editingProduct, Brand: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, image: e.target.files[0] })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4 rounded-b-xl flex justify-end space-x-3">
            <button
              onClick={() => setEditingProduct(null)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleEditProduct}
              className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    )}
  </main>
</div>
         
   );
};

export default ProductManage;
