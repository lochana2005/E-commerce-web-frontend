import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, ArrowRight, CreditCard } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-20 pb-10 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-bold tracking-wider">LUXE ATTIRE.</h2>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Redefining modern elegance. We create timeless pieces for the contemporary individual who values quality and style.
          </p>
          <div className="flex space-x-4">
            <SocialIcon icon={<Facebook size={20} />} />
            <SocialIcon icon={<Instagram size={20} />} />
            <SocialIcon icon={<Twitter size={20} />} />
            <SocialIcon icon={<Youtube size={20} />} />
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-neutral-200">Shop</h3>
          <ul className="space-y-4 text-sm text-neutral-400">
            <FooterLink text="New Arrivals" />
            <FooterLink text="Best Sellers" />
            <FooterLink text="Accessories" />
            <FooterLink text="Sale Collection" />
            <FooterLink text="Gift Cards" />
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-neutral-200">Customer Care</h3>
          <ul className="space-y-4 text-sm text-neutral-400">
            <FooterLink text="Contact Us" />
            <FooterLink text="Shipping & Returns" />
            <FooterLink text="Size Guide" />
            <FooterLink text="FAQ" />
            <FooterLink text="Privacy Policy" />
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-neutral-200">Unlock 10% Off</h3>
          <p className="text-neutral-400 text-sm mb-4">
            Sign up for our newsletter and get exclusive access to new drops and secret sales.
          </p>
          <form className="flex flex-col space-y-3">
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-white transition-colors"
              />
              <button className="absolute right-2 top-2 p-1 bg-white text-black rounded-md hover:bg-neutral-200 transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>
            <span className="text-xs text-neutral-500">
              By signing up, you agree to our Terms.
            </span>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-neutral-500 text-xs">
          © 2026 Luxe Attire Inc. All rights reserved.
        </p>
        
        {/* Payment Icons Simulation */}
        <div className="flex items-center space-x-4 text-neutral-500">
           <span className="text-xs font-semibold">Secure Payment:</span>
           <div className="flex space-x-2">
              <div className="w-8 h-5 bg-white rounded flex items-center justify-center text-black text-[8px] font-bold">VISA</div>
              <div className="w-8 h-5 bg-white rounded flex items-center justify-center text-black text-[8px] font-bold">MC</div>
              <div className="w-8 h-5 bg-white rounded flex items-center justify-center text-black text-[8px] font-bold">PAY</div>
           </div>
        </div>
      </div>
    </footer>
  );
};

// Reusable Components to keep code clean
const SocialIcon = ({ icon }) => (
  <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300">
    {icon}
  </a>
);

const FooterLink = ({ text }) => (
  <li>
    <a href="#" className="hover:text-white transition-colors duration-200 flex items-center group">
      <span className="w-0 group-hover:w-2 h-[1px] bg-white mr-0 group-hover:mr-2 transition-all duration-300"></span>
      {text}
    </a>
  </li>
);

export default Footer;