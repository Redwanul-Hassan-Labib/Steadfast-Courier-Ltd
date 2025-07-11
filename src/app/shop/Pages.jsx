
'use client';
import Container from '@/Ui/Container';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from "@/contaxt/CartContext";
import Image from 'next/image';


export default function ProductGrid() {
 
  // const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  console.log(products);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Home  page product",data); 
        setProducts(data.data); 
      })
      .catch((err) => {
        console.error("Error loading products:", err);
      });
  }, []);


  const [categories, setCategories] = useState([]);

  console.log("Categry Items:", categories)

  useEffect(() => {
      fetch('http://157.230.240.97:9999/api/v1/categories')
        .then((res) => res.json())
        .then((item) => {
          // Safely extract array from response
          const list = Array.isArray(item) ? item : item.data || [];
          setCategories(list);
        })
        .catch((err) => {
          console.error('Error loading categories:', err);
          setCategories([]);
        });
    }, []);

  return (
    <Container>

      <div className='py-[50px]'>
        <h3 className='text-[#000] pb-3 text-[30px] font-medium leading-9'>Categories  Items</h3>
        <div className='flex items-center flex-wrap justify-around gap-5  cursor-pointer text-[#000]'>
        {Array.isArray(categories) &&
            categories?.map((cat) => (
              <div key={cat.id} value={cat.name} className='w-[190px] h-[150px] border py-[10px] px-[20px]  flex flex-col justify-center items-center' >
               <h2> {cat.name}</h2>
               <Image src={cat.image} alt='image' width={70} height={70}/>
              </div>
            ))}
      </div> 
      </div>

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
