import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, ArrowRight, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { products } from '../data/products'; // Oyaage products data file eka

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);

  // Mock Sizes & Colors (Hama product ekatama meka danata penwi)
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = [
    { name: 'Black', value: '#000000' },
    { name: 'Cream', value: '#f5f5f4' },
    { name: 'Navy', value: '#172554' },
  ];

  useEffect(() => {
    // URL eke ID eka anuwa product eka hoyaganna
    const foundProduct = products.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);
    // Page ekata eddi udata scroll karanna
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  // Wena products 4k thoraganna (Suggestion walata)
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left: Product Image */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-neutral-100 rounded-2xl aspect-[3/4] overflow-hidden relative group"
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full">
            New Arrival
          </div>
        </motion.div>

        {/* Right: Product Details */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          {/* Title & Price */}
          <div>
            <div className="flex items-center space-x-2 text-yellow-500 mb-4">
              <Star fill="currentColor" size={16} />
              <Star fill="currentColor" size={16} />
              <Star fill="currentColor" size={16} />
              <Star fill="currentColor" size={16} />
              <Star fill="currentColor" size={16} />
              <span className="text-gray-400 text-sm ml-2">(128 Reviews)</span>
            </div>
            <h1 className="text-4xl font-serif font-medium text-gray-900 mb-2">{product.name}</h1>
            <p className="text-2xl font-light text-gray-600">${product.price}</p>
          </div>

          <p className="text-gray-500 leading-relaxed">
            {product.description || "Elevate your wardrobe with this timeless piece. Crafted from premium materials, it offers both comfort and sophisticated style for any occasion."}
          </p>

          {/* Color Selector */}
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-gray-900 block mb-3">Color: {selectedColor}</span>
            <div className="flex space-x-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full border border-gray-200 focus:outline-none ring-2 ring-offset-2 transition-all ${
                    selectedColor === color.name ? 'ring-black' : 'ring-transparent'
                  }`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold uppercase tracking-widest text-gray-900">Size: {selectedSize}</span>
              <button className="text-xs underline text-gray-500 hover:text-black">Size Guide</button>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 text-sm font-medium border rounded-lg transition-all ${
                    selectedSize === size 
                      ? 'bg-black text-white border-black' 
                      : 'bg-white text-gray-900 border-gray-200 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart & Actions */}
          <div className="flex space-x-4 pt-4 border-t border-gray-100">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-gray-50">-</button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 hover:bg-gray-50">+</button>
            </div>
            <button className="flex-1 bg-black text-white rounded-lg font-bold flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors">
              <ShoppingBag size={20} />
              <span>Add to Cart - ${(product.price * quantity).toFixed(2)}</span>
            </button>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-500 pt-6">
            <div className="flex items-center space-x-2">
              <Truck size={16} />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck size={16} />
              <span>2 Year Warranty</span>
            </div>
            <div className="flex items-center space-x-2">
              <RefreshCw size={16} />
              <span>30 Day Returns</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Products Section */}
      <div className="max-w-7xl mx-auto px-6 mt-32">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl font-serif font-medium">You May Also Like</h2>
          <Link to="/shop" className="text-sm font-bold border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {relatedProducts.map((item) => (
            <Link to={`/product/${item.id}`} key={item.id} className="group">
              <div className="bg-neutral-100 rounded-xl overflow-hidden aspect-[3/4] mb-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">{item.name}</h3>
              <p className="text-gray-500 text-sm">${item.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;