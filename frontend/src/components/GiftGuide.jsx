import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Briefcase, GraduationCap, Gift, ArrowRight, ChevronLeft, Sparkles, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GiftGuide = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  
  const [selections, setSelections] = useState({
    occasion: '',
    budget: ''
  });

  const [copied, setCopied] = useState(false);

  const occasions = [
    { id: 'anniversary', label: 'Anniversary', icon: Heart, color: 'hover:bg-red-500/10 hover:border-red-500/30' },
    { id: 'professional', label: 'Promotion', icon: Briefcase, color: 'hover:bg-blue-500/10 hover:border-blue-500/30' },
    { id: 'graduation', label: 'Graduation', icon: GraduationCap, color: 'hover:bg-emerald-500/10 hover:border-emerald-500/30' },
    { id: 'general', label: 'Just Because', icon: Gift, color: 'hover:bg-brand-gold/10 hover:border-brand-gold/50' }
  ];

  const budgets = [
    { label: 'Under $150', value: 'low', detail: 'Artisanal Essentials' },
    { label: '$150 - $300', value: 'mid', detail: 'Signature Statements' },
    { label: 'Premium $300+', value: 'high', detail: 'Heritage Pieces' }
  ];

  const handleSelection = (key, value) => {
    setSelections(prev => ({ ...prev, [key]: value }));
    if (step < 3) {
      setStep(step + 1);
    }
  };

  // --- UPDATED LOGIC: Point to the new Curation Screen ---
  const finalizeCuration = () => {
    navigate(`/curation?occasion=${selections.occasion}&budget=${selections.budget}`);
  };

  const shareCuration = () => {
    // Also updated the share link to point to the curation page
    const url = `${window.location.origin}/curation?occasion=${selections.occasion}&budget=${selections.budget}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-32 bg-[#050505] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/5 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-white/[0.02] blur-[100px] rounded-full -z-10 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <header className="text-center mb-24">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-block">
            <span className="text-brand-gold text-[10px] uppercase tracking-[0.6em] font-bold mb-6 block">Bespoke Assistance</span>
            <h2 className="text-5xl md:text-7xl font-serif italic mb-8">Curated Gifting</h2>
            <div className="flex justify-center gap-4 mt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-[2px] transition-all duration-1000 ease-out ${step >= i ? 'w-16 bg-brand-gold' : 'w-8 bg-white/10'}`} />
              ))}
            </div>
          </motion.div>
        </header>

        <div className="min-h-[500px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid lg:grid-cols-2 gap-20 items-center w-full">
                <div className="space-y-8">
                  <h3 className="text-4xl md:text-6xl font-serif italic leading-tight">For which milestone <br/> do we seek?</h3>
                  <p className="text-gray-400 text-lg font-light leading-relaxed max-w-md">Every piece in our collection tells a unique story. Tell us the occasion, and we will find the perfect narrator for yours.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {occasions.map((o) => (
                    <button key={o.id} onClick={() => handleSelection('occasion', o.id)} className={`group p-10 bg-white/[0.02] border border-white/5 transition-all duration-500 text-center relative overflow-hidden ${o.color}`}>
                      <o.icon className="mx-auto mb-6 text-brand-gold group-hover:scale-110 transition-transform duration-500" size={32} strokeWidth={1} />
                      <span className="text-[11px] uppercase tracking-[0.3em] font-bold block">{o.label}</span>
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="w-full max-w-2xl mx-auto text-center">
                <button onClick={() => setStep(1)} className="mb-12 inline-flex items-center gap-2 text-gray-500 hover:text-brand-gold transition-colors text-[10px] uppercase tracking-widest group">
                  <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Milestones
                </button>
                <h3 className="text-4xl md:text-5xl font-serif mb-12 italic">Refine the Scope</h3>
                <div className="grid gap-4">
                  {budgets.map((b) => (
                    <button key={b.value} onClick={() => handleSelection('budget', b.value)} className="group flex items-center justify-between p-8 bg-white/[0.01] border border-white/5 hover:border-brand-gold/30 hover:bg-white/[0.03] transition-all duration-500">
                      <div className="text-left">
                        <span className="text-[12px] uppercase tracking-[0.4em] font-bold block mb-1 text-white group-hover:text-brand-gold transition-colors">{b.label}</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest">{b.detail}</span>
                      </div>
                      <ArrowRight size={18} className="text-white/20 group-hover:text-brand-gold group-hover:translate-x-2 transition-all" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} className="text-center w-full max-w-3xl border border-brand-gold/20 bg-brand-gold/[0.02] p-16 md:p-24 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
                <motion.div initial={{ rotate: -10, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="inline-flex p-10 rounded-full bg-brand-gold/10 text-brand-gold mb-12">
                  <Sparkles size={64} strokeWidth={0.5} />
                </motion.div>
                <h3 className="text-5xl md:text-7xl font-serif mb-8 italic">Curation Complete</h3>
                <p className="text-gray-400 mb-16 font-light text-xl leading-relaxed max-w-lg mx-auto">We have curated a selection of <span className="text-brand-gold italic font-medium">{selections.occasion}</span> pieces that harmonize perfectly with your <span className="text-brand-gold italic font-medium">{selections.budget}</span> range.</p>
                <div className="flex justify-center gap-6">
                  <button onClick={finalizeCuration} className="relative group bg-brand-gold text-brand-dark px-24 py-7 uppercase tracking-[0.4em] text-[12px] font-bold hover:bg-white transition-all duration-700 shadow-[0_20px_50px_rgba(197,158,85,0.3)] overflow-hidden">
                    <span className="relative z-10 flex items-center gap-4">Enter the Gallery <ArrowRight size={18} /></span>
                    <div className="absolute top-0 left-[-100%] w-full h-full bg-white/20 skew-x-[-30deg] group-hover:left-[100%] transition-all duration-1000" />
                  </button>
                  <button onClick={shareCuration} className="p-7 border border-white/10 hover:border-brand-gold/50 text-white hover:text-brand-gold transition-colors" title="Share Curation">
                    {copied ? <span className="text-[10px] uppercase font-bold tracking-widest">Copied!</span> : <Share2 size={18} />}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default GiftGuide;