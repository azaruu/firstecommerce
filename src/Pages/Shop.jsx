import { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import Navbar from "../HOC/Hoc";
import { useCart } from "../Context.jsx/cartContext";
import { api } from "../../Api/ApiServices";

function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get("/Products");

        const rawProducts = response.data.data?.$values || [];

        const mappedProducts = rawProducts.map(p => ({
          id: p.productID,
          name: p.productName,
          price: p.productPrice,
          brand: p.brand,
          image: p.imgUrl,
        }));

        setProducts(mappedProducts);
        setFilteredProducts(mappedProducts);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const debouncedSearch = useCallback(
    debounce((term, list) => {
      const filtered = list.filter(p => p.name.toLowerCase().includes(term.toLowerCase()));
      setFilteredProducts(filtered);
      setCurrentPage(1);
    }, 300),
    []
  );

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
    } else {
      debouncedSearch(searchTerm, products);
    }
  }, [searchTerm, products, debouncedSearch]);

  useEffect(() => {
    let sorted = [...filteredProducts];
    switch (sortOption) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    setFilteredProducts(sorted);
  }, [sortOption]);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleAddToCart = (product) => {
    addToCart(product.id);
    alert(`${product.name} added to cart!`);
  };

  if (loading) return <div className="text-center text-white mt-20">Loading products...</div>;
  if (error) return <div className="text-center text-red-500 mt-20">{error}</div>;

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto py-10 px-5">
        <h1 className="text-3xl text-center mb-6">Shop Now</h1>

        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded bg-gray-800 w-full md:w-1/2"
          />

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 rounded bg-gray-800 w-full md:w-1/3"
          >
            <option value="default">Default Sorting</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((p) => (
            <div key={p.id} className="bg-gray-900 rounded p-4 flex flex-col items-center">
              <LazyLoadImage
                src={p.image}
                alt={p.name}
                effect="blur"
                className="w-full h-40 object-cover mb-4"
              />
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-sm">Brand: {p.brand}</p>
              <p className="text-amber-500 text-lg font-bold">${p.price}</p>
              <button
                onClick={() => handleAddToCart(p)}
                className="mt-2 bg-amber-700 px-4 py-2 rounded hover:bg-amber-800"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-800 rounded"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${currentPage === page ? "bg-amber-700" : "bg-gray-800"}`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-800 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Shop;
