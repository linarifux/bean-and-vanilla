import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'All Collections', path: '/shop' },
      { name: 'Watches', path: '/watches' },
      { name: 'Jewelry', path: '/jewelry' },
      { name: 'New Arrivals', path: '/new' },
    ],
    company: [
      { name: 'Our Story', path: '/about' },
      { name: 'Craftsmanship', path: '/craftsmanship' },
      { name: 'Sustainability', path: '/eco' },
      { name: 'Journal', path: '/blog' },
    ],
    support: [
      { name: 'Track Order', path: '/track' },
      { name: 'Shipping & Returns', path: '/shipping' },
      { name: 'Warranty', path: '/warranty' },
      { name: 'Contact Us', path: '/contact' },
    ],
  };

  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section: Branding & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-block mb-6">
              <h2 className="text-2xl font-serif tracking-[0.2em]">
                BEAN <span className="text-brand-gold italic">&</span> VANILLA
              </h2>
            </Link>
            <p className="text-gray-400 font-light leading-relaxed max-w-sm mb-8">
              Crafting timeless accessories from nature's finest materials. Join our community for exclusive drops and stories behind our craft.
            </p>
            <form className="relative max-w-md group" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Join the Vanilla Club" 
                className="w-full bg-transparent border-b border-white/20 py-4 text-sm font-light outline-none focus:border-brand-gold transition-colors placeholder:text-gray-600"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-gold hover:translate-x-2 transition-transform duration-300">
                <ArrowRight size={20} />
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold mb-6">Shop</h4>
              <ul className="space-y-4">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-gray-400 hover:text-white transition-colors font-light">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold mb-6">Experience</h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-gray-400 hover:text-white transition-colors font-light">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold mb-6">Inquiries</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-gray-400 font-light">
                  <MapPin size={16} className="text-brand-gold" /> 
                  <span>London, United Kingdom</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400 font-light">
                  <Mail size={16} className="text-brand-gold" />
                  <span>concierge@beanandvanilla.com</span>
                </li>
              </ul>
              <div className="flex gap-5 mt-8">
                <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors"><Instagram size={18} /></a>
                <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors"><Facebook size={18} /></a>
                <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors"><Twitter size={18} /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Legal & Payments */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] uppercase tracking-widest text-gray-600 font-medium">
            © {currentYear} Bean & Vanilla. All Rights Reserved.
          </div>
          
          <div className="flex items-center gap-6">
             {/* Payment Icons Placeholder */}
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="Amex" className="h-5" />
          </div>

          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-gray-600">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;