import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Briefcase, GraduationCap, Gift, ArrowRight, 
  ChevronLeft, Sparkles, Share2, User, Users, Gem, 
  Watch, CheckCircle2 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GiftGuideScreen = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Robust State Management
  const [selections, setSelections] = useState({
    recipient: '',
    occasion: '',
    style: '',
    budget: ''
  });

  // --- Configuration Data ---
  const questions = [
    {
      id: 1,
      title: "Who is the muse?",
      subtitle: "Tell us who we are celebrating today.",
      key: 'recipient',
      options: [
        { value: 'him', label: 'For Him', icon: User },
        { value: 'her', label: 'For Her', icon: User },
        { value: 'them', label: 'For Them', icon: Users },
        { value: 'myself', label: 'For Myself', icon: Sparkles },
      ]
    },
    {
      id: 2,
      title: "The Milestone",
      subtitle: "What is the occasion being honored?",
      key: 'occasion',
      options: [
        { value: 'anniversary', label: 'Anniversary', icon: Heart },
        { value: 'professional', label: 'Promotion', icon: Briefcase },
        { value: 'graduation', label: 'Graduation', icon: GraduationCap },
        { value: 'general', label: 'Just Because', icon: Gift },
      ]
    },
    {
      id: 3,
      title: "The Aesthetic",
      subtitle: "Which style resonates most with them?",
      key: 'style',
      options: [
        { value: 'minimalist', label: 'Minimalist', icon: Watch, desc: 'Clean lines, understated.' },
        { value: 'statement', label: 'Statement', icon: Gem, desc: 'Bold, unique, eye-catching.' },
        { value: 'classic', label: 'Timeless', icon: Sparkles, desc: 'Heritage, traditional.' },
      ]
    },
    {
      id: 4,
      title: "The Investment",
      subtitle: "Define the scope of this gesture.",
      key: 'budget',
      options: [
        { value: 'low', label: 'Under $150', desc: 'Artisanal Essentials' },
        { value: 'mid', label: '$150 - $300', desc: 'Signature Pieces' },
        { value: 'high', label: '$300+', desc: 'Heirloom Quality' },
      ]
    }
  ];

  // --- Logic Handlers ---
  const handleSelection = (key, value) => {
    setSelections(prev => ({ ...prev, [key]: value }));
    if (step < 4) {
      setStep(prev => prev + 1);
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(5); 
      }, 2500);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const finalizeCuration = () => {
    const params = new URLSearchParams(selections).toString();
    navigate(`/curation?${params}`);
  };

  const shareCuration = () => {
    const params = new URLSearchParams(selections).toString();
    const url = `${window.location.origin}/curation?${params}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentQuestion = questions.find(q => q.id === step);

  return (
    // Updated: min-h-[100dvh] fixes mobile browser height issues
    <section className="min-h-[100dvh] bg-[#050505] text-white relative overflow-hidden flex flex-col py-6">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gold/5 blur-[100px] md:blur-[150px] -z-10 pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-full md:w-1/3 h-1/2 md:h-2/3 bg-blue-900/5 blur-[80px] md:blur-[120px] -z-10 pointer-events-none" />
      
      {/* Navbar Placeholder / Back Button */}
      <div className="w-full max-w-6xl mx-auto px-6 mb-8 z-50">
        <button 
          onClick={() => step === 1 ? navigate('/') : handleBack()}
          className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 hover:text-brand-gold transition-colors py-2"
        >
          <ChevronLeft size={16} /> {step === 1 ? 'Exit Concierge' : 'Previous Step'}
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10">
        
        {/* --- LOADING STATE --- */}
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div 
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center px-4"
            >
              <div className="relative inline-flex items-center justify-center mb-8">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 md:w-24 md:h-24 border border-brand-gold/20 border-t-brand-gold rounded-full"
                />
                <Sparkles className="absolute text-brand-gold" size={24} />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif italic mb-2">Consulting the Archives</h3>
              <p className="text-gray-500 text-xs md:text-sm tracking-widest uppercase">Curating based on your choices...</p>
            </motion.div>
          ) : step === 5 ? (
            /* --- FINAL REVEAL SCREEN --- */
            <motion.div 
              key="reveal"
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="text-center w-full max-w-3xl border border-brand-gold/20 bg-brand-gold/[0.02] p-8 md:p-20 backdrop-blur-3xl shadow-2xl relative overflow-hidden rounded-sm"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-50" />

              <motion.div 
                initial={{ rotate: -10, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex p-6 md:p-8 rounded-full bg-brand-gold/10 text-brand-gold mb-8 md:mb-10 border border-brand-gold/20"
              >
                <CheckCircle2 size={32} strokeWidth={1} className="md:w-12 md:h-12" />
              </motion.div>
              
              <h3 className="text-3xl md:text-7xl font-serif mb-4 md:mb-6 italic">Curation Complete</h3>
              
              <div className="text-gray-400 mb-8 md:mb-12 font-light text-sm md:text-lg leading-relaxed max-w-lg mx-auto space-y-2">
                <p>We have identified a selection for <span className="text-white font-medium capitalize">{selections.recipient}</span>.</p>
                <p>Perfect for a <span className="text-brand-gold font-serif italic">{selections.style}</span> style <span className="text-white font-medium capitalize">{selections.occasion}</span>.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={finalizeCuration}
                  className="relative group bg-brand-gold text-brand-dark px-10 py-4 md:px-16 md:py-6 uppercase tracking-[0.3em] text-[10px] md:text-[11px] font-bold hover:bg-white transition-all duration-500 overflow-hidden w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    Reveal Selection <ArrowRight size={16} />
                  </span>
                  <div className="absolute top-0 left-[-100%] w-full h-full bg-white/20 skew-x-[-30deg] group-hover:left-[100%] transition-all duration-1000" />
                </button>

                <button 
                  onClick={shareCuration}
                  className="flex items-center justify-center gap-3 p-4 md:p-6 border border-white/10 hover:border-brand-gold/50 text-white hover:text-brand-gold transition-colors w-full sm:w-auto sm:min-w-[160px]"
                >
                  {copied ? (
                    <span className="text-[10px] uppercase font-bold tracking-widest text-green-400">Copied</span>
                  ) : (
                    <>
                      <Share2 size={16} />
                      <span className="text-[10px] uppercase font-bold tracking-widest">Share</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ) : (
            /* --- QUESTION WIZARD STEPS --- */
            <motion.div 
              key={step}
              initial={{ opacity: 0, x: 50 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full max-w-4xl"
            >
              {/* Question Header */}
              <div className="text-center mb-8 md:mb-16 px-2">
                <span className="text-brand-gold text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">
                  Step 0{step} / 04
                </span>
                <h2 className="text-3xl md:text-6xl font-serif italic mb-3 md:mb-4">{currentQuestion.title}</h2>
                <p className="text-gray-400 font-light text-sm md:text-base">{currentQuestion.subtitle}</p>
              </div>

              {/* Options Grid: 1 Col Mobile -> 2 Col Tablet -> 3 Col Desktop */}
              <div className={`grid gap-4 md:gap-6 ${currentQuestion.options.length > 3 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'}`}>
                {currentQuestion.options.map((opt) => (
                  <button 
                    key={opt.value}
                    onClick={() => handleSelection(currentQuestion.key, opt.value)}
                    className="group relative flex flex-row sm:flex-col items-center sm:justify-center justify-start p-6 md:p-10 bg-white/[0.02] border border-white/5 hover:border-brand-gold/40 hover:bg-white/[0.04] transition-all duration-300 rounded-sm text-left sm:text-center gap-6 sm:gap-0"
                  >
                    {/* Icon Handling */}
                    {opt.icon && (
                      <div className="text-gray-500 group-hover:text-brand-gold transition-colors duration-300 group-hover:scale-110 transform sm:mb-6 shrink-0">
                        <opt.icon size={24} className="md:w-8 md:h-8" strokeWidth={1} />
                      </div>
                    )}
                    
                    <div className="flex flex-col">
                      <span className="text-sm font-serif tracking-widest uppercase mb-1 sm:mb-2">{opt.label}</span>
                      {opt.desc && (
                        <span className="text-[10px] text-gray-500 font-light leading-snug sm:hidden block">
                          {opt.desc}
                        </span>
                      )}
                    </div>
                    
                    {/* Desktop Hover Description */}
                    {opt.desc && (
                      <span className="hidden sm:block text-[10px] text-gray-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute bottom-4">
                        {opt.desc}
                      </span>
                    )}

                    {/* Active Indicator Line */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Footer */}
      {!isProcessing && step < 5 && (
        <div className="w-full max-w-md mx-auto px-6 mt-8 md:mt-0 pb-8 md:pb-12 flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-brand-gold' : 'bg-white/10'}`} 
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default GiftGuideScreen;