import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-white min-h-screen pt-10 pb-12">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 px-4"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-4">
          Visit Our Boutique
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Experience our collection in person. Our stylists are ready to help you find the perfect fit.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Side: Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-12"
        >
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-stone-50 rounded-2xl">
              <MapPin className="w-8 h-8 text-black mb-4" />
              <h3 className="font-serif text-xl mb-2">Our Location</h3>
              <p className="text-gray-600">
                123 Fashion Avenue,<br />
                Cinnamon Gardens,<br />
                Colombo 07.
              </p>
            </div>

            <div className="p-6 bg-stone-50 rounded-2xl">
              <Clock className="w-8 h-8 text-black mb-4" />
              <h3 className="font-serif text-xl mb-2">Opening Hours</h3>
              <p className="text-gray-600">
                Mon - Sat: 10:00 AM - 8:00 PM<br />
                Sunday: 10:00 AM - 6:00 PM
              </p>
            </div>

            <div className="p-6 bg-stone-50 rounded-2xl">
              <Phone className="w-8 h-8 text-black mb-4" />
              <h3 className="font-serif text-xl mb-2">Call Us</h3>
              <p className="text-gray-600">
                +94 77 123 4567<br />
                +94 11 234 5678
              </p>
            </div>

            <div className="p-6 bg-stone-50 rounded-2xl">
              <Mail className="w-8 h-8 text-black mb-4" />
              <h3 className="font-serif text-xl mb-2">Email Us</h3>
              <p className="text-gray-600">
                hello@fashionboutique.lk<br />
                support@fashionboutique.lk
              </p>
            </div>
          </div>

          {/* Map Integration (Embedded Google Map) */}
          <div className="w-full h-64 rounded-2xl overflow-hidden shadow-lg grayscale hover:grayscale-0 transition-all duration-500">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.80385597899!2d79.82118589352723!3d6.92192257611462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2s!4v1707720000000!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>

        {/* Right Side: Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-8 md:p-12 border border-gray-100 shadow-xl rounded-3xl"
        >
          <h2 className="text-2xl font-serif mb-6">Send us a Message</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none"
                placeholder="Iyuri Nimesha"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none">
                <option>General Inquiry</option>
                <option>Order Status</option>
                <option>Custom Fitting</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                rows="4" 
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <button className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center space-x-2">
              <span>Send Message</span>
              <Send size={18} />
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;