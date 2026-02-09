import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { SearchX } from 'lucide-react';

const SearchScreen = () => {
  const { keyword } = useParams();

  // Mock data - In the future, this will be an RTK Query call: 
  // const { data, isLoading } = useGetProductsQuery({ keyword });
  const allProducts = [
    { _id: '1', name: 'Original Sandalwood Watch', price: 185, category: 'Watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000' },
    { _id: '2', name: 'Golden Hour Bracelet', price: 95, category: 'Jewelry', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000' },
    { _id: '4', name: 'Heritage Wood Watch', price: 210, category: 'Watches', image: 'https://images.unsplash.com/photo-1434056886845-dac89faf9b17?q=80&w=1000' },
  ];

  // Simple client-side filtering for now
  const filteredProducts = allProducts.filter(p => 
    p.name.toLowerCase().includes(keyword.toLowerCase()) || 
    p.category.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto"
    >
      {/* Search Header */}
      <div className="mb-16 border-b border-gray-100 pb-10">
        <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold mb-2">
          Search Results for
        </p>
        <h1 className="text-4xl md:text-5xl font-serif text-brand-dark flex items-baseline gap-4">
          "{keyword}"
          <span className="text-sm font-sans text-gray-400 font-light tracking-normal">
            ({filteredProducts.length} items found)
          </span>
        </h1>
      </div>

      {/* Results Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="py-20 text-center"
        >
          <SearchX size={48} className="mx-auto text-gray-200 mb-6" strokeWidth={1} />
          <h2 className="text-2xl font-serif text-brand-dark mb-4">No pieces found</h2>
          <p className="text-gray-500 font-light mb-8 max-w-md mx-auto">
            We couldn't find any results matching your search. Try adjusting your keywords or browse our full collection.
          </p>
          <a 
            href="/shop" 
            className="inline-block bg-brand-dark text-white px-10 py-4 uppercase tracking-widest text-[10px] font-bold hover:bg-brand-gold transition-all"
          >
            Browse All Collection
          </a>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchScreen;