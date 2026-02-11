import React from 'react';
import { Plus, ShoppingBag, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { addToCart } from '../slices/cartSlice';

const BundleSection = ({ currentProduct, matchingProduct }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!matchingProduct) return null;

  // Bundle Logic
  const bundlePrice = currentProduct.price + matchingProduct.price;
  const discountedPrice = Math.floor(bundlePrice * 0.9); // 10% Bundle Discount

  const handleAddBundle = () => {
    // Add both items to Redux
    dispatch(addToCart({ ...currentProduct, qty: 1 }));
    dispatch(addToCart({ ...matchingProduct, qty: 1 }));

    // Trigger Luxury Toast
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-sm w-full bg-white shadow-2xl pointer-events-auto flex flex-col border border-gray-100 rounded-sm font-sans`}
      >
        <div className="p-4 flex items-start gap-4">
          {/* Stacked Images for Visual Impact */}
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-14 w-14 object-cover rounded-sm border border-gray-100 z-10"
              src={currentProduct.images ? currentProduct.images[0] : currentProduct.image}
              alt={currentProduct.name}
            />
            <div className="-ml-6 mt-2 h-14 w-14 bg-gray-100 rounded-sm border border-white shadow-md overflow-hidden relative z-20">
               <img 
                 src={matchingProduct.images ? matchingProduct.images[0] : matchingProduct.image} 
                 className="w-full h-full object-cover"
                 alt={matchingProduct.name} 
               />
            </div>
          </div>

          <div className="flex-1 pt-1 pl-2">
            <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-1">
              Bundle Unlocked
            </p>
            <p className="text-sm font-serif font-medium text-brand-dark leading-tight">
              Perfect Match Set
            </p>
            <p className="mt-1 text-xs text-gray-500">
              2 Items added • <span className="text-green-600 font-bold">10% Discount Applied</span>
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-gray-400 hover:text-brand-dark transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex border-t border-gray-100">
          <button
            onClick={() => {
              toast.dismiss(t.id);
            }}
            className="w-full border-r border-gray-100 p-4 flex items-center justify-center text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:text-brand-dark hover:bg-gray-50 transition-colors"
          >
            Continue
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              navigate('/checkout');
            }}
            className="w-full p-4 flex items-center justify-center text-[10px] uppercase tracking-widest font-bold text-brand-gold hover:text-white hover:bg-brand-dark transition-all"
          >
            Checkout
          </button>
        </div>
      </div>
    ), { 
      position: "top-right", 
      duration: 5000 
    });
  };

  return (
    <section className="py-20 border-t border-gray-100 bg-[#FCFCFC]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold mb-2">Complete the Set</h3>
          <p className="text-2xl font-serif text-brand-dark italic">Harmonize Your Style</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white p-8 shadow-sm border border-gray-50">
          {/* Item 1 */}
          <div className="flex items-center gap-6 flex-1">
            <img src={currentProduct.images[0]} className="w-24 h-24 object-cover" alt={currentProduct.name} />
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400">This Item</p>
              <h4 className="text-sm font-serif">{currentProduct.name}</h4>
            </div>
          </div>

          <Plus className="text-gray-300" size={24} />

          {/* Item 2 */}
          <div className="flex items-center gap-6 flex-1 text-right md:text-left flex-row-reverse md:flex-row">
            <img 
              src={matchingProduct.images ? matchingProduct.images[0] : matchingProduct.image} 
              className="w-24 h-24 object-cover" 
              alt={matchingProduct.name} 
            />
            <div>
              <p className="text-[10px] uppercase font-bold text-brand-gold">Recommended Match</p>
              <h4 className="text-sm font-serif">{matchingProduct.name}</h4>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-10 text-center md:text-right">
            <div className="mb-4">
              <span className="text-gray-400 line-through text-sm mr-2">${bundlePrice}.00</span>
              <span className="text-xl font-serif text-brand-dark">${discountedPrice}.00</span>
            </div>
            <button 
              onClick={handleAddBundle}
              className="bg-brand-dark text-white px-8 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-brand-gold transition-all flex items-center justify-center gap-3 w-full shadow-lg"
            >
              <ShoppingBag size={14} /> Add Bundle to Bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BundleSection;