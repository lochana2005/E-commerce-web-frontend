// src/pages/Cart.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();

  const shippingFee = 5.00;
  const total = subtotal + shippingFee;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 py-12"
    >
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900">Your Cart</h1>
      </header>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link
            to="/shop"
            className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-indigo-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <ul className="divide-y divide-gray-200">
              {cartItems.map(item => (
                <li key={item.id} className="flex items-center py-6">
                  <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                  <div className="ml-6 flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-3">
                      <div className="flex items-center border border-gray-300 rounded-full">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-full">
                          <Minus size={16} />
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-full">
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="ml-6 text-gray-500 hover:text-red-600">
                    <Trash2 size={20} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-8 rounded-lg sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shippingFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 my-4"></div>
                <div className="flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="w-full mt-8 bg-indigo-600 text-white text-lg font-semibold py-3 px-8 rounded-full hover:bg-indigo-700 transition-colors text-center block"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
