import { motion } from 'framer-motion';

const Press = () => {
  const logos = ["VOGUE", "GQ", "ESQUIRE", "BAZAAR", "FORBES", "Wired"];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden border-b border-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 1. Logo Marquee */}
        <div className="relative mb-16 md:mb-20">
          <div className="flex overflow-hidden group">
            <motion.div 
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              className="flex gap-12 md:gap-20 items-center shrink-0 pr-12 md:pr-20"
            >
              {[...logos, ...logos, ...logos].map((logo, i) => (
                <span key={i} className="text-xl md:text-4xl font-serif text-gray-200 tracking-tighter hover:text-brand-gold transition-colors cursor-default whitespace-nowrap">
                  {logo}
                </span>
              ))}
            </motion.div>
          </div>
          
          {/* Gradient Fades - Adjusted for Mobile width */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10" />
        </div>

        {/* 2. Feature Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left: Context */}
          <div className="lg:col-span-4 text-center lg:text-left">
             <div className="h-px w-12 bg-brand-gold mb-6 mx-auto lg:mx-0" />
             <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-dark mb-4">
               Global Recognition
             </h3>
             <p className="text-gray-400 font-light text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
               Our commitment to sustainable luxury has caught the eye of the world's leading fashion authorities.
             </p>
          </div>

          {/* Right: The Quote */}
          {/* Mobile: Top border / Desktop: Left border */}
          <div className="lg:col-span-8 pt-8 lg:pt-0 lg:pl-20 border-t lg:border-t-0 lg:border-l border-gray-100 text-center lg:text-left">
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xl md:text-3xl lg:text-4xl font-serif italic text-brand-dark leading-snug md:leading-snug"
            >
              "Bean & Vanilla represents the new guard of jewelry. It's rare to see raw organic materials handled with such surgical precision."
            </motion.p>
            <p className="mt-6 md:mt-8 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold">
              — The New York Style Journal
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Press;