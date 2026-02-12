// src/components/DressProductCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const DressProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="block group">
      <motion.div
        className="relative overflow-hidden"
        whileHover="hover"
      >
        <motion.img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-auto object-cover"
          variants={{
            initial: { scale: 1 },
            hover: { scale: 1.05 }
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-2 text-center"
          variants={{
            initial: { y: "100%" },
            hover: { y: 0 }
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <button className="text-sm font-semibold tracking-wider text-gray-800">
            Quick View
          </button>
        </motion.div>
      </motion.div>
      <div className="mt-4 text-center">
        <h3 className="text-lg text-gray-800">{product.name}</h3>
        <p className="text-md text-gray-600">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default DressProductCard;
