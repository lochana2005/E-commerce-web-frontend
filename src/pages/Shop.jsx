import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ChevronDown, X, ShoppingBag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Shop = () => {
  // Sample Products Data
  const products = [
    { id: 1, name: "Premium White Tee", category: "Fashion", price: 45, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop" },
    { id: 2, name: "Classic Navy Shirt", category: "Fashion", price: 85, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop" },
    { id: 3, name: "Urban Linen Shirt", category: "Fashion", price: 70, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop" },
    { id: 4, name: "Signature Denim", category: "Fashion", price: 120, image: "https://images.unsplash.com/photo-1550991152-71370ed9cbdd?q=80&w=1000&auto=format&fit=crop" },
    { id: 5, name: "Luxury Chrono Watch", category: "Accessories", price: 250, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop" },
    { id: 6, name: "Black Minimal Tee", category: "Fashion", price: 40, image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=1000&auto=format&fit=crop" },
    { id: 7, name: "Modern Table Lamp", category: "Lighting", price: 150, image: "https://images.unsplash.com/photo-1507473885765-e6ed657f9971?q=80&w=1000&auto=format&fit=crop" },
    { id: 8, name: "Designer Chair", category: "Furniture", price: 450, image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1000&auto=format&fit=crop" },
  ];

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(2000); 
  const [sortBy, setSortBy] = useState('newest');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categories = ['All', 'Lighting', 'Furniture', 'Accessories', 'Electronics', 'Fashion'];

  useEffect(() => {
    let result = products.filter((p) => {
      const categoryMatch = selectedCategory === 'All' || p.category === selectedCategory;
      const searchMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const priceMatch = p.price <= priceRange;
      return categoryMatch && searchMatch && priceMatch;
    });

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  return (
    // 'pt-6' ලෙස අඩු කළා ලොකු හිඩැස නැති කිරීමට
    <div className="bg-white min-h-screen pt-6 pb-12 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- PAGE HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-3xl font-serif font-medium mb-2 text-slate-900">Collections</h1>
<hr />
          </motion.div>
          
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-slate-200 active:scale-95 transition-all"
          >
            <SlidersHorizontal size={20} /> Filter & Sort
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-16">
          
          {/* --- SIDEBAR --- */}
          <aside className="hidden md:block w-72 space-y-12 sticky top-32 h-fit">
            
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">Search</h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="What are you looking for?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-black transition-all outline-none text-slate-900 font-medium"
                />
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
              <hr />
            </div>
            

            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">Categories</h3>
              <div className="flex flex-col space-y-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left text-lg font-serif transition-all flex items-center justify-between group ${
                      selectedCategory === cat ? 'text-black font-bold scale-105' : 'text-slate-500 hover:text-black'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <motion.div layoutId="dot" className="w-2 h-2 bg-black rounded-full" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">Price Range</h3>
                <span className="text-sm font-black text-black bg-slate-100 px-3 py-1 rounded-lg">${priceRange}</span>
              </div>
              <input 
                type="range" min="0" max="2000" step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">Sort By</h3>
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 appearance-none focus:ring-2 focus:ring-black outline-none font-bold text-slate-900"
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
              </div>
            </div>
          </aside>

          {/* --- PRODUCT GRID --- */}
          <div className="flex-1">
            <AnimatePresence mode='wait'>
              {filteredProducts.length > 0 ? (
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                  {filteredProducts.map((product) => (
                    <motion.div 
                      key={product.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      className="group cursor-pointer"
                    >
                      <Link to={`/product/${product.id}`}>
                        <div className="aspect-[3/4] bg-slate-50 rounded-[2.5rem] overflow-hidden mb-6 relative shadow-sm group-hover:shadow-2xl transition-all duration-700">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute top-6 left-6">
                            <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                              {product.category}
                            </span>
                          </div>
                        </div>
                      </Link>
                      <div className="space-y-1 px-2">
                        <div className="flex items-center gap-1 text-yellow-500 mb-1">
                          <Star size={12} fill="currentColor" /> <span className="text-xs font-bold text-slate-400">4.8</span>
                        </div>
                        <h3 className="text-xl font-serif font-medium text-slate-900">{product.name}</h3>
                        <p className="text-slate-900 font-black tracking-tight">${product.price}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="h-96 flex flex-col items-center justify-center text-center">
                  <h3 className="text-2xl font-serif mb-2 text-slate-400">No results found</h3>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* --- MOBILE FILTER DRAWER --- */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileFilterOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] md:hidden" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] p-8 md:hidden overflow-y-auto">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-serif">Filters</h2>
                <button onClick={() => setIsMobileFilterOpen(false)} className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-full"><X size={24} /></button>
              </div>
              {/* Mobile filter content... */}
              <button onClick={() => setIsMobileFilterOpen(false)} className="w-full bg-black text-white py-5 rounded-2xl font-bold text-lg mt-10">Show Results</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;