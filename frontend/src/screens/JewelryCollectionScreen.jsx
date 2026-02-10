import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, LayoutGrid, List, Sparkles, Search, X, 
  ChevronDown, ArrowRight, Diamond, Gem
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import QuickView from '../components/QuickView';
import MobileFilterDrawer from '../components/MobileFilterDrawer';

const JewelryCollectionScreen = () => {
  // --- State Management ---
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(true); // Default open on desktop for robust feel
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [visibleCount, setVisibleCount] = useState(6); // For "Load More" functionality

  // Quick View State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    type: [],
    material: [],
    stone: []
  });

  // --- Data & Constants ---
  const types = ['Rings', 'Bracelets', 'Necklaces', 'Earrings'];
  const materials = ['14k Gold', 'Sterling Silver', 'Koa Wood', 'Rose Gold'];
  const stones = ['Diamond', 'Amber', 'Sapphire', 'None'];

  // Mock Data Extended
  const products = [
    { _id: '2', name: 'Golden Hour Bracelet', price: 95, type: 'Bracelets', material: '14k Gold', stone: 'None', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800', date: '2023-12-01' },
    { _id: '3', name: 'Minimalist Koa Ring', price: 120, type: 'Rings', material: 'Koa Wood', stone: 'None', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800', date: '2023-11-15' },
    { _id: '7', name: 'Silver Birch Bangle', price: 85, type: 'Bracelets', material: 'Sterling Silver', stone: 'None', image: 'https://images.unsplash.com/photo-1535633302704-b02f4faad767?q=80&w=800', date: '2023-10-20' },
    { _id: '8', name: 'Earthy Amber Pendant', price: 110, type: 'Necklaces', material: 'Koa Wood', stone: 'Amber', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800', date: '2024-01-10' },
    { _id: '9', name: 'Celestial Sapphire Studs', price: 240, type: 'Earrings', material: '14k Gold', stone: 'Sapphire', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800', date: '2024-01-05' },
    { _id: '10', name: 'Rose Gold Promise', price: 180, type: 'Rings', material: 'Rose Gold', stone: 'Diamond', image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=800', date: '2023-09-01' },
  ];

  // --- Logic Handlers ---
  const toggleFilter = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value) 
        ? prev[category].filter(i => i !== value) 
        : [...prev[category], value]
    }));
  };

  const clearAllFilters = () => {
    setFilters({ type: [], material: [], stone: [] });
    setSearchQuery('');
  };

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  // --- Filtering & Sorting Engine ---
  const processedJewelry = useMemo(() => {
    let result = products.filter(p => {
      const typeMatch = filters.type.length === 0 || filters.type.includes(p.type);
      const materialMatch = filters.material.length === 0 || filters.material.includes(p.material);
      const stoneMatch = filters.stone.length === 0 || filters.stone.includes(p.stone);
      const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return typeMatch && materialMatch && stoneMatch && searchMatch;
    });

    // Sorting Logic
    if (sortBy === 'priceLow') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'priceHigh') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'newest') result.sort((a, b) => new Date(b.date) - new Date(a.date));

    return result;
  }, [filters, products, searchQuery, sortBy]);

  const activeFilterCount = filters.type.length + filters.material.length + filters.stone.length;

  return (
    <div className="min-h-screen bg-[#FCFCFC] font-sans text-brand-dark">
      <MobileFilterDrawer 
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        filters={filters}
        onToggleFilter={toggleFilter}
        categories={types} 
        materials={materials}
      />

      <QuickView 
        product={selectedProduct} 
        isOpen={isQuickViewOpen} 
        onClose={() => setIsQuickViewOpen(false)} 
      />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[60vh] bg-brand-dark overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-40">
           {/*  - Placeholder URL used */}
           <img src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2000" alt="Atelier Background" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-[10px] uppercase tracking-[0.6em] text-brand-gold font-bold mb-6 block">The Atelier Collection</span>
            <h1 className="text-5xl md:text-8xl font-serif text-white italic mb-8">Ethereal Adornments</h1>
            <p className="text-gray-300 font-light text-lg max-w-lg mx-auto leading-relaxed">
              Where organic textures meet precious metals. Discover pieces that harmonize the raw beauty of earth with the brilliance of design.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-8xl mx-auto px-6 py-20">
        
        {/* --- TOOLBAR --- */}
        <div className="sticky top-0 z-30 bg-[#FCFCFC]/95 backdrop-blur-md border-b border-gray-100 py-6 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Left: Filter Toggle & Search */}
            <div className="flex items-center gap-6 w-full md:w-auto">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:text-brand-gold transition-colors"
              >
                <Filter size={16} /> {isFilterOpen ? 'Hide Filters' : 'Filter Pieces'}
              </button>
              
              <div className="relative group hidden md:block">
                <Search size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-dark transition-colors" />
                <input 
                  type="text" 
                  placeholder="SEARCH COLLECTION" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-b border-gray-200 pl-6 pr-4 py-2 text-xs uppercase tracking-widest focus:border-brand-dark outline-none w-48 transition-all"
                />
              </div>
            </div>

            {/* Right: Sort & View */}
            <div className="flex items-center gap-8 w-full md:w-auto justify-end">
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-widest text-gray-400">Sort By:</span>
                <div className="relative">
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-transparent text-xs uppercase tracking-widest font-bold pr-6 cursor-pointer outline-none"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">New Arrivals</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                </div>
              </div>

              <div className="hidden lg:flex items-center gap-4 text-gray-300">
                <button onClick={() => setViewMode('grid')} className={`transition-colors ${viewMode === 'grid' ? 'text-brand-dark' : 'hover:text-brand-gold'}`}><LayoutGrid size={18}/></button>
                <button onClick={() => setViewMode('list')} className={`transition-colors ${viewMode === 'list' ? 'text-brand-dark' : 'hover:text-brand-gold'}`}><List size={18}/></button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          <AnimatePresence>
            {activeFilterCount > 0 && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: 'auto', opacity: 1 }} 
                exit={{ height: 0, opacity: 0 }}
                className="flex flex-wrap items-center gap-3 pt-6 overflow-hidden"
              >
                <span className="text-[10px] uppercase tracking-widest text-gray-400 mr-2">Active:</span>
                {[...filters.type, ...filters.material, ...filters.stone].map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-[10px] uppercase tracking-wider text-brand-dark">
                    {tag}
                    <button onClick={() => {
                      if(filters.type.includes(tag)) toggleFilter('type', tag);
                      if(filters.material.includes(tag)) toggleFilter('material', tag);
                      if(filters.stone.includes(tag)) toggleFilter('stone', tag);
                    }}><X size={10} className="hover:text-red-500" /></button>
                  </span>
                ))}
                <button onClick={clearAllFilters} className="text-[10px] uppercase tracking-widest underline decoration-gray-300 hover:text-brand-gold ml-4">Clear All</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* --- SIDEBAR FILTERS --- */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.aside 
                initial={{ width: 0, opacity: 0, x: -20 }}
                animate={{ width: '280px', opacity: 1, x: 0 }}
                exit={{ width: 0, opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="hidden lg:block space-y-12 overflow-hidden pr-8 border-r border-gray-100 h-fit sticky top-40"
              >
                <JewelryFilterGroup title="Category" items={types} activeItems={filters.type} onToggle={(v) => toggleFilter('type', v)} />
                <JewelryFilterGroup title="Precious Metals" items={materials} activeItems={filters.material} onToggle={(v) => toggleFilter('material', v)} />
                <JewelryFilterGroup title="Gemstones" items={stones} activeItems={filters.stone} onToggle={(v) => toggleFilter('stone', v)} />
                
                <div className="pt-8 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-brand-gold mb-2">
                    <Sparkles size={14} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Ethical Promise</span>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    All our metals are recycled and stones are conflict-free.
                  </p>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* --- PRODUCT FEED --- */}
          <main className="flex-1">
            {processedJewelry.length > 0 ? (
              <>
                <motion.div 
                  layout 
                  className={`grid gap-x-8 gap-y-16 ${
                    viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'
                  }`}
                >
                  <AnimatePresence>
                    {processedJewelry.slice(0, visibleCount).map((item, index) => (
                      <motion.div 
                        layout 
                        key={item._id} 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <ProductCard 
                          product={item} 
                          layout={viewMode} 
                          onQuickView={() => openQuickView(item)} 
                        />
                        {/* Inline Details for Jewelry Context */}
                        {viewMode === 'grid' && (
                          <div className="mt-3 flex gap-2">
                             <span className="text-[9px] uppercase tracking-wider px-2 py-1 bg-gray-50 text-gray-500">{item.material}</span>
                             {item.stone !== 'None' && <span className="text-[9px] uppercase tracking-wider px-2 py-1 bg-gray-50 text-gray-500">{item.stone}</span>}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Load More Logic */}
                {visibleCount < processedJewelry.length && (
                  <div className="mt-20 text-center">
                    <button 
                      onClick={() => setVisibleCount(prev => prev + 6)}
                      className="inline-block border border-brand-dark px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-brand-dark hover:text-white transition-all duration-300"
                    >
                      Load More Pieces
                    </button>
                    <p className="text-[10px] text-gray-400 mt-4 uppercase tracking-widest">
                      Showing {visibleCount} of {processedJewelry.length}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="py-32 text-center border border-dashed border-gray-200">
                <p className="text-xl font-serif italic text-gray-400 mb-4">No treasures found.</p>
                <button onClick={clearAllFilters} className="text-xs uppercase font-bold text-brand-gold underline decoration-brand-gold/30">Clear Filters</button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* --- CRAFTSMANSHIP FOOTER SECTION --- */}
      <section className="bg-white border-t border-gray-100 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold block mb-4">The Process</span>
            <h2 className="text-4xl font-serif italic text-brand-dark">Artistry in Every Detail</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureBlock 
              icon={Diamond} 
              title="Conflict-Free Stones" 
              desc="Every diamond and gemstone is ethically sourced, ensuring beauty without compromise." 
            />
            <FeatureBlock 
              icon={Sparkles} 
              title="Recycled Metals" 
              desc="We reclaim 14k Gold and Sterling Silver to minimize our environmental footprint." 
            />
            <FeatureBlock 
              icon={Gem} 
              title="Master Craftsmanship" 
              desc="Hand-finished by artisans with decades of experience in traditional jewelry making." 
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Sub-Components ---

const JewelryFilterGroup = ({ title, items, activeItems, onToggle }) => (
  <div className="space-y-6">
    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-dark pb-2 border-b border-gray-100 flex justify-between items-center group cursor-pointer">
      {title}
      <ChevronDown size={12} className="text-gray-300 group-hover:text-brand-gold transition-colors" />
    </h4>
    <div className="flex flex-col gap-3">
      {items.map(item => (
        <label key={item} className="flex items-center gap-4 cursor-pointer group">
          <div className={`w-4 h-4 border flex items-center justify-center transition-all ${activeItems.includes(item) ? 'bg-brand-dark border-brand-dark' : 'border-gray-300 group-hover:border-brand-gold'}`}>
            {activeItems.includes(item) && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-1.5 h-1.5 bg-white" />}
          </div>
          <span className={`text-[11px] tracking-widest uppercase transition-colors ${activeItems.includes(item) ? 'text-brand-dark font-bold' : 'text-gray-500 group-hover:text-brand-dark'}`}>
            {item}
          </span>
        </label>
      ))}
    </div>
  </div>
);

const FeatureBlock = ({ icon: Icon, title, desc }) => (
  <div className="text-center px-4 group">
    <div className="inline-flex p-6 rounded-full bg-gray-50 text-brand-dark mb-6 group-hover:bg-brand-gold group-hover:text-white transition-colors duration-500">
      <Icon size={24} strokeWidth={1} />
    </div>
    <h4 className="text-lg font-serif italic mb-4">{title}</h4>
    <p className="text-xs text-gray-500 leading-loose max-w-xs mx-auto">{desc}</p>
  </div>
);

export default JewelryCollectionScreen;