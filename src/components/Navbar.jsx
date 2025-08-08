import React from 'react';
import logo from '../assets/images/logo.png'; 

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center md:py-6 md:px-10 bg-white shadow-md font-[sfpro]">
<img src={logo} alt="" srcset="" />      
<div className="flex items-center md:space-x-6">

      <ul className="flex md:space-x-8 text-gray-700 text-[9px] md:text-sm font-medium">
        <li><a href="#">About Us</a></li>
        <li><a href="#">Our Services ▾</a></li>
        <li><a href="#">Help Center</a></li>
      </ul>
      <button className="bg-blue-800 text-white md:px-5 md:py-2 rounded-md text-sm hover:bg-blue-900">
        Book a Consultation
      </button>
      </div>
    </nav>
  );
};

export default Navbar;
