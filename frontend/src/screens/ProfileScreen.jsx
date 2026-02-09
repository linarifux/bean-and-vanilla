import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { User, Package, Settings, Camera, CheckCircle, Loader2 } from 'lucide-react';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        alert('Profile updated successfully');
      } catch (err) {
        alert(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-serif text-brand-dark mb-2">My Account</h1>
            <p className="text-gray-400 font-light text-sm tracking-wide">
              Welcome back, <span className="text-brand-gold font-medium">{userInfo.name}</span>
            </p>
          </div>
          <div className="flex bg-white p-1 rounded-sm shadow-sm border border-gray-100">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-2 text-[10px] uppercase tracking-widest font-bold transition-all ${activeTab === 'profile' ? 'bg-brand-dark text-white' : 'text-gray-400 hover:text-brand-dark'}`}
            >
              Settings
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-2 text-[10px] uppercase tracking-widest font-bold transition-all ${activeTab === 'orders' ? 'bg-brand-dark text-white' : 'text-gray-400 hover:text-brand-dark'}`}
            >
              Orders
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Info */}
          <div className="lg:col-span-4">
            <div className="bg-white p-10 border border-gray-100 text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold">
                  <User size={48} strokeWidth={1} />
                </div>
                <button className="absolute bottom-0 right-0 bg-brand-dark text-white p-2 rounded-full hover:bg-brand-gold transition-colors">
                  <Camera size={14} />
                </button>
              </div>
              <h3 className="text-xl font-serif text-brand-dark">{userInfo.name}</h3>
              <p className="text-xs text-gray-400 mb-6">{userInfo.email}</p>
              <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-tighter font-bold text-green-600 bg-green-50 py-2 px-4 rounded-full">
                <CheckCircle size={12} /> Verified Member
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 md:p-12 border border-gray-100 min-h-[500px]"
            >
              {activeTab === 'profile' ? (
                <form onSubmit={submitHandler} className="max-w-xl">
                  <h2 className="text-xl font-serif mb-8 text-brand-dark">Account Details</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Full Name</label>
                        <input 
                          type="text" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)}
                          className="w-full border-b border-gray-100 py-3 outline-none focus:border-brand-gold transition-colors text-sm font-light"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Email Address</label>
                        <input 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full border-b border-gray-100 py-3 outline-none focus:border-brand-gold transition-colors text-sm font-light"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">New Password</label>
                        <input 
                          type="password" 
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full border-b border-gray-100 py-3 outline-none focus:border-brand-gold transition-colors text-sm font-light"
                          placeholder="Leave blank to keep same"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Confirm Password</label>
                        <input 
                          type="password" 
                          value={confirmPassword} 
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full border-b border-gray-100 py-3 outline-none focus:border-brand-gold transition-colors text-sm font-light"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={loadingUpdateProfile}
                      className="mt-10 bg-brand-dark text-white px-12 py-4 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-brand-gold transition-all flex items-center gap-3 disabled:bg-gray-400"
                    >
                      {loadingUpdateProfile && <Loader2 size={14} className="animate-spin" />}
                      Update Profile
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-20">
                  <Package size={48} strokeWidth={1} className="mx-auto text-gray-200 mb-6" />
                  <h3 className="text-xl font-serif text-brand-dark mb-2">No orders yet</h3>
                  <p className="text-gray-400 text-sm font-light mb-8">Your journey with Bean & Vanilla is just beginning.</p>
                  <a href="/shop" className="text-brand-gold text-[10px] uppercase tracking-widest font-bold border-b border-brand-gold pb-1">Start Shopping</a>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;