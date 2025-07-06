
'use client';
import Container from '@/Ui/Container';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CartContext } from "@/contaxt/CartContext";
import Image from 'next/image';


export default function ProductGrid() {
 
  // const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);
  console.log(products);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Home  page product",data); // Optional: দেখতে পারেন কী আসছে
        setProducts(data.data); // যদি "products" নামে আসছে
      })
      .catch((err) => {
        console.error("Error loading products:", err);
      });
  }, []);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const res = await fetch('http://157.230.240.97:9999/api/v1/shop/products');
  //       const data = await res.json();
  //       setProducts(data?.data || []);
  //     } catch (err) {
  //       console.error('Failed to fetch products:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  // if (loading) return <div className="text-center py-10 text-gray-500">loading...</div>;

  //  const { addToCart } = useContext(CartContext);

  return (
    <Container>


    <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <div key={product.id} className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition duration-300">
          <Image
            src={product.thumbnail}
            alt="image"
            className=" object-cover" width={300} height={300}
          />
          <div className="p-4">
            <Link href={`/singlepage/${product.slug}`}>
            <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
            </Link>
            <div className="mt-3 flex items-center justify-between">
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">৳{product.discount_price}</p>
              <del className="text-xl font-bold text-green-600"> ৳{product.regular_price}</del>
              <span className="text-xs text-white bg-blue-500 px-2 py-1 rounded-full">{product.available_stock}</span>
            </div>
            <div onClick={() =>
                addToCart(product)
              }
              className="mt-6 w-full max-w-xs h-12 bg-teal-600 rounded text-base font-medium flex items-center justify-center text-white cursor-pointer"
            >
              Add to Cart
            </div>
          </div>
        </div>
      ))}
    </div>
    </Container>
  );
}
