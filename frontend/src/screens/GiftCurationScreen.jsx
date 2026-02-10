import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Sparkles, RotateCcw, ArrowRight, 
  Gem, Watch, Tag, Filter
} from 'lucide-react';
import ProductCard from '../components/ProductCard';

const GiftCurationScreen = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // 1. Capture the Concierge Intent
  const recipient = searchParams.get('recipient') || 'someone';
  const occasion = searchParams.get('occasion') || 'special';
  const style = searchParams.get('style') || 'classic';
  const budget = searchParams.get('budget') || 'mid';

  // 2. Simulate "AI Curation" Loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // 3. Robust Mock Data (Tagged for logic)
  const products = [
    { _id: '1', name: 'Original Sandalwood Chrono', price: 345, category: 'Watches', tags: ['classic', 'statement'], gender: ['him', 'them'], image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800' },
    { _id: '2', name: 'Golden Hour Bracelet', price: 95, category: 'Jewelry', tags: ['minimalist', 'classic'], gender: ['her', 'them'], image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800' },
    { _id: '3', name: 'Minimalist Koa Ring', price: 120, category: 'Rings', tags: ['minimalist', 'modern'], gender: ['him', 'her', 'them'], image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800' },
    { _id: '4', name: 'Heritage Ebony Series', price: 210, category: 'Watches', tags: ['classic', 'minimalist'], gender: ['him'], image: 'https://images.unsplash.com/photo-1508685096489-7a316bd4741e?q=80&w=800' },
    { _id: '5', name: 'Midnight Maple Diver', price: 280, category: 'Watches', tags: ['statement', 'bold'], gender: ['him', 'them'], image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=800' },
    { _id: '6', name: 'Sapphire Drop Earrings', price: 145, category: 'Earrings', tags: ['statement', 'classic'], gender: ['her'], image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800' },
  ];

  // 4. Budget Logic
  const getPriceRange = (code) => {
    switch(code) {
      case 'low': return { min: 0, max: 150 };
      case 'mid': return { min: 150, max: 300 };
      case 'high': return { min: 300, max: 10000 };
      default: return { min: 0, max: 10000 };
    }
  };

  // 5. Intelligent Filtering Engine
  const curatedProducts = useMemo(() => {
    const { min, max } = getPriceRange(budget);
    
    return products.filter(p => {
      // Budget Check
      const matchesBudget = p.price >= min && p.price <= max;
      
      // Style Check (Loose matching for better results)
      const matchesStyle = p.tags.includes(style) || style === 'classic'; 
      
      // Recipient/Gender Check (If "myself" or "them", show all unisex/relevant)
      const matchesGender = recipient === 'myself' || recipient === 'them' 
        ? true 
        : p.gender.includes(recipient);

      return matchesBudget && matchesStyle && matchesGender;
    });
  }, [recipient, style, budget]);

  // --- Render Helpers ---
  const getHeroTitle = () => {
    if (recipient === 'myself') return `Your ${style} Edit`;
    const nameMap = { him: 'Him', her: 'Her', them: 'Them' };
    return `The ${style} Edit for ${nameMap[recipient] || 'Them'}`;
  };

  return (
    <div className="min-h-screen bg-white font-sans text-brand-dark">
      
      {/* --- HERO HEADER --- */}
      <div className="bg-[#050505] text-white pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gold/10 blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={() => navigate('/gift-guide')}
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 hover:text-brand-gold transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Refine Criteria
          </button>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-brand-gold/30 rounded-full text-brand-gold mb-8 bg-brand-gold/5 backdrop-blur-sm">
              <Sparkles size={14} />
              <span className="text-[10px] uppercase tracking-widest font-bold">Curated exclusively for you</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif italic mb-6 capitalize leading-tight">
              {getHeroTitle()}
            </h1>
            
            <p className="text-gray-400 font-light text-lg max-w-2xl leading-relaxed">
              We have selected pieces that embody a <span className="text-white font-medium capitalize">{style}</span> aesthetic, perfect for celebrating a <span className="text-white font-medium capitalize">{occasion}</span>.
            </p>
          </motion.div>
        </div>
      </div>

      {/* --- CURATION GRID --- */}
      <div className="max-w-7xl mx-auto px-6 py-20 -mt-10 relative z-20">
        
        {/* Loading Skeleton or Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white p-4 h-[400px] flex items-center justify-center animate-pulse border border-gray-100">
                <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
              </div>
            ))}
          </div>
        ) : curatedProducts.length > 0 ? (
          <>
            {/* Context Bar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                {curatedProducts.length} Matches Found
              </span>
              <div className="flex gap-2">
                <span className="text-[10px] uppercase tracking-widest px-3 py-1 bg-gray-100 text-brand-dark rounded-sm">{style}</span>
                <span className="text-[10px] uppercase tracking-widest px-3 py-1 bg-gray-100 text-brand-dark rounded-sm">{budget === 'high' ? 'Premium' : budget === 'low' ? 'Essentials' : 'Signature'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {curatedProducts.map((product, index) => (
                <motion.div 
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                  
                  {/* Concierge Note */}
                  <div className="mt-4 p-4 bg-gray-50 border border-gray-100 rounded-sm">
                    <p className="text-[10px] text-gray-500 italic flex gap-2">
                      <Sparkles size={12} className="text-brand-gold flex-shrink-0 mt-0.5" />
                      Selected for its {style} appeal and {product.category === 'Watches' ? 'timeless utility' : 'elegant finish'}.
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          /* --- EMPTY STATE (Fallback) --- */
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-24 border border-dashed border-gray-200 bg-gray-50/50 rounded-lg"
          >
            <div className="inline-flex p-6 bg-white rounded-full shadow-sm mb-6 text-gray-300">
              <Filter size={32} />
            </div>
            <h3 className="font-serif text-3xl italic text-brand-dark mb-4">A Rare Request</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Our current collection is exclusive, and we couldn't find an exact match for this specific combination of style and budget.
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => navigate('/gift-guide')} 
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:text-brand-dark transition-colors"
              >
                <RotateCcw size={14} /> Adjust Criteria
              </button>
              <button 
                onClick={() => navigate('/shop')} 
                className="bg-brand-dark text-white px-8 py-3 uppercase text-[10px] tracking-widest font-bold hover:bg-brand-gold transition-colors"
              >
                Browse All Pieces
              </button>
            </div>
          </motion.div>
        )}

        {/* --- FOOTER ACTIONS --- */}
        {!isLoading && curatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-gray-100 flex flex-col items-center gap-6">
            <p className="text-serif italic text-gray-400 text-lg">Not quite right?</p>
            <div className="flex gap-6">
              <button 
                onClick={() => navigate('/gift-guide')}
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-brand-dark hover:text-brand-gold transition-colors"
              >
                <RotateCcw size={14} /> Restart
              </button>
              <span className="text-gray-300">|</span>
              <button 
                onClick={() => navigate('/shop')}
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-brand-dark hover:text-brand-gold transition-colors"
              >
                View Full Collection <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftCurationScreen;