import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2 } from 'lucide-react';

const CartDrawer = ({ isOpen, setIsOpen }) => {
  // Temporary mock data for styling
  const cartItems = [
    { id: 1, name: 'Classic Koa Watch', price: 245, material: 'Koa Wood', image: '/watch-1.jpg' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 z-[100] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} />
                <span className="font-serif text-xl">Your Bag (1)</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="cursor-pointer hover:rotate-90 transition-transform duration-300">
                <X size={24} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 mb-6 group">
                  <div className="w-24 h-32 bg-gray-50 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="font-serif text-lg">{item.name}</h3>
                      <p className="text-xs text-gray-400 uppercase tracking-widest">{item.material}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-brand-gold font-medium">${item.price}</span>
                      <button className="text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer / Checkout */}
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between mb-4">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-serif text-lg">$245.00</span>
              </div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-6 text-center">
                Shipping & taxes calculated at checkout
              </p>
              <button className="w-full bg-brand-dark text-white py-4 uppercase tracking-widest hover:bg-brand-gold transition-colors duration-300">
                Checkout Now
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;