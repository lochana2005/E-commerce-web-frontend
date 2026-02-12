import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Star, ArrowRight, Sparkles } from 'lucide-react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- 3D TILT EFFECT LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Mouse eka wadina thana anuwa rotate wena pramanaya calculate karanawa
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  // Smooth animation (spring physics)
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 200); // Sensitivity controls
    y.set(yPct * 200);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // --- SLIDER DATA ---
  const slides = [
    {
      id: 1,
      title: "New Era of",
      highlight: "Luxury.",
      desc: "Experience the perfect blend of comfort and style with our signature collection.",
      image: "src/assets/img/home.png", // Local image for better performance
      color: "from-blue-100 to-indigo-50",
      accent: "text-blue-900"
    },
    {
      id: 2,
      title: "Summer",
      highlight: "Vibes.",
      desc: "Bold patterns and breathable fabrics for the ultimate summer look.",
      image: "src/assets/img/home2.png",
      color: "from-rose-100 to-pink-50",
      accent: "text-rose-900"
    },
    {
      id: 3,
      title: "Street",
      highlight: "Fashion.",
      desc: "Redefine your urban style with our exclusive limited edition drops.",
      image: "src/assets/img/home3.png",
      color: "from-amber-100 to-orange-50",
      accent: "text-amber-900"
    }
  ];

  // Auto Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden">
      
      {/* --- HERO SECTION (PREMIUM 3D LAYOUT) --- */}
      <div className={`relative w-full h-screen overflow-hidden bg-gradient-to-br ${slides[currentSlide].color} transition-colors duration-1000`}>
        
        {/* Abstract Background Shapes (Passe thiyena loku circles) */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-white opacity-40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-white opacity-60 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-center relative z-10">
          
          {/* 1. LEFT SIDE: BIG TEXT */}
          <div className="flex-1 space-y-8 pt-20 md:pt-0 text-center md:text-left">
            <motion.div
              key={currentSlide} // Text maru weddi animate wenna
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <span className="px-3 py-1 bg-white/80 backdrop-blur rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">New Collection 2026</span>
                <Sparkles size={16} className="text-yellow-600" />
              </div>
              
              <h1 className={`text-6xl md:text-8xl font-serif font-medium leading-[0.9] ${slides[currentSlide].accent}`}>
                {slides[currentSlide].title} <br />
                <span className="italic font-light opacity-80">{slides[currentSlide].highlight}</span>
              </h1>
              
              <p className="text-gray-600 text-lg max-w-md mt-6 mx-auto md:mx-0 leading-relaxed">
                {slides[currentSlide].desc}
              </p>

              <div className="mt-8 flex gap-4 justify-center md:justify-start">
                <button className="bg-black text-white px-8 py-4 rounded-full font-bold shadow-2xl hover:scale-105 transition-transform flex items-center gap-2">
                  Shop Now <ArrowRight size={18} />
                </button>
                <button className="px-8 py-4 rounded-full font-bold border border-black/10 hover:bg-white transition-colors">
                  View Lookbook
                </button>
              </div>
            </motion.div>
          </div>

          {/* 2. RIGHT SIDE: 3D INTERACTIVE MODEL */}
          <div 
            className="flex-1 h-full flex items-center justify-center perspective-1000 relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
             {/* Background Blob behind model */}
             <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-white rounded-full shadow-2xl z-0"
               style={{
                 rotateX: rotateXSpring,
                 rotateY: rotateYSpring,
               }}
             />

             {/* The Model Image (Floating 3D) */}
             <motion.div
                style={{
                  rotateX: rotateXSpring,
                  rotateY: rotateYSpring,
                  z: 100 // Lifts the image off the background
                }}
                className="relative z-10 cursor-pointer"
             >
                <motion.img 
                   key={slides[currentSlide].image}
                   src={slides[currentSlide].image} 
                   alt="Model"
                   initial={{ opacity: 0, scale: 0.9, y: 50 }}
                   animate={{ opacity: 1, scale: 1.1, y: 0 }}
                   transition={{ duration: 0.8, ease: "easeOut" }}
                   className="h-[50vh] md:h-[80vh] w-auto object-contain drop-shadow-2xl"
                   style={{ filter: "drop-shadow(0px 20px 40px rgba(0,0,0,0.25))" }}
                />
             </motion.div>
          </div>

        </div>

        {/* Bottom Progress Bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-gray-200 w-full">
            <motion.div 
              key={currentSlide}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-full bg-black"
            />
        </div>
      </div>

      {/* --- ANITH SECTIONS (Top Selling etc.) --- */}
      {/* Mewa parana ewa ma thiyanna */}
      <TopSellingSection />
      <BestProductsSection />

    </div>
  );
};

// --- HELPER COMPONENTS (Parana widiyatama thiyanna) ---
const TopSellingSection = () => {
    const products = [
        { id: 1, name: "Casual Wear", color: "bg-gray-100", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" },
        { id: 2, name: "Printed Shirt", color: "bg-gray-100", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop" },
        { id: 3, name: "Women Shirt", color: "bg-gray-100", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop" },
        { id: 4, name: "Fashion Tee", color: "bg-gray-100", image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=1000&auto=format&fit=crop" },
    ];
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-3">
                <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Top Selling</p>
                <h2 className="text-4xl font-serif font-medium text-black">Weekly Picks</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {products.map((item, index) => (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="group text-center">
                        <div className={`${item.color} rounded-2xl p-6 mb-4 transition-all duration-300 hover:shadow-lg h-[300px] flex items-center justify-center relative overflow-hidden`}>
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" />
                        </div>
                        <h3 className="font-bold text-xl text-gray-900">{item.name}</h3>
                        <div className="flex justify-center items-center space-x-1 text-black mt-2">
                             {[...Array(5)].map((_,i) => <Star key={i} size={14} fill="currentColor" />)}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const BestProductsSection = () => {
    const products = [
        { id: 1, name: "Casual Wear", desc: "Premium cotton fabric.", image: "https://images.unsplash.com/photo-1598532163257-ae3cde09909c?q=80&w=1740&auto=format&fit=crop" },
        { id: 2, name: "Printed Shirt", desc: "Modern abstract prints.", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1740&auto=format&fit=crop" },
        { id: 3, name: "Women Shirt", desc: "Elegant office wear.", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1888&auto=format&fit=crop" },
    ];
    return (
        <section className="py-20 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-left mb-12">
                    <p className="text-gray-500 text-sm font-bold uppercase">Trending</p>
                    <h2 className="text-4xl font-serif font-medium text-black">Best Products</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((item, index) => (
                        <motion.div key={item.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} whileHover={{ y: -10 }} className="bg-white rounded-xl shadow-lg p-6 group hover:bg-black hover:text-white transition-all duration-300 cursor-pointer relative">
                            <div className="h-48 w-full mb-4 overflow-hidden rounded-lg">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="space-y-2 text-center">
                                <div className="flex justify-center space-x-1 text-yellow-400">
                                    {[...Array(5)].map((_,i) => <Star key={i} size={16} fill="currentColor" />)}
                                </div>
                                <h3 className="text-xl font-bold">{item.name}</h3>
                                <p className="text-sm text-gray-500 group-hover:text-gray-300 line-clamp-2">{item.desc}</p>
                                <button className="mt-4 bg-black text-white px-6 py-2 rounded-full text-sm font-bold group-hover:bg-white group-hover:text-black transition-colors">Order Now</button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Home;