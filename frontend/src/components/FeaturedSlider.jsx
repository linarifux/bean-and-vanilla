import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import ProductCard from './ProductCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FeaturedSlider = ({ products, title, subtitle, onQuickView }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header with Custom Navigation */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold mb-2">
              {subtitle || 'Curated for you'}
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-brand-dark">
              {title || 'Featured Pieces'}
            </h2>
          </div>
          
          <div className="hidden md:flex gap-4">
            <button className="swiper-prev-btn p-3 border border-gray-100 hover:border-brand-gold hover:text-brand-gold transition-all cursor-pointer group">
              <ArrowLeft size={20} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button className="swiper-next-btn p-3 border border-gray-100 hover:border-brand-gold hover:text-brand-gold transition-all cursor-pointer group">
              <ArrowRight size={20} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Swiper Implementation */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-next-btn',
            prevEl: '.swiper-prev-btn',
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="pb-12"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id} className="py-4">
              <ProductCard 
                product={product} 
                onQuickView={onQuickView} 
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedSlider;