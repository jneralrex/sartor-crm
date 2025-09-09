import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#000068] text-white pt-12 pb-6 px-6 md:px-20 font-[sfpro]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm mb-10">
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Features</li>
            <li>Works</li>
            <li>Career</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Help Center</h4>
          <ul className="space-y-2">
            <li>Customer Support</li>
            <li>Delivery Status</li>
            <li><Link to='/privacy-policy'> Terms & Conditions </Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>Free Materials</li>
            <li>Blog Posts</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>Terms & Conditions</li>
            <li className=''> <Link to='/privacy-policy'>Privacy Policy</Link> </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-blue-800 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-300">
        <span>Sartor Limited</span>
        <span>© Copyright 2021. All rights reserved by SartorLimited</span>
        <div className="flex space-x-2 mt-2 md:mt-0">
          <span className="w-2 h-2 rounded-full bg-white opacity-40" />
          <span className="w-2 h-2 rounded-full bg-white opacity-70" />
          <span className="w-2 h-2 rounded-full bg-white opacity-90" />
          <span className="w-2 h-2 rounded-full bg-white opacity-40" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
