import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Shield, Zap, Globe } from 'lucide-react';

const Atelier = () => {
  const [activeSpec, setActiveSpec] = useState(0);

  const specs = [
    {
      id: 0,
      title: "Swiss Precision",
      icon: Settings,
      desc: "Powered by the Ronda 5030.D Quartz movement, ensuring split-second accuracy for decades.",
      detail: "Gold-Plated / 13 Jewels"
    },
    {
      id: 1,
      title: "Hardened Sapphire",
      icon: Shield,
      desc: "A crystal second only to diamond in hardness. Scratch-resistant and anti-reflective.",
      detail: "Mohs Scale: 9"
    },
    {
      id: 2,
      title: "Surgical Steel",
      icon: Zap,
      desc: "316L Stainless Steel core providing the structural integrity required for a lifetime of wear.",
      detail: "Hypoallergenic"
    }
  ];

  return (
    <section className="py-32 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Left: Interactive Specs List */}
          <div className="lg:w-1/2 space-y-6">
            <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.6em] mb-4 block">
              Engineering Excellence
            </span>
            <h2 className="text-5xl font-serif italic mb-12">The Anatomy of a <br/> Masterpiece</h2>
            
            <div className="space-y-4">
              {specs.map((spec, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setActiveSpec(i)}
                  className={`w-full text-left p-8 border transition-all duration-500 group ${
                    activeSpec === i ? 'bg-white/5 border-brand-gold/50' : 'border-white/5 bg-transparent'
                  }`}
                >
                  <div className="flex items-start gap-6">
                    <spec.icon className={`mt-1 ${activeSpec === i ? 'text-brand-gold' : 'text-gray-600'}`} size={24} />
                    <div>
                      <h4 className={`text-lg font-serif mb-2 transition-colors ${activeSpec === i ? 'text-white' : 'text-gray-500'}`}>
                        {spec.title}
                      </h4>
                      <AnimatePresence mode="wait">
                        {activeSpec === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                          >
                            <p className="text-sm text-gray-400 font-light leading-relaxed mb-4">{spec.desc}</p>
                            <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold">{spec.detail}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Dynamic Visual Blueprint */}
          <div className="lg:w-1/2 relative aspect-square flex items-center justify-center">
            {/* Using the Technical Spec file mentioned in your history */}
            <AnimatePresence mode="wait">
              <motion.img
                key={activeSpec}
                src="/image_765764.png" // Your uploaded technical blueprint
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full h-full object-contain mix-blend-lighten contrast-125"
                alt="Technical Blueprint"
              />
            </AnimatePresence>
            
            {/* Animated Glow Effect */}
            <div className="absolute inset-0 bg-brand-gold/5 rounded-full blur-[120px] animate-pulse pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Atelier;