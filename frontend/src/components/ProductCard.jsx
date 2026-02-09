import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, ShoppingBag } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const ProductCard = ({ product, onQuickView }) => {
  const dispatch = useDispatch();

  const handleQuickAdd = (e) => {
    e.preventDefault(); // Prevent navigating to product page
    e.stopPropagation();
    dispatch(addToCart({ ...product, qty: 1 }));
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView(product);
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="group relative"
    >
      <Link to={`/product/${product._id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
          />
          
          {/* Stunning Hover Overlay */}
          <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4">
            <button 
              onClick={handleQuickViewClick}
              className="bg-white text-brand-dark p-3 rounded-full hover:bg-brand-gold hover:text-white transition-luxury shadow-xl transform translate-y-4 group-hover:translate-y-0 duration-500"
              title="Quick View"
            >
              <Eye size={20} strokeWidth={1.5} />
            </button>
            
            <button 
              onClick={handleQuickAdd}
              className="bg-white text-brand-dark px-6 py-2 rounded-full flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold hover:bg-brand-gold hover:text-white transition-luxury shadow-xl transform translate-y-4 group-hover:translate-y-0 duration-700"
            >
              <ShoppingBag size={14} /> Quick Add
            </button>
          </div>

          {/* New Arrival Badge (Optional) */}
          {product.isNew && (
             <span className="absolute top-4 left-4 bg-brand-gold text-white text-[9px] uppercase tracking-[0.2em] px-3 py-1 font-bold">
               New
             </span>
          )}
        </div>
        
        <div className="mt-6 text-center px-2">
          <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-1 opacity-80 group-hover:opacity-100 transition-opacity">
            {product.category}
          </p>
          <h4 className="font-serif text-lg text-brand-dark leading-tight mb-2 group-hover:text-brand-gold transition-colors duration-300">
            {product.name}
          </h4>
          <p className="text-sm font-light text-gray-500 group-hover:text-brand-dark transition-colors">
            ${product.price}.00
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;