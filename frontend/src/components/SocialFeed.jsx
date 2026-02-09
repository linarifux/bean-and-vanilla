import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, ExternalLink } from 'lucide-react';

const SocialFeed = () => {
  const feedItems = [
    { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', handle: '@naim_on_web', type: 'Signature Chrono' },
    { url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a', handle: '@luxury_woods', type: '14K Gold Bracelet' },
    { url: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0', handle: '@artisanal_style', type: 'Sandalwood Ring' },
    { url: 'https://images.unsplash.com/photo-1508685096489-7a316bd4741e', handle: '@timepiece_daily', type: 'Heritage Series' },
    { url: 'https://images.unsplash.com/photo-1434056886845-dac89faf9b17', handle: '@nature_luxe', type: 'Koa Wood Watch' },
    { url: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7', handle: '@watch_collector', type: 'Swiss Movement' }
  ];

  return (
    <section className="py-32 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header with Social Link */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold mb-4"
            >
              #BeanAndVanilla
            </motion.h2>
            <h3 className="text-4xl md:text-5xl font-serif text-brand-dark leading-tight">
              Shared Elegance from <br />Our Global Community
            </h3>
          </div>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            href="https://instagram.com" 
            target="_blank"
            className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold border-b-2 border-brand-gold pb-2 hover:text-brand-gold transition-colors"
          >
            <Instagram size={16} /> Follow Our Journey
          </motion.a>
        </div>
        
        {/* Masonry Grid with Staggered Entrance */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {feedItems.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden break-inside-avoid shadow-sm"
            >
              {/* Image with subtle zoom on hover */}
              <img 
                src={`${item.url}?auto=format&fit=crop&q=80&w=800`} 
                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" 
                alt="Community Post" 
              />

              {/* Sophisticated Overlay */}
              <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-8">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-white/70 uppercase tracking-widest font-medium">
                    {item.handle}
                  </span>
                  <ExternalLink size={14} className="text-white/50" />
                </div>
                
                <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white font-serif text-xl italic">{item.type}</p>
                  <button className="w-full bg-white text-brand-dark text-[9px] uppercase tracking-[0.2em] font-bold py-4 hover:bg-brand-gold hover:text-white transition-colors">
                    View Piece
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialFeed;