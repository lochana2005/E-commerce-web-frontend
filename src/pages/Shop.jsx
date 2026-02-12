// src/pages/Shop.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import ShopProductCard from '../components/ShopProductCard';

const categories = ['All', ...new Set(products.map(p => p.category))];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 py-12"
    >
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900">All Products</h1>
      </header>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sticky Sidebar */}
        <aside className="md:w-1/4">
          <div className="sticky top-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Categories</h2>
            <ul className="space-y-3">
              {categories.map(category => (
                <li key={category}>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left text-lg hover:text-indigo-600 transition-colors ${selectedCategory === category ? 'font-bold text-indigo-600' : 'text-gray-600'}`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ShopProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default Shop;
