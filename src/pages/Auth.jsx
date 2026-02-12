import React, { useState, useContext } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Github, Chrome, Loader2 } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // AuthContext අනිවාර්යයි

const Auth = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Context එකෙන් login function එක ගත්තා
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // --- 3D TILT EFFECT ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // --- GOOGLE LOGIN LOGIC ---
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setMessage({ type: '', text: '' });
      try {
        // Google Token එක Backend එකට යැවීම
        const res = await fetch('http://localhost:5000/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: tokenResponse.access_token }),
        });

        const data = await res.json();
        if (res.ok) {
          localStorage.setItem('token', data.token);
          // data.user ඇතුළේ 'picture' එකත් තියෙන්න ඕනේ
          login(data.user); 
          setMessage({ type: 'success', text: 'Google Login Successful!' });

          setTimeout(() => navigate('/'), 1500);
        } else {
          setMessage({ type: 'error', text: data.msg || 'Google Login Failed' });
        }
      } catch (err) {
        setMessage({ type: 'error', text: 'Server Connection Failed' });
      } finally {
        setLoading(false);
      }
    },
    onError: () => setMessage({ type: 'error', text: 'Google Auth Failed' }),
  });

  // --- LOCAL LOGIN/SIGNUP LOGIC ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: isLogin ? 'Login Successful!' : 'Registration Successful!' });
        if (isLogin) {
          localStorage.setItem('token', data.token);
          login(data.user);
          setTimeout(() => navigate('/'), 1500);
        } else {
          setTimeout(() => setIsLogin(true), 2000);
        }
      } else {
        setMessage({ type: 'error', text: data.msg || 'Error occurred' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Server Connection Failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center p-6 pt-28 md:pt-32 overflow-hidden relative">
      
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-100 rounded-full blur-3xl opacity-60 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-100 rounded-full blur-3xl opacity-60 animate-pulse delay-700" />

      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
        className="relative w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/20 p-8 md:p-12 z-10"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login" : "signup"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-4xl font-serif font-medium text-slate-900 mb-2">
              {isLogin ? "Welcome Back." : "Create Account."}
            </h2>
            <p className="text-slate-500 mb-8 font-medium">
              {isLogin ? "Please enter your details to sign in." : "Join the Luxe Attire community today."}
            </p>

            {message.text && (
              <div className={`p-4 rounded-xl mb-6 text-sm font-bold ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <InputGroup icon={<User size={20} />} type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              )}
              <InputGroup icon={<Mail size={20} />} type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              <InputGroup icon={<Lock size={20} />} type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />

              <button disabled={loading} className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl disabled:bg-slate-400 mt-4">
                {loading ? <Loader2 className="animate-spin" /> : (isLogin ? "Sign In" : "Join Now")}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 space-y-4">
          <div className="relative flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Or Continue With</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>
          <SocialBtn onClick={() => googleLogin()} icon={<Chrome size={20} />} label="Google Account" />
        </div>

        <div className="mt-10 text-center">
          <p className="text-slate-500 font-medium text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-black font-bold underline underline-offset-4 hover:decoration-slate-400 transition-all">
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const InputGroup = ({ icon, type, placeholder, value, onChange }) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-black transition-colors">{icon}</div>
    <input required type={type} value={value} onChange={onChange} placeholder={placeholder} className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all text-slate-900 font-medium" />
  </div>
);

const SocialBtn = ({ icon, label, onClick }) => (
  <button type="button" onClick={onClick} className="w-full flex items-center justify-center gap-2 py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors font-bold text-xs text-slate-600 uppercase tracking-wider">
    {icon} {label}
  </button>
);

export default Auth;