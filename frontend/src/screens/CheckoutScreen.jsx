import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, CheckCircle, CreditCard, 
  Truck, ShieldCheck, ShoppingBag, ArrowRight
} from 'lucide-react';
import { clearCart } from '../slices/cartSlice'; // Assuming you have this action

const CheckoutScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  
  // --- STATE ---
  const [step, setStep] = useState(1); // 1: Info, 2: Shipping, 3: Payment, 4: Success
  const [loading, setLoading] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('standard');
  
  // Mock Totals
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = shippingMethod === 'express' ? 25 : itemsPrice > 150 ? 0 : 10;
  const taxPrice = itemsPrice * 0.08;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  // --- HANDLERS ---
  const handleNextStep = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      setStep(step + 1);
    }, 800);
  };

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(4); // Success State
      dispatch(clearCart());
    }, 2000);
  };

  // --- RENDER STEPS ---
  
  // STEP 1: CONTACT & SHIPPING ADDRESS
  const renderInformation = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="text-xl font-serif mb-6">Contact Information</h2>
      <div className="space-y-4 mb-8">
        <input type="email" placeholder="Email Address" className="w-full p-4 bg-transparent border border-gray-200 outline-none focus:border-brand-gold transition-colors rounded-sm" />
        <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
          <input type="checkbox" className="accent-brand-gold" /> Email me with news and offers
        </label>
      </div>

      <h2 className="text-xl font-serif mb-6">Shipping Address</h2>
      <div className="grid grid-cols-2 gap-4 space-y-4 space-y-reverse">
        <div className="col-span-2 md:col-span-1">
          <input type="text" placeholder="First Name" className="w-full p-4 bg-transparent border border-gray-200 outline-none focus:border-brand-gold transition-colors rounded-sm" />
        </div>
        <div className="col-span-2 md:col-span-1">
          <input type="text" placeholder="Last Name" className="w-full p-4 bg-transparent border border-gray-200 outline-none focus:border-brand-gold transition-colors rounded-sm" />
        </div>
        <div className="col-span-2">
          <input type="text" placeholder="Address" className="w-full p-4 bg-transparent border border-gray-200 outline-none focus:border-brand-gold transition-colors rounded-sm" />
        </div>
        <div className="col-span-2">
          <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full p-4 bg-transparent border border-gray-200 outline-none focus:border-brand-gold transition-colors rounded-sm" />
        </div>
        <div className="col-span-2 md:col-span-1">
          <input type="text" placeholder="City" className="w-full p-4 bg-transparent border border-gray-200 outline-none focus:border-brand-gold transition-colors rounded-sm" />
        </div>
        <div className="col-span-2 md:col-span-1">
          <input type="text" placeholder="Postal Code" className="w-full p-4 bg-transparent border border-gray-200 outline-none focus:border-brand-gold transition-colors rounded-sm" />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button onClick={handleNextStep} className="bg-brand-dark text-white px-8 py-4 uppercase text-xs tracking-widest font-bold hover:bg-brand-gold transition-colors flex items-center gap-2">
          {loading ? 'Processing...' : <>Continue to Shipping <ChevronRight size={14} /></>}
        </button>
      </div>
    </motion.div>
  );

  // STEP 2: SHIPPING METHOD
  const renderShipping = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <div className="border border-gray-200 rounded-sm p-4 mb-8 text-sm text-gray-600 divide-y divide-gray-100">
        <div className="flex justify-between py-2">
          <span className="text-gray-400">Contact</span>
          <span>user@example.com</span>
          <button onClick={() => setStep(1)} className="text-brand-gold text-xs font-bold underline">Change</button>
        </div>
        <div className="flex justify-between py-2 pt-4">
          <span className="text-gray-400">Ship to</span>
          <span>123 Artisan Row, London UK</span>
          <button onClick={() => setStep(1)} className="text-brand-gold text-xs font-bold underline">Change</button>
        </div>
      </div>

      <h2 className="text-xl font-serif mb-6">Shipping Method</h2>
      <div className="space-y-4">
        <div 
          onClick={() => setShippingMethod('standard')}
          className={`flex justify-between items-center p-4 border cursor-pointer transition-all ${shippingMethod === 'standard' ? 'border-brand-gold bg-brand-gold/5' : 'border-gray-200'}`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${shippingMethod === 'standard' ? 'border-brand-gold' : 'border-gray-300'}`}>
              {shippingMethod === 'standard' && <div className="w-2 h-2 bg-brand-gold rounded-full" />}
            </div>
            <div>
              <p className="text-sm font-bold text-brand-dark">Standard</p>
              <p className="text-xs text-gray-500">3-5 Business Days</p>
            </div>
          </div>
          <span className="text-sm font-bold">{itemsPrice > 150 ? 'Free' : '$10.00'}</span>
        </div>

        <div 
          onClick={() => setShippingMethod('express')}
          className={`flex justify-between items-center p-4 border cursor-pointer transition-all ${shippingMethod === 'express' ? 'border-brand-gold bg-brand-gold/5' : 'border-gray-200'}`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${shippingMethod === 'express' ? 'border-brand-gold' : 'border-gray-300'}`}>
              {shippingMethod === 'express' && <div className="w-2 h-2 bg-brand-gold rounded-full" />}
            </div>
            <div>
              <p className="text-sm font-bold text-brand-dark">Express</p>
              <p className="text-xs text-gray-500">1-2 Business Days</p>
            </div>
          </div>
          <span className="text-sm font-bold">$25.00</span>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <button onClick={() => setStep(1)} className="text-gray-500 hover:text-brand-dark text-xs uppercase tracking-widest flex items-center gap-2">
          <ChevronLeft size={14} /> Return to Info
        </button>
        <button onClick={handleNextStep} className="bg-brand-dark text-white px-8 py-4 uppercase text-xs tracking-widest font-bold hover:bg-brand-gold transition-colors flex items-center gap-2">
          {loading ? 'Processing...' : <>Continue to Payment <ChevronRight size={14} /></>}
        </button>
      </div>
    </motion.div>
  );

  // STEP 3: PAYMENT
  const renderPayment = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="text-xl font-serif mb-6">Payment</h2>
      <p className="text-xs text-gray-400 mb-4">All transactions are secure and encrypted.</p>
      
      <div className="border border-gray-200 rounded-sm overflow-hidden mb-8">
        <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border border-brand-gold flex items-center justify-center">
              <div className="w-2 h-2 bg-brand-gold rounded-full" />
            </div>
            <span className="text-sm font-bold text-brand-dark">Credit Card</span>
          </div>
          <div className="flex gap-2">
            <CreditCard size={16} className="text-gray-400" />
          </div>
        </div>
        
        <div className="p-6 space-y-4 bg-white">
          <input type="text" placeholder="Card Number" className="w-full p-3 border border-gray-200 rounded-sm outline-none focus:border-brand-gold" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Expiration (MM/YY)" className="w-full p-3 border border-gray-200 rounded-sm outline-none focus:border-brand-gold" />
            <input type="text" placeholder="Security Code" className="w-full p-3 border border-gray-200 rounded-sm outline-none focus:border-brand-gold" />
          </div>
          <input type="text" placeholder="Name on Card" className="w-full p-3 border border-gray-200 rounded-sm outline-none focus:border-brand-gold" />
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <button onClick={() => setStep(2)} className="text-gray-500 hover:text-brand-dark text-xs uppercase tracking-widest flex items-center gap-2">
          <ChevronLeft size={14} /> Return to Shipping
        </button>
        <button onClick={handlePlaceOrder} className="bg-brand-gold text-white px-8 py-4 uppercase text-xs tracking-widest font-bold hover:bg-brand-dark transition-colors shadow-lg w-full md:w-auto">
          {loading ? 'Securing Order...' : `Pay $${totalPrice.toFixed(2)}`}
        </button>
      </div>
    </motion.div>
  );

  // STEP 4: SUCCESS
  const renderSuccess = () => (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
      <div className="inline-flex p-6 rounded-full bg-green-50 text-green-600 mb-6">
        <CheckCircle size={48} />
      </div>
      <h2 className="text-4xl font-serif italic mb-4">Thank You</h2>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        Your order <span className="font-bold text-brand-dark">#BV-8921</span> has been confirmed. You will receive an email confirmation shortly.
      </p>
      <Link to="/shop">
        <button className="bg-brand-dark text-white px-10 py-4 uppercase text-xs tracking-widest font-bold hover:bg-brand-gold transition-colors">
          Continue Shopping
        </button>
      </Link>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-brand-dark">
      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        
        {/* LEFT: FORM AREA */}
        <div className="lg:col-span-7 pt-32 pb-12 px-6 lg:px-20 lg:border-r border-gray-100">
          
          {/* Header */}
          <Link to="/" className="inline-block mb-8">
            <h1 className="text-2xl font-serif tracking-[0.2em]">BEAN <span className="text-brand-gold italic">&</span> VANILLA</h1>
          </Link>

          {/* Breadcrumbs */}
          {step < 4 && (
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest mb-12 text-gray-400">
              <span className={step === 1 ? "text-brand-gold font-bold" : ""}>Info</span>
              <ChevronRight size={12} />
              <span className={step === 2 ? "text-brand-gold font-bold" : ""}>Shipping</span>
              <ChevronRight size={12} />
              <span className={step === 3 ? "text-brand-gold font-bold" : ""}>Payment</span>
            </div>
          )}

          {/* Dynamic Content */}
          <AnimatePresence mode="wait">
            {step === 1 && renderInformation()}
            {step === 2 && renderShipping()}
            {step === 3 && renderPayment()}
            {step === 4 && renderSuccess()}
          </AnimatePresence>

          {/* Footer Links */}
          <div className="mt-20 pt-6 border-t border-gray-100 flex gap-6 text-[10px] uppercase tracking-widest text-gray-400">
            <Link to="/returns" className="hover:text-brand-dark">Refund Policy</Link>
            <Link to="/shipping" className="hover:text-brand-dark">Shipping Policy</Link>
            <Link to="/privacy" className="hover:text-brand-dark">Privacy Policy</Link>
          </div>
        </div>

        {/* RIGHT: ORDER SUMMARY (Sticky) */}
        <div className="lg:col-span-5 bg-[#FAFAFA] pt-12 lg:pt-32 pb-12 px-6 lg:px-12 border-l border-gray-100 lg:min-h-screen">
          <div className="sticky top-32">
            <h3 className="text-lg font-serif mb-8 hidden lg:block">Order Summary</h3>
            
            {/* Cart Items */}
            <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map((item) => (
                <div key={item._id} className="flex gap-4 items-center">
                  <div className="relative w-16 h-16 bg-white border border-gray-200 rounded-md overflow-hidden">
                    <img src={item.images ? item.images[0] : item.image} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute -top-1 -right-1 bg-gray-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-brand-dark w-32 truncate">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                  <span className="text-sm font-medium">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
              {cartItems.length === 0 && step < 4 && (
                <p className="text-sm text-gray-400 italic">Your cart is empty.</p>
              )}
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-brand-dark">${itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingPrice === 0 ? 'Free' : `$${shippingPrice.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Taxes</span>
                <span>${taxPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-6 pt-6 flex justify-between items-end">
              <span className="text-lg font-serif">Total</span>
              <div className="text-right">
                <span className="text-xs text-gray-400 uppercase tracking-widest block mb-1">USD</span>
                <span className="text-3xl font-light text-brand-dark">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Trust Features */}
            <div className="mt-12 flex gap-4 items-center justify-center text-gray-400">
              <ShieldCheck size={16} />
              <span className="text-[10px] uppercase tracking-widest">Secure SSL Encryption</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutScreen;