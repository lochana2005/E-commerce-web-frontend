import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const TrendingProduct = () => {
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4); 

  useEffect(() => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    setShuffledProducts(shuffled);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const hasMore = visibleCount < shuffledProducts.length;

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] mb-2">
            Curated Selection
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900">Trending Now</h2>
        </motion.div>
      </div>

      {/* Product Grid */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
        <AnimatePresence mode='popLayout'>
          {shuffledProducts.slice(0, visibleCount).map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: (index % 4) * 0.1 }}
              className="group"
            >
              <Link to={`/product/${product.id}`}>
                <div className="aspect-[3/4] bg-slate-50 rounded-[2rem] overflow-hidden mb-5 relative shadow-sm group-hover:shadow-2xl transition-all duration-700">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-2xl translate-y-20 group-hover:translate-y-0 transition-transform duration-500 shadow-xl">
                      <ShoppingBag size={18} />
                  </div>
                </div>
              </Link>
              <div className="px-2 space-y-1">
                <h3 className="text-lg font-serif font-medium text-slate-900 truncate">{product.name}</h3>
                <p className="text-slate-400 font-black tracking-tighter text-sm">${product.price}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* --- UPDATED LOAD MORE BUTTON --- */}
      {hasMore && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 flex justify-center"
        >
          <button 
            onClick={handleLoadMore}
            className="px-12 py-4 border-2 border-black rounded-full font-black text-[11px] uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-500 active:scale-95 shadow-lg shadow-slate-100"
          >
            Load More Pieces
          </button>
        </motion.div>
      )}

      {!hasMore && shuffledProducts.length > 0 && (
        <p className="mt-20 text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
          You've reached the end of the collection
        </p>
      )}
    </section>
  );
};

export default TrendingProduct;