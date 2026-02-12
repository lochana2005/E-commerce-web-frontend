import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Main Dark Navbar */}
      <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* 1. Logo (Orange Accent) */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-white text-xl">L</span>
                </div>
                <span className="font-sans font-bold text-2xl tracking-tight">
                  Luxe<span className="text-orange-500">Attire</span>
                </span>
              </Link>
            </div>

            {/* 2. Desktop Menu Links (Center) */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/shop">Shop</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </div>

            {/* 3. Search Bar & Actions (Right) */}
            <div className="flex items-center gap-4">
              
              {/* Search Bar (Visible on Desktop) */}
              <div className="hidden md:flex items-center bg-slate-800 rounded-full px-4 py-2 border border-slate-700 focus-within:border-orange-500 transition-colors w-64">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-400 w-full"
                />
                <Search size={18} className="text-slate-400" />
              </div>

              {/* Cart Button (Orange) */}
              <Link to="/cart" className="relative p-2 bg-orange-500 hover:bg-orange-600 rounded-full text-white transition-colors">
                <ShoppingBag size={20} />
                <span className="absolute -top-1 -right-1 bg-white text-orange-600 text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  2
                </span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden p-2 text-slate-300 hover:text-white"
                onClick={() => setIsOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar (Visible only on Mobile below navbar) */}
        <div className="md:hidden px-4 pb-4">
          <div className="flex items-center bg-slate-800 rounded-lg px-4 py-2 border border-slate-700">
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-400 w-full"
            />
            <Search size={18} className="text-slate-400" />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-slate-900 text-white z-50 shadow-2xl p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-xl">Menu</span>
                <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-800 rounded-full">
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col space-y-4">
                <MobileLink to="/" onClick={() => setIsOpen(false)}>Home</MobileLink>
                <MobileLink to="/shop" onClick={() => setIsOpen(false)}>Shop</MobileLink>
                <MobileLink to="/about" onClick={() => setIsOpen(false)}>About Us</MobileLink>
                <MobileLink to="/contact" onClick={() => setIsOpen(false)}>Contact</MobileLink>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Helper Components for Cleaner Code
const NavLink = ({ to, children }) => (
  <Link 
    to={to} 
    className="text-slate-300 hover:text-orange-500 font-medium text-sm transition-colors"
  >
    {children}
  </Link>
);

const MobileLink = ({ to, onClick, children }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className="block py-3 px-4 bg-slate-800 rounded-lg text-slate-200 hover:bg-slate-700 hover:text-orange-500 transition-colors"
  >
    {children}
  </Link>
);

export default Navbar;