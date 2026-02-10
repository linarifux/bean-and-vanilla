import React from 'react';
import { RotateCcw, ShieldCheck, CreditCard } from 'lucide-react';

const ReturnsScreen = () => {
  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-24 text-brand-dark font-sans">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-serif italic mb-12 text-center">Returns & Exchanges</h1>

        <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100">
          <p className="text-lg text-gray-500 font-light text-center max-w-2xl mx-auto mb-16 leading-relaxed">
            We want you to love your Bean & Vanilla piece. If for any reason you are not completely satisfied, we offer a hassle-free return process.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 border-b border-gray-100 pb-12">
            <Step number="01" title="30-Day Window" desc="You have 30 days from delivery to request a return." />
            <Step number="02" title="Original Condition" desc="Items must be unworn, in original packaging with tags." />
            <Step number="03" title="Free US Returns" desc="We provide a pre-paid shipping label for domestic returns." />
          </div>

          <h3 className="text-lg font-bold uppercase tracking-widest mb-6">How to Return</h3>
          <ol className="list-decimal list-inside space-y-4 text-gray-600 font-light mb-12">
            <li>Visit our <span className="text-brand-gold underline cursor-pointer">Returns Portal</span> and enter your order number.</li>
            <li>Select the items you wish to return and the reason.</li>
            <li>Download and print your pre-paid shipping label.</li>
            <li>Pack the item securely in its original box and drop it off at any carrier location.</li>
          </ol>

          <div className="bg-brand-gold/5 p-6 rounded-sm border border-brand-gold/20">
            <h4 className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-2">Refunds</h4>
            <p className="text-gray-600 text-sm">
              Once we receive your return, please allow 3-5 business days for inspection. Refunds will be issued to the original payment method and may take 5-10 days to appear on your statement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Step = ({ number, title, desc }) => (
  <div className="text-center">
    <span className="text-4xl font-serif text-gray-100 font-bold block mb-4">{number}</span>
    <h4 className="font-bold text-sm mb-2">{title}</h4>
    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

export default ReturnsScreen;