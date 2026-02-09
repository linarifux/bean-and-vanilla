import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { Loader2 } from 'lucide-react'; // For a stylish spinner

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // RTK Query Mutation
  const [register, { isLoading }] = useRegisterMutation();

  // Check if user is already logged in
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      try {
        // Trigger the registration mutation
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        alert(err?.data?.message || err.error || 'Registration failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left: Artistic Branding Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-dark relative items-center justify-center p-20 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 opacity-40"
        >
          <img 
            src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1000" 
            alt="Watch Movement" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="relative z-10 text-center">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white font-serif text-5xl mb-6"
          >
            The Vanilla Club
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-bold"
          >
            Excellence is a shared journey
          </motion.p>
        </div>
      </div>

      {/* Right: Registration Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-20 bg-[#FAFAFA]">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-12">
            <h1 className="text-4xl font-serif text-brand-dark mb-4">Create Account</h1>
            <p className="text-gray-400 font-light text-sm">
              Join us for exclusive access to new collections and artisanal stories.
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-8">
            <div className="relative group">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2 block group-focus-within:text-brand-gold transition-colors">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-b border-gray-200 py-3 bg-transparent outline-none focus:border-brand-gold transition-colors text-sm"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="relative group">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2 block group-focus-within:text-brand-gold transition-colors">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-gray-200 py-3 bg-transparent outline-none focus:border-brand-gold transition-colors text-sm"
                placeholder="email@example.com"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative group">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2 block group-focus-within:text-brand-gold transition-colors">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-b border-gray-200 py-3 bg-transparent outline-none focus:border-brand-gold transition-colors text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="relative group">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2 block group-focus-within:text-brand-gold transition-colors">
                  Confirm
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border-b border-gray-200 py-3 bg-transparent outline-none focus:border-brand-gold transition-colors text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-dark text-white py-5 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-brand-gold transition-all duration-500 shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 size={16} className="animate-spin" />}
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-xs text-gray-400 font-light">
              Already a member?{' '}
              <Link 
                to={redirect !== '/' ? `/login?redirect=${redirect}` : '/login'}
                className="text-brand-dark font-bold hover:text-brand-gold transition-colors ml-1"
              >
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterScreen;