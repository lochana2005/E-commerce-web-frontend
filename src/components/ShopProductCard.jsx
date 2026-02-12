// src/components/ShopProductCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Plus } from 'lucide-react';

const ShopProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        </Link>
        <div className="absolute top-2 right-2">
          <button
            onClick={() => addToCart(product)}
            className="bg-white/50 backdrop-blur-sm p-2 rounded-full text-gray-800 hover:bg-white transition-all transform scale-0 group-hover:scale-100"
            aria-label="Quick Add"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-gray-800 font-medium">{product.name}</h3>
        <p className="text-gray-500">${product.price.toFixed(2)}</p>
      </div>
    </motion.div>
  );
};

export default ShopProductCard;
