import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Contact from './pages/contact';
import About from './pages/About';
import Auth from './pages/Auth';
// App.jsx
import UserProfile from './pages/Userprofile'; // ෆයිල් එක තියෙන තැන (Path එක) නිවැරදිද බලන්න


import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        
        {/* Fixed Navbar eka nisa content eka yata hangena eka nawaththanna 
          methanata 'pt-[Navbar_Height]' ekak denna ona. 
          Standard Navbar height ekakata 'pt-20' (80px) wage hodatama athi.
        */}
        <main className="w-full pt-20 md:pt-24 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;