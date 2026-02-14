import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Star, ArrowRight, Sparkles } from 'lucide-react';
import TrendingProduct from '../components/TrendingProduct';
const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- 3D TILT EFFECT LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [25, -25]);
  const rotateY = useTransform(x, [-100, 100], [-25, 25]);

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
    x.set(xPct * 200);
    y.set(yPct * 200);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const slides = [
    {
      id: 1,
      title: "New Era of",
      highlight: "Luxury.",
      desc: "Experience the perfect blend of comfort and style with our signature collection.",
      image: "src/assets/img/home.png",
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden">

      {/* --- HERO SECTION --- */}
      <div className={`relative w-full h-screen overflow-hidden bg-gradient-to-br ${slides[currentSlide].color} transition-colors duration-1000`}>

        {/* Background Decorative Shapes */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-white opacity-40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-white opacity-60 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-center relative z-10 pt-16">

          {/* 1. LEFT SIDE: TEXT CONTENT (Layered Above Model) */}
          <div className="flex-1 space-y-6 md:space-y-8 text-center md:text-left z-20">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <span className="px-3 py-1 bg-white/80 backdrop-blur rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">Collection 2026</span>
                <Sparkles size={14} className="text-yellow-600" />
              </div>

              <h1 className={`text-5xl md:text-8xl font-serif font-medium leading-[1] ${slides[currentSlide].accent}`}>
                {slides[currentSlide].title} <br />
                <span className="italic font-light opacity-80">{slides[currentSlide].highlight}</span>
              </h1>

              <p className="text-slate-600 text-sm md:text-lg max-w-md mt-4 md:mt-6 mx-auto md:mx-0 leading-relaxed font-medium">
                {slides[currentSlide].desc}
              </p>

              {/* Action Buttons - Fixed Visibility */}
              <div className="mt-8 md:mt-10 flex gap-3 md:gap-4 justify-center md:justify-start relative z-30">
                <button className="bg-black text-white px-7 md:px-10 py-3 md:py-4 rounded-full font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 text-sm md:text-base">
                  Shop Now <ArrowRight size={18} />
                </button>
                {/* <button className="px-7 md:px-10 py-3 md:py-4 rounded-full font-bold border border-black/10 bg-white/40 backdrop-blur-sm hover:bg-white transition-all text-sm md:text-base text-black">
                  Lookbook
                </button> */}
              </div>
            </motion.div>
          </div>

          {/* 2. RIGHT SIDE: 3D INTERACTIVE MODEL (Layered Below Buttons) */}
          <div
            className="flex-1 h-full flex items-end md:items-center justify-center perspective-1000 relative z-10 mt-[-40px] md:mt-0"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Background Blob */}
            <motion.div
              style={{ rotateX: rotateXSpring, rotateY: rotateYSpring }}
              className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-white rounded-full shadow-2xl z-0"
            />

            {/* The Model Image */}
            <motion.div
              style={{ rotateX: rotateXSpring, rotateY: rotateYSpring, z: 50 }}
              className="relative z-10"
            >
              <motion.img
                key={slides[currentSlide].image}
                src={slides[currentSlide].image}
                alt="Model"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="h-[45vh] md:h-[80vh] w-auto object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-black/5 w-full z-40">
          <motion.div
            key={currentSlide}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-full bg-black"
          />
        </div>
      </div>

      {/* Other Sections */}
      <TopSellingSection />
      <BestProductsSection />
      <TrendingProduct />
      <ReviewsSection />


    </div>
  );
};

// --- Helper Components ---
const TopSellingSection = () => (
  <section className="py-24 px-6 max-w-7xl mx-auto">
    <div className="text-center mb-16 space-y-3">
      <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Top Selling</p>
      <h2 className="text-4xl font-serif font-medium text-slate-900 italic underline underline-offset-8 decoration-slate-100">Weekly Picks</h2>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="group">
          <div className="aspect-[3/4] bg-slate-50 rounded-[2rem] mb-4 overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500">
            <div className="w-full h-full flex items-center justify-center text-slate-200 font-serif italic">Product {i}</div>
          </div>
          <center>
            <h3 className="font-bold text-slate-900">Premium Item</h3>
          </center>

          <p className="text-slate-400 text-sm"></p>
        </div>
      ))}
    </div>
  </section>
);

const BestProductsSection = () => (
  <section className="py-24 bg-slate-50 px-6">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <div className="order-2 md:order-1">
        <div className="aspect-square bg-white rounded-[3rem] shadow-2xl overflow-hidden p-10">
          <div className="w-full h-full bg-slate-50 rounded-[2rem] flex items-center justify-center font-serif text-slate-200">Featured Image</div>
        </div>
      </div>
      <div className="order-1 md:order-2 space-y-8">
        <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Editor's Choice</p>
        <h2 className="text-5xl font-serif leading-tight text-slate-900">Classic Elegance <br /> For Every Season.</h2>
        <p className="text-slate-500 leading-relaxed font-medium">Our best-selling collection is designed for comfort without compromising on style. Premium fabrics meets modern tailoring.</p>
        <button className="bg-black text-white px-10 py-4 rounded-full font-bold shadow-xl">Explore Collection</button>
      </div>
    </div>
  </section>
);

<TrendingProduct />

const ReviewsSection = () => {
  const reviews = [
    { id: 1, name: "Anjali Perera", role: "Verified Buyer", comment: "The quality of the fabric is amazing! I bought a summer dress and it fits perfectly.", rating: 5, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop" },
    { id: 2, name: "Kasun Jayawardena", role: "Verified Buyer", comment: "Best customer service I've experienced. Delivery was fast and quality is top notch.", rating: 5, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop" },
    { id: 3, name: "Dilini Silva", role: "Verified Buyer", comment: "Superb elegant designs. LUXE ATTIRE is now my go-to place for office wear.", rating: 5, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop" },
    { id: 4, name: "Nimesh Dias", role: "Verified Buyer", comment: "The 3D experience on this site is amazing. Product quality is also 10/10.", rating: 5, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop" },
    { id: 5, name: "Sithumi Ranasinghe", role: "Verified Buyer", comment: "I love the new collection. Very stylish and the material feels premium.", rating: 5, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&auto=format&fit=crop" }
  ];

  // Infinite scroll effect eka ganna reviews list eka double karanawa
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-3">Testimonials</p>
        <h2 className="text-4xl font-serif mb-4 text-black">What Our Customers Say</h2>
        <div className="w-20 h-1 bg-black mx-auto"></div>
      </div>

      {/* --- AUTO-SCROLLING CONTAINER --- */}
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex gap-8"
          animate={{
            x: ["0%", "-50%"] // Mada wenakam scroll unama aye mulata paninawa (Infinite look)
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25, // Scroll wena speed eka (Wadi kaloth slow wenawa)
              ease: "linear",
            },
          }}
          style={{ perspective: "1200px" }}
        >
          {duplicatedReviews.map((review, index) => (
            <motion.div
              key={`${review.id}-${index}`}
              whileHover={{
                rotateY: 10,
                z: 50,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="min-w-[350px] md:min-w-[400px] p-10 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-200/40 relative group cursor-pointer"
            >
              <div className="flex text-yellow-500 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>

              <p className="text-gray-700 text-lg italic mb-10 leading-relaxed font-light">
                "{review.comment}"
              </p>

              <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-md"
                />
                <div className="text-left">
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Home;