import React from 'react'

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const MaterialGallery = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const materials = [
    {
      id: "01",
      title: "Indonesian Sandalwood",
      desc: "Reclaimed from high-end furniture off-cuts, our Sandalwood retains its natural fragrance and deep grain.",
      img: "https://images.unsplash.com/photo-1547991230-5fd2df33036d?q=80&w=1000",
      label: "1998"
    },
    {
      id: "02",
      title: "14K Recycled Gold",
      desc: "Ethically refined and endlessly lustrous. Reclaimed from existing jewelry to minimize impact.",
      img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000",
      label: "Certified"
    }
  ];

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#050505] overflow-hidden">
      <div className="sticky top-0 h-screen flex items-center">
        {/* Fixed Backdrop Text */}
        <motion.div 
          style={{ x: bgX }}
          className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap text-[22vw] font-serif font-black text-white/[0.03] pointer-events-none z-0"
        >
          CRAFTSMANSHIP • HERITAGE • NATURE
        </motion.div>

        <motion.div style={{ x }} className="relative z-10 flex gap-[12vw] px-[15vw] items-center">
          {materials.map((m) => (
            <div key={m.id} className="relative w-[450px] shrink-0 group">
              <div className="relative overflow-hidden aspect-[4/5] mb-12 shadow-2xl bg-white/5 border border-white/10">
                <img src={m.img} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" alt={m.title} />
                <div className="absolute top-0 right-4 text-[10px] tracking-[0.4em] text-white/40 font-bold py-6 z-20" style={{ writingMode: 'vertical-rl' }}>{m.label}</div>
              </div>
              <div className="space-y-4">
                <span className="text-[#B8860B] text-[10px] font-bold uppercase tracking-[0.5em] block">Material {m.id}</span>
                <h4 className="text-white font-serif text-4xl italic">{m.title}</h4>
                <p className="text-gray-400 font-light leading-relaxed text-sm max-w-sm">{m.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MaterialGallery