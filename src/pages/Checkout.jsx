// src/pages/Checkout.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ChevronRight } from 'lucide-react';

const steps = ['Contact Info', 'Shipping', 'Payment'];

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { subtotal } = useCart();
  
  const shippingFee = 5.00;
  const total = subtotal + shippingFee;

  const goToNextStep = () => setCurrentStep(s => Math.min(s + 1, steps.length - 1));
  const goToPrevStep = () => setCurrentStep(s => Math.max(s - 1, 0));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 min-h-screen"
    >
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form Section */}
          <div className="lg:order-1">
            <nav className="flex items-center text-sm text-gray-500 mb-8">
              {steps.map((step, index) => (
                <React.Fragment key={step}>
                  <span className={index <= currentStep ? 'text-indigo-600 font-semibold' : ''}>{step}</span>
                  {index < steps.length - 1 && <ChevronRight size={16} className="mx-2" />}
                </React.Fragment>
              ))}
            </nav>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 0 && <ContactForm />}
                {currentStep === 1 && <ShippingForm />}
                {currentStep === 2 && <PaymentForm />}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              {currentStep > 0 && (
                <button onClick={goToPrevStep} className="text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition">
                  Back
                </button>
              )}
              <button
                onClick={currentStep === steps.length - 1 ? () => alert('Order Placed!') : goToNextStep}
                className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-indigo-700 transition"
              >
                {currentStep === steps.length - 1 ? 'Place Order' : 'Continue'}
              </button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:order-2 bg-white p-8 rounded-lg shadow-sm">
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
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Form Components ---

const FormSection = ({ title, children }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
    <div className="space-y-4">{children}</div>
  </div>
);

const FormInput = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
      {...props}
    />
  </div>
);

const ContactForm = () => (
  <FormSection title="Contact Information">
    <FormInput label="Email Address" type="email" placeholder="you@example.com" />
  </FormSection>
);

const ShippingForm = () => (
  <FormSection title="Shipping Address">
    <FormInput label="Full Name" placeholder="John Doe" />
    <FormInput label="Address" placeholder="123 Main St" />
    <div className="grid grid-cols-3 gap-4">
        <FormInput label="City" placeholder="New York" className="col-span-1"/>
        <FormInput label="State" placeholder="NY" className="col-span-1"/>
        <FormInput label="ZIP Code" placeholder="10001" className="col-span-1"/>
    </div>
  </FormSection>
);

const PaymentForm = () => (
  <FormSection title="Payment Details">
    <FormInput label="Card Number" placeholder="**** **** **** ****" />
    <div className="grid grid-cols-2 gap-4">
      <FormInput label="Expiration Date" placeholder="MM / YY" />
      <FormInput label="CVC" placeholder="123" />
    </div>
  </FormSection>
);

export default Checkout;
