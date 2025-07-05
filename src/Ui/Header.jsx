'use client';
import React, { useContext, useState } from "react";
import Container from './Container';
import { CiSearch } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import Image from 'next/image';
import logo from "../../public/logo/logo.png";
import { CartContext } from "@/contaxt/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Header = () => {
  const { cartCount } = useContext(CartContext);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (searchValue.trim()) {
      setShowMobileSearch(false);
      setSearchValue("");
    }
  };

  return (
    <div className="bg-[#0F172A] relative z-50">
      <Container>
        <div className="flex flex-wrap items-center  justify-between py-4 gap-4 relative">
          {/* Logo */}
          <div className="shrink-0">
            <Link href={"/"}>
            <Image src={logo} alt='falcon' className='cursor-pointer w-auto h-[25px] md:h-[35px]' />
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex w-full max-w-[763px] h-[48px] ">
            <input
              className='w-full bg-white outline-none rounded-l-md text-black px-4'
              type="text"
              placeholder='Search for anything....'
            />
            <button className='bg-[#00B795] w-[48px] h-[48px] rounded-r-md flex items-center justify-center cursor-pointer'>
              <CiSearch className='text-white text-xl ' />
            </button>
          </div>

          {/* Right Side Icons - Mobile/Desktop */}
          <div className='flex items-center gap-4 ml-auto lg:ml-0'>
            {/* Mobile Search Icon */}
            <button
              className="lg:hidden bg-[#00B795] p-2 rounded-md cursor-pointer"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              {showMobileSearch ? (
                <RxCross2 className="text-white text-xl" />
              ) : (
                <CiSearch className="text-white text-xl" />
              )}
            </button>

            {/* Cart */}
            <Link href={"/cart"} className='relative'>
              <AiOutlineShoppingCart className='cursor-pointer text-[28px] md:text-[32px]' />
              <p className="absolute w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center top-[-6px] right-[-9px]">
                {cartCount}
              </p>
            </Link>

            {/* User */}
            <IoPersonOutline className='cursor-pointer text-[28px] md:text-[32px]' />
          </div>

          {/* Mobile Search Bar (Animated) */}
          <AnimatePresence>
            {showMobileSearch && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full mt-4 flex lg:hidden"
              >
                <input
                  className='flex-1 bg-white outline-none px-4 py-2 rounded-l-md text-black'
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder='Search for anything...'
                />
                <button
                  className='bg-[#00B795] px-4 rounded-r-md text-white cursor-pointer'
                  onClick={handleSearch}
                >
                  Go
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </div>
  );
};

export default Header;
