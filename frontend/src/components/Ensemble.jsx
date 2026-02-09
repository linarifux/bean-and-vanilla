import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hotspot = ({ top, left, product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="absolute z-20" 
      style={{ top: `${top}%`, left: `${left}%` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* The Pulsing Core */}
      <div className="relative flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute w-8 h-8 bg-white rounded-full"
        />
        <button className="relative w-4 h-4 bg-white rounded-full shadow-xl flex items-center justify-center group-hover:scale-125 transition-transform cursor-pointer">
          <div className="w-1.5 h-1.5 bg-brand-dark rounded-full" />
        </button>
      </div>

      {/* The Floating Product Card */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-8 -left-20 w-48 bg-white shadow-2xl p-4 rounded-sm border border-gray-50 z-30"
          >
            <Link to={`/product/${product._id}`}>
              <div className="aspect-square mb-3 overflow-hidden">
                <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
              </div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-dark mb-1">{product.name}</h4>
              <div className="flex justify-between items-center">
                <span className="text-xs text-brand-gold">${product.price}.00</span>
                <ArrowRight size={12} className="text-gray-300" />
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Ensemble = () => {
  const lookProducts = [
    { _id: '1', name: 'Sandalwood Watch', price: 185, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200', top: 45, left: 42 },
    { _id: '3', name: 'Koa Wood Ring', price: 120, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=200', top: 65, left: 55 },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Left: Image with Hotspots */}
          <div className="lg:w-3/5 relative">
            <div className="relative overflow-hidden group rounded-sm shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200" 
                alt="Styled Ensemble"
                className="w-full h-auto object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-dark/5 group-hover:bg-transparent transition-colors duration-700" />
              
              {lookProducts.map((p) => (
                <Hotspot key={p._id} top={p.top} left={p.left} product={p} />
              ))}
            </div>
            
            {/* Visual Decorative Accent */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l border-b border-brand-gold/30 -z-10 hidden md:block" />
          </div>

          {/* Right: Text Content */}
          <div className="lg:w-2/5 space-y-8">
            <div className="space-y-4">
              <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.4em]">Curated Ensembles</span>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-dark leading-tight italic">
                The Gentleman's <br />Signature.
              </h2>
            </div>
            
            <p className="text-gray-500 font-light text-lg leading-relaxed">
              True elegance is found in the harmony of elements. Our curated looks bring together the warmth of organic wood and the precision of high-grade steel to create a statement that is uniquely yours.
            </p>

            <ul className="space-y-4 pt-4 border-t border-gray-100">
              {lookProducts.map((p) => (
                <li key={p._id} className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                  <span className="text-gray-400">{p.name}</span>
                  <span className="text-brand-dark">${p.price}.00</span>
                </li>
              ))}
            </ul>

            <button className="w-full bg-brand-dark text-white py-5 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-brand-gold transition-luxury shadow-xl">
              Shop the Full Look
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ensemble;