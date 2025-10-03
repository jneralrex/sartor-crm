import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/sartorwhite.png';
import linkedin from '../assets/images/linkedin.png';
import x from '../assets/images/x.png';
import instagram from '../assets/images/instagram.png';

 const socialMedias = [
    { logo: x, alt: "Social media (X)", link: "" },
    { logo: instagram, alt: "Social media (Instagram)", link: "" },
    { logo: linkedin, alt: "Social media (LinkedIn)", link: "" },
  ]

const Footer = () => {
  return (
    <footer className="bg-[#000068] text-white pt-12 pb-6 px-6 md:px-20 font-[sfpro]">
      <div className="max-w-[900px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm mb-10 items-center w-full">

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Our Services</li>
            <li>Pricing</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Help Center</h4>
          <ul className="space-y-2">
            <li>Customer Support</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>FAQ</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li><Link to='/privacy-policy'> Terms & Conditions </Link></li>
            <li className=''> <Link to='/privacy-policy'>Privacy Policy</Link> </li>
          </ul>
        </div>
        </div>

      <div className="border-t border-blue-800 pt-4 gap-10 md:gap-0 flex flex-col md:flex-row justify-between items-center text-xs text-gray-300">
        <img src={logo} alt="logo" srcset="" />
        <span className='sm:text-[18px]'>© Copyright 2021. All rights reserved by SartorLimited</span>
       

         <div className="flex space-x-2 mt-2 md:mt-0">
          {socialMedias.map((social, key ) => (
            <img src={social.logo} alt={social.alt} srcset="" key={key} className='size-5'/>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
