import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { Loader2 } from 'lucide-react'; // For a premium loading experience

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. Hook into our RTK Query Login Mutation
  const [login, { isLoading }] = useLoginMutation();

  // 2. Select user info from the auth slice
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  // 3. Redirect guard: If user is already logged in, send them away from the login page
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // 4. Unwrap the promise to handle success or error directly
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      // 5. Minimalist error handling - replace with toast notifications later
      alert(err?.data?.message || err.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12 bg-[#FAFAFA]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100"
      >
        <div className="text-center mb-10">
          <h2 className="text-[10px] tracking-[0.4em] uppercase text-brand-gold font-bold mb-4">
            Welcome Back
          </h2>
          <h1 className="text-3xl font-serif text-brand-dark">Sign In</h1>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="group">
            <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold group-focus-within:text-brand-gold transition-colors">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-brand-gold transition-colors bg-transparent"
              required
            />
          </div>

          <div className="group">
            <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold group-focus-within:text-brand-gold transition-colors">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-brand-gold transition-colors bg-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-dark text-white py-4 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-brand-gold transition-all duration-500 shadow-lg shadow-black/5 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading && <Loader2 size={14} className="animate-spin" />}
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-50 pt-8">
          <p className="text-xs text-gray-500 font-light">
            New to Bean and Vanilla?{' '}
            <Link 
              to={redirect !== '/' ? `/register?redirect=${redirect}` : '/register'}
              className="text-brand-dark font-bold hover:text-brand-gold transition-colors underline underline-offset-4 decoration-gray-200"
            >
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginScreen;