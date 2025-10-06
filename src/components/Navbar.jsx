import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { HiOutlineMenu } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setSolutionsOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const toggleSolutions = () => setSolutionsOpen(!isSolutionsOpen);

  return (
    <>
      <nav className="flex justify-between items-center px-4 py-2 md:py-5 md:px-20 bg-white shadow-md font-[sfpro] fixed w-full max-w-[1444px] h-[56px] md:h-[92px] z-50">

        {/* Logo + CRM */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Sartor Logo" className="w-[50px] md:w-[100px]" />
            <span className="bg-[#00A859] md:bg-[#000068] text-white text-[10px] md:text-sm font-semibold px-2 py-[2px] md:px-3 md:py-[3px] rounded-full">
              CRM
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 relative w-[66.5%] lg:w-[63%] justify-between">
          <ul className="flex space-x-3 lg:space-x-6 text-gray-700 text-sm font-medium">
            <li><Link to="/">Home</Link></li>

            {/* Solutions Dropdown */}
            <li
              className="relative group cursor-pointer"
              // onClick={toggleSolutions}
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <span className="flex items-center space-x-1">
                <span>Solutions</span>
                <span>{isSolutionsOpen ? <ChevronUp /> : <ChevronDown /> }</span>
              </span>

              {isSolutionsOpen && (
                <div className="absolute left-0 top-full bg-white shadow-lg rounded-lg w-48 p-2 z-50">
                  <Link
                    to="/sales-navigator"
                    className="md:text-[16px] block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    Sales Navigator
                  </Link>
                  <Link
                    to="/sartor-chain"
                    className="md:text-[16px] block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    SartorChain
                  </Link>
                  <Link
                    to="/sartor-crm-360"
                    className="md:text-[16px] block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    CRM 360
                  </Link>
                  <Link
                    to="/sales-navigator-plus"
                    className="md:text-[16px] block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    Navigator Plus
                  </Link>
                </div>
              )}
            </li>

            <li><Link to="/pricing">Pricing</Link></li>
            <li><a href="#">Resources</a></li>
          </ul>

          <Link
            to="https://calendly.com/nwachukwuconfidence/30min_sartorcrm_demo"
            className="bg-[#00A859] hover:bg-green-600 text-white px-6 py-2 rounded-xl font-medium text-[12px] lg:text-[14px]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a Demo
          </Link>
        </div>

        {/* Mobile Nav Button */}
        <div className="flex md:hidden items-center space-x-2">
          <Link
            to="https://calendly.com/nwachukwuconfidence/30min_sartorcrm_demo"
            className="bg-[#00A859] text-white px-3 py-1 rounded-xl text-[10px] font-semibold h-[36px] w-[108px] text-center flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book A Demo
          </Link>
          <button
            onClick={toggleMobileMenu}
            className="bg-[#00A859] p-1 rounded-md"
          >
            {isMobileMenuOpen ? (
              <IoClose className="text-white text-lg size-[25px]" />
            ) : (
              <HiOutlineMenu className="text-white text-lg size-[25px]" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[56px] left-0 right-0 bg-white shadow-lg z-40 w-full font-[sfpro] px-4 py-4">
          <ul className="flex flex-col space-y-4 text-gray-700 text-sm font-medium justify-center items-center">
            <li><a href="#">Home</a></li>

            {/* Solutions Dropdown on Mobile */}
            <li>
              <button
                onClick={toggleSolutions}
                className={`flex w-full ${isSolutionsOpen ? "ml-8" : ""}`}
              >
                <span>Solutions</span>
                <span>{isSolutionsOpen ? <ChevronUp/> : <ChevronDown/>}</span>
              </button>

              {isSolutionsOpen && (
                <ul className=" left-0 top-full bg-white shadow-lg rounded-lg  py-2 z-50 flex flex-col justify-center">
                  <li> <Link
                    to="/sales-navigator"
                    className="md:text-[16px] block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    Sales Navigator
                  </Link></li>
                  <li> <Link
                    to="/sartor-chain"
                    className="md:text-[16px] block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    SartorChain
                  </Link></li>
                  <li>  <Link
                    to="/sartor-crm-360"
                    className="md:text-[16px] block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    CRM 360
                  </Link></li>
                  <li>  <Link
                    to="/sales-navigator-plus"
                    className="md:text-[16px] block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    Navigator Plus
                  </Link></li>
                </ul>
              )}
            </li>

            <li><Link to="/pricing">Pricing</Link></li>
            <li><a href="#">Resources</a></li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
