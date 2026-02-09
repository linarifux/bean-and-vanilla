import { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import FeaturedSlider from '../components/FeaturedSlider';
import QuickView from '../components/QuickView';
import Press from '../components/Press';
import Ensemble from '../components/Ensemble';
import Timeline from '../components/Timeline';
import SocialFeed from '../components/SocialFeed';

const HomeScreen = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  // Mock Data (To be replaced by RTK Query later)
  const watches = [
    { _id: '1', name: 'Original Sandalwood Watch', price: 185, category: 'Watches', material: 'Sandalwood', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999' },
    { _id: '4', name: 'Heritage Wood Watch', price: 210, category: 'Watches', material: 'Koa Wood', image: 'https://images.unsplash.com/photo-1434056886845-dac89faf9b17?q=80&w=2070' },
    { _id: '5', name: 'Midnight Ebony Series', price: 225, category: 'Watches', material: 'Ebony', image: 'https://images.unsplash.com/photo-1508685096489-7a316bd4741e?q=80&w=2000' },
    { _id: '6', name: 'Oceanic Blue Diver', price: 250, category: 'Watches', material: 'Maple', image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=2000' },
  ];

  const jewelry = [
    { _id: '2', name: 'Golden Hour Bracelet', price: 95, category: 'Jewelry', material: '14k Gold', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070' },
    { _id: '3', name: 'Minimalist Koa Ring', price: 120, category: 'Rings', material: 'Koa & Silver', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070' },
    { _id: '7', name: 'Silver Birch Bangle', price: 85, category: 'Jewelry', material: 'Birch Wood', image: 'https://images.unsplash.com/photo-1535633302704-b02f4faad767?q=80&w=2000' },
    { _id: '8', name: 'Earthy Amber Pendant', price: 110, category: 'Jewelry', material: 'Amber Resin', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="bg-[#FAFAFA] overflow-x-hidden"
    >
      <Hero />

      {/* World Class Trust Section */}
      <Press />

      {/* Watches Collection Slider */}
      <FeaturedSlider 
        products={watches} 
        title="Signature Timepieces" 
        subtitle="Sustainable Luxury" 
        onQuickView={openQuickView}
      />


      {/* Interactive Lookbook Section */}
      <Ensemble />

      {/* Jewelry Collection Slider */}
      <FeaturedSlider 
        products={jewelry} 
        title="Handcrafted Jewelry" 
        subtitle="Exquisite Details" 
        onQuickView={openQuickView}
      />

      {/* Mid-Page Brand Story Section */}
      <section className="relative h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974" 
            className="w-full h-full object-cover grayscale opacity-40" 
            alt="Craftsmanship" 
          />
          <div className="absolute inset-0 bg-brand-dark/95 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 text-white">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-tight italic">
              Designed by Nature,<br />Perfected by Hand.
            </h2>
            <div className="h-px w-20 bg-brand-gold mx-auto mb-10" />
            <p className="text-gray-300 font-light text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
              Every Bean and Vanilla piece tells a story. From sustainable sandalwood to premium stainless steel, we blend the earth’s raw beauty with modern precision.
            </p>
            <button className="border border-white/20 text-white px-12 py-4 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-white hover:text-brand-dark transition-all duration-500">
              Discover Our Process
            </button>
          </motion.div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickView 
        product={selectedProduct} 
        isOpen={isQuickViewOpen} 
        onClose={() => setIsQuickViewOpen(false)} 
      />

      {/* Enhanced Final Trust Bar */}
      <section className="py-24 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {[
            { label: 'Free Shipping', desc: 'On all orders over $150' },
            { label: '2 Year Warranty', desc: 'Quality you can trust' },
            { label: 'Eco Friendly', desc: 'Sustainable wood sources' },
            { label: 'Secure Payment', desc: '100% Protected transactions' },
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h5 className="uppercase text-[11px] tracking-[0.3em] font-bold mb-3 text-brand-dark">{item.label}</h5>
              <div className="h-[1px] w-8 bg-brand-gold mx-auto mb-4" />
              <p className="text-xs text-gray-400 font-light tracking-wide">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <Timeline />

      <SocialFeed />
    </motion.div>
  );
};

export default HomeScreen;