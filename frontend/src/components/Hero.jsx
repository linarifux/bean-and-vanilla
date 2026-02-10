import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero = () => {
  // Parallax Logic
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]); // Moves bg slower than fg
  const opacity = useTransform(scrollY, [0, 600], [1, 0]); // Fades out on scroll

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-brand-dark">
      
      {/* 1. Parallax Background Layer */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <motion.img 
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="https://www.body-piercing.com/blog/wp-content/uploads/2023/06/Cover-SAL-2.jpg" 
          className="w-full h-full object-cover" 
          alt="Bean and Vanilla Luxury Lifestyle"
        />
        {/* Luxury Gradient Overlay - Darker at bottom for text readability */}
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/70" />
      </motion.div>

      {/* 2. Content Layer */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        
        {/* Brand Kicker */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center items-center gap-4 mb-6"
        >
          <div className="h-[1px] w-8 md:w-16 bg-brand-gold/70" />
          <span className="text-brand-gold text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold">
            Est. 2023
          </span>
          <div className="h-[1px] w-8 md:w-16 bg-brand-gold/70" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-5xl md:text-7xl lg:text-9xl font-serif text-white mb-8 leading-[1.1] mix-blend-overlay"
        >
          Timeless <br className="hidden md:block" />
          <span className="italic">Elegance</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-base md:text-xl font-light text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed tracking-wide"
        >
          Where organic textures meet precision engineering. <br className="hidden md:block"/>
          Handcrafted artifacts designed for the modern connoisseur.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          {/* Primary CTA - Glassmorphism Effect */}
          <Link to="/shop-all">
            <button className="group relative px-10 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white uppercase text-[11px] tracking-[0.3em] font-bold overflow-hidden transition-all hover:border-brand-gold">
              <span className="relative z-10 group-hover:text-brand-dark transition-colors duration-500 flex items-center gap-3">
                Discover The Collection <ArrowRight size={16} />
              </span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out" />
            </button>
          </Link>

          {/* Secondary CTA */}
          <Link to="/gift-guide">
            <button className="text-white text-[11px] uppercase tracking-[0.3em] font-bold hover:text-brand-gold transition-colors border-b border-transparent hover:border-brand-gold pb-1">
              Curate a Gift
            </button>
          </Link>
        </motion.div>
      </div>

      {/* 3. Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[9px] uppercase tracking-widest text-white/50">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-white/50" />
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Hero;