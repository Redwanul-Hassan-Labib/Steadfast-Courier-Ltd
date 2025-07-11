"use client";

import React, { useState } from 'react';
import { useCart } from '@/contaxt/CartContext';
import Container from '@/Ui/Container';
import { MdArrowForwardIos } from 'react-icons/md';
import { TbCurrencyTaka } from 'react-icons/tb';
import { RiDeleteBinLine } from "react-icons/ri";
import Image from 'next/image';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  const [quantities, setQuantities] = useState(cartItems.map(() => 1));
  const [selectedItems, setSelectedItems] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const increaseQuantity = (index) => {
    const updated = [...quantities];
    updated[index]++;
    setQuantities(updated);
  };

  const decreaseQuantity = (index) => {
    const updated = [...quantities];
    if (updated[index] > 1) {
      updated[index]--;
      setQuantities(updated);
    }
  };

  const toggleItemSelection = (productId) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  const deleteItem = (productId) => {
    removeFromCart(productId);
    setSelectedItems((prev) => prev.filter((id) => id !== productId));
  };

  const subtotalBDT = cartItems.reduce((total, item, index) => {
    if (selectedItems.includes(item.id)) {
      const price = Number(item?.product_detail?.regular_price || item?.regular_price || 0);
      return total + price * quantities[index];
    }
    return total;
  }, 0);

  const discountAmount = (subtotalBDT * discountPercent) / 100;
  const finalTotal = subtotalBDT - discountAmount;

  const applyCoupon = () => {
    const code = parseInt(coupon);
    if ([10, 20, 30, 40, 50].includes(code)) {
      setDiscountPercent(code);
    } else {
      setDiscountPercent(0);
      alert("Invalid coupon code. Try 10, 20, 30, 40 or 50.");
    }
  };

  return (
    <Container>
      {/* Breadcrumb */}
      <div className="flex flex-wrap text-[#475569] items-center text-sm gap-1 py-3">
        <span className="flex items-center cursor-pointer">
          Home <MdArrowForwardIos className="pl-1" />
        </span>
        <span className="flex items-center cursor-pointer">My Cart</span>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5'>
        {/* Left: Cart Items */}
        <div className='bg-white p-5 rounded-md shadow-sm'>
          <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center border-b pb-5 mb-5'>
            <h2 className='text-2xl font-semibold text-slate-800'>
              My Cart <span>({cartItems.length})</span>
            </h2>
            <div className='flex items-center gap-3 text-slate-600'>
              <input
                type="checkbox"
                className='w-4 h-4'
                checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                onChange={toggleSelectAll}
              />
              <p>Select All</p>
              <p className='cursor-pointer'>Clear All</p>
            </div>
          </div>

          {cartItems.map((cart, index) => (
            <div key={cart.id} className='bg-slate-100 rounded-lg p-4 mb-4 flex flex-col sm:flex-row items-center sm:items-start gap-4'>
              <input
                type="checkbox"
                className='w-4 h-4 self-start sm:self-center'
                checked={selectedItems.includes(cart.id)}
                onChange={() => toggleItemSelection(cart.id)}
              />
              <Image src={cart.thumbnail} alt='product' width={100} height={100} className='rounded-lg' />
              <div className='flex-1'>
                <h4 className='text-slate-800 font-semibold'>{cart.name}</h4>
                <p className='text-slate-600 text-sm'>Color: Red; Size: M</p>
                <div className='mt-2 flex items-center  gap-4'>
                  <div className='flex items-center  gap-4 justify-between border border-slate-300 rounded-full  text-[#000]'>
                    <button onClick={() => decreaseQuantity(index)} className='w-8 h-8 flex items-center justify-center text-xl bg-slate-300 rounded-full'>-</button>
                    <span className='px-4 text-lg'>{quantities[index]}</span>
                    <button onClick={() => increaseQuantity(index)} className='w-8 h-8 flex items-center justify-center text-xl bg-slate-300 rounded-full'>+</button>
                  </div>
                  <RiDeleteBinLine onClick={() => deleteItem(cart.id)} className='text-slate-500 text-xl cursor-pointer' />
                </div>
              </div>
              <div className='text-xl font-bold text-slate-900'>
                <TbCurrencyTaka className='inline' />
                {(Number(cart?.product_detail?.regular_price || cart?.regular_price || 0) * quantities[index]).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Summary */}
        <div className='bg-white p-6 rounded-md shadow-sm'>
          <h3 className='text-xl font-medium text-slate-700 mb-4'>Order summary</h3>
          <div className='flex justify-between mb-2 text-[#000]'>
            <span>Price ({selectedItems.length} items)</span>
            <span><TbCurrencyTaka className='inline' />{subtotalBDT.toFixed(2)}</span>
          </div>
          <div className='flex justify-between mb-2'>
            <span className='text-[#000]'>Shipping fee</span>
            <span className='text-blue-500'>To be added</span>
          </div>
          <div className='flex justify-between text-green-600 mb-4'>
            <span>Discount ({discountPercent}%)</span>
            <span>-<TbCurrencyTaka className='inline' />{discountAmount.toFixed(2)}</span>
          </div>

          <div className='flex border rounded overflow-hidden mb-4'>
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder='Enter 10 / 20 / 30'
              className='flex-1 px-3 py-2 text-sm text-slate-600 outline-none'
            />
            <button onClick={applyCoupon} className='bg-teal-600 text-white px-4'>Apply</button>
          </div>

          <div className='flex justify-between text-lg font-semibold mb-4 text-[#000]'>
            <span>Final Total</span>
            <span><TbCurrencyTaka className='inline' />{finalTotal.toFixed(2)}</span>
          </div>

          <button className='w-full bg-teal-600 text-white py-3 rounded'>Proceed to Checkout</button>
        </div>
      </div>
    </Container>
  );
};

export default CartPage;





// "use client";

// import React, { useState } from 'react';
// import { useCart } from '@/contaxt/CartContext';
// import Container from '@/Ui/Container';
// import { MdArrowForwardIos } from 'react-icons/md';
// import { CiShop } from "react-icons/ci";
// import { IoIosArrowForward } from "react-icons/io";
// import { TbCurrencyTaka } from 'react-icons/tb';
// import { RiDeleteBinLine } from "react-icons/ri";
// import Image from 'next/image';

// const CartPage = () => {
//   const { cartItems, setCartItems, removeFromCart } = useCart();

//   const [quantities, setQuantities] = useState(cartItems.map(() => 1));
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [coupon, setCoupon] = useState('');
//   const [discountPercent, setDiscountPercent] = useState(0);

//   const increaseQuantity = (index) => {
//     const updated = [...quantities];
//     updated[index]++;
//     setQuantities(updated);
//   };

//   const decreaseQuantity = (index) => {
//     const updated = [...quantities];
//     if (updated[index] > 1) {
//       updated[index]--;
//       setQuantities(updated);
//     }
//   };

//   const toggleItemSelection = (productId) => {
//     setSelectedItems((prev) =>
//       prev.includes(productId)
//         ? prev.filter((id) => id !== productId)
//         : [...prev, productId]
//     );
//   };

//   const toggleSelectAll = () => {
//     if (selectedItems.length === cartItems.length) {
//       setSelectedItems([]);
//     } else {
//       setSelectedItems(cartItems.map((item) => item.id));
//     }
//   };

//   const deleteItem = (productId) => {
//     removeFromCart(productId);
//     setSelectedItems((prev) => prev.filter((id) => id !== productId));
//   };

//   const subtotalBDT = cartItems.reduce((total, item, index) => {
//     if (selectedItems.includes(item.id)) {
//       const price = Number(item.product_detail.regular_price);
//       return total + price * quantities[index];
//     }
//     return total;
//   }, 0);

//   const discountAmount = (subtotalBDT * discountPercent) / 100;
//   const finalTotal = subtotalBDT - discountAmount;

//   const applyCoupon = () => {
//     const code = parseInt(coupon);
//     if ([10, 20, 30, 40, 50].includes(code)) {
//       setDiscountPercent(code);
//     } else {
//       setDiscountPercent(0);
//       alert("Invalid coupon code. Try 10, 20, 30, 40 or 50.");
//     }
//   };

//   return (
//     <div>
//       <Container>
//         <div className="flex flex-wrap text-[#475569] items-center text-[14px] gap-1 py-[12px]">
//           <span className="flex items-center mr-1 cursor-pointer">
//             Home <MdArrowForwardIos className="pl-1" />
//           </span>
//           <span className="flex items-center mr-1 cursor-pointer">My Cart</span>
//         </div>

//         <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5'>
//           <div className='bg-[#fff] mb-[10px] p-[20px]'>
//             <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center rounded-[8px] gap-4 text-[#000] pb-[20px] border-b border-[#D9D9D9]'>
//               <h2 className='text-[24px] lg:text-[32px] text-[#0F172A] font-semibold leading-[40px]'>
//                 My Cart <span>({cartItems.length})</span>
//               </h2>
//               <div className='flex items-center gap-2 text-[#475569] text-[16px] leading-[24px]'>
//                 <input
//                   type="checkbox"
//                   className='w-[16px] h-[16px]'
//                   checked={selectedItems.length === cartItems.length && cartItems.length > 0}
//                   onChange={toggleSelectAll}
//                 />
//                 <p>Select All</p>
//                 <p className='pl-[34px] cursor-pointer'>Clear All</p>
//               </div>
//             </div>

//             {cartItems.map((cart, index) => (
//               <div key={cart.id} className='p-[5px] mt-[12px] bg-[#F1F5F9] rounded-[8px] flex flex-col sm:flex-row gap-4 items-center justify-between'>
//                 <div className='flex flex-col items-center sm:flex-row gap-4 w-full'>
//                   <input
//                     type="checkbox"
//                     className='w-[16px] h-[16px] self-start sm:self-center'
//                     checked={selectedItems.includes(cart.id)}
//                     onChange={() => toggleItemSelection(cart.id)}
//                   />
//                   <Image src={cart.thumbnail} alt='product' width={100} height={100} className='rounded-[8px]' />
//                   <div className='w-full sm:w-auto text-center sm:text-left'>
//                     <h4 className='text-[#0F172A] text-[16px] font-medium'>{cart.name}</h4>
//                     <p className='text-[#475569] text-[16px] py-[10px]'>Color: <span>Red</span>; Size: <span>M</span></p>
//                     <div className='flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-6'>
//                       <div className="flex items-center justify-between gap-4 rounded-full bg-white border border-slate-300 w-40">
//                         <div onClick={() => decreaseQuantity(index)} className="w-8 h-8 rounded-full bg-slate-100 text-2xl text-slate-500 flex items-center justify-center cursor-pointer">-</div>
//                         <div className="text-2xl font-medium text-slate-800">{quantities[index]}</div>
//                         <div onClick={() => increaseQuantity(index)} className="w-8 h-8 rounded-full bg-slate-100 text-2xl text-slate-500 flex items-center justify-center cursor-pointer">+</div>
//                       </div>
//                       <RiDeleteBinLine className='text-[#94A3B8] text-[20px] cursor-pointer' onClick={() => deleteItem(cart.id)} />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center text-[#0F172A] text-[20px] font-bold leading-[24px] justify-center sm:justify-end w-full sm:w-auto">
//                   <TbCurrencyTaka />
//                   <h2>{(Number(cart.product_detail.regular_price) * quantities[index]).toFixed(2)}</h2>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Right Side */}
//           <div>
//             <div className='py-[13px] px-[24px] bg-white rounded-sm'>
//               <h3 className='text-[24px] font-medium leading-[32px] text-[#475569] pb-4'>Order summary</h3>
//               <div className='flex items-center justify-between'>
//                 <h5 className='text-[#475569] font-medium text-[16px] leading-[24px]'>Price <span>({selectedItems.length} items)</span></h5>
//                 <div className='flex items-center text-[#0F172A]'>
//                   <TbCurrencyTaka />
//                   <p>{subtotalBDT.toFixed(2)}</p>
//                 </div>
//               </div>
//               <div className='flex items-center justify-between pt-[12px] pb-3'>
//                 <h5 className='text-[#475569] font-medium text-[16px] leading-[24px]'>Shipping fee</h5>
//               <p className='text-[14px] leading-[20px] text-[#3B82F6] cursor-pointer'>To be added</p>
//               </div>
//               <div className='flex justify-between pt-[8px] text-[#22C55E] text-[16px] leading-[24px]'>
//                 <p>Discount ({discountPercent}%)</p>
//                 <p>- <TbCurrencyTaka className='inline' />{discountAmount.toFixed(2)}</p>
//               </div>
//               <div className='border border-[#94A3B8] flex items-center rounded-sm my-4'>
//                 <input
//                   type="text"
//                   value={coupon}
//                   onChange={(e) => setCoupon(e.target.value)}
//                   placeholder='Enter 10 / 20 / 30'
//                   className='text-[14px] leading-[20px] text-[#94A3B8] pt-2 pl-[10px] pb-2 outline-none w-full'
//                 />
//                 <button onClick={applyCoupon} className='w-[82px] h-[40px] text-white bg-[#00B795] text-center cursor-pointer'>Apply</button>
//               </div>
//               <div className='flex items-center justify-between'>
//                 <h4 className='text-[#334155] text-[18px] leading-[28px] font-medium'>Final Total</h4>
//                 <div className='flex items-center text-[#0F172A] text-[20px] leading-[28px] font-semibold pt-[12px] pb-[12px]'>
//                   <TbCurrencyTaka />
//                   <p>{finalTotal.toFixed(2)}</p>
//                 </div>
//               </div>
//               <button className='w-full h-[47px] text-white bg-[#00B795] rounded-sm cursor-pointer '>Proceed to Checkout</button>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default CartPage;







