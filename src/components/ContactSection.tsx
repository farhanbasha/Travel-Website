import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactSection: React.FC = () => {
  const { submitContact, currentUser } = useApp();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Custom Journey Design');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    submitContact({
      name,
      email,
      phone,
      subject,
      message
    });

    setIsSubmitted(true);
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0066CC]">Concierge Desk</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1D1D1F] mt-1 tracking-tight">
          Begin Your Conversation
        </h2>
        <p className="text-sm text-[#86868B] mt-2">
          Whether you require a bespoke private jet transfer, private temple viewing in Kyoto, or customized multi-week itinerary design, our dedicated team is at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Contact Information & Global Hubs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-[#E8E8ED] shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-[#1D1D1F]">
              Voyage Worldwide Concierge
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F5F5F7] flex items-center justify-center text-[#1D1D1F] shrink-0 border border-[#E8E8ED]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1D1D1F]">Direct Concierge Hotline</p>
                  <p className="text-xs text-[#86868B] mt-0.5">+1 (800) 948-VOYAGE (toll-free)</p>
                  <p className="text-[11px] text-[#86868B]">Available 24 hours daily</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F5F5F7] flex items-center justify-center text-[#1D1D1F] shrink-0 border border-[#E8E8ED]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1D1D1F]">Direct Electronic Mail</p>
                  <p className="text-xs text-[#86868B] mt-0.5">concierge@voyage.io</p>
                  <p className="text-[11px] text-[#86868B]">Average response time: &lt;2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F5F5F7] flex items-center justify-center text-[#1D1D1F] shrink-0 border border-[#E8E8ED]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1D1D1F]">Global Hubs</p>
                  <p className="text-xs text-[#86868B] mt-0.5">Zurich • Tokyo • San Francisco • Milan</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E8ED] flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>All inquiries are routed directly to licensed journey specialists.</span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-[#E8E8ED] shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Send className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1D1D1F]">
                  Inquiry Received with Distinction
                </h3>
                <p className="text-xs text-[#86868B] max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out, <span className="font-semibold text-[#1D1D1F]">{name}</span>. A senior travel specialist has received your request and will follow up via {email}.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-5 py-2.5 rounded-full bg-[#1D1D1F] text-white text-xs font-semibold hover:bg-[#2C2C2E] cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Eleanor Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F] focus:outline-none focus:border-[#D2D2D7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="eleanor@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F] focus:outline-none focus:border-[#D2D2D7]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F] focus:outline-none focus:border-[#D2D2D7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Inquiry Category</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F] focus:outline-none focus:border-[#D2D2D7] cursor-pointer"
                    >
                      <option value="Custom Journey Design">Custom Journey Design</option>
                      <option value="Corporate & Group Booking">Corporate & Group Booking</option>
                      <option value="Existing Reservation Support">Existing Reservation Support</option>
                      <option value="Media & Partnerships">Media & Partnerships</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Your Message & Itinerary Concept</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your dates, preferred destinations, traveler count, and special requests..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F] focus:outline-none focus:border-[#D2D2D7]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <p className="text-[11px] text-[#86868B]">We respect your privacy. No marketing spam.</p>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 bg-[#1D1D1F] hover:bg-[#2C2C2E] text-white rounded-xl text-xs font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
