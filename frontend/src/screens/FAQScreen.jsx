import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQScreen = () => {
  const faqs = [
    {
      category: "Orders & Shipping",
      items: [
        { q: "Do you ship internationally?", a: "Yes, we ship to over 50 countries worldwide via DHL Express. International shipping is complimentary on orders over $250." },
        { q: "How long will my order take?", a: "Domestic orders typically arrive within 2-4 business days. International orders take 5-10 business days depending on customs." },
        { q: "Can I change my order?", a: "We process orders quickly. Please contact us within 1 hour of placing your order if you need to make changes." }
      ]
    },
    {
      category: "Product & Care",
      items: [
        { q: "Are your watches waterproof?", a: "Our watches are rated 3ATM or 5ATM, meaning they are splash-resistant (rain, hand washing) but should not be submerged for swimming or bathing." },
        { q: "How do I care for the wood?", a: "We recommend using a natural beeswax or lemon oil once every few months to keep the wood hydrated and lustrous." },
        { q: "Is the wood sustainably sourced?", a: "Absolutely. We only use reclaimed wood from furniture manufacturing offcuts or sustainably managed forests." }
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-32 pb-24 text-brand-dark font-sans">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold mb-4 block">Support</span>
          <h1 className="text-4xl md:text-5xl font-serif italic">Frequently Asked Questions</h1>
        </div>

        <div className="space-y-16">
          {faqs.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-xl font-serif mb-8 border-b border-gray-100 pb-4">{section.category}</h3>
              <div className="space-y-4">
                {section.items.map((item, i) => (
                  <AccordionItem key={i} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-100 rounded-sm overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 bg-gray-50/50 hover:bg-gray-50 transition-colors text-left"
      >
        <span className="font-medium text-sm tracking-wide">{question}</span>
        {isOpen ? <Minus size={16} className="text-brand-gold" /> : <Plus size={16} className="text-gray-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white"
          >
            <div className="p-6 text-gray-500 font-light text-sm leading-relaxed border-t border-gray-100">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQScreen;