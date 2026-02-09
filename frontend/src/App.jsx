import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import NotFoundScreen from './screens/NotFoundScreen';
import SearchScreen from './screens/SearchScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen bg-[#FAFAFA] font-sans">
        <Navbar onCartOpen={() => setIsCartOpen(true)} />
        <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
        
        <main className="pt-20"> {/* Padding to account for fixed navbar */}
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/search/:keyword" element={<SearchScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />

            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;