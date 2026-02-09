import { motion } from 'framer-motion';
import { Plus, ShoppingBag } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const BundleSection = ({ currentProduct, matchingProduct }) => {
  const dispatch = useDispatch();

  if (!matchingProduct) return null;

  const bundlePrice = currentProduct.price + matchingProduct.price;
  const discountedPrice = Math.floor(bundlePrice * 0.9); // 10% Bundle Discount

  const handleAddBundle = () => {
    dispatch(addToCart({ ...currentProduct, qty: 1 }));
    dispatch(addToCart({ ...matchingProduct, qty: 1 }));
    alert('Bundle added to bag with a 10% discount!');
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
          <div className="flex items-center gap-6 flex-1 text-right md:text-left">
            <img src={matchingProduct.image} className="w-24 h-24 object-cover" alt={matchingProduct.name} />
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
              className="bg-brand-dark text-white px-8 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-brand-gold transition-all flex items-center justify-center gap-3 w-full"
            >
              <ShoppingBag size={14} /> Add Bundle to Bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};