import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw } from 'lucide-react';

const MobileFilterDrawer = ({ 
  isOpen, 
  onClose, 
  filters, 
  onToggleFilter, 
  onReset,
  categories,
  materials 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-[100] lg:hidden"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white z-[101] lg:hidden rounded-t-[2rem] max-h-[90vh] overflow-y-auto"
          >
            <div className="p-8 pb-12">
              {/* Header */}
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-[10px] uppercase tracking-[0.5em] font-bold text-brand-dark">Refine Selection</h3>
                <button onClick={onClose} className="p-2"><X size={24} strokeWidth={1} /></button>
              </div>

              {/* Filter Content */}
              <div className="space-y-12">
                <MobileFilterGroup 
                  title="Collections" 
                  items={categories} 
                  activeItems={filters.category} 
                  onToggle={(v) => onToggleFilter('category', v)} 
                />
                
                <MobileFilterGroup 
                  title="Materials" 
                  items={materials} 
                  activeItems={filters.material} 
                  onToggle={(v) => onToggleFilter('material', v)} 
                />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-16 border-t border-gray-100 pt-8">
                <button 
                  onClick={onReset}
                  className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest font-bold py-5 border border-gray-100"
                >
                  <RotateCcw size={14} /> Reset
                </button>
                <button 
                  onClick={onClose}
                  className="bg-brand-dark text-white py-5 text-[10px] uppercase tracking-widest font-bold shadow-xl"
                >
                  Show Results
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const MobileFilterGroup = ({ title, items, activeItems, onToggle }) => (
  <div className="space-y-6">
    <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold">{title}</p>
    <div className="flex flex-wrap gap-3">
      {items.map(item => (
        <button
          key={item}
          onClick={() => onToggle(item)}
          className={`px-6 py-3 text-[10px] uppercase tracking-widest font-medium border transition-all ${
            activeItems.includes(item) 
              ? 'bg-brand-dark text-white border-brand-dark' 
              : 'bg-white text-gray-500 border-gray-200'
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  </div>
);

export default MobileFilterDrawer;