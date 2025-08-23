import React from 'react';
import logo from '../assets/images/logo.png'; 
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-4 py-2 md:py-5 md:px-20 bg-white shadow-md font-[sfpro] fixed w-full z-50">
<img src={logo} alt="" srcset="" />      
<div className="flex items-center space-x-2 md:space-x-6">

      <ul className="flex space-x-1 md:space-x-8 text-gray-700 text-[9px] md:text-sm font-medium">
        <li><a href="#">About Us</a></li>
        <li><a href="#">Our Services ▾</a></li>
        <li><a href="#">Help Center</a></li>
      </ul>
      <Link to={'https://calendly.com/nwachukwuconfidence/30min_sartorcrm_demo'} className="bg-[#00D743] text-black px-1 py-1 md:px-5 md:py-2 rounded-md text-[9px] md:text-sm" target='_blank' rel="noopener noreferrer">
        Book a Demo
      </Link>
      </div>
    </nav>
  );
};


export default Navbar;
