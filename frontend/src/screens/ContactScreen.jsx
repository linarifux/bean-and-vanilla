import React from 'react';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';

const ContactScreen = () => {
  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-24 text-brand-dark font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold mb-4 block">Concierge</span>
          <h1 className="text-4xl md:text-6xl font-serif italic">Get in Touch</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-serif mb-8">We're here to help</h3>
            <p className="text-gray-500 font-light mb-12 leading-relaxed">
              Whether you have a question about a timepiece, need assistance with sizing, or just want to share your story, our team is at your service.
            </p>

            <div className="space-y-8">
              <ContactItem icon={Mail} title="Email" value="concierge@beanandvanilla.com" />
              <ContactItem icon={Phone} title="Phone" value="+1 (800) 123-4567" />
              <ContactItem icon={MapPin} title="Atelier" value="123 Artisan Row, London, UK" />
              <ContactItem icon={MessageSquare} title="Live Chat" value="Available Mon-Fri, 9am - 5pm GMT" />
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-10 shadow-xl border border-gray-100">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">First Name</label>
                  <input type="text" className="w-full border-b border-gray-200 py-2 outline-none focus:border-brand-gold transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Last Name</label>
                  <input type="text" className="w-full border-b border-gray-200 py-2 outline-none focus:border-brand-gold transition-colors" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</label>
                <input type="email" className="w-full border-b border-gray-200 py-2 outline-none focus:border-brand-gold transition-colors" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Message</label>
                <textarea rows="4" className="w-full border-b border-gray-200 py-2 outline-none focus:border-brand-gold transition-colors resize-none"></textarea>
              </div>

              <button className="w-full bg-brand-dark text-white py-4 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-brand-gold transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactItem = ({ icon: Icon, title, value }) => (
  <div className="flex items-start gap-4">
    <div className="p-3 bg-brand-gold/10 text-brand-gold rounded-full">
      <Icon size={20} />
    </div>
    <div>
      <h4 className="text-xs uppercase tracking-widest font-bold mb-1">{title}</h4>
      <p className="text-gray-500 font-serif italic">{value}</p>
    </div>
  </div>
);

export default ContactScreen;