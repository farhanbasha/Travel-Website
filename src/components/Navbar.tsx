import React, { useState } from 'react';
import {
  Compass, Heart, User as UserIcon, Shield, Menu, X, LogIn,
  LogOut, Calendar, Plane, Building2, MapPin, Sparkles, ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    activeTab,
    setActiveTab,
    openAuthModal,
    logout,
    switchDemoUser,
    savedDestinationIds,
    setProfileModalOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'explore', label: 'Discover' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'packages', label: 'Tour Packages' },
    { id: 'hotels', label: 'Stays' },
    { id: 'flights', label: 'Flights' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F5F5F7]/90 backdrop-blur-xl border-b border-[#E8E8ED] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => { setActiveTab('explore'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2.5 text-[#1D1D1F] group focus:outline-none cursor-pointer"
        >
          <div className="w-9 h-9 rounded-2xl bg-[#1D1D1F] text-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs">
            <Compass className="w-5 h-5 transition-transform group-hover:rotate-45" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xl font-bold tracking-tight text-[#1D1D1F]">VOYAGER</span>
            <span className="text-[10px] uppercase tracking-wider text-[#86868B] font-semibold leading-tight">Travel Studio</span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#E8E8ED]/60 p-1 rounded-full border border-[#E8E8ED]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#1D1D1F] shadow-xs font-semibold'
                    : 'text-[#86868B] hover:text-[#1D1D1F] hover:bg-white/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          {currentUser?.role === 'admin' && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-[#0066CC] text-white shadow-xs'
                  : 'text-[#0066CC] hover:bg-[#0066CC]/10'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Admin View
            </button>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Demo Mode Switcher for Tester Ease */}
          <div className="hidden sm:flex items-center text-[11px] font-medium bg-[#E8E8ED] rounded-full p-0.5 border border-[#D2D2D7]/80">
            <button
              onClick={() => switchDemoUser('traveler')}
              title="Switch to Traveler demo profile"
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                currentUser?.role === 'traveler' ? 'bg-white text-[#1D1D1F] shadow-2xs font-semibold' : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              Traveler
            </button>
            <button
              onClick={() => { switchDemoUser('admin'); }}
              title="Switch to Admin demo profile"
              className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-all cursor-pointer ${
                currentUser?.role === 'admin' ? 'bg-[#1D1D1F] text-white shadow-2xs font-semibold' : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              <Shield className="w-3 h-3 text-[#0066CC]" />
              Admin
            </button>
          </div>

          {/* Saved wishlist button */}
          <button
            onClick={() => {
              if (!currentUser) {
                openAuthModal('login');
              } else {
                setProfileModalOpen(true);
              }
            }}
            title="Saved destinations"
            className="relative p-2 rounded-full text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#E8E8ED] transition-colors cursor-pointer"
          >
            <Heart className="w-5 h-5" />
            {savedDestinationIds.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#0066CC] text-white text-[10px] font-bold flex items-center justify-center">
                {savedDestinationIds.length}
              </span>
            )}
          </button>

          {/* User Account Button / Dropdown */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-white border border-[#D2D2D7] hover:border-[#86868B] transition-all cursor-pointer shadow-2xs"
              >
                <div className="w-7 h-7 rounded-full bg-[#E8E8ED] flex items-center justify-center border border-[#D2D2D7] overflow-hidden text-xs font-bold text-[#1D1D1F]">
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{currentUser.name.slice(0, 2).toUpperCase()}</span>
                  )}
                </div>
                <div className="text-left hidden md:block leading-tight">
                  <p className="text-[10px] font-bold text-[#0066CC] uppercase tracking-wider">
                    {currentUser.role === 'admin' ? 'Admin View' : 'Traveler'}
                  </p>
                  <p className="text-xs font-semibold text-[#1D1D1F] max-w-[100px] truncate">
                    {currentUser.name.split(' ')[0]}
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#86868B]" />
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-60 bg-white rounded-3xl shadow-xl border border-[#E8E8ED] p-2 z-50 text-xs"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="p-3 bg-[#F5F5F7] rounded-2xl mb-2">
                    <p className="font-bold text-[#1D1D1F] truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-[#86868B] truncate">{currentUser.email}</p>
                    <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white text-[#0066CC] border border-[#E8E8ED]">
                      {currentUser.role === 'admin' ? (
                        <>
                          <Shield className="w-3 h-3 text-[#0066CC]" /> Admin Access
                        </>
                      ) : (
                        <>Verified Traveler</>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      setProfileModalOpen(true);
                    }}
                    className="w-full text-left px-3 py-2 text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-xl flex items-center gap-2 cursor-pointer font-medium transition-colors"
                  >
                    <UserIcon className="w-4 h-4 text-[#86868B]" />
                    My Bookings & Profile
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      setActiveTab('itinerary');
                    }}
                    className="w-full text-left px-3 py-2 text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-xl flex items-center gap-2 cursor-pointer font-medium transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-[#86868B]" />
                    Trip Itineraries
                  </button>

                  {currentUser.role === 'admin' && (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setActiveTab('admin');
                      }}
                      className="w-full text-left px-3 py-2 text-[#0066CC] hover:bg-[#0066CC]/10 rounded-xl flex items-center gap-2 cursor-pointer font-semibold transition-colors"
                    >
                      <Shield className="w-4 h-4 text-[#0066CC]" />
                      Admin Console
                    </button>
                  )}

                  <div className="border-t border-[#E8E8ED] my-1" />

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 cursor-pointer font-medium transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('login')}
                className="px-3.5 py-1.5 text-xs font-semibold text-[#1D1D1F] hover:text-[#0066CC] transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuthModal('register')}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-[#1D1D1F] hover:bg-[#2C2C2E] rounded-full transition-all shadow-xs cursor-pointer"
              >
                Register
              </button>
            </div>
          )}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1D1D1F] hover:text-[#0066CC] rounded-xl hover:bg-[#E8E8ED] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E8ED] bg-[#F5F5F7]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-1.5 pb-3 border-b border-[#E8E8ED]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#1D1D1F] text-white font-semibold'
                    : 'text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#E8E8ED]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {currentUser?.role === 'admin' && (
            <button
              onClick={() => {
                setActiveTab('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#0066CC]/10 text-[#0066CC] font-semibold text-xs"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#0066CC]" /> Admin Control Panel
              </span>
              <span className="text-[10px] bg-[#0066CC] text-white px-2 py-0.5 rounded-full">Manage</span>
            </button>
          )}

          {!currentUser && (
            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="flex-1 py-2 text-center text-xs font-semibold text-[#1D1D1F] bg-[#E8E8ED] rounded-xl hover:bg-[#D2D2D7] transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('register');
                }}
                className="flex-1 py-2 text-center text-xs font-semibold text-white bg-[#1D1D1F] rounded-xl hover:bg-[#2C2C2E] transition-colors shadow-xs"
              >
                Register
              </button>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-[#86868B]">Demo Profiles:</span>
            <div className="flex gap-1.5">
              <button
                onClick={() => { switchDemoUser('traveler'); setMobileMenuOpen(false); }}
                className="text-xs px-2.5 py-1 rounded-full bg-white border border-[#D2D2D7] font-medium text-[#1D1D1F]"
              >
                Traveler
              </button>
              <button
                onClick={() => { switchDemoUser('admin'); setMobileMenuOpen(false); }}
                className="text-xs px-2.5 py-1 rounded-full bg-[#1D1D1F] text-white font-medium flex items-center gap-1"
              >
                <Shield className="w-3 h-3 text-[#0066CC]" /> Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
