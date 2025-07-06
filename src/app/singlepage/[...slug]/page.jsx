"use client";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation"

import { MdArrowForwardIos } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { GoShareAndroid } from "react-icons/go";
import { TbCurrencyTaka } from "react-icons/tb";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

import Container from "@/Ui/Container";
import MainImage from "../../../../public/product-image/mainImage.png";
import Image from "next/image";
import DemoIamge from "../../../../public/product-image/image 541.png";
import PromotinImage from "../../../../public/icon/Vector 7290.png";
import ColorImage from "../../../../public/product-image/image 361.png";
import boxIcon from "../../../../public/icon/package.png";
import boxIcon2 from "../../../../public/icon/package-moving.png";
import Bennar from "../../../../public/icon/Frame 1618873879.png";
import { CartContext } from "@/contaxt/CartContext";
import DescriptionBox from "@/Ui/DescriptionBox";


const ProductPage = () => {
  // const { slug } = use(params)
  // const productSlug = slug[0]
  // console.log(productSlug)
  const [quantity, setQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState("XS");

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const { addToCart } = useContext(CartContext);

  // set a  api section

  const params = useParams();
  const slug = params.slug;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) {
        setError("No product slug provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `/api/products/${slug}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Product not found");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Product data:", data);
        setProduct(data.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]); // Re-fetch if slug changes

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Loading Product...</h1>
        <p>
          Fetching product with slug: <strong>{slug}</strong>
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Error</h1>
        <div style={{ color: "red", marginBottom: "20px" }}>{error}</div>
        <p>
          Slug: <strong>{slug}</strong>
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>No Product Found</h1>
        <p>
          Slug: <strong>{slug}</strong>
        </p>
      </div>
    );
  }

  // const [product, setProduct] = useState(null);
  // console.log(product)
  //   const [loading, setLoading] = useState(true);
  
  //   useEffect(() => {
  //     const fetchProduct = async () => {
  //       try {
  //         const res = await fetch(`http://157.230.240.97:9999/api/v1/product/${productSlug}`);
  //         // const res = await fetch("157.230.240.97:9999/api/v1/product/iphone-15-plus");
  //         const data = await res.json();
  //         console.log(data)
  //         setProduct(data?.data);
  //       } catch (error) {
  //         console.error('Error fetching product:', error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  
  //     fetchProduct();
  //   }, []);
  
  //   if (loading) return <div className="text-center py-10 text-gray-500">Loading...</div>;
  //   if (!product) return <div className="text-center py-10 text-red-500">Product not found</div>;

  return (
    <>
    
    <div className="mt-6 bg-white">
      <Container>
        <div className="flex flex-wrap text-black items-center text-sm gap-1">
          <span className="flex items-center mr-1 cursor-pointer">
            Home
            <MdArrowForwardIos className="pl-1" />
          </span>
          <span className="flex items-center mr-1 cursor-pointer">
            Tops
            <MdArrowForwardIos className="pl-1" />
          </span>
          <span className="cursor-pointer"> T-Shirts</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[380px_auto_313px] pt-6 gap-6">
          <div>
            <Image
              src={product.thumbnail}
              alt="product image" width={60} height={60}
              className="rounded w-full"
            />
            <div className="pt-4 flex gap-2 flex-wrap justify-center sm:justify-start">
              {[...Array(5)].map((_, id) => (
                <Image
                  key={id}
                  src={product.thumbnail}
                  alt="product image"
                  className="rounded w-14 h-14 object-cover" width={56} height={56}
                />
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-slate-900 text-lg md:text-xl font-medium leading-7">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-3 text-slate-600">
              <div className="pt-5 flex items-center gap-2 text-base">
                <p>4.7</p>
                <ul className="flex items-center gap-px text-yellow-500 text-xl">
                  {[...Array(5)].map((_, id) => (
                    <li key={id}>
                      <FaStar />
                    </li>
                  ))}
                </ul>
                <p>2,254</p>
                <IoIosArrowDown className="text-xl cursor-pointer" />
              </div>
              <div className="flex items-center gap-3 text-2xl p-2 cursor-pointer">
                <CiHeart />
                <GoShareAndroid />
              </div>
            </div>

            <div className="flex items-center text-teal-700 text-2xl font-semibold leading-8 pt-2">
              <TbCurrencyTaka />
              <h2>{product.product_detail.regular_price}</h2>
              <div className="flex text-slate-400 items-center text-base leading-6 relative ml-4">
                <TbCurrencyTaka />
                <p>{product.product_detail.discount_price}</p>
                <span className="h-px w-12 bg-slate-400 absolute top-1/2 left-1"></span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-5 flex-wrap">
              <h4 className="text-sm font-medium text-[#475569]">Promotion</h4>
              <div className="relative">
                <Image src={PromotinImage} alt="promo" />
                <div className="absolute left-1 top-0 flex items-center gap-1 text-white">
                  <p className="text-sm font-bold">Min. spend ৳550</p>
                  <IoIosArrowDown className="text-sm cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="text-base leading-6 text-gray-900 pt-6">
              <p>
                Available Color: <span className="font-medium">Navy Blue</span>
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2 flex-wrap">
              {[...Array(4)].map((_, idx) => (
                <Image
                  key={idx}
                  src={ColorImage}
                  alt="color"
                  className="rounded w-10 h-10"
                />
              ))}
            </div>

            <div className="pt-4">
              <h5 className="text-base text-slate-600 font-medium">
                Select Size:{" "}
                <span className="text-gray-900">{selectedSize}</span>
              </h5>
            </div>

            <div className="pt-3 flex items-center gap-3 flex-wrap">
              {["XL", "XS", "S", "M", "L"].map((size) => (
                <span
                  key={size}
                  onClick={() => handleSizeClick(size)}
                  className={`py-2 px-3 border rounded text-slate-700 cursor-pointer ${
                    selectedSize === size
                      ? "border-teal-600"
                      : "border-slate-300"
                  }`}
                >
                  {size}
                </span>
              ))}
            </div>

            <div className="pt-4">
              <h4 className="text-base font-medium text-gray-900">Quantity</h4>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-full border border-slate-300 w-40 mt-2">
              <div
                onClick={decreaseQuantity}
                className="w-8 h-8 rounded-full bg-slate-100 text-2xl font-medium text-slate-500 flex items-center justify-center cursor-pointer"
              >
                -
              </div>
              <div className="text-2xl font-medium text-slate-800">
                {quantity}
              </div>
              <div
                onClick={increaseQuantity}
                className="w-8 h-8 rounded-full bg-slate-100 text-2xl font-medium text-slate-500 flex items-center justify-center cursor-pointer"
              >
                +
              </div>
            </div>

            <button
              onClick={() =>
                addToCart(product)
              }
              className="mt-6 mb-6 w-full max-w-xs h-12 bg-teal-600 rounded text-base font-medium text-white cursor-pointer"
            >
              Add to Cart
            </button>
          </div>

          <div className="space-y-4">
            <div className="border border-slate-300 rounded-xl">
              <div className="p-4">
                <h3 className="font-medium text-lg text-slate-600 pb-3">
                  Delivery Options
                </h3>
                {[
                  { icon: boxIcon, title: "Regular", available: true },
                  { icon: boxIcon2, title: "Express", available: false },
                ].map((opt, idx) => (
                  <div key={idx} className="flex gap-2 pt-4 first:pt-0">
                    <Image src={opt.icon} alt="icon" className="w-6 h-6" />
                    <div>
                      <h5
                        className={`text-base font-medium ${
                          opt.available ? "text-slate-700" : "text-slate-300"
                        }`}
                      >
                        {opt.title}{" "}
                        {!opt.available && (
                          <span className="text-xs font-semibold text-red-400">
                            Not Available
                          </span>
                        )}
                      </h5>
                      <p
                        className={`${
                          opt.available ? "text-slate-600" : "text-slate-300"
                        } text-xs pt-1 pl-3`}
                      >
                        Delivery within 2-3 days
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-slate-300 rounded-xl">
              <div className="p-4">
                <h5 className="text-slate-600 text-xs pt-2">Sold by</h5>
                <Image src={Bennar} alt="bennar" className="pt-2" />
                <div className="flex flex-wrap items-center gap-3 pt-4 pb-3 border-b border-slate-300">
                  <div className="w-32 h-7 bg-teal-100 rounded flex items-center gap-2 text-teal-600 justify-center cursor-pointer">
                    <IoChatbubbleEllipsesOutline />
                    <p className="text-sm font-medium">Chat Now</p>
                  </div>
                  <div className="w-32 h-7 bg-slate-100 rounded flex items-center gap-2 text-slate-600 justify-center cursor-pointer">
                    <p className="text-sm font-medium">View Shop</p>
                  </div>
                </div>
                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  {[
                    { label: "Ship on Time", value: "100%" },
                    { label: "Chat Response", value: "90%" },
                    { label: "Shop Rating", value: "99.8%" },
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <p className="text-xs font-medium text-slate-600">
                        {stat.label}
                      </p>
                      <h5 className="text-slate-500 text-2xl pt-2">
                        {stat.value}
                      </h5>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
    <DescriptionBox/>
    </>
  );
};

export default ProductPage;
