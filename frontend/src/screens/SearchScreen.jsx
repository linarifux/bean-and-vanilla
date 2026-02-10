import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchX, LayoutGrid, List, ChevronDown, Loader2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const SearchScreen = () => {
  const { keyword } = useParams();
  
  // --- State Management ---
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');

  // --- Mock Data (Extended with dates for sorting) ---
  const allProducts = [
    { _id: '1', name: 'Original Sandalwood Watch', price: 185, category: 'Watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000', createdAt: '2024-01-10' },
    { _id: '2', name: 'Golden Hour Bracelet', price: 95, category: 'Jewelry', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000', createdAt: '2023-12-05' },
    { _id: '3', name: 'Minimalist Koa Ring', price: 120, category: 'Jewelry', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000', createdAt: '2023-10-15' },
    { _id: '4', name: 'Heritage Wood Watch', price: 210, category: 'Watches', image: 'https://images.unsplash.com/photo-1434056886845-dac89faf9b17?q=80&w=1000', createdAt: '2023-11-20' },
    { _id: '5', name: 'Midnight Maple Diver', price: 280, category: 'Watches', image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1000', createdAt: '2024-02-01' },
  ];

  // --- Simulate Network Latency ---
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800); // 800ms loading simulation
    return () => clearTimeout(timer);
  }, [keyword]);

  // --- Filter & Sort Engine ---
  const filteredProducts = useMemo(() => {
    let results = allProducts.filter(p => 
      p.name.toLowerCase().includes(keyword?.toLowerCase() || '') || 
      p.category.toLowerCase().includes(keyword?.toLowerCase() || '')
    );

    if (sortBy === 'priceLow') results.sort((a, b) => a.price - b.price);
    if (sortBy === 'priceHigh') results.sort((a, b) => b.price - a.price);
    if (sortBy === 'newest') results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    return results;
  }, [keyword, sortBy, allProducts]);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#FCFCFC]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- Header Section --- */}
        <header className="mb-12 border-b border-gray-100 pb-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-end gap-6"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold mb-3">
                Search Results
              </p>
              <h1 className="text-4xl md:text-6xl font-serif text-brand-dark italic flex flex-wrap items-baseline gap-3">
                "{keyword}"
                {!isLoading && (
                  <span className="text-lg font-sans text-gray-400 font-light not-italic tracking-normal">
                    &mdash; {filteredProducts.length} pieces found
                  </span>
                )}
              </h1>
            </div>

            {/* Controls (Only show if we have results) */}
            {filteredProducts.length > 0 && !isLoading && (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400">Sort:</span>
                  <div className="relative">
                    <select 
                      value={sortBy} 
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-transparent text-[10px] uppercase tracking-widest font-bold pr-6 cursor-pointer outline-none text-brand-dark focus:text-brand-gold transition-colors"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="newest">New Arrivals</option>
                      <option value="priceLow">Price: Low to High</option>
                      <option value="priceHigh">Price: High to Low</option>
                    </select>
                    <ChevronDown size={10} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-brand-dark" />
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-3 border-l border-gray-200 pl-6">
                  <button onClick={() => setViewMode('grid')} className={`transition-colors ${viewMode === 'grid' ? 'text-brand-dark' : 'text-gray-300 hover:text-brand-gold'}`}><LayoutGrid size={16}/></button>
                  <button onClick={() => setViewMode('list')} className={`transition-colors ${viewMode === 'list' ? 'text-brand-dark' : 'text-gray-300 hover:text-brand-gold'}`}><List size={16}/></button>
                </div>
              </div>
            )}
          </motion.div>
        </header>

        {/* --- Content Area --- */}
        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-brand-gold" size={32} />
            </div>
          ) : filteredProducts.length > 0 ? (
            <motion.div 
              layout
              className={`grid gap-x-8 gap-y-16 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}
            >
              <AnimatePresence>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product} layout={viewMode} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* --- No Results State --- */
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="py-20 text-center border border-dashed border-gray-200 bg-gray-50/50 rounded-sm"
            >
              <SearchX size={48} className="mx-auto text-gray-300 mb-6" strokeWidth={1} />
              <h2 className="text-3xl font-serif text-brand-dark mb-4 italic">No treasures found</h2>
              <p className="text-gray-500 font-light mb-10 max-w-md mx-auto leading-relaxed">
                We couldn't locate any pieces matching "{keyword}". <br/> Perhaps try a broader term or explore our curated collections.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/shop" className="bg-brand-dark text-white px-8 py-4 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-brand-gold transition-colors">
                  View Full Catalog
                </Link>
                <Link to="/gift-guide" className="border border-brand-dark text-brand-dark px-8 py-4 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-white hover:text-brand-gold hover:border-brand-gold transition-colors">
                  Try Gift Guide
                </Link>
              </div>

              {/* Suggestions Panel */}
              <div className="mt-12 pt-12 border-t border-gray-200/60 max-w-lg mx-auto">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-4 font-bold">Popular Suggestions</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {['Gold Watches', 'Diamond Rings', 'Minimalist', 'Silver'].map(term => (
                    <Link 
                      key={term} 
                      to={`/search/${term}`} // Ensure your router supports this path reuse
                      className="bg-white border border-gray-200 px-4 py-2 text-[10px] uppercase tracking-wider text-gray-600 hover:border-brand-gold hover:text-brand-gold transition-all"
                    >
                      {term}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;