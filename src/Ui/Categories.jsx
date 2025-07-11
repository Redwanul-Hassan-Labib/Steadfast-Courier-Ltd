'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function CategoryProductLoader() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);

  // const [products, setProducts] = useState([]);
  // console.log(products);

  useEffect(() => {
    fetch("/src/app/api/categories")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data); 
        setCategories(data.data); 
      })
      .catch((err) => {
        console.error("Error loading products:", err);
      });
  }, []);

  // Load categories
  // useEffect(() => {
  //   fetch('http://157.230.240.97:9999/api/v1/categories')
  //     .then((res) => res.json())
  //     .then((item) => {
  //       // Safely extract array from response
  //       const list = Array.isArray(item) ? item : item.data || [];
  //       setCategories(list);
  //       // console.log('Categories response:', item);
  //       // console.log('Categories response:', list);
  //     })
  //     .catch((err) => {
  //       console.error('Error loading categories:', err);
  //       setCategories([]);
  //     });
  // }, []);

  // // Load products for selected category
  // useEffect(() => {
  //   if (selectedCategory) {
  //     setLoading(true);
  //     fetch(`http://157.230.240.97:9999/api/v1/shop/products?category=${selectedCategory}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setProducts(Array.isArray(data) ? data : []);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         console.error('Error loading products:', err);
  //         setLoading(false);
  //       });
  //   }
  // }, [selectedCategory]);

  return (
    <div className="p-6 max-w-7xl mx-auto text-[#000]">
      {/* <h2 className="text-2xl font-bold mb-4 text-center">View products by category</h2> */}

      {/* Category selection dropdown */}
      <div className='flex items-center gap-3 text-[12px] '>
        {Array.isArray(categories) &&
            categories?.map((cat) => (
              <div key={cat.id} value={cat.name}>
                {cat.name}
              </div>
            ))}
      </div>
      {/* <div className="mb-6">
        <select
          className="w-full border border-gray-300 p-3 rounded-md"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">-- Select a category --</option>
          
        </select>
      </div> */}

      {/* Loading state */}
      {loading && <p className="text-center text-blue-600">Loading...</p>}

      {/* Product list */}
      {!loading && selectedCategory && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300"
              >
                <Image
                  src={product?.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded"
                  width={48} height={48}
                />
                <h3 className="mt-2 font-semibold">{product.name}</h3>
                <p className="text-green-600 font-bold">৳ {product.price}</p>
                <button className="mt-2 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3">No products available in this category.</p>
          )}
        </div>
      )}
    </div>
  );
}
