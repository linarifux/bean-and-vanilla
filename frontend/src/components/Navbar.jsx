import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, User, Search, Menu, X, LogOut, 
  ChevronRight, ArrowRight, Sparkles, ChevronLeft, 
  ChevronDown, MapPin, HelpCircle, FileText, Heart,
  Truck
} from 'lucide-react';
import { logout } from '../slices/authSlice';

// --- NOTICE BOARD CONFIG ---
const NOTICES = [
  "Complimentary Express Shipping on Orders $150+",
  "New Arrival: The Ebony Chronograph Series",
  "Use Code: ATELIER10 for 10% Off Your First Order"
];

const Navbar = ({ onCartOpen }) => {
  // --- STATE ---
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); 
  
  // Search & Notice
  const [searchQuery, setSearchQuery] = useState('');
  const [liveResults, setLiveResults] = useState([]);
  const [noticeIndex, setNoticeIndex] = useState(0);
  const [showNotice, setShowNotice] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownTimerRef = useRef(null);

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // --- MOCK SEARCH DATA ---
  const products = [
    { _id: '1', name: 'Original Sandalwood Watch', price: 185, category: 'Watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200' },
    { _id: '2', name: 'Golden Hour Bracelet', price: 95, category: 'Jewelry', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=200' },
    { _id: '4', name: 'Heritage Wood Watch', price: 210, category: 'Watches', image: 'https://images.unsplash.com/photo-1434056886845-dac89faf9b17?q=80&w=200' },
  ];

  // --- EFFECTS ---
  useEffect(() => {
    if (!showNotice) return;
    const interval = setInterval(() => {
      setNoticeIndex((prev) => (prev + 1) % NOTICES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [showNotice]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setIsSearchOpen(false);
    setActiveDropdown(null);
    setSearchQuery('');
  }, [location]);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4);
      setLiveResults(filtered);
    } else {
      setLiveResults([]);
    }
  }, [searchQuery]);

  // --- HANDLERS ---
  const handleDropdownEnter = (menu) => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setActiveDropdown(menu);
  };

  const handleDropdownLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleNoticeNav = (dir) => {
    if (dir === 'next') setNoticeIndex((prev) => (prev + 1) % NOTICES.length);
    else setNoticeIndex((prev) => (prev - 1 + NOTICES.length) % NOTICES.length);
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  // --- CONFIG ---
  const navLinks = {
    shop: [
      { label: 'Shop All', path: '/shop-all' },
      { label: 'Watches', path: '/watches' },
      { label: 'Jewelry', path: '/jewelry' },
    ],
    discover: [
      { label: 'Our Story', path: '/about', icon: FileText, desc: "Our heritage and mission." },
      { label: 'Craftsmanship', path: '/craftsmanship', icon: Sparkles, desc: "See how we build." },
      { label: 'Contact Us', path: '/contact', icon: MapPin, desc: "Get in touch." },
      { label: 'FAQ', path: '/faq', icon: HelpCircle, desc: "Common questions." },
    ]
  };

  return (
    <>
      <div className="fixed top-0 w-full z-[100] flex flex-col font-sans">
        
        {/* 1. NOTICE BOARD */}
        <AnimatePresence>
          {showNotice && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-brand-dark text-white relative z-50 border-b border-white/10"
            >
              <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
                <div className="hidden lg:block w-6" /> 
                
                <div className="flex-1 flex items-center justify-center gap-4 overflow-hidden">
                  <button onClick={() => handleNoticeNav('prev')} className="hidden lg:flex p-1 hover:bg-white/10 rounded-full transition-colors">
                    <ChevronLeft size={14} className="text-gray-400 hover:text-white" />
                  </button>
                  
                  <div className="h-5 w-full max-w-[450px] relative overflow-hidden text-center">
                    <AnimatePresence mode="popLayout">
                      <motion.p
                        key={noticeIndex}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-[10px] uppercase tracking-[0.15em] font-bold absolute w-full truncate leading-5"
                      >
                        {NOTICES[noticeIndex]}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  <button onClick={() => handleNoticeNav('next')} className="hidden lg:flex p-1 hover:bg-white/10 rounded-full transition-colors">
                    <ChevronRight size={14} className="text-gray-400 hover:text-white" />
                  </button>
                </div>

                <button onClick={() => setShowNotice(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors ml-2" aria-label="Dismiss Notice">
                  <X size={14} className="text-gray-300" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. MAIN NAVBAR */}
        <nav 
          className={`w-full transition-all duration-300 border-b py-16 ${
            isScrolled || isSearchOpen || activeDropdown 
              ? 'bg-white/95 backdrop-blur-xl border-gray-100 shadow-sm py-3 text-brand-dark' 
              : 'bg-transparent border-transparent py-5 text-brand-dark'
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-6 flex items-center relative">
            
            {/* --- LEFT BLOCK --- */}
            <div className="flex-1 flex items-center justify-start">
              
              {/* Hamburger */}
              <button className="xl:hidden p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors" onClick={() => setMobileMenuOpen(true)} aria-label="Menu">
                <Menu size={24} strokeWidth={1.5} />
              </button>

              {/* Desktop Nav */}
              <div className="hidden xl:flex gap-8 items-center">
                {navLinks.shop.map((item) => (
                  <Link 
                    key={item.label} 
                    to={item.path} 
                    className="text-[10px] uppercase tracking-widest font-bold hover:text-brand-gold transition-colors relative group py-2"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
                
                {/* Dropdown Trigger */}
                <div 
                  className="relative h-full flex items-center"
                  onMouseEnter={() => handleDropdownEnter('discover')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button className={`flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold transition-colors py-2 ${activeDropdown === 'discover' ? 'text-brand-gold' : 'hover:text-brand-gold'}`}>
                    Discover <ChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === 'discover' ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                <Link to="/gift-guide" className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-brand-gold hover:text-brand-dark transition-colors border border-brand-gold/30 px-3 py-2 rounded-full hover:bg-brand-gold hover:border-brand-gold hover:text-white">
                   <Sparkles size={12} /> <span>Gift Guide</span>
                </Link>
              </div>
            </div>

            {/* --- CENTER BLOCK (Updated Logo Style) --- */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <Link to="/" className="flex flex-col items-center group">
                {/* UPDATED LOGO STYLING:
                   - h-8 on mobile, h-12 on desktop: Keeps it constrained.
                   - w-auto: Maintains aspect ratio.
                   - object-contain: Prevents cropping.
                   - scale on hover: Adds a luxury interaction feel.
                */}
                <img 
                  src="./logo2.png" 
                  alt="Bean & Vanilla" 
                  className="h-24 md:h-38 w-auto object-contain transition-transform duration-500 group-hover:scale-105" 
                />
              </Link>
            </div>

            {/* --- RIGHT BLOCK --- */}
            <div className="flex-1 flex items-center justify-end gap-2 md:gap-6">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)} 
                className={`p-2 hover:text-brand-gold transition-colors rounded-full hover:bg-gray-50 ${isSearchOpen ? 'text-brand-gold bg-gray-50' : ''}`}
                aria-label="Search"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>

              {userInfo ? (
                <div className="hidden md:flex items-center gap-4">
                  <Link to="/profile" className="text-[10px] uppercase tracking-widest font-bold hover:text-brand-gold transition-colors">
                    {userInfo.name.split(' ')[0]}
                  </Link>
                  <button onClick={logoutHandler} className="hover:text-red-500 transition-colors p-1" aria-label="Logout">
                    <LogOut size={18} strokeWidth={1.5} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="hidden md:block p-2 hover:text-brand-gold transition-colors">
                  <User size={20} strokeWidth={1.5} />
                </Link>
              )}

              <button onClick={onCartOpen} className="relative p-2 hover:text-brand-gold transition-colors" aria-label="Cart">
                <ShoppingBag size={20} strokeWidth={1.5} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} key={cartCount}
                      className="absolute top-0 right-0 bg-brand-gold text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm ring-2 ring-white"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* 3. DESKTOP MEGA MENU */}
          <AnimatePresence>
            {activeDropdown === 'discover' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 w-full bg-white/98 backdrop-blur-xl border-t border-b border-gray-100 shadow-xl py-12 z-40 hidden xl:block"
                onMouseEnter={() => handleDropdownEnter('discover')}
                onMouseLeave={handleDropdownLeave}
              >
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-4 gap-12">
                  <div className="col-span-1 border-r border-gray-100 pr-8">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold mb-4 block">The World of B&V</span>
                    <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
                      Explore the artistry, sustainability, and stories that define our legacy. Every piece has a journey.
                    </p>
                    <Link to="/about" className="text-[10px] uppercase tracking-widest font-bold underline decoration-brand-gold/30 hover:text-brand-gold transition-colors">
                      Read Our Story
                    </Link>
                  </div>
                  <div className="col-span-3 grid grid-cols-2 gap-x-16 gap-y-8">
                    {navLinks.discover.map((link) => (
                      <Link 
                        key={link.label} 
                        to={link.path}
                        className="group flex items-start gap-4 p-4 -ml-4 hover:bg-gray-50 rounded-xl transition-all duration-300"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div className="mt-1 p-3 bg-white border border-gray-100 rounded-full text-brand-gold shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all">
                          <link.icon size={20} strokeWidth={1.5} />
                        </div>
                        <div>
                          <h4 className="font-serif text-lg text-brand-dark group-hover:text-brand-gold transition-colors flex items-center gap-2">
                            {link.label} <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </h4>
                          <span className="text-xs text-gray-400 font-light block mt-1">{link.desc}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>

      {/* Spacer for Fixed Nav Height - Adjusted for Mobile */}
      <div className={`transition-all duration-300 ${showNotice ? 'h-[116px] md:h-[120px]' : 'h-[75px] md:h-[80px]'} block`} />

      {/* 4. SEARCH OVERLAY */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            className="fixed top-0 left-0 w-full h-screen bg-white/98 backdrop-blur-xl z-[150] overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto px-6 py-20 md:py-24">
              <button 
                type="button" 
                onClick={() => setIsSearchOpen(false)} 
                className="absolute top-6 right-6 md:top-8 md:right-8 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={28} strokeWidth={1} />
              </button>

              <form onSubmit={(e) => { e.preventDefault(); if(searchQuery) navigate(`/search/${searchQuery}`); setIsSearchOpen(false); }} className="relative mb-12 md:mb-16">
                <input 
                  autoFocus
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search masterpieces..." 
                  className="w-full bg-transparent border-b-2 border-gray-100 pb-4 md:pb-6 text-2xl md:text-5xl font-serif text-brand-dark placeholder:text-gray-300 outline-none focus:border-brand-gold transition-colors"
                />
              </form>

              {/* Quick Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {liveResults.length > 0 ? (
                  liveResults.map(p => (
                    <Link key={p._id} to={`/product/${p._id}`} onClick={() => setIsSearchOpen(false)} className="flex items-center gap-6 group p-4 hover:bg-gray-50 rounded-xl transition-colors">
                      <div className="w-20 h-24 bg-gray-100 overflow-hidden rounded-md shadow-sm">
                        <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={p.name} />
                      </div>
                      <div>
                        <h4 className="font-serif text-xl text-brand-dark group-hover:text-brand-gold transition-colors">{p.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">${p.price}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12">
                    <p className="text-gray-400 text-sm mb-4">{searchQuery ? "No matches found." : "Popular Searches"}</p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {['Gold Watch', 'Minimalist Ring', 'Sandalwood', 'Gift Sets'].map(tag => (
                        <button 
                          key={tag} 
                          onClick={() => setSearchQuery(tag)} 
                          className="px-6 py-2 border border-gray-200 rounded-full text-xs uppercase tracking-widest hover:border-brand-gold hover:text-brand-gold transition-all"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. MOBILE MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setMobileMenuOpen(false)} 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]" 
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} 
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 right-0 h-full w-[90%] sm:w-[380px] bg-white z-[201] shadow-2xl flex flex-col"
            >
              <div className="p-5 md:p-6 flex justify-between items-center border-b border-gray-100">
                <span className="text-xs uppercase tracking-widest font-bold text-gray-400">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-5 md:px-6 space-y-8">
                {/* Main Links */}
                <div className="flex flex-col gap-6">
                  {navLinks.shop.map(link => (
                    <Link key={link.label} to={link.path} onClick={() => setMobileMenuOpen(false)} className="text-xl md:text-2xl font-serif text-brand-dark flex justify-between items-center group border-b border-transparent hover:border-gray-100 pb-2">
                      {link.label} <ChevronRight size={18} className="text-gray-300" />
                    </Link>
                  ))}
                  <Link to="/gift-guide" onClick={() => setMobileMenuOpen(false)} className="text-xl md:text-2xl font-serif text-brand-gold flex items-center gap-2">
                    <Sparkles size={20} /> Gift Guide
                  </Link>
                </div>

                {/* Secondary Links */}
                <div className="pt-8 border-t border-gray-100">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-6 block font-bold">Discover</span>
                  <div className="flex flex-col gap-4">
                    {navLinks.discover.map(link => (
                      <Link key={link.label} to={link.path} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-sm text-gray-600 py-2 hover:text-brand-gold transition-colors">
                        <link.icon size={18} className="text-brand-gold"/> {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                {userInfo ? (
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Signed in as</span>
                      <span className="text-sm font-bold">{userInfo.name}</span>
                    </div>
                    <button onClick={logoutHandler} className="text-xs text-red-500 uppercase tracking-widest font-bold border border-red-200 px-4 py-2 rounded-sm hover:bg-red-50 transition-colors">Logout</button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full bg-brand-dark text-white py-4 flex justify-center uppercase text-xs tracking-widest font-bold hover:bg-brand-gold transition-colors">
                    Sign In / Register
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;