'use client';

import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { BsBoxSeam } from 'react-icons/bs';
import { MdOutlineHeadsetMic } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';
import Container from './Container';
import SellIcon from '../../public/icon/sell-icon.png';
import { motion } from 'framer-motion';
import logo  from "../../public/logo//logo.png"

const NavBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);

  // Load categories
  useEffect(() => {
    fetch('http://157.230.240.97:9999/api/v1/categories')
      .then((res) => res.json())
      .then((item) => {
        // Safely extract array from response
        const list = Array.isArray(item) ? item : item.data || [];
        setCategories(list);
        // console.log('Categories response:', item);
        // console.log('Categories response:', list);
      })
      .catch((err) => {
        console.error('Error loading categories:', err);
        setCategories([]);
      });
  }, []);

  // Load products for selected category
  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      fetch(`http://157.230.240.97:9999/api/v1/shop/products?category=${selectedCategory}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error loading products:', err);
          setLoading(false);
        });
    }
  }, [selectedCategory]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    
        <div className="bg-white border-b border-gray-200 py-2">
      <Container>
        <div className="flex items-center justify-between">

          

          {/* Mobile Category Icon */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={toggleSidebar}>
              <FaBars className="text-[#00A788] text-xl" />
            </button>
            <span className="text-[#0F172A] text-[16px] font-medium">Categories</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3 text-[#0F172A] text-[14px]">
            <div className="flex items-center  gap-2 pr-10 border-r border-gray-300">
              <FaBars className="text-[#00A788] text-lg" />
              <h4 className="text-[16px] font-medium leading-[24px]">Categories</h4>
            </div>
            {/* <ul className="flex items-center gap-6">
              <li><Link href="#">Electronics</Link></li>
              <li><Link href="#">Home Appliances</Link></li>
              <li><Link href="#">Mother & Baby</Link></li>
              <li><Link href="#">Automotive</Link></li>
              <li><Link href="#">Sports Gear</Link></li>
                <li className="flex items-center gap-1 pl-[70px]">
                <BsBoxSeam/> 
                <Link href="#">TRACK ORDER</Link>
                </li>
              <li className="flex items-center gap-1">
                <MdOutlineHeadsetMic/>
                <Link href="#">HELP CENTER</Link>
                </li>
              <li className="flex items-center gap-1">
                <Image src={SellIcon} alt="sell" width={14} height={14} />
                <Link href="#">SELL WITH US</Link>
              </li> */}

            {/* </ul> */}
            <div className='flex items-center justify-center gap-10 text-[12px] cursor-pointer '>
        {Array.isArray(categories) &&
            categories?.map((cat) => (
              <div key={cat.id} value={cat.name}>
                {cat.name}
              </div>
            ))}
      </div>
          </div>
        </div>
      </Container>

      {/* Sidebar (Mobile only) */}
      {sidebarOpen && (
        <div>
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={toggleSidebar}></div>

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-[260px] bg-[#000]  shadow-md z-50 p-5 flex flex-col justify-between"
          >
            <div className='text-[#fff]'>
              <div className="flex justify-between items-center mb-6">
                <div className="text-lg font-semibold text-[#0F172A]">
                </div>
                    <Image src={logo} alt='logo' className='w-[100px] h-[30px] mr-[100px]'/>
                <button onClick={toggleSidebar}>
                  <FaTimes className="text-xl" />
                </button>
              </div>
              <ul className="flex flex-col gap-5 text-[18px] text-[#fff] cursor-pointer">
                <li><Link href="#">Electronics</Link></li>
                <li><Link href="#">Home Appliances</Link></li>
                <li><Link href="#">Mother & Baby</Link></li>
                <li><Link href="#">Automotive</Link></li>
                <li><Link href="#">Sports Gear</Link></li>
                <li className="flex items-center gap-2">
                <BsBoxSeam/> 
                <Link href="#">TRACK ORDER</Link>
                </li>
              <li className="flex items-center gap-2">
                <MdOutlineHeadsetMic/>
                <Link href="#">HELP CENTER</Link>
                </li>
              <li className="flex items-center gap-2">
                <Image src={SellIcon} alt="sell" width={14} height={14} />
                <Link href="#">SELL WITH US</Link>
              </li>
              </ul>
            </div>

            <div className="pt-10 border-t mt-10 text-center text-xs text-gray-400">
              © 2025 Falcon. All rights reserved.
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default NavBar;




// 'use client';
// import { useEffect, useState } from 'react';

// export default function CategoryProductLoader() {
  

//   return (
//     <div className="p-6 max-w-7xl mx-auto text-[#000]">
//       {/* <h2 className="text-2xl font-bold mb-4 text-center">View products by category</h2> */}

//       {/* Category selection dropdown */}
//       <div className='flex items-center gap-3 text-[12px] '>
//         {Array.isArray(categories) &&
//             categories?.map((cat) => (
//               <div key={cat.id} value={cat.name}>
//                 {cat.name}
//               </div>
//             ))}
//       </div>
//       {/* <div className="mb-6">
//         <select
//           className="w-full border border-gray-300 p-3 rounded-md"
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           <option value="">-- Select a category --</option>
          
//         </select>
//       </div> */}

//       {/* Loading state */}
//       {loading && <p className="text-center text-blue-600">Loading...</p>}

//       {/* Product list */}
//       {!loading && selectedCategory && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {products.length > 0 ? (
//             products.map((product) => (
//               <div
//                 key={product._id}
//                 className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300"
//               >
//                 <img
//                   src={product?.mainImage || '/no-image.png'}
//                   alt={product.name}
//                   className="w-full h-48 object-cover rounded"
//                 />
//                 <h3 className="mt-2 font-semibold">{product.name}</h3>
//                 <p className="text-green-600 font-bold">৳ {product.price}</p>
//                 <button className="mt-2 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
//                   Add to Cart
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-center col-span-3">No products available in this category.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
