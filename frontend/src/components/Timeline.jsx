import React from 'react'

import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';

const Timeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const milestones = [
    { year: '2015', title: 'The First Grain', desc: 'Naim hand-carved the first sandalwood prototype in a small home studio.' },
    { year: '2018', title: 'Global Sourcing', desc: 'Partnered with FSC-certified plantations in Indonesia for sustainable sourcing.' },
    { year: '2022', title: 'Vanilla & Gold', desc: 'Expanded into premium jewelry, blending raw wood with 14k recycled gold.' },
    { year: '2026', title: 'The Digital Flagship', desc: 'Launching a world-class digital experience for the global community.' }
  ];

  return (
    <section ref={containerRef} className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative">
        {/* Progress Line */}
        <motion.div 
          style={{ scaleY }}
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-brand-gold origin-top hidden md:block"
        />

        {milestones.map((item, index) => (
          <div key={index} className={`flex flex-col md:flex-row items-center mb-24 last:mb-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="md:w-1/2 px-12 text-center md:text-left">
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-brand-gold font-serif text-5xl italic mb-4 block">{item.year}</span>
                <h4 className="text-xl uppercase tracking-widest font-bold text-brand-dark mb-4">{item.title}</h4>
                <p className="text-gray-400 font-light text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            </div>
            {/* Center Circle */}
            <div className="w-4 h-4 rounded-full bg-brand-dark border-2 border-brand-gold z-10 my-6 md:my-0 shadow-xl" />
            <div className="md:w-1/2" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline