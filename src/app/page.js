import React, { useContext } from 'react';
import { CartProvider } from '@/contaxt/CartContext';
import CartItems from '@/Ui/CartItems';
import CategoryProductLoader from '@/Ui/Categories';
import DescriptionBox from '@/Ui/DescriptionBox';
import Footer from '@/Ui/Footer';
import Header from '@/Ui/Header';
import NavBar from '@/Ui/NavBar';
import ProductPage from '@/Ui/Products';
import Pages from "@/app/shop/Pages"
// import React from 'react'

export default function Home() {
  return (
    <div>
   {/* <CartProvider> */}
      {/* <CategoryProductLoader/> */}
      {/* <Header/>
      <NavBar/> */}
      {/* <ProductPage/> */}
      {/* <DescriptionBox/> */}
      <Pages/>

      {/* <SingleProduct/> */}
      {/* <Footer/> */}
      {/* <CartItems/> */}

    {/* </CartProvider> */}
   </div>
  );
}
