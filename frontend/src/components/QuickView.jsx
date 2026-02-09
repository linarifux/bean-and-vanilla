import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Eye } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addToCart } from '../slices/cartSlice';

const QuickView = ({ product, isOpen, onClose }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  if (!product) return null;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty }));
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl bg-white overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 hover:rotate-90 transition-transform duration-300"
            >
              <X size={24} />
            </button>

            {/* Product Image */}
            <div className="w-full md:w-1/2 bg-gray-50 h-64 md:h-auto">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-3">
                {product.category}
              </p>
              <h2 className="text-3xl font-serif mb-4 text-brand-dark">{product.name}</h2>
              <p className="text-xl font-light mb-6">${product.price}.00</p>
              
              <p className="text-sm text-gray-500 font-light leading-relaxed mb-8">
                Handcrafted for the modern explorer. This piece features our signature {product.material} and is designed to age beautifully over time.
              </p>

              <div className="flex items-center gap-6 mb-8">
                <span className="text-[10px] uppercase tracking-widest font-bold">Qty</span>
                <div className="flex items-center border border-gray-100">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-gray-50 transition-luxury"><Minus size={14} /></button>
                  <span className="px-6 py-2 text-sm">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-gray-50 transition-luxury"><Plus size={14} /></button>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full bg-brand-dark text-white py-4 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-brand-gold transition-luxury mb-4"
              >
                Add to Bag
              </button>

              <button 
                onClick={() => { onClose(); /* Navigate logic here */ }}
                className="w-full text-center text-[10px] uppercase tracking-widest text-gray-400 hover:text-brand-dark transition-colors"
              >
                View Full Details
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuickView;