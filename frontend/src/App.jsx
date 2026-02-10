import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';

// Core Screens
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import SearchScreen from './screens/SearchScreen';

// Collection Screens
import ShopAllScreen from './screens/ShopAllScreen';
import WatchCollectionScreen from './screens/WatchCollectionScreen';
import JewelryCollectionScreen from './screens/JewelryCollectionScreen';

// Transaction Screens
import CheckoutScreen from './screens/CheckoutScreen';

// Gift Concierge Screens
import GiftGuideScreen from './screens/GiftGuideScreen';
import GiftCurationScreen from './screens/GiftCurationScreen';

// Information Screens
import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';
import FAQScreen from './screens/FAQScreen';
import ShippingScreen from './screens/ShippingScreen';
import ReturnsScreen from './screens/ReturnsScreen';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      
      {/* Main Layout Wrapper */}
      <div className="flex flex-col min-h-screen bg-[#FAFAFA] font-sans text-brand-dark antialiased selection:bg-brand-gold selection:text-white">
        
        {/* Navigation & Cart Overlay */}
        <Navbar onCartOpen={() => setIsCartOpen(true)} />
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        
        {/* Main Content Area */}
        <main className="flex-grow pt-22 md:pt-22">
          <AnimatePresenceWrapper>
            <Routes>
              {/* --- Core Pages --- */}
              <Route path="/" element={<HomeScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              
              {/* --- Discovery & Product Pages --- */}
              <Route path="/shop-all" element={<ShopAllScreen />} />
              <Route path="/watches" element={<WatchCollectionScreen />} />
              <Route path="/jewelry" element={<JewelryCollectionScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/search/:keyword" element={<SearchScreen />} />

              {/* --- Transaction Flow --- */}
              <Route path="/checkout" element={<CheckoutScreen />} />

              {/* --- Gift Concierge Flow --- */}
              <Route path="/gift-guide" element={<GiftGuideScreen />} />
              <Route path="/curation" element={<GiftCurationScreen />} />

              {/* --- Company & Support Pages --- */}
              <Route path="/about" element={<AboutScreen />} />
              <Route path="/craftsmanship" element={<AboutScreen />} />
              <Route path="/contact" element={<ContactScreen />} />
              <Route path="/faq" element={<FAQScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/returns" element={<ReturnsScreen />} />
              <Route path="/warranty" element={<ReturnsScreen />} />

              {/* --- 404 Fallback --- */}
              <Route path="*" element={<NotFoundScreen />} />
            </Routes>
          </AnimatePresenceWrapper>
        </main>

        <ConditionalFooter />
      </div>
    </Router>
  );
}

// Helper: Hides footer on Checkout page for a cleaner interface
const ConditionalFooter = () => {
  const location = useLocation();
  // Hide footer only on the checkout route
  if (location.pathname === '/checkout') {
    return null; 
  }
  return <Footer />;
};

// Helper: Wrapper for future page transitions
const AnimatePresenceWrapper = ({ children }) => {
  return <>{children}</>;
};

export default App;