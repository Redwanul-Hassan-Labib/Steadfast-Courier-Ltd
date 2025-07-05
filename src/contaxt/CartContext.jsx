
'use client';

import { createContext, useContext, useState } from 'react';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    console.log(product )
    if (!product?.id) return;

    const alreadyInCart = cartItems.some((item) => item.id === product.id);
    if (alreadyInCart) {
      alert('Product already added to cart');
      return;
    }

    setCartItems((prevItems) => [...prevItems, product]);

  };
  const removeFromCart = (id) => {
 setCartItems((prev) => prev.filter((item) => item.id !== id));
};

// const clearCart = () => {
//  setCartItems([]);
// };

  const cartCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartCount, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};















// 'use client';

// import { createContext, useState } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState(0);

//   const addToCart = (product) => {
//     // if (!product?.id) {
//     //   alert("Invalid product!");
//     //   return;
//     // }

//     // if (cartItems.some((item) => item.id === product.id)) {
//     //   alert(`${product.name + 1} is already in the cart`);
//     // } else {
//     //   setCartItems((prevItems) => [...prevItems, product]);
//     // }
//             setCartItems(cartCount + 1);

//             //     const addToCart = () => {
            
//             // };
//   };

// //   const cartCount = addToCart.length;

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };


// // import { Children, createContext, useState } from "react";

// // export const CartContext = createContext();

// // export const CartProvider = ({Children}) => {
// //      const [cartCount, setCartCount] = useState(0);

// //   const addToCart = () => {
// //     setCartCount(cartCount + 1);
// //   };
// //   const cartItem = cartCount.length
// //   return(
// //     <CartContext.Provider value={{ cartItem , addToCart }}>
// //         {Children}
// //     </CartContext.Provider>
// //   )
// // };
