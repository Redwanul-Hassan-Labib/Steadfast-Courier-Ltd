"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import Container from "./Container";

const DescriptionBox = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const [isExpandeded, setIsExpandeded] = useState(false);

    const shortText = "Just as a book is judged by its cover, the first thing you notice when you pick up a modern smartphone is the display. Nothing surprising, because advanced technologies allow you to practically level the display frames and cutouts for the front camera and speaker, leaving no room for bold design solutions.";
  const fullText = shortText + " And how good that in such realities Apple everything is fine with displays. Advanced technologies allow you to practically level the display frames and cutouts for the front camera and speaker, leaving no room for bold design solutions. And how good that in such realities Apple everything.";


  const shortSpecs = [
    "GMP Cosmetic Good Manufacturing Practice",
    "Cruelty Free",
  ];

  const fullSpecs = [
    ...shortSpecs,
    "No Animal Testing",
    "Zenpia Global Standard",
    "Comply with Global Standard",
  ];

  return (
    <>
    <Container >
        <div className="md:max-w-[955px] max-w-[520px] mt-[37px] mb-[13px] ">
      <div className="bg-[#FFFFFF] rounded-[4px]">
        <div className="pt-[22px] pl-[27px] pr-[14px] pb-[16px] ">
          <h5 className="text-[24px] leading-[32px] font-medium pb-[16.5px] text-[#252B42]">Description</h5>
          <p className="text-[#475569] text-[16px] leading-[28px]  ">
            {isExpanded ? fullText : shortText}
          </p>
          <div className="text-[#0F172A] flex items-center justify-center gap-[3px] pt-[30px] text-[16px] font-medium ">
            <button className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)} >{isExpanded ? 'Less More' : 'See More'} </button>
            <span className="cursor-pointer"><IoIosArrowDown /></span>
          </div>
        </div>
      </div>
        </div>
        <div className="md:max-w-[955px] max-w-[520px]  mb-[13px] mb-[105px]">
      <div className="bg-[#FFFFFF] rounded-[4px]">
        <div className="pt-[22px] pl-[27px] pr-[14px] pb-[16px] ">
          <h5 className="text-[24px] leading-[32px] font-medium pb-[16.5px] text-[#252B42]">Specification</h5>
          <h6 className="text-[20px] font-medium leading-[28px] text-[#252B42] pb-[18px]">Sharp FP-J30E-B Air Purifier</h6>
          <ul  className="text-[#475569] text-[16px] leading-[28px]  list-disc list-inside">
            {isExpandeded
          ? fullSpecs.map((spec, index) => <li key={index}>{spec}</li>)
          : shortSpecs.map((spec, index) => <li key={index}>{spec}</li>)
        }
          </ul>
          <div className="text-[#0F172A] flex items-center justify-center gap-[3px] pt-[30px] text-[16px] font-medium ">
            <button className="cursor-pointer" onClick={() => setIsExpandeded(!isExpandeded)} >{isExpandeded ? 'See Less' : 'See More'} </button>
            <span className="cursor-pointer"><IoIosArrowDown /></span>
          </div>
        </div>
      </div>
        </div>
    </Container>
    </>
  );
};

export default DescriptionBox;
