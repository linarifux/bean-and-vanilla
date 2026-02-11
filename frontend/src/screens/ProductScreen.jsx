import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Minus, ShieldCheck, Truck, RotateCcw, 
  Star, ChevronDown, ArrowRight, Share2, ThumbsUp, CheckCircle, SlidersHorizontal, X, AlertCircle
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import BundleSection from '../components/BundleSection';
import { Toaster, toast } from 'react-hot-toast';

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [sortOption, setSortOption] = useState('newest');

  // --- ZOOM STATE ---
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // --- 1. EXPANDED MOCK DATABASE (Matches ShopAllScreen IDs) ---
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
      details: { movement: 'Swiss Ronda 5030.D', glass: 'Sapphire Crystal', water: '5ATM', size: '42mm', strap: 'Leather' },
      description: "A masterclass in organic engineering. We’ve paired the architectural strength of 316L surgical steel with the unmatched warmth of reclaimed sandalwood."
    },
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
      details: { finish: 'Polished 14k Gold', weight: '12g', size: 'Adjustable', origin: 'Peru' },
      description: "Capture the warmth of the setting sun. This delicate chain is crafted from 100% recycled 14k gold, ensuring luxury without the environmental cost."
    },
    {
      _id: '3',
      name: 'Minimalist Koa Ring',
      price: 120,
      category: 'Rings',
      material: 'Hawaiian Koa Wood',
      rating: 5.0,
      reviews: 42,
      images: [
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000',
        'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000'
      ],
      details: { inlay: 'Authentic Koa', band: 'Tungsten Carbide', width: '6mm', finish: 'Brushed' },
      description: "Strength meets nature. A core of Tungsten Carbide provides scratch-proof durability, while the Koa wood inlay brings a unique grain pattern to every piece."
    },
    {
      _id: '4',
      name: 'Heritage Ebony Watch',
      price: 210,
      category: 'Watches',
      material: 'Ebony Wood',
      rating: 4.7,
      reviews: 56,
      images: [
        'https://images.unsplash.com/photo-1434056886845-dac89faf9b17?q=80&w=1000'
      ],
      details: { movement: 'Japanese Quartz', glass: 'Mineral Crystal', water: '3ATM', size: '40mm', strap: 'Ebony Link' },
      description: "Dark, mysterious, and elegant. The Heritage series uses sustainably sourced Ebony wood, known for its deep black tones and incredible density."
    },
    {
      _id: '5',
      name: 'Midnight Maple Diver',
      price: 280,
      category: 'Watches',
      material: 'Maple Wood',
      rating: 4.6,
      reviews: 30,
      images: [
        'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1000'
      ],
      details: { movement: 'Automatic', glass: 'Sapphire', water: '10ATM', size: '44mm', strap: 'Silicone' },
      description: "Built for the depths. A rare combination of treated Maple wood and marine-grade steel, ensuring performance below the surface and style above it."
    },
    {
      _id: '6',
      name: 'Sapphire Drop Earrings',
      price: 145,
      category: 'Earrings',
      material: 'Gemstone',
      rating: 4.9,
      reviews: 15,
      images: [
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000'
      ],
      details: { stone: 'Blue Sapphire', metal: 'Sterling Silver', drop: '2cm', weight: '4g' },
      description: "Elegant drops of deep blue. These ethically sourced sapphires are suspended in recycled sterling silver, catching the light with every movement."
    },
    {
      _id: '7',
      name: 'Classic Leather Chrono',
      price: 195,
      category: 'Watches',
      material: 'Leather',
      rating: 4.5,
      reviews: 78,
      images: [
        'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000'
      ],
      details: { movement: 'Quartz', glass: 'Mineral', water: '3ATM', size: '41mm', strap: 'Full Grain Leather' },
      description: "A nod to mid-century aviation. Clean dials, bold numerals, and a strap that ages beautifully with every wear."
    },
    {
      _id: '8',
      name: 'Silver Cuff',
      price: 85,
      category: 'Jewelry',
      material: 'Silver',
      rating: 4.8,
      reviews: 22,
      images: [
        'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1000'
      ],
      details: { metal: '925 Sterling Silver', width: '10mm', finish: 'Hammered', size: 'Adjustable' },
      description: "Simple, structural, significant. Hand-hammered sterling silver creates a texture that feels both ancient and aggressively modern."
    }
  ];

  // --- MOCK REVIEWS DATA ---
  const reviewsList = [
    { id: 1, user: "James D.", rating: 5, date: "October 12, 2023", title: "Exquisite Craftsmanship", content: "The material quality is even more stunning in person. It feels incredibly light but looks substantial.", verified: true, helpful: 12 },
    { id: 2, user: "Sarah L.", rating: 5, date: "September 28, 2023", title: "Perfect Gift", content: "Bought this for an anniversary. The packaging was a nice touch and the item is beautiful.", verified: true, helpful: 8 },
    { id: 3, user: "Michael B.", rating: 4, date: "September 15, 2023", title: "Great design", content: "Love the design language. Shipping was fast, though I wish the box was a bit smaller.", verified: true, helpful: 3 },
  ];

  // --- 2. DYNAMIC LOADING LOGIC ---
  // STRICT FIND: We do NOT fallback to index 0 anymore.
  const product = productsDB.find(p => p._id === id);
  
  // Suggest a product that ISN'T the current one (fallback to ID 2 if current is ID 1, else ID 1)
  const suggestedProduct = productsDB.find(p => p._id !== id) || productsDB[0];

  // --- HANDLERS ---
  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({ ...product, qty }));
    
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-sm w-full bg-white shadow-2xl pointer-events-auto flex flex-col border border-gray-100 rounded-sm`}>
        <div className="p-4 flex items-start gap-4">
          <div className="flex-shrink-0">
            <img className="h-16 w-16 object-cover rounded-sm border border-gray-100" src={product.images[0]} alt={product.name} />
          </div>
          <div className="flex-1 pt-1">
            <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-1">Successfully Added</p>
            <p className="text-sm font-serif font-medium text-brand-dark leading-tight">{product.name}</p>
            <p className="mt-1 text-xs text-gray-500">Quantity: {qty}</p>
          </div>
          <button onClick={() => toast.dismiss(t.id)} className="text-gray-400 hover:text-brand-dark transition-colors"><X size={16} /></button>
        </div>
        <div className="flex border-t border-gray-100">
          <button onClick={() => { toast.dismiss(t.id); navigate('/shop'); }} className="w-full border-r border-gray-100 p-4 flex items-center justify-center text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:text-brand-dark hover:bg-gray-50 transition-colors">Continue Shopping</button>
          <button onClick={() => { toast.dismiss(t.id); navigate('/checkout'); }} className="w-full p-4 flex items-center justify-center text-[10px] uppercase tracking-widest font-bold text-brand-gold hover:text-white hover:bg-brand-dark transition-all">Checkout</button>
        </div>
      </div>
    ), { position: "top-right", duration: 5000 });
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  useEffect(() => {
    setActiveImg(0);
    setQty(1); // Reset qty on product change
    window.scrollTo(0, 0);
  }, [id]);

  // --- 3. NOT FOUND STATE ---
  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <AlertCircle size={48} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-serif text-brand-dark mb-2">Artifact Not Found</h2>
        <p className="text-gray-500 mb-8">The piece you are looking for does not exist or has been removed.</p>
        <button onClick={() => navigate('/shop')} className="bg-brand-dark text-white px-8 py-3 text-xs uppercase tracking-widest font-bold hover:bg-brand-gold transition-colors">
          Return to Collection
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white overflow-x-hidden font-sans text-brand-dark relative">
      <Toaster />

      {/* 1. PRODUCT HERO */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left: Sticky Image Gallery with ZOOM */}
        <div className="relative lg:sticky lg:top-0 h-[60vh] lg:h-screen bg-[#FDFDFD] overflow-hidden group">
          <div 
            className="w-full h-full relative overflow-hidden cursor-crosshair"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={product.images[activeImg]}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ 
                  opacity: 1, 
                  scale: isHovering ? 1.5 : 1, 
                  x: isHovering ? `${(50 - mousePos.x) / 2}%` : 0, 
                  y: isHovering ? `${(50 - mousePos.y) / 2}%` : 0  
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.4, ease: "easeOut" },
                  x: { duration: 0.1, ease: "linear" },
                  y: { duration: 0.1, ease: "linear" } 
                }}
                src={product.images[activeImg]} 
                className="w-full h-full object-cover origin-center"
                alt={product.name}
              />
            </AnimatePresence>
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-8 left-8 flex gap-3 z-10 pointer-events-none md:pointer-events-auto">
            {product.images.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImg(i)}
                className={`w-12 h-16 md:w-16 md:h-20 border transition-all duration-300 pointer-events-auto ${
                  activeImg === i ? 'border-brand-gold ring-1 ring-brand-gold opacity-100' : 'border-white/50 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${i}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Details & Actions */}
        <div className="p-8 lg:p-24 flex flex-col justify-center border-l border-gray-50 bg-white">
          <motion.div key={product._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
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
                <span className="px-3 py-1 bg-gray-50 text-[10px] uppercase tracking-wider text-gray-500">Hand Finished</span>
                {product.category === 'Watches' && <span className="px-3 py-1 bg-gray-50 text-[10px] uppercase tracking-wider text-gray-500">Precision Movement</span>}
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
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
              <div className="space-y-3 mb-10">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="w-3">{star}</span>
                    <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-dark" style={{ width: star === 5 ? '80%' : star === 4 ? '15%' : '5%' }} />
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full border border-brand-dark py-4 uppercase text-[10px] tracking-[0.2em] font-bold hover:bg-brand-dark hover:text-white transition-all duration-300">
                Write a Review
              </button>
            </div>
            <div className="lg:col-span-8">
              <div className="flex justify-between items-center border-b border-gray-100 pb-6 mb-10">
                <span className="text-sm font-bold text-brand-dark">{reviewsList.length} Reviews</span>
                <div className="relative group">
                  <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:text-brand-dark transition-colors">
                    <SlidersHorizontal size={14} /> Sort: {sortOption} <ChevronDown size={12} />
                  </button>
                </div>
              </div>
              <div className="space-y-12">
                {reviewsList.map((review, index) => (
                  <motion.div key={review.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="border-b border-gray-100 pb-12 last:border-0">
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
                    <p className="text-gray-600 font-light leading-relaxed mb-6">"{review.content}"</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-brand-dark">{review.user}</span>
                        {review.verified && <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-green-600"><CheckCircle size={12} /> Verified Buyer</div>}
                      </div>
                      <button className="flex items-center gap-2 text-xs text-gray-400 hover:text-brand-gold transition-colors"><ThumbsUp size={14} /> Helpful ({review.helpful})</button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-12 text-center">
                <button className="text-[10px] uppercase tracking-widest border-b border-brand-dark pb-1 hover:text-brand-gold hover:border-brand-gold transition-all">Load More Reviews</button>
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
            <button onClick={() => navigate('/shop')} className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold border-b border-transparent hover:border-brand-dark transition-all">
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