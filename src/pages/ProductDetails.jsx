import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, ArrowLeft, Truck, ShieldCheck, RefreshCw, CreditCard, Check, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext'; // Cart context එක අනිවාර්යයෙන්ම ඕනේ
import { products } from '../data/products';
import TrendingProduct from '../components/TrendingProduct';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = [
    { name: 'Black', value: '#000000' },
    { name: 'Cream', value: '#f5f5f4' },
    { name: 'Navy', value: '#172554' },
  ];

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  const handleAddToCart = () => {
    const itemToAdd = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        selectedColor: selectedColor,
        selectedSize: selectedSize
    };
    addToCart(itemToAdd);
    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  return (
    // 'pt-6' ලෙස අඩු කළා හිඩැස නැති කිරීමට (App.jsx එකේ දැනටමත් pt-20ක් ඇති බැවින්)
    <div className="bg-white min-h-screen pt-6 pb-24"> 
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Back Button */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-slate-400 hover:text-black mb-8 font-bold uppercase tracking-widest text-[10px] transition-colors">
          <ArrowLeft size={14} /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-neutral-100 rounded-[2.5rem] aspect-[3/4] overflow-hidden relative group shadow-sm"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
              New Arrival
            </div>
          </motion.div>

          {/* Right: Product Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            {/* Title & Price */}
            <div>
              <div className="flex items-center space-x-1 text-yellow-500 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={16} />)}
                <span className="text-gray-400 text-xs font-bold ml-2">(128 Reviews)</span>
              </div>
              <h1 className="text-5xl font-serif font-medium text-gray-900 mb-4 tracking-tight">{product.name}</h1>
              <p className="text-3xl font-black text-gray-900">${product.price}</p>
            </div>

            <p className="text-gray-500 leading-relaxed text-lg font-medium">
              {product.description || "Elevate your wardrobe with this timeless piece. Crafted from premium materials, it offers both comfort and sophisticated style for any occasion."}
            </p>

            {/* Color Selector */}
            <div className="space-y-4">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 block">Color: <span className="text-black">{selectedColor}</span></span>
              <div className="flex space-x-4">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color.name ? 'border-black scale-110 shadow-lg' : 'border-slate-100'
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Size: <span className="text-black">{selectedSize}</span></span>
                <button className="text-[10px] font-black uppercase tracking-widest underline text-gray-400 hover:text-black transition-colors">Size Guide</button>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-4 text-sm font-bold border-2 rounded-2xl transition-all ${
                      selectedSize === size 
                        ? 'bg-black text-white border-black shadow-xl shadow-black/10' 
                        : 'bg-white text-gray-900 border-slate-100 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Buttons */}
            <div className="space-y-6 pt-6 border-t border-slate-50">
                <div className="flex items-center bg-slate-50 w-fit rounded-full p-1.5 border border-slate-100">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-full transition-all">-</button>
                    <span className="w-10 text-center font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-full transition-all">+</button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                        onClick={handleAddToCart}
                        disabled={isAddedSuccess}
                        className={`flex-1 py-5 rounded-[1.5rem] font-bold flex items-center justify-center space-x-2 transition-all duration-300 border-2 ${
                            isAddedSuccess 
                            ? 'bg-green-50 border-green-500 text-green-600 scale-95' 
                            : 'bg-white border-black text-black hover:bg-black hover:text-white'
                        }`}
                    >
                      {isAddedSuccess ? (
                        <>Added <Check size={20} className="ml-2" /></>
                      ) : (
                        <>Add to Cart <ShoppingBag size={20} className="ml-2" /></>
                      )}
                    </button>
                    
                    <button 
                        onClick={handleBuyNow}
                        className="flex-1 bg-black text-white rounded-[1.5rem] font-bold flex items-center justify-center space-x-2 hover:bg-slate-800 transition-all shadow-2xl shadow-black/20"
                    >
                      <span>Buy Now</span>
                      <CreditCard size={20} className="ml-2" />
                    </button>
                </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4 text-center pt-8 border-t border-slate-50">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400"><Truck size={18} /></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400"><ShieldCheck size={18} /></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">2 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400"><RefreshCw size={18} /></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">30 Day Returns</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <TrendingProduct />
    </div>
  );
};

export default ProductDetails;