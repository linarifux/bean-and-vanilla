import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  User, 
  Search, 
  Menu, 
  X, 
  LogOut, 
  ChevronRight, 
  ArrowRight 
} from 'lucide-react';
import { logout } from '../slices/authSlice';

const Navbar = ({ onCartOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [liveResults, setLiveResults] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Mock Products - Replace this with your actual Redux state or API call
  const products = [
    { _id: '1', name: 'Original Sandalwood Watch', price: 185, category: 'Watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200' },
    { _id: '2', name: 'Golden Hour Bracelet', price: 95, category: 'Jewelry', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=200' },
    { _id: '4', name: 'Heritage Wood Watch', price: 210, category: 'Watches', image: 'https://images.unsplash.com/photo-1434056886845-dac89faf9b17?q=80&w=200' },
  ];

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // Instant Search Logic
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [location]);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
      setIsSearchOpen(false);
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  const textClass = isScrolled 
    ? 'text-brand-dark' 
    : 'text-brand-dark drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]';

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg py-3' : 'bg-transparent py-6'
      }`}>
        <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-colors duration-500 ${textClass}`}>
          
          {/* Left: Desktop Links */}
          <div className="hidden md:flex gap-10 uppercase text-[10px] tracking-[0.3em] font-bold">
            {['Shop All', 'Watches', 'Jewelry'].map((item) => (
              <Link key={item} to={`/${item.toLowerCase().replace(' ', '-')}`} className="relative group overflow-hidden">
                <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">{item}</span>
                <span className="absolute left-0 top-full inline-block transition-transform duration-500 group-hover:-translate-y-full text-brand-gold italic">{item}</span>
              </Link>
            ))}
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link to="/" className="flex flex-col items-center group">
              <h1 className="text-xl md:text-2xl font-serif tracking-[0.2em] whitespace-nowrap">
                BEAN <span className="text-brand-gold italic">&</span> VANILLA
              </h1>
              <motion.div animate={{ width: isScrolled ? '0%' : '100%' }} className="h-[1px] bg-brand-gold scale-x-50 group-hover:scale-x-100 transition-transform duration-700" />
            </Link>
          </div>

          {/* Right: Modern Actions */}
          <div className="flex items-center gap-2 md:gap-5">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 hover:text-brand-gold transition-all cursor-pointer">
              <Search size={20} strokeWidth={1.5} />
            </button>

            {/* User Account Logic */}
            {userInfo ? (
              <div className="hidden sm:flex items-center gap-4">
                <Link to="/profile" className="text-[10px] uppercase tracking-widest font-bold hover:text-brand-gold transition-colors">
                  {userInfo.name.split(' ')[0]}
                </Link>
                <button onClick={logoutHandler} className="hover:text-red-500 transition-all cursor-pointer">
                  <LogOut size={18} strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:block p-2 hover:text-brand-gold transition-all">
                <User size={20} strokeWidth={1.5} />
              </Link>
            )}

            <button onClick={onCartOpen} className="group relative p-2 hover:text-brand-gold transition-all cursor-pointer">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    exit={{ scale: 0 }} 
                    className="absolute top-1 right-1 bg-brand-gold text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-md ring-2 ring-white/20"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* --- LIVE SEARCH OVERLAY --- */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} 
              animate={{ height: 'auto', opacity: 1 }} 
              exit={{ height: 0, opacity: 0 }} 
              className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-2xl overflow-hidden"
            >
              <div className="max-w-3xl mx-auto px-6 py-10">
                <form onSubmit={searchSubmitHandler} className="flex items-center border-b border-brand-dark/10 pb-4">
                  <input 
                    autoFocus
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Start typing..." 
                    className="w-full bg-transparent text-brand-dark font-serif text-3xl outline-none placeholder:text-gray-200"
                  />
                  <X size={24} className="text-gray-400 cursor-pointer" onClick={() => setIsSearchOpen(false)} />
                </form>

                <div className="mt-8">
                  {liveResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {liveResults.map((product) => (
                        <Link 
                          key={product._id} 
                          to={`/product/${product._id}`}
                          className="flex items-center gap-4 group p-2 hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-16 h-20 bg-gray-100 overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div>
                            <h4 className="text-sm font-serif text-brand-dark">{product.name}</h4>
                            <p className="text-xs text-brand-gold">${product.price}.00</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : searchQuery.length > 1 ? (
                    <p className="text-sm text-gray-400 italic">No exact matches found...</p>
                  ) : (
                    <div className="flex gap-4 text-[10px] uppercase tracking-widest text-gray-400">
                      <span>Trending:</span>
                      <button onClick={() => setSearchQuery('Watch')} className="hover:text-brand-gold">Watches</button>
                      <button onClick={() => setSearchQuery('Sandalwood')} className="hover:text-brand-gold">Sandalwood</button>
                    </div>
                  )}
                </div>

                {liveResults.length > 0 && (
                  <button onClick={searchSubmitHandler} className="mt-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold group">
                    View All Results <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- MOBILE DRAWER --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setMobileMenuOpen(false)} 
              className="fixed inset-0 bg-brand-dark/70 backdrop-blur-sm z-[59]" 
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }} 
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[60] p-10 flex flex-col shadow-2xl"
            >
              <button className="self-end mb-12" onClick={() => setMobileMenuOpen(false)}>
                <X size={32} strokeWidth={1} />
              </button>

              <div className="flex flex-col gap-8 text-3xl font-serif text-brand-dark">
                {['Shop All', 'Watches', 'Jewelry', 'Our Story'].map((item) => (
                  <Link key={item} to={`/${item.toLowerCase().replace(' ', '-')}`} className="flex items-center justify-between group">
                    <span>{item}</span>
                    <ChevronRight size={20} className="text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>

              <div className="mt-auto pt-10 border-t border-gray-100">
                {userInfo ? (
                  <div className="flex flex-col gap-4">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Account: {userInfo.name}</p>
                    <button onClick={logoutHandler} className="text-red-500 text-xs uppercase tracking-widest font-bold text-left cursor-pointer">Logout</button>
                  </div>
                ) : (
                  <Link to="/login" className="flex items-center gap-2 text-brand-gold text-xs uppercase tracking-widest font-bold">
                    <User size={14} /> Sign In / Register
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