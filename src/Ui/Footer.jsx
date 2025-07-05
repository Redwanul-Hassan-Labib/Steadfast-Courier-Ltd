import React from 'react';
import Container from './Container';
import Image from 'next/image';
import FooterLogo from "../../public/logo/footerLogo.png";
import Location from '../../public/icon/Location.png';
import call from '../../public/icon/call.png';
import sms from '../../public/icon/sms.png';
import Facebook from '../../public/icon/facebook.png';
import instagram from '../../public/icon/instagram.png';
import twitter from '../../public/icon/twitter.png';
import Google from '../../public/icon/Google.png';
import Apple from '../../public/icon/apple.png';
import Support from '../../public/icon/Frame 1618874029.png';
import VISA from '../../public/icon/VISA.png';
import Credit from '../../public/icon/credit.png';
import americanExpress from '../../public/icon/americanExpress.png';
import bKash from '../../public/icon/bKash.png';
import Nogod from '../../public/icon/Nogod.png';

const Footer = () => {
  return (
    <div className="bg-[#0F172A] text-white mt-[122px]">
      <div className="pb-10 border-b border-white/20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[272px_1fr_220px] gap-8 pt-10">
            <div>
              <div className="flex items-center gap-2">
                <Image src={FooterLogo} alt="footer logo" />
                <h2 className="text-3xl md:text-4xl font-bold leading-none">FALCON</h2>
              </div>
              <p className="text-sm pt-4 max-w-sm">
                Experience our new platform & Enjoy exciting deals and offers on your day to day
              </p>
              <div className="flex items-start gap-2 pt-4">
                <Image src={Location} alt="Location Logo" className="w-6 h-6" />
                <p className="text-sm leading-5">
                  House #64, Road 13, ASA Center, Uttara, Dhaka-1402
                </p>
              </div>
              <div className="flex items-center gap-2 pt-4">
                <Image src={call} alt="Call Logo" className="w-6 h-6" />
                <p className="text-sm leading-5">01729-1497201</p>
              </div>
              <div className="flex items-center gap-2 pt-4">
                <Image src={sms} alt="SMS Logo" className="w-6 h-6" />
                <p className="text-sm leading-5">falcon@gmail.com</p>
              </div>
              <div className="text-base font-medium flex items-center gap-4 pt-6 flex-wrap">
                <p>Follow us on</p>
                <Image src={Facebook} alt="Facebook" className="w-6 h-6" />
                <Image src={instagram} alt="Instagram" className="w-6 h-6" />
                <Image src={twitter} alt="Twitter" className="w-6 h-6" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="text-lg text-slate-400 pb-3">ABOUT</h5>
                <ul className="flex flex-col gap-2 text-sm">
                  <li><a href="#">Contact Us</a></li>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Careers</a></li>
                  <li><a href="#">Press</a></li>
                  <li><a href="#">Cancellation & Returns</a></li>
                  <li><a href="#">Terms of Use</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-lg text-slate-400 pb-3">HELP</h5>
                <ul className="flex flex-col gap-2 text-sm">
                  <li><a href="#">Payments</a></li>
                  <li><a href="#">Shipping</a></li>
                  <li><a href="#">My Orders</a></li>
                  <li><a href="#">FAQs</a></li>
                  <li><a href="#">Terms of Use</a></li>
                  <li><a href="#">Security</a></li>
                  <li><a href="#">Privacy</a></li>
                </ul>
              </div>
            </div>

            <div>
              <h5 className="text-lg text-slate-400 pb-3">Need Support?</h5>
              <Image src={Support} alt="Support" />

              <div className="pt-6">
                <h5 className="text-lg text-slate-400 pb-3">DOWNLOAD APP</h5>
                <Image src={Google} alt="Google Play" />
                <Image src={Apple} alt="Apple Store" className="pt-3" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 pt-8">
            <h5 className="text-slate-400 text-base font-medium">PAYMENTS ACCEPTED</h5>
            {[VISA, Credit, americanExpress, bKash, Nogod].map((icon, idx) => (
              <Image key={idx} src={icon} alt="payment" className="w-[60px] h-[40px] object-contain" />
            ))}
          </div>
        </Container>
      </div>

      <div>
        <h5 className="text-center text-sm py-6 text-slate-400">
          Falcon ©2025. Design by xyz
        </h5>
      </div>
    </div>
  );
};

export default Footer;
