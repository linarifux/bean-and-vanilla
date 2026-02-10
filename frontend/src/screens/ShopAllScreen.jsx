import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SlidersHorizontal, LayoutGrid, List, Filter, X, 
  ShoppingBag, Search, RotateCcw, Sparkles, ChevronDown 
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import MobileFilterDrawer from '../components/MobileFilterDrawer';
import QuickView from '../components/QuickView';
import CartDrawer from '../components/CartDrawer';

const ShopAllScreen = () => {
  // 1. Stable URL Parameter Handling
  const [searchParams, setSearchParams] = useSearchParams();
  
  // 2. View & UI State
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(true); // Default open for desktop
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6); // Pagination
  
  // 3. Quick View Logic
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // 4. Lazy Filter Initialization
  const [filters, setFilters] = useState(() => {
    const occasion = searchParams.get('occasion');
    const budget = searchParams.get('budget');
    
    return {
      category: [],
      material: [],
      priceRange: budget === 'low' ? [0, 150] : 
                  budget === 'mid' ? [150, 300] : 
                  budget === 'high' ? [300, 1000] : [0, 1000],
      occasion: occasion ? [occasion] : [] 
    };
  });

  // 5. Sync Filter State when URL Changes
  useEffect(() => {
    const occasion = searchParams.get('occasion');
    const budget = searchParams.get('budget');

    if (occasion || budget) {
      setFilters(prev => ({
        ...prev,
        occasion: occasion ? [occasion] : [],
        priceRange: budget === 'low' ? [0, 150] : 
                    budget === 'mid' ? [150, 300] : 
                    budget === 'high' ? [300, 1000] : [0, 1000]
      }));
      setIsFilterOpen(true);
    }
  }, [searchParams]);

  // Mock Products
  const products = [
    { _id: '1', name: 'Original Sandalwood Chrono', price: 345, category: 'Watches', material: 'Sandalwood', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800', occasions: ['anniversary', 'professional'], createdAt: '2025-01-01' },
    { _id: '2', name: 'Golden Hour Bracelet', price: 95, category: 'Jewelry', material: '14k Gold', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800', occasions: ['general', 'graduation'], createdAt: '2025-02-01' },
    { _id: '3', name: 'Minimalist Koa Ring', price: 120, category: 'Jewelry', material: 'Koa Wood', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800', occasions: ['anniversary', 'graduation'], createdAt: '2025-01-15' },
    { _id: '4', name: 'Heritage Ebony Series', price: 210, category: 'Watches', material: 'Ebony', image: 'https://images.unsplash.com/photo-1508685096489-7a316bd4741e?q=80&w=800', occasions: ['professional'], createdAt: '2024-12-20' },
    { _id: '5', name: 'Midnight Maple Diver', price: 280, category: 'Watches', material: 'Maple', image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=800', occasions: ['graduation'], createdAt: '2025-02-10' },
    { _id: '6', name: 'Silver Birch Bangle', price: 85, category: 'Jewelry', material: 'Silver', image: 'https://images.unsplash.com/photo-1535633302704-b02f4faad767?q=80&w=800', occasions: ['general'], createdAt: '2023-10-20' },
    { _id: '7', name: 'Regatta Blue Automatic', price: 450, category: 'Watches', material: 'Stainless Steel', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800', occasions: ['anniversary'], createdAt: '2024-01-05' },
  ];

  const categories = ['Watches', 'Jewelry'];
  const materials = ['Sandalwood', 'Koa Wood', '14k Gold', 'Ebony', 'Maple', 'Silver'];

  // --- Handlers ---
  const toggleFilter = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value) ? prev[type].filter(i => i !== value) : [...prev[type], value]
    }));
  };

  const clearGiftMode = () => {
    setSearchParams({});
    setFilters({ category: [], material: [], priceRange: [0, 1000], occasion: [] });
    setSearchQuery('');
  };

  const removeTag = (type, value) => {
    if (type === 'occasion') {
      // Clearing occasion clears the URL param essentially
      setFilters(prev => ({ ...prev, occasion: [] }));
      setSearchParams(params => {
        params.delete('occasion');
        return params;
      });
    } else {
      toggleFilter(type, value);
    }
  };

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  // 6. Robust Filtering Logic
  const processedProducts = useMemo(() => {
    if (!products) return [];

    let result = products.filter(p => {
      const categoryMatch = filters.category.length === 0 || filters.category.includes(p.category);
      const materialMatch = filters.material.length === 0 || filters.material.includes(p.material);
      const priceMatch = p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];
      const occasionMatch = filters.occasion.length === 0 || (p.occasions && p.occasions.includes(filters.occasion[0]));
      const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      return categoryMatch && materialMatch && priceMatch && occasionMatch && searchMatch;
    });

    if (sortBy === 'low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'newest') result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sortBy === 'az') result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [filters, sortBy, searchQuery]);

  const activeFilterCount = filters.category.length + filters.material.length + filters.occasion.length;
  const isGiftMode = filters.occasion.length > 0;

  return (
    <div className="min-h-screen bg-[#FCFCFC] text-brand-dark font-sans">
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <MobileFilterDrawer 
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        filters={filters}
        onToggleFilter={toggleFilter}
        onReset={clearGiftMode}
        categories={categories}
        materials={materials}
      />
      <QuickView product={selectedProduct} isOpen={isQuickViewOpen} onClose={() => setIsQuickViewOpen(false)} />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[50vh] bg-brand-dark overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-30">
           {/* Placeholder for a luxury texture or lifestyle image */}
           <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2000')] bg-cover bg-center grayscale" />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.div 
            key={isGiftMode ? 'gift-hero' : 'standard-hero'}
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            {isGiftMode ? (
              <>
                <div className="inline-flex items-center gap-2 px-4 py-2 border border-brand-gold/30 rounded-full text-brand-gold mb-6 bg-brand-gold/10 backdrop-blur-sm">
                  <Sparkles size={14} />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Curated Selection</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-serif text-white italic mb-6">The {filters.occasion[0]} Edit</h1>
                <p className="text-gray-300 font-light text-lg max-w-lg mx-auto">Hand-picked pieces to celebrate your milestone.</p>
              </>
            ) : (
              <>
                <span className="text-[10px] uppercase tracking-[0.6em] text-brand-gold font-bold mb-6 block">The Atelier</span>
                <h1 className="text-5xl md:text-8xl font-serif text-white italic mb-6">Signature Collection</h1>
                <p className="text-gray-300 font-light text-lg max-w-lg mx-auto">Discover the intersection of nature and craftsmanship.</p>
              </>
            )}
          </motion.div>
        </div>
      </section>

      <div className="max-w-8xl mx-auto px-6 py-12">
        {/* --- TOOLBAR --- */}
        <div className="sticky top-0 z-30 bg-[#FCFCFC]/95 backdrop-blur-md border-b border-gray-100 py-6 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6 w-full md:w-auto">
              <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:text-brand-gold transition-colors">
                <Filter size={16} /> {isFilterOpen ? 'Hide Filters' : 'Filter Collection'}
              </button>
              
              <div className="relative group hidden md:block">
                <Search size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-dark transition-colors" />
                <input 
                  type="text" 
                  placeholder="SEARCH" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-b border-gray-200 pl-6 pr-4 py-2 text-xs uppercase tracking-widest focus:border-brand-dark outline-none w-40 transition-all focus:w-64"
                />
              </div>
            </div>

            <div className="flex items-center gap-8 w-full md:w-auto justify-end">
              <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold hover:text-brand-gold transition-colors">
                <ShoppingBag size={16} /> Bag (0)
              </button>
              
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-widest text-gray-400">Sort:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent text-xs uppercase tracking-widest font-bold outline-none cursor-pointer text-brand-dark">
                  <option value="featured">Featured</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                  <option value="newest">New Arrivals</option>
                </select>
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
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="flex flex-wrap items-center gap-3 pt-6 overflow-hidden">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 mr-2">Active:</span>
                {filters.occasion.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/10 text-brand-gold text-[10px] uppercase tracking-wider font-bold">
                    {tag} <button onClick={() => removeTag('occasion', tag)}><X size={10} /></button>
                  </span>
                ))}
                {[...filters.category, ...filters.material].map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-brand-dark text-[10px] uppercase tracking-wider">
                    {tag} <button onClick={() => {
                      if(filters.category.includes(tag)) removeTag('category', tag);
                      if(filters.material.includes(tag)) removeTag('material', tag);
                    }}><X size={10} /></button>
                  </span>
                ))}
                <button onClick={clearGiftMode} className="text-[10px] uppercase tracking-widest underline decoration-gray-300 hover:text-brand-gold ml-4">Clear All</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.aside 
                initial={{ width: 0, opacity: 0, x: -20 }}
                animate={{ width: '280px', opacity: 1, x: 0 }}
                exit={{ width: 0, opacity: 0, x: -20 }}
                className="hidden lg:block space-y-12 overflow-hidden pr-8 border-r border-gray-100 h-fit sticky top-40"
              >
                <FilterSection title="Category" items={categories} activeItems={filters.category} onToggle={(v) => toggleFilter('category', v)} />
                <FilterSection title="Material" items={materials} activeItems={filters.material} onToggle={(v) => toggleFilter('material', v)} />
                
                <div className="pt-8 border-t border-gray-100">
                  <button onClick={clearGiftMode} className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-brand-dark transition-colors">
                    <RotateCcw size={12} /> Reset Discovery
                  </button>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <main className="flex-1">
            {processedProducts.length > 0 ? (
              <>
                <motion.div layout className={`grid gap-x-8 gap-y-20 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                  <AnimatePresence mode="popLayout">
                    {processedProducts.slice(0, visibleCount).map((product) => (
                      <motion.div layout key={product._id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
                        <ProductCard product={product} layout={viewMode} onQuickView={() => openQuickView(product)} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Load More */}
                {visibleCount < processedProducts.length && (
                  <div className="mt-24 text-center">
                    <button onClick={() => setVisibleCount(prev => prev + 6)} className="border border-brand-dark px-12 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-brand-dark hover:text-white transition-all duration-500">
                      Load More
                    </button>
                    <p className="text-[10px] text-gray-400 mt-4 uppercase tracking-widest">Showing {visibleCount} of {processedProducts.length}</p>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="py-40 text-center border border-dashed border-gray-200 bg-gray-50/50">
                <p className="font-serif text-2xl text-gray-400 italic mb-6">
                  {isGiftMode 
                    ? `No pieces found for ${filters.occasion[0]} in this budget.` 
                    : "The collection does not currently match these specifications."}
                </p>
                <button onClick={clearGiftMode} className="bg-brand-dark text-white px-12 py-5 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-brand-gold transition-all">
                  Browse Full Catalog
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

// Reusable Filter Component
const FilterSection = ({ title, items, activeItems, onToggle }) => (
  <div className="space-y-6">
    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-dark border-b border-gray-100 pb-2 flex justify-between items-center group cursor-pointer">
      {title} <ChevronDown size={12} className="text-gray-300 group-hover:text-brand-dark transition-colors"/>
    </h4>
    <div className="flex flex-col gap-3">
      {items.map(item => (
        <label key={item} className="flex items-center gap-3 cursor-pointer group">
          <div className={`w-4 h-4 border flex items-center justify-center transition-all ${activeItems.includes(item) ? 'bg-brand-dark border-brand-dark' : 'border-gray-300 group-hover:border-brand-gold'}`}>
            {activeItems.includes(item) && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-1.5 h-1.5 bg-white" />}
          </div>
          <span className={`text-[11px] uppercase tracking-widest transition-colors ${activeItems.includes(item) ? 'text-brand-dark font-bold' : 'text-gray-500 group-hover:text-brand-dark'}`}>
            {item}
          </span>
          <input type="checkbox" className="hidden" checked={activeItems.includes(item)} onChange={() => onToggle(item)} />
        </label>
      ))}
    </div>
  </div>
);

export default ShopAllScreen;