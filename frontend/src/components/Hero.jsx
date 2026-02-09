import React from 'react'

const Hero = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image/Video */}
      <img 
        src="https://www.body-piercing.com/blog/wp-content/uploads/2023/06/Cover-SAL-2.jpg" 
        className="absolute w-full h-full object-cover" 
        alt="Bean and Vanilla Luxury"
      />
      <div className="absolute inset-0 bg-black/30" /> {/* Overlay */}

      <div className="relative text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-serif mb-6">Timeless Elegance</h1>
        <p className="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto">
          Handcrafted jewelry and watches designed for those who appreciate the finer details in life.
        </p>
        <button className="bg-white text-brand-dark px-10 py-4 uppercase tracking-widest hover:bg-brand-gold hover:text-white transition-all duration-300">
          Shop the Collection
        </button>
      </div>
    </section>
  );
};

export default Hero