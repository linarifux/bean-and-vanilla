import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, LayoutGrid, List, Sparkles, Search, X, 
  ChevronDown, ArrowRight, Watch, Activity, Droplets 
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import QuickView from '../components/QuickView';
import MobileFilterDrawer from '../components/MobileFilterDrawer';

const WatchCollectionScreen = () => {
  // --- State Management ---
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(true); // Default open for robust desktop view
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [visibleCount, setVisibleCount] = useState(6); // For "Load More" functionality

  // Quick View State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    movement: [],
    material: [],
    caseSize: []
  });

  // --- Data & Constants ---
  const movements = ['Automatic', 'Quartz', 'Mechanical'];
  const materials = ['Sandalwood', 'Koa Wood', 'Ebony', 'Maple', 'Stainless Steel'];
  const sizes = ['38mm', '40mm', '42mm', '44mm'];

  // Mock Data Extended (Added dates for sorting)
  const products = [
    { _id: '1', name: 'Original Sandalwood Chrono', price: 345, movement: 'Automatic', material: 'Sandalwood', size: '42mm', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800', date: '2023-12-01' },
    { _id: '4', name: 'Heritage Ebony Series', price: 210, movement: 'Quartz', material: 'Ebony', size: '40mm', image: 'https://images.unsplash.com/photo-1508685096489-7a316bd4741e?q=80&w=800', date: '2023-11-15' },
    { _id: '5', name: 'Midnight Maple Diver', price: 280, movement: 'Automatic', material: 'Maple', size: '44mm', image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=800', date: '2024-01-10' },
    { _id: '9', name: 'Koa Minimalist Slim', price: 195, movement: 'Quartz', material: 'Koa Wood', size: '38mm', image: 'https://images.unsplash.com/photo-1434056886845-dac89faf9b17?q=80&w=800', date: '2023-10-20' },
    { _id: '10', name: 'Regatta Blue Automatic', price: 450, movement: 'Automatic', material: 'Stainless Steel', size: '42mm', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800', date: '2024-01-05' },
    { _id: '11', name: 'Slate Grey Chrono', price: 299, movement: 'Quartz', material: 'Ebony', size: '44mm', image: 'https://images.unsplash.com/photo-1619134778706-c73105e52723?q=80&w=800', date: '2023-09-01' },
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
    setFilters({ movement: [], material: [], caseSize: [] });
    setSearchQuery('');
  };

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  // --- Filtering & Sorting Engine ---
  const processedWatches = useMemo(() => {
    let result = products.filter(p => {
      const movementMatch = filters.movement.length === 0 || filters.movement.includes(p.movement);
      const materialMatch = filters.material.length === 0 || filters.material.includes(p.material);
      const sizeMatch = filters.caseSize.length === 0 || filters.caseSize.includes(p.size);
      const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return movementMatch && materialMatch && sizeMatch && searchMatch;
    });

    // Sorting Logic
    if (sortBy === 'priceLow') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'priceHigh') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'newest') result.sort((a, b) => new Date(b.date) - new Date(a.date));

    return result;
  }, [filters, products, searchQuery, sortBy]);

  const activeFilterCount = filters.movement.length + filters.material.length + filters.caseSize.length;

  return (
    <div className="min-h-screen bg-[#FCFCFC] font-sans text-brand-dark">
      <MobileFilterDrawer 
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        filters={filters}
        onToggleFilter={toggleFilter}
        categories={movements} 
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
           <img src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2000" alt="Horology Background" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-[10px] uppercase tracking-[0.6em] text-brand-gold font-bold mb-6 block">The Atelier Collection</span>
            <h1 className="text-5xl md:text-8xl font-serif text-white italic mb-8">Horological Mastery</h1>
            <p className="text-gray-300 font-light text-lg max-w-lg mx-auto leading-relaxed">
              Precision engineering meets organic artistry. Discover timepieces crafted from reclaimed woods and powered by Swiss-grade movements.
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
                <Filter size={16} /> {isFilterOpen ? 'Hide Filters' : 'Filter Specifications'}
              </button>
              
              <div className="relative group hidden md:block">
                <Search size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-dark transition-colors" />
                <input 
                  type="text" 
                  placeholder="SEARCH MODELS" 
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
                {[...filters.movement, ...filters.material, ...filters.caseSize].map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-[10px] uppercase tracking-wider text-brand-dark">
                    {tag}
                    <button onClick={() => {
                      if(filters.movement.includes(tag)) toggleFilter('movement', tag);
                      if(filters.material.includes(tag)) toggleFilter('material', tag);
                      if(filters.caseSize.includes(tag)) toggleFilter('caseSize', tag);
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
                <WatchFilterGroup title="Movement Type" items={movements} activeItems={filters.movement} onToggle={(v) => toggleFilter('movement', v)} />
                <WatchFilterGroup title="Material" items={materials} activeItems={filters.material} onToggle={(v) => toggleFilter('material', v)} />
                <WatchFilterGroup title="Case Diameter" items={sizes} activeItems={filters.caseSize} onToggle={(v) => toggleFilter('caseSize', v)} />
                
                <div className="pt-8 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-brand-gold mb-2">
                    <Sparkles size={14} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Collector's Note</span>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    Our automatics feature a 40-hour power reserve, ensuring reliability even when off the wrist.
                  </p>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* --- PRODUCT FEED --- */}
          <main className="flex-1">
            {processedWatches.length > 0 ? (
              <>
                <motion.div 
                  layout 
                  className={`grid gap-x-8 gap-y-16 ${
                    viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'
                  }`}
                >
                  <AnimatePresence>
                    {processedWatches.slice(0, visibleCount).map((watch, index) => (
                      <motion.div 
                        layout 
                        key={watch._id} 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <ProductCard 
                          product={watch} 
                          layout={viewMode} 
                          onQuickView={() => openQuickView(watch)} 
                        />
                        {/* Inline Details for Watch Context */}
                        {viewMode === 'grid' && (
                          <div className="mt-3 flex gap-2">
                             <span className="text-[9px] uppercase tracking-wider px-2 py-1 bg-gray-50 text-gray-500">{watch.movement}</span>
                             <span className="text-[9px] uppercase tracking-wider px-2 py-1 bg-gray-50 text-gray-500">{watch.size}</span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Load More Logic */}
                {visibleCount < processedWatches.length && (
                  <div className="mt-20 text-center">
                    <button 
                      onClick={() => setVisibleCount(prev => prev + 6)}
                      className="inline-block border border-brand-dark px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-brand-dark hover:text-white transition-all duration-300"
                    >
                      Load More Models
                    </button>
                    <p className="text-[10px] text-gray-400 mt-4 uppercase tracking-widest">
                      Showing {visibleCount} of {processedWatches.length}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="py-32 text-center border border-dashed border-gray-200">
                <p className="text-xl font-serif italic text-gray-400 mb-4">No timepieces found matching these criteria.</p>
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
            <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold block mb-4">Engineering</span>
            <h2 className="text-4xl font-serif italic text-brand-dark">Built for Generations</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureBlock 
              icon={Watch} 
              title="Automatic Movement" 
              desc="Powered by the kinetic energy of your wrist. No batteries, just pure mechanical engineering." 
            />
            <FeatureBlock 
              icon={Activity} 
              title="Sapphire Crystal" 
              desc="Scratch-resistant glass second only to diamond in hardness, ensuring clarity for decades." 
            />
            <FeatureBlock 
              icon={Droplets} 
              title="Water Resistance" 
              desc="Every diver model is tested to 10ATM, making them suitable for swimming and snorkeling." 
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Sub-Components ---

const WatchFilterGroup = ({ title, items, activeItems, onToggle }) => (
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

export default WatchCollectionScreen;