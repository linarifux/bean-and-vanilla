import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Truck } from 'lucide-react';
import { addToCart, removeFromCart } from '../slices/cartSlice'; // Ensure these are exported from your slice

const CartDrawer = ({ isOpen, onClose, setIsOpen }) => { 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Connect to Redux Store
  const { cartItems } = useSelector((state) => state.cart);

  // Safe handler for closing
  const handleClose = () => {
    if (onClose) onClose();
    else if (setIsOpen) setIsOpen(false);
  };

  const handleCheckout = () => {
    handleClose();
    navigate('/checkout');
  };

  // Logic: Calculate Totals & Shipping Progress
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingThreshold = 150; // Matched with your global policy
  const progress = Math.min((subtotal / shippingThreshold) * 100, 100);
  const remaining = shippingThreshold - subtotal;

  // Handlers using Redux Actions
  const handleQtyChange = (product, change) => {
    const newQty = product.qty + change;
    if (newQty > 0) {
      dispatch(addToCart({ ...product, qty: newQty }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-brand-dark/60 z-[150] backdrop-blur-sm"
          />

          {/* Slide-out Drawer */}
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[151] shadow-2xl flex flex-col font-sans"
          >
            
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white z-20 relative">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-brand-gold" strokeWidth={1.5} />
                <span className="font-serif text-xl text-brand-dark italic">Your Bag ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
              </div>
              
              <button 
                onClick={handleClose} 
                className="p-2 hover:bg-gray-50 rounded-full transition-colors group cursor-pointer"
              >
                <X size={24} className="text-gray-400 group-hover:text-brand-dark" strokeWidth={1.5} />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            {cartItems.length > 0 && (
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                <div className="flex justify-between items-center mb-2 text-[10px] uppercase tracking-widest font-bold">
                  <span>{progress === 100 ? "Free Shipping Unlocked" : "Unlock Free Express Shipping"}</span>
                  <span className="text-brand-gold">{progress === 100 ? <Truck size={14}/> : `$${remaining.toFixed(2)} away`}</span>
                </div>
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${progress}%` }} 
                    transition={{ duration: 0.5 }}
                    className="h-full bg-brand-gold"
                  />
                </div>
              </div>
            )}

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <motion.div layout key={item._id} className="flex gap-5 group">
                    {/* Image */}
                    <div className="w-24 h-32 bg-gray-100 overflow-hidden relative rounded-sm border border-gray-100">
                      <img 
                        src={item.images ? item.images[0] : item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="font-serif text-lg text-brand-dark leading-tight hover:text-brand-gold transition-colors cursor-pointer" onClick={() => { handleClose(); navigate(`/product/${item._id}`) }}>
                            {item.name}
                          </h3>
                          <button onClick={() => handleRemove(item._id)} className="text-gray-300 hover:text-red-500 transition-colors p-1">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{item.category} • {item.material}</p>
                      </div>

                      <div className="flex justify-between items-end">
                        {/* Qty Control */}
                        <div className="flex items-center border border-gray-200 h-8 rounded-sm">
                          <button onClick={() => handleQtyChange(item, -1)} className="px-2 h-full hover:bg-gray-50 text-gray-500 transition-colors"><Minus size={12}/></button>
                          <span className="px-2 text-xs font-medium w-8 text-center">{item.qty}</span>
                          <button onClick={() => handleQtyChange(item, 1)} className="px-2 h-full hover:bg-gray-50 text-gray-500 transition-colors"><Plus size={12}/></button>
                        </div>
                        <span className="font-serif text-lg text-brand-dark">${(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                /* Empty State */
                <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag size={32} strokeWidth={1} className="text-gray-400" />
                  </div>
                  <p className="font-serif text-2xl italic text-gray-400 mb-2">Your bag is empty</p>
                  <p className="text-xs text-gray-400 max-w-[200px] mb-8">Looks like you haven't found your perfect piece yet.</p>
                  <button onClick={() => { handleClose(); navigate('/shop'); }} className="text-[10px] uppercase tracking-widest font-bold border-b border-brand-gold pb-1 text-brand-gold hover:text-brand-dark hover:border-brand-dark transition-all">
                    Start Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-white">
                <div className="flex justify-between mb-4 items-end">
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Subtotal</span>
                  <span className="font-serif text-2xl text-brand-dark">${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-gray-400 mb-6">
                  Shipping, taxes, and discounts calculated at checkout.
                </p>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-brand-dark text-white py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-brand-gold transition-all duration-300 flex items-center justify-center gap-4 group shadow-lg"
                >
                  Proceed to Checkout <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;