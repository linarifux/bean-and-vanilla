import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, ArrowRight, Check, CreditCard, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  const footerLinks = {
    shop: [
      { name: 'Shop All', path: '/shop' },
      { name: 'Watches', path: '/watches' },
      { name: 'Jewelry', path: '/jewelry' },
      { name: 'Gift Guide', path: '/gift-guide' },
    ],
    company: [
      { name: 'Our Story', path: '/about' },
      { name: 'Sustainability', path: '/about' }, // Pointing to About for now
      { name: 'The Atelier', path: '/craftsmanship' },
      { name: 'Journal', path: '/about' }, // Placeholder
    ],
    support: [
      { name: 'Shipping & Returns', path: '/shipping' },
      { name: 'Warranty', path: '/warranty' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Contact Us', path: '/contact' },
    ],
  };

  return (
    <footer className="bg-[#050505] text-white pt-24 pb-12 border-t border-white/5 font-sans relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- Top Section: Brand & Newsletter --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 pb-20 border-b border-white/5">
          
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-block mb-8 group">
              <h2 className="text-3xl font-serif tracking-[0.2em] text-white group-hover:text-brand-gold transition-colors duration-500">
                BEAN <span className="text-brand-gold italic">&</span> VANILLA
              </h2>
            </Link>
            <p className="text-gray-400 font-light leading-relaxed max-w-md mb-10 text-sm">
              Crafting timeless artifacts from nature's finest materials. Join our inner circle for exclusive drops, private sales, and stories from the artisan's bench.
            </p>
            
            {/* Interactive Newsletter Form */}
            <form onSubmit={handleSubscribe} className="relative max-w-md group">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address" 
                disabled={status === 'success'}
                className="w-full bg-transparent border-b border-white/20 py-4 text-sm font-light outline-none focus:border-brand-gold transition-all placeholder:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button 
                type="submit"
                disabled={status !== 'idle'}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-gold hover:text-white transition-colors duration-300 disabled:opacity-50"
              >
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <Check size={20} className="text-green-400" />
                    </motion.div>
                  ) : status === 'loading' ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-5 h-5 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                      <ArrowRight size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
              
              {status === 'success' && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="absolute -bottom-8 left-0 text-[10px] uppercase tracking-widest text-green-400 font-bold"
                >
                  Welcome to the club.
                </motion.p>
              )}
            </form>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10 lg:gap-4 lg:pl-12">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold mb-8">Collections</h4>
              <ul className="space-y-5">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block font-light">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold mb-8">Legacy</h4>
              <ul className="space-y-5">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block font-light">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold mb-8">Concierge</h4>
              <ul className="space-y-5">
                <li className="flex items-start gap-3 text-sm text-gray-400 font-light group cursor-default">
                  <MapPin size={16} className="text-brand-gold mt-1 group-hover:text-white transition-colors" /> 
                  <span>123 Artisan Row<br/>London, UK SW1A 1AA</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400 font-light group">
                  <Mail size={16} className="text-brand-gold group-hover:text-white transition-colors" />
                  <a href="mailto:concierge@beanvanilla.com" className="hover:text-white transition-colors">concierge@bv.com</a>
                </li>
              </ul>
              
              <div className="flex gap-6 mt-10">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-gold transition-colors transform hover:scale-110 duration-300"><Instagram size={20} /></a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-gold transition-colors transform hover:scale-110 duration-300"><Facebook size={20} /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-gold transition-colors transform hover:scale-110 duration-300"><Twitter size={20} /></a>
              </div>
            </div>
          </div>
        </div>

        {/* --- Bottom Section: Legal & Credits --- */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-[10px] uppercase tracking-widest text-gray-600 font-medium">
            <span>© {currentYear} Bean & Vanilla.</span>
            <span className="hidden md:inline text-gray-800">|</span>
            <Link to="/privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand-gold transition-colors">Terms of Service</Link>
          </div>
          
          {/* Payment Methods */}
          <div className="flex items-center gap-3 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 hover:opacity-100">
             <Lock size={16} className="text-green-500" />
             <span className="text-[10px] uppercase tracking-widest font-bold mr-2">Secure SSL</span>
             <CreditCard size={24}/>
             {/* Add real payment icons here if desired */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;