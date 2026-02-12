import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Leaf, Heart } from 'lucide-react';

const About = () => {
  // Animation settings
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans">
      
      {/* 1. Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
            alt="Fashion Background" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="relative z-10 text-center text-white px-4"
        >
          <span className="uppercase tracking-[0.3em] text-sm font-light mb-4 block">Our Philosophy</span>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">More Than Just<br/>Fabric & Thread.</h1>
          <p className="max-w-xl mx-auto text-lg font-light text-gray-200">
            We believe that style is a way to say who you are without having to speak.
          </p>
        </motion.div>
      </section>

      {/* 2. The Story Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-4xl font-serif mb-8">Crafting Elegance Since 2026</h2>
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              It started with a simple idea: to bring high-end, runway-inspired fashion to the everyday wardrobe without compromising on quality or comfort.
            </p>
            <p>
              From our humble beginnings in Colombo to dressing women across the island, our journey has been defined by a passion for detail. Every stitch tells a story, and every garment is designed to make you feel confident and empowered.
            </p>
            <img 
              src="https://signature.lk/wp-content/uploads/2021/11/signature-about-us-signature.jpg" 
              alt="Signature" 
              className="h-16 mt-8 opacity-60" 
            />
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <img 
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop" 
            alt="Our Studio" 
            className="rounded-lg shadow-2xl"
          />
          <div className="absolute -bottom-10 -left-10 bg-white p-8 shadow-xl rounded-lg hidden md:block">
            <p className="font-serif text-4xl mb-2">5K+</p>
            <p className="text-sm uppercase tracking-widest text-gray-500">Happy Customers</p>
          </div>
        </motion.div>
      </section>

      {/* 3. Our Values (Grid) */}
      <section className="bg-neutral-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif mb-4">Why Choose Us?</h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ValueCard 
              icon={<Leaf size={32} />} 
              title="Sustainable Sourcing" 
              desc="We are committed to using eco-friendly materials and ethical manufacturing processes to reduce our footprint."
            />
            <ValueCard 
              icon={<Award size={32} />} 
              title="Premium Quality" 
              desc="Every piece goes through a rigorous quality check. We don't sell clothes; we sell investments for your wardrobe."
            />
            <ValueCard 
              icon={<Users size={32} />} 
              title="Customer First" 
              desc="Our relationship with you doesn't end at checkout. We offer lifetime styling advice and seamless returns."
            />
          </div>
        </div>
      </section>

      {/* 4. Team / Founder Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <Heart className="w-12 h-12 text-red-400 mx-auto mb-6" />
          <h2 className="text-3xl font-serif mb-6">Made with Love in Sri Lanka</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            "Fashion is not just about clothes. It's about how you feel when you wear them. My goal is to make every woman feel like a masterpiece."
          </p>
          <div className="mt-8 flex items-center justify-center space-x-4">
             <img 
               src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" 
               alt="Founder" 
               className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg"
             />
             <div className="text-left">
                <p className="font-bold text-gray-900">Iyuri Nimesha</p>
                <p className="text-sm text-gray-500">Founder & Lead Designer</p>
             </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

// Helper Component for Values
const ValueCard = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 text-center"
  >
    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-800">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4 font-serif">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{desc}</p>
  </motion.div>
);

export default About;