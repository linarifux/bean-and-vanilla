import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, ShoppingBag } from 'lucide-react';

const NotFoundScreen = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* Artistic 404 Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-[120px] md:text-[180px] font-serif leading-none text-gray-100 absolute left-1/2 -translate-x-1/2 -z-10 select-none">
            404
          </h1>
          <h2 className="text-3xl md:text-5xl font-serif text-brand-dark mb-6 relative z-10">
            A Moment Out of Time
          </h2>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-500 font-light text-lg mb-10 max-w-md mx-auto leading-relaxed"
        >
          The page you are looking for has vanished like grains of sand. Let us guide you back to our collection.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            to="/" 
            className="w-full sm:w-auto bg-brand-dark text-white px-8 py-4 uppercase tracking-[0.2em] text-[10px] font-bold flex items-center justify-center gap-2 hover:bg-brand-gold transition-luxury group"
          >
            <Home size={14} /> Back to Home
          </Link>
          
          <Link 
            to="/shop" 
            className="w-full sm:w-auto border border-gray-200 text-brand-dark px-8 py-4 uppercase tracking-[0.2em] text-[10px] font-bold flex items-center justify-center gap-2 hover:border-brand-gold hover:text-brand-gold transition-luxury"
          >
            <ShoppingBag size={14} /> Shop Collection
          </Link>
        </motion.div>

        {/* Subtle Decorative Element */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="h-px bg-brand-gold/30 w-24 mx-auto mt-16"
        />
      </div>
    </div>
  );
};

export default NotFoundScreen;