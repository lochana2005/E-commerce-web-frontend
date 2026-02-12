import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  // --- 3D TILT EFFECT LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 pt-24 overflow-hidden relative">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-100 rounded-full blur-3xl opacity-60 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-100 rounded-full blur-3xl opacity-60 animate-pulse delay-700" />

      {/* --- MAIN 3D CARD --- */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/20 p-8 md:p-12 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              style={{ transform: "translateZ(50px)" }} // Adds depth
            >
              <h2 className="text-4xl font-serif font-medium text-slate-900 mb-2">Welcome Back.</h2>
              <p className="text-slate-500 mb-10 font-medium">Please enter your details to sign in.</p>

              <form className="space-y-5">
                <InputGroup icon={<Mail size={20} />} type="email" placeholder="Email Address" />
                <InputGroup icon={<Lock size={20} />} type="password" placeholder="Password" />
                
                <div className="text-right">
                    <button type="button" className="text-sm font-bold text-slate-400 hover:text-black transition-colors">Forgot Password?</button>
                </div>

                <button className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-black/10">
                  Sign In <ArrowRight size={18} />
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              style={{ transform: "translateZ(50px)" }}
            >
              <h2 className="text-4xl font-serif font-medium text-slate-900 mb-2">Create Account.</h2>
              <p className="text-slate-500 mb-10 font-medium">Join the Luxe Attire community today.</p>

              <form className="space-y-5">
                <InputGroup icon={<User size={20} />} type="text" placeholder="Full Name" />
                <InputGroup icon={<Mail size={20} />} type="email" placeholder="Email Address" />
                <InputGroup icon={<Lock size={20} />} type="password" placeholder="Password" />

                <button className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-black/10">
                  Join Now <ArrowRight size={18} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Social Logins */}
        <div className="mt-10 space-y-4" style={{ transform: "translateZ(30px)" }}>
          <div className="relative flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Or Continue With</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>
          <div className="flex gap-4">
            <SocialBtn icon={<Chrome size={20} />} label="Google" />
            <SocialBtn icon={<Github size={20} />} label="Github" />
          </div>
        </div>

        {/* Toggle Button */}
        <div className="mt-10 text-center" style={{ transform: "translateZ(20px)" }}>
          <p className="text-slate-500 font-medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-black font-bold underline underline-offset-4 decoration-slate-200 hover:decoration-black transition-all"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// --- Helper Components ---
const InputGroup = ({ icon, type, placeholder }) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-black transition-colors">
      {icon}
    </div>
    <input 
      type={type} 
      placeholder={placeholder}
      className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all text-slate-900 font-medium"
    />
  </div>
);

const SocialBtn = ({ icon, label }) => (
  <button className="flex-1 flex items-center justify-center gap-2 py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors font-bold text-sm text-slate-600">
    {icon} {label}
  </button>
);

export default Auth;