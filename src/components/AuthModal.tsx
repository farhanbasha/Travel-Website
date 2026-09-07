import React, { useState, useEffect } from 'react';
import { X, LogIn, UserPlus, Shield, Sparkles, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, authDefaultTab, login, register, switchDemoUser } = useApp();

  const [tab, setTab] = useState<'login' | 'register'>(authDefaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'traveler' | 'admin'>('traveler');
  const [error, setError] = useState('');

  useEffect(() => {
    setTab(authDefaultTab);
    setError('');
  }, [authDefaultTab, authModalOpen]);

  if (!authModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (tab === 'login') {
      if (!email) {
        setError('Please enter your email address');
        return;
      }
      const success = login(email);
      if (!success) {
        setError('Login failed. Please verify your credentials.');
      }
    } else {
      if (!name.trim() || !email.trim()) {
        setError('Please complete all required fields');
        return;
      }
      const success = register(name, email, role);
      if (!success) {
        setError('Account registration could not be completed.');
      }
    }
  };

  return (
    <div
      onClick={() => setAuthModalOpen(false)}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div
        className="relative w-full max-w-md bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-[#E8E8ED] p-6 sm:p-8 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Eyebrow */}
        <div className="text-center mb-6">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#86868B]">Voyage Travel</span>
          <h3 className="text-2xl font-bold text-[#1D1D1F] mt-0.5 tracking-tight">
            {tab === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h3>
          <p className="text-xs text-[#86868B] mt-1">
            {tab === 'login' ? 'Access your saved trips, vouchers, and private itineraries' : 'Begin curating and booking world-class travel experiences'}
          </p>
        </div>

        {/* 1-Click Fast Demo Buttons */}
        <div className="mb-6 p-3 bg-[#F5F5F7] rounded-2xl border border-[#E8E8ED] space-y-2">
          <p className="text-[10px] uppercase font-bold text-[#86868B] text-center tracking-wider">
            Quick 1-Click Demo Profiles
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                switchDemoUser('traveler');
                setAuthModalOpen(false);
              }}
              className="px-3 py-2 bg-white hover:bg-[#F5F5F7] text-[#1D1D1F] rounded-xl text-xs font-semibold border border-[#E8E8ED] shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <UserIcon className="w-3.5 h-3.5 text-[#86868B]" />
              <span>Traveler Demo</span>
            </button>
            <button
              onClick={() => {
                switchDemoUser('admin');
                setAuthModalOpen(false);
              }}
              className="px-3 py-2 bg-[#1D1D1F] hover:bg-[#2C2C2E] text-white rounded-xl text-xs font-semibold shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        {/* Tabs Switcher */}
        <div className="flex bg-[#F5F5F7] p-1 rounded-xl mb-5">
          <button
            type="button"
            onClick={() => { setTab('login'); setError(''); }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              tab === 'login' ? 'bg-white text-[#1D1D1F] shadow-xs' : 'text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setTab('register'); setError(''); }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              tab === 'register' ? 'bg-white text-[#1D1D1F] shadow-xs' : 'text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {tab === 'register' && (
            <div>
              <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-[#86868B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F] focus:outline-none focus:border-[#D2D2D7]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#86868B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F] focus:outline-none focus:border-[#D2D2D7]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#86868B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F] focus:outline-none focus:border-[#D2D2D7]"
              />
            </div>
          </div>

          {tab === 'register' && (
            <div>
              <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Role Preference</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F] focus:outline-none cursor-pointer"
              >
                <option value="traveler">Traveler (Standard Client)</option>
                <option value="admin">Administrator (Platform Staff)</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-2 py-3 bg-[#1D1D1F] hover:bg-[#2C2C2E] text-white rounded-xl text-xs font-semibold transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            {tab === 'login' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            <span>{tab === 'login' ? 'Sign In to Voyage' : 'Create Free Account'}</span>
          </button>
        </form>

        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={() => setAuthModalOpen(false)}
            className="text-xs font-medium text-[#86868B] hover:text-[#1D1D1F] transition-colors cursor-pointer"
          >
            Or explore as guest &rarr;
          </button>
        </div>

        <p className="mt-3 text-center text-[11px] text-[#86868B]">
          By continuing, you agree to Voyage's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};
