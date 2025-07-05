"use client";

import React, { useState } from 'react';
import Container from './Container';
import { MdArrowForwardIos } from 'react-icons/md';
import { CiShop } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import Image from 'next/image';
import productImage from "../../public/product-image/mainImage.png";
import { TbCurrencyTaka } from 'react-icons/tb';
import { RiDeleteBinLine } from "react-icons/ri";

const CartItems = () => {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <Container>
        <div className="flex flex-wrap text-[#475569] items-center text-[14px] gap-1 py-[12px]">
          <span className="flex items-center mr-1 cursor-pointer">
            Home
            <MdArrowForwardIos className="pl-1" />
          </span>
          <span className="flex items-center mr-1 cursor-pointer">
            My Cart
          </span>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5'>
          <div className='bg-[#fff] mb-[10px] p-[20px]'>
            <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center rounded-[8px] gap-4 text-[#000] pb-[20px] border-b border-[#D9D9D9]'>
              <h2 className='text-[24px] lg:text-[32px] text-[#0F172A] font-semibold leading-[40px]'> My Cart <span>(3)</span></h2>
              <div className='flex items-center gap-2 text-[#475569] text-[16px] leading-[24px]'>
                <input type="checkbox" className='w-[16px] h-[16px]' />
                <p>Select All</p>
                <p className='pl-[34px]'>Clear All</p>
              </div>
            </div>

            <div>
              <div className='flex gap-2 items-center text-[#334155] mt-[21px] bg-[#F1F5F9] rounded-[8px] py-[8px] px-[12px] text-[14px] leading-[20px]'>
                <input type="checkbox" className='w-[16px] h-[16px]' />
                <CiShop className='text-[20px] ml-[12px]' />
                <h5>BD FASHION HOUSE</h5>
                <IoIosArrowForward />
              </div>

              <div className='p-[5px] mt-[12px] bg-[#F1F5F9] rounded-[8px] flex flex-col sm:flex-row gap-4 items-center justify-between'>
                <div className='flex flex-col items-center sm:flex-row gap-4 w-full'>
                  <input type="checkbox" className='w-[16px] h-[16px] self-start sm:self-center' />
                  <div className="w-full sm:w-auto">
                    <Image src={productImage} alt='product' width={100} height={100} className='rounded-[8px] mx-auto' />
                  </div>
                  <div className='w-full sm:w-auto text-center sm:text-left'>
                    <h4 className='text-[#0F172A] text-[16px] font-medium'>Bestway Brand Air Inflatable 5 In 1 semi Double Sofa</h4>
                    <p className='text-[#475569] text-[16px] py-[10px]'>Color: <span>red</span>; Size: <span>M</span></p>
                    <div className='flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-6'>
                      <div className="flex items-center justify-between gap-4 rounded-full bg-white border border-slate-300 w-40 mx-auto sm:mx-0">
                        <div onClick={decreaseQuantity} className="w-8 h-8 rounded-full bg-slate-100 text-2xl font-medium text-slate-500 flex items-center justify-center cursor-pointer">-</div>
                        <div className="text-2xl font-medium text-slate-800">{quantity}</div>
                        <div onClick={increaseQuantity} className="w-8 h-8 rounded-full bg-slate-100 text-2xl font-medium text-slate-500 flex items-center justify-center cursor-pointer">+</div>
                      </div>
                      <RiDeleteBinLine className='text-[#94A3B8] text-[20px] cursor-pointer' />
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-[#0F172A] text-[20px] font-bold leading-[24px] justify-center sm:justify-end w-full sm:w-auto">
                  <TbCurrencyTaka />
                  <h2>1,139.33</h2>
                  <div className="flex text-slate-400 items-center text-base leading-6 relative ml-4">
                    <TbCurrencyTaka />
                    <p>1500</p>
                    <span className="h-px w-12 bg-slate-400 absolute top-1/2 left-1"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div>
            <div className='py-[13px] px-[24px] bg-white'>
              <h3 className='text-[24px] font-medium leading-[32px] text-[#475569] pb-4'>Order summary</h3>
              <div className='flex items-center justify-between'>
                <h5 className='text-[#475569] font-medium text-[16px] leading-[24px]'>Price <span>(3 items)</span></h5>
                <div className='flex items-center text-[#0F172A]'>
                  <TbCurrencyTaka />
                  <p>00</p>
                </div>
              </div>
              <div className='flex items-center justify-between pt-[12px] pb-3'>
                <h5 className='text-[#475569] font-medium text-[16px] leading-[24px]'>Shipping fee</h5>
                <p className='text-[14px] leading-[20px] text-[#3B82F6] cursor-pointer'>To be added</p>
              </div>
              <div className='border border-[#94A3B8] flex items-center rounded-sm'>
                <input type="text" placeholder='Store / Falcon coupon' className='text-[14px] leading-[20px] text-[#94A3B8] pt-2 pl-[10px] pb-2 outline-none w-full' />
                <button className='w-[82px] h-[40px] text-white bg-[#00B795] text-center cursor-pointer'>Apply</button>
              </div>
              <div className='flex items-center justify-between'>
                <h4 className='text-[#334155] text-[18px] leading-[28px] font-medium'>Sub Total</h4>
                <div className='flex items-center text-[#0F172A] text-[20px] leading-[28px] font-semibold pt-[12px] pb-[12px]'>
                  <TbCurrencyTaka />
                  <p>00</p>
                </div>
              </div>
              <button className='w-full h-[47px] text-white bg-[#00B795] rounded-sm cursor-pointer'>Proceed to Checkout</button>
            </div>
            <div className='py-[17px] flex gap-2 mb-[50px]'>
              <input type="checkbox" className='w-[16px] h-[16px] cursor-pointer' />
              <p className='text-[#475569] text-[13px] leading-[18px]'>I have read and agree to the Terms and Conditions, Privacy Policy and Refund and Return Policy</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartItems;
