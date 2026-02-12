import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User, LogOut, Heart, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext'; // AuthContext එක නිවැරදිව Import කරගන්න

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // AuthContext හරහා ඇත්තම User දත්ත ලබාගැනීම
  const { user, logout } = useContext(AuthContext);
  
  const location = useLocation();

  // Scroll effect - Navbar එක පල්ලෙහාට යද්දී background එක වෙනස් වීමට
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // පේජ් එක මාරු වෙද්දී විවෘත වී ඇති menus වසා දැමීම
  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
    setShowProfileMenu(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isSearchOpen ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
          
          {/* 1. Logo */}
          <Link to="/" className="text-2xl font-serif font-bold tracking-tighter z-50">
            LUXE ATTIRE.
          </Link>

          {/* 2. Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className={`text-sm font-bold uppercase tracking-widest hover:text-gray-500 transition-colors ${
                  location.pathname === link.path ? 'border-b-2 border-black' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* 3. Icons & Auth Section */}
          <div className="flex items-center space-x-5 z-50">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hover:text-gray-500 transition-colors"
            >
              {isSearchOpen ? <X size={22} /> : <Search size={20} />}
            </button>

            <Link to="/cart" className="relative hover:text-gray-500 transition-colors">
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                0
              </span>
            </Link>

            {/* --- AUTH LOGIC START --- */}
            {!user ? (
              <Link 
                to="/login" 
                className="hidden md:block bg-black text-white px-8 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
              >
                Login
              </Link>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-10 h-10 rounded-full border-2 border-slate-100 overflow-hidden hover:border-black transition-all shadow-sm flex items-center justify-center bg-slate-50"
                >
                  {/* Google පින්තූරය ඇත්නම් එය පෙන්වයි, නැත්නම් default icon එක */}
                  {user.picture ? (
                    <img src={user.picture} alt="User" className="w-full h-full object-cover" />
                  ) : (
                    <User size={20} className="text-slate-400" />
                  )}
                </button>

                {/* Profile Dropdown Menu */}
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-64 bg-white rounded-2xl shadow-2xl border border-slate-50 p-2 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-slate-50 mb-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Your Account</p>
                        {/* යූසර්ගේ නම dynamic ලෙස පෙන්වීම */}
                        <p className="text-sm font-bold text-slate-900 truncate">
                          {user.name || "S.R. Iyuri Nimesha"}
                        </p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                      
                      <DropdownItem to="/profile" icon={<User size={16} />} label="My Profile" />
                      <DropdownItem to="/orders" icon={<ShoppingBag size={16} />} label="Orders" />
                      <DropdownItem to="/wishlist" icon={<Heart size={16} />} label="Wishlist" />
                      
                      <div className="border-t border-slate-50 mt-2 pt-2">
                        <button 
                          onClick={logout} 
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            {/* --- AUTH LOGIC END --- */}

            <button 
              className="md:hidden p-2 hover:bg-slate-100 rounded-full"
              onClick={() => setIsOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* --- SEARCH OVERLAY --- */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute top-full left-0 w-full bg-white border-b border-slate-100 overflow-hidden shadow-xl"
            >
              <div className="max-w-3xl mx-auto py-8 px-6">
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Search for premium attire..."
                  className="w-full text-3xl font-serif italic border-b-2 border-slate-100 py-4 outline-none focus:border-black transition-all"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              className="fixed top-0 right-0 h-full w-[85%] bg-white z-[70] p-8 md:hidden shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-serif font-bold">Menu</span>
                <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-50 rounded-full"><X size={24} /></button>
              </div>
              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link key={link.name} to={link.path} className="text-3xl font-serif font-medium">{link.name}</Link>
                ))}
                {!user && (
                  <Link to="/login" className="text-3xl font-serif font-medium text-black underline">Login</Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Dropdown Items සඳහා Helper Component
const DropdownItem = ({ to, icon, label }) => (
  <Link to={to} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-black rounded-xl transition-all">
    {icon} {label}
  </Link>
);

export default Navbar;