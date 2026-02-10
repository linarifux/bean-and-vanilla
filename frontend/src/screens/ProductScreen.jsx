import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Minus, ShieldCheck, Truck, RotateCcw, 
  Star, ChevronDown, ArrowRight, Share2, ThumbsUp, CheckCircle, SlidersHorizontal
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import BundleSection from '../components/BundleSection';

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [sortOption, setSortOption] = useState('newest');

  // --- 1. MOCK DATABASE ---
  const productsDB = [
    {
      _id: '1',
      name: 'Original Sandalwood Chrono',
      price: 345,
      category: 'Timepieces',
      material: 'Indonesian Sandalwood',
      rating: 4.9,
      reviews: 124,
      images: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000',
        'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1000',
        'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1000'
      ],
      details: {
        movement: 'Swiss Ronda 5030.D',
        glass: 'Sapphire Crystal',
        water: '5ATM (Splash Proof)',
        size: '42mm Diameter',
        strap: 'Genuine Leather'
      },
      description: "A masterclass in organic engineering. We’ve paired the architectural strength of 316L surgical steel with the unmatched warmth of reclaimed sandalwood."
    },
    // ... (Keep other products same as before or fetch from API)
    {
      _id: '2',
      name: 'Golden Hour Bracelet',
      price: 95,
      category: 'Jewelry',
      material: '14k Recycled Gold',
      rating: 4.8,
      reviews: 89,
      images: [
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000',
        'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000'
      ],
      details: {
        finish: 'Polished 14k Gold',
        weight: '12g',
        size: 'Adjustable Clasp',
        origin: 'Ethically Sourced in Peru'
      },
      description: "Capture the warmth of the setting sun. This delicate chain is crafted from 100% recycled 14k gold, ensuring luxury without the environmental cost."
    },
    {
      _id: '4',
      name: 'Heritage Wood Watch',
      price: 210,
      category: 'Watches',
      material: 'Ebony Wood',
      rating: 4.7,
      reviews: 56,
      images: [
        'https://images.unsplash.com/photo-1434056886845-dac89faf9b17?q=80&w=1000'
      ],
      details: {
        movement: 'Japanese Quartz',
        glass: 'Mineral Crystal',
        water: '3ATM',
        size: '40mm',
        strap: 'Ebony Link'
      },
      description: "Dark, mysterious, and elegant. The Heritage series uses sustainably sourced Ebony wood, known for its deep black tones and incredible density."
    }
  ];

  // --- MOCK REVIEWS DATA ---
  const reviewsList = [
    { id: 1, user: "James D.", rating: 5, date: "October 12, 2023", title: "Exquisite Craftsmanship", content: "The wood grain is even more stunning in person. It feels incredibly light on the wrist but looks substantial. The packaging was also a nice touch.", verified: true, helpful: 12 },
    { id: 2, user: "Sarah L.", rating: 5, date: "September 28, 2023", title: "Perfect Anniversary Gift", content: "Bought this for my husband's 5th anniversary (wood). He hasn't taken it off since. The engraving option was perfect.", verified: true, helpful: 8 },
    { id: 3, user: "Michael B.", rating: 4, date: "September 15, 2023", title: "Great watch, strap is stiff", content: "Love the watch face and the movement. The leather strap takes a few days to break in, but after that, it's very comfortable.", verified: true, helpful: 3 },
  ];

  const product = productsDB.find(p => p._id === id) || productsDB[0];
  const suggestedProduct = productsDB.find(p => p._id !== product._id) || productsDB[1];

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty }));
  };

  useEffect(() => {
    setActiveImg(0);
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="bg-white overflow-x-hidden font-sans text-brand-dark">
      
      {/* 1. PRODUCT HERO */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="relative lg:sticky lg:top-0 h-[60vh] lg:h-screen bg-[#FDFDFD] overflow-hidden group">
          <AnimatePresence mode="wait">
            <motion.img 
              key={product.images[activeImg]}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              src={product.images[activeImg]} 
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute bottom-8 left-8 flex gap-3 z-10">
            {product.images.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImg(i)}
                className={`w-16 h-20 border transition-all duration-300 ${
                  activeImg === i ? 'border-brand-gold ring-1 ring-brand-gold opacity-100' : 'border-white/50 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="p-8 lg:p-24 flex flex-col justify-center border-l border-gray-50 bg-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold">
                {product.category}
              </span>
              <button className="text-gray-300 hover:text-brand-dark transition-colors">
                <Share2 size={18} />
              </button>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif italic mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-6 mb-10 border-b border-gray-100 pb-8">
              <p className="text-3xl font-light">${product.price}.00</p>
              <div className="h-4 w-[1px] bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <div className="flex text-brand-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} strokeWidth={i < Math.floor(product.rating) ? 0 : 1} />
                  ))}
                </div>
                <span className="text-[10px] tracking-widest text-gray-400 font-bold">{product.rating} ({product.reviews} REVIEWS)</span>
              </div>
            </div>

            <div className="mb-12">
              <p className="text-gray-500 leading-relaxed font-light text-lg mb-8">
                {product.description}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-3 py-1 bg-gray-50 text-[10px] uppercase tracking-wider text-gray-500">{product.material}</span>
                {product.category === 'Watches' && <span className="px-3 py-1 bg-gray-50 text-[10px] uppercase tracking-wider text-gray-500">Swiss Movement</span>}
                <span className="px-3 py-1 bg-gray-50 text-[10px] uppercase tracking-wider text-gray-500">Hand Finished</span>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="flex items-center border border-gray-200 h-14 w-32 justify-between px-4">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="hover:text-brand-gold transition-colors"><Minus size={14}/></button>
                  <span className="font-medium text-lg">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="hover:text-brand-gold transition-colors"><Plus size={14}/></button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-brand-dark text-white h-14 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-brand-gold transition-all duration-500 shadow-xl"
                >
                  Add to Bag
                </button>
              </div>
              <p className="text-center text-[10px] uppercase tracking-widest text-gray-400">
                Free shipping on all orders over $150
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-12 mt-12 border-t border-gray-100">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck size={20} className="text-brand-gold"/> 
                <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Express<br/>Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck size={20} className="text-brand-gold"/> 
                <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Lifetime<br/>Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw size={20} className="text-brand-gold"/> 
                <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">30-Day<br/>Returns</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. BUNDLE UPSALL SECTION */}
      <BundleSection currentProduct={product} matchingProduct={suggestedProduct} />

      {/* 3. TECHNICAL SPECIFICATIONS */}
      <section className="py-24 bg-brand-dark text-white px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-brand-gold mb-8">Specifications</h2>
            <h3 className="text-4xl md:text-5xl font-serif mb-12 italic">Precision in Detail</h3>
            <div className="space-y-0 divide-y divide-white/10">
              {Object.entries(product.details).map(([key, value]) => (
                <div key={key} className="flex justify-between py-6 group hover:bg-white/5 px-4 transition-colors -mx-4 rounded-lg">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">{key}</span>
                  <span className="text-sm font-light tracking-wide text-white">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="relative aspect-square flex items-center justify-center p-12 bg-white/5 rounded-full">
            <img src="/image_765764.png" className="w-full h-full object-contain mix-blend-lighten opacity-80" alt="Technical Specs" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-brand-gold/20 rounded-full scale-110 pointer-events-none border-dashed" 
            />
          </div>
        </div>
      </section>

      {/* 4. CUSTOMER REVIEWS SECTION */}
      <section className="py-24 px-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          
          {/* Reviews Header & Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left: Summary Stats */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold mb-6 block">Community</span>
              <h3 className="text-4xl font-serif text-brand-dark mb-8">Reviews & Reflections</h3>
              
              <div className="flex items-end gap-4 mb-8">
                <span className="text-6xl font-light text-brand-dark">{product.rating}</span>
                <div className="mb-2">
                  <div className="flex text-brand-gold mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">{product.reviews} Genuine Reviews</p>
                </div>
              </div>

              {/* Breakdown Bars */}
              <div className="space-y-3 mb-10">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="w-3">{star}</span>
                    <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-dark" 
                        style={{ width: star === 5 ? '80%' : star === 4 ? '15%' : '5%' }} 
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full border border-brand-dark py-4 uppercase text-[10px] tracking-[0.2em] font-bold hover:bg-brand-dark hover:text-white transition-all duration-300">
                Write a Review
              </button>
            </div>

            {/* Right: Reviews List */}
            <div className="lg:col-span-8">
              {/* Filter Controls */}
              <div className="flex justify-between items-center border-b border-gray-100 pb-6 mb-10">
                <span className="text-sm font-bold text-brand-dark">{reviewsList.length} Reviews</span>
                <div className="relative group">
                  <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:text-brand-dark transition-colors">
                    <SlidersHorizontal size={14} /> Sort: {sortOption} <ChevronDown size={12} />
                  </button>
                  {/* Dropdown would go here */}
                </div>
              </div>

              {/* Review Cards */}
              <div className="space-y-12">
                {reviewsList.map((review, index) => (
                  <motion.div 
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-100 pb-12 last:border-0"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex text-brand-gold mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} strokeWidth={i < review.rating ? 0 : 1} />
                          ))}
                        </div>
                        <h4 className="text-lg font-serif text-brand-dark mb-1">{review.title}</h4>
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-gray-400">{review.date}</span>
                    </div>

                    <p className="text-gray-600 font-light leading-relaxed mb-6">
                      "{review.content}"
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-brand-dark">{review.user}</span>
                        {review.verified && (
                          <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-green-600">
                            <CheckCircle size={12} /> Verified Buyer
                          </div>
                        )}
                      </div>
                      
                      <button className="flex items-center gap-2 text-xs text-gray-400 hover:text-brand-gold transition-colors">
                        <ThumbsUp size={14} /> Helpful ({review.helpful})
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <button className="text-[10px] uppercase tracking-widest border-b border-brand-dark pb-1 hover:text-brand-gold hover:border-brand-gold transition-all">
                  Load More Reviews
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. RECOMMENDATIONS */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h3 className="text-3xl font-serif text-brand-dark italic">Curated For You</h3>
            <button 
              onClick={() => navigate('/shop')}
              className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold border-b border-transparent hover:border-brand-dark transition-all"
            >
              View Collection <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {productsDB.filter(p => p._id !== product._id).slice(0, 3).map((item) => (
              <div key={item._id} onClick={() => navigate(`/product/${item._id}`)} className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-white">
                  <img src={item.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={item.name} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </div>
                <h4 className="text-lg font-serif italic text-brand-dark group-hover:text-brand-gold transition-colors">{item.name}</h4>
                <p className="text-sm text-gray-500 mt-2">${item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProductScreen;