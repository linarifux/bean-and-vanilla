import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Minus, ShieldCheck, Truck, RotateCcw, 
  Heart, Share2, Compass, ArrowRight, Star
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import BundleSection from '../components/BundleSection'; // Import the new Bundle logic

const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const product = {
    _id: id,
    name: 'The Heritage Sandalwood Chrono',
    price: 345,
    category: 'Signature Timepieces',
    material: 'Indonesian Sandalwood',
    stock: 12,
    rating: 4.9,
    reviews: 124,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1434056886845-dac89faf9b17?auto=format&fit=crop&q=80&w=1000'
    ],
    details: {
      movement: 'Swiss Ronda 5030.D Quartz',
      glass: 'Sapphire Crystal (Scratch Resistant)',
      water: '5ATM (Rain & Splash Proof)',
      size: '42mm Diameter / 11mm Thickness',
      strap: 'Interchangeable Genuine Leather'
    }
  };

  // Mocked matching product for the bundle feature
  const suggestedJewelry = {
    _id: 'bundle-1',
    name: 'Sandalwood Inlay Ring',
    price: 120,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400'
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty }));
  };

  return (
    <div className="bg-white overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="relative lg:sticky lg:top-0 h-[70vh] lg:h-screen bg-[#FDFDFD] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img 
              key={activeImg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              src={product.images[activeImg]} 
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          
          <div className="absolute bottom-10 left-10 flex gap-4 z-10">
            {product.images.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImg(i)}
                className={`w-16 h-20 overflow-hidden border transition-all duration-500 bg-white ${
                  activeImg === i ? 'border-brand-gold ring-1 ring-brand-gold' : 'border-gray-200 opacity-60'
                }`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="p-8 md:p-20 flex flex-col justify-center border-l border-gray-50">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold mb-4 block">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-brand-dark mb-4 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-8">
               <div className="flex text-brand-gold"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/></div>
               <span className="text-xs tracking-widest text-gray-400">({product.reviews} Verified Reviews)</span>
            </div>
            <p className="text-3xl font-light mb-10 text-gray-800">${product.price}.00</p>
            <p className="text-gray-500 leading-relaxed font-light text-lg mb-12">
              A masterclass in organic engineering. We’ve paired the architectural strength of 316L surgical steel with the unmatched warmth of reclaimed {product.material}.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center border border-gray-200 h-14">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2 hover:bg-gray-50"><Minus size={14}/></button>
                  <span className="w-12 text-center font-medium">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="px-4 py-2 hover:bg-gray-50"><Plus size={14}/></button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-brand-dark text-white h-14 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-brand-gold transition-all duration-500"
                >
                  Add to Bag
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 mt-12 border-t border-gray-100">
              <div className="flex items-center gap-3 text-[9px] uppercase tracking-widest text-gray-400 font-bold"><Truck size={16} className="text-brand-gold"/> Express Delivery</div>
              <div className="flex items-center gap-3 text-[9px] uppercase tracking-widest text-gray-400 font-bold"><ShieldCheck size={16} className="text-brand-gold"/> 2-Year Warranty</div>
              <div className="flex items-center gap-3 text-[9px] uppercase tracking-widest text-gray-400 font-bold"><RotateCcw size={16} className="text-brand-gold"/> 30-Day Returns</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. BUNDLE SECTION - New Upsell Feature */}
      <BundleSection currentProduct={product} matchingProduct={suggestedJewelry} />

      {/* 3. SPECIFICATIONS SECTION - Using your uploaded image */}
      <section className="py-24 bg-brand-dark text-white px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-brand-gold mb-8">Engineering</h2>
            <h3 className="text-4xl md:text-5xl font-serif mb-12">The Blueprint of Precision</h3>
            <div className="space-y-6">
              {Object.entries(product.details).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b border-white/10 pb-4 group hover:border-brand-gold transition-colors">
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{key}</span>
                  <span className="text-sm font-light tracking-wide">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="relative aspect-square flex items-center justify-center p-8">
            {/* UPDATED: Path to your uploaded spec image */}
            <img src="/image_765764.png" className="w-full h-full object-contain mix-blend-lighten opacity-90" alt="Technical Specs" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-brand-gold/10 rounded-full scale-125 pointer-events-none" 
            />
          </div>
        </div>
      </section>

      {/* 4. MATERIAL STORY */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
          <div className="md:w-1/2 relative">
             <img src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1000" className="w-full aspect-[4/5] object-cover shadow-2xl" alt="Process" />
             <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-gold p-6 hidden lg:flex items-center justify-center shadow-xl">
                <p className="text-white font-serif text-xl italic text-center">Certified Sustainable Sourcing</p>
             </div>
          </div>
          <div className="md:w-1/2">
             <Compass className="text-brand-gold mb-6" size={40} />
             <h2 className="text-4xl md:text-5xl font-serif mb-8 text-brand-dark italic">Ethically Sourced.<br/>Hand Finished.</h2>
             <p className="text-gray-500 font-light text-lg leading-relaxed mb-10">
               Every dial is unique. Because we use natural wood off-cuts from the luxury furniture industry, the grain pattern on your watch will never be replicated. It is a one-of-one artifact of nature.
             </p>
             <button className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold group border-b border-brand-gold pb-2 hover:text-brand-gold transition-colors">
                The Sustainability Report <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
             </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductScreen;