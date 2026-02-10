import React from 'react';
import { Truck, Globe, Clock } from 'lucide-react';

const ShippingScreen = () => {
  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-24 text-brand-dark font-sans">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-serif italic mb-12 text-center">Shipping & Handling</h1>

        <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <PolicyHighlight icon={Truck} title="Free Shipping" desc="On all domestic orders over $150" />
            <PolicyHighlight icon={Clock} title="Fast Dispatch" desc="Orders processed within 24 hours" />
            <PolicyHighlight icon={Globe} title="Global Delivery" desc="We ship to over 50 countries" />
          </div>

          <h3 className="text-lg font-bold uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">Domestic Shipping (USA)</h3>
          <table className="w-full text-sm text-left mb-12">
            <thead className="bg-gray-50 text-gray-500 font-bold">
              <tr>
                <th className="p-4">Method</th>
                <th className="p-4">Timeframe</th>
                <th className="p-4">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-4">Standard Ground</td>
                <td className="p-4">3-5 Business Days</td>
                <td className="p-4">Free ($150+) / $10</td>
              </tr>
              <tr>
                <td className="p-4">Express</td>
                <td className="p-4">2 Business Days</td>
                <td className="p-4">$25</td>
              </tr>
              <tr>
                <td className="p-4">Overnight</td>
                <td className="p-4">1 Business Day</td>
                <td className="p-4">$45</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-lg font-bold uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">International Shipping</h3>
          <p className="text-gray-500 font-light mb-4 leading-relaxed">
            We use DHL Express for all international shipments to ensure tracking and reliability. 
            Please note that duties and taxes are calculated at checkout and are the responsibility of the customer.
          </p>
        </div>
      </div>
    </div>
  );
};

const PolicyHighlight = ({ icon: Icon, title, desc }) => (
  <div className="text-center">
    <Icon size={24} className="text-brand-gold mx-auto mb-4" />
    <h4 className="font-bold text-sm mb-2">{title}</h4>
    <p className="text-xs text-gray-500">{desc}</p>
  </div>
);

export default ShippingScreen;