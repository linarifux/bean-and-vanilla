import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Leaf, Heart } from 'lucide-react';

const AboutScreen = () => {
  return (
    <div className="bg-white min-h-screen text-brand-dark font-sans">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=2000" 
            alt="Artisan Workshop" 
            className="w-full h-full object-cover grayscale opacity-30"
          />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-[10px] uppercase tracking-[0.6em] text-brand-gold font-bold mb-6 block">Our Heritage</span>
            <h1 className="text-5xl md:text-7xl font-serif italic mb-6">Born from Nature</h1>
            <p className="text-gray-500 font-light text-lg max-w-xl mx-auto">
              We believe luxury shouldn't cost the earth. Every piece we craft tells a story of reclaimed beauty and meticulous engineering.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Story */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="order-2 md:order-1">
          <img src="https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?q=80&w=1000" alt="Watch Detail" className="w-full h-auto shadow-xl" />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-serif italic mb-8">The Philosophy</h2>
          <p className="text-gray-500 leading-loose mb-6 font-light">
            It started with a simple question: Why must luxury be synonymous with waste? Bean & Vanilla was founded on the principle that the most beautiful materials—Koa wood offcuts, recycled gold, reclaimed sandalwood—already exist. They just need a new life.
          </p>
          <p className="text-gray-500 leading-loose font-light">
            Our artisans spend days, not hours, on a single piece. We don't chase trends; we chase permanence. An object that feels substantial in your hand and light on your conscience.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-dark text-white py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-serif italic">Our Pillars</h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <ValueCard icon={Hammer} title="Handcrafted" desc="Machine precision, finished by human hands to ensure soul in every curve." />
          <ValueCard icon={Leaf} title="Sustainable" desc="We use 100% reclaimed woods and recycled metals. Zero virgin plastic." />
          <ValueCard icon={Heart} title="Transparent" desc="Fair wages for our artisans and clear sourcing for our materials." />
        </div>
      </section>
    </div>
  );
};

const ValueCard = ({ icon: Icon, title, desc }) => (
  <div className="text-center p-8 border border-white/10 hover:border-brand-gold transition-colors duration-500 group">
    <div className="inline-flex p-4 bg-white/5 rounded-full mb-6 text-brand-gold group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-serif mb-4">{title}</h3>
    <p className="text-gray-400 font-light text-sm leading-relaxed">{desc}</p>
  </div>
);

export default AboutScreen;