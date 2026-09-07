import React, { useState } from 'react';
import {
  Shield, Users, Ticket, Package, DollarSign, CheckCircle2,
  Clock, XCircle, Search, Plus, Edit2, Trash2, Mail, Check,
  AlertTriangle, Filter, Eye, ArrowUpRight, Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Booking, TourPackage, User, BookingStatus } from '../types';

export const AdminPanel: React.FC = () => {
  const {
    currentUser,
    users,
    bookings,
    packages,
    contactMessages,
    updateBookingStatus,
    addTourPackage,
    updateTourPackage,
    deleteTourPackage,
    updateUserStatus,
    resolveContact,
    showToast,
    destinations
  } = useApp();

  const [adminTab, setAdminTab] = useState<'overview' | 'bookings' | 'packages' | 'users' | 'inquiries'>('overview');
  
  // Bookings state
  const [bookingFilterType, setBookingFilterType] = useState<string>('all');
  const [bookingFilterStatus, setBookingFilterStatus] = useState<string>('all');
  const [bookingSearch, setBookingSearch] = useState('');

  // Packages state
  const [showAddPackageModal, setShowAddPackageModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState<TourPackage | null>(null);

  // New package form state
  const [pkgTitle, setPkgTitle] = useState('');
  const [pkgDestId, setPkgDestId] = useState(destinations[0]?.id || 'dest_kyoto');
  const [pkgDays, setPkgDays] = useState(7);
  const [pkgNights, setPkgNights] = useState(6);
  const [pkgGroup, setPkgGroup] = useState('Small Group (Max 10)');
  const [pkgPrice, setPkgPrice] = useState(2400);
  const [pkgOverview, setPkgOverview] = useState('');
  const [pkgInclusions, setPkgInclusions] = useState('Boutique accommodation, Private airport transfers, Daily curated breakfast, Licensed cultural guide');
  const [pkgExclusions, setPkgExclusions] = useState('International airfare, Personal gratuities');
  const [pkgImage, setPkgImage] = useState('https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80');

  // Users state
  const [userSearch, setUserSearch] = useState('');

  // Analytics Calculations
  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const activePackagesCount = packages.filter(p => p.status === 'active').length;

  const handleCreatePackage = (e: React.FormEvent) => {
    e.preventDefault();
    const dest = destinations.find(d => d.id === pkgDestId) || destinations[0];

    addTourPackage({
      title: pkgTitle,
      destinationId: dest.id,
      destinationName: dest.name,
      country: dest.country,
      durationDays: Number(pkgDays),
      durationNights: Number(pkgNights),
      groupSize: pkgGroup,
      price: Number(pkgPrice),
      coverImage: pkgImage,
      overview: pkgOverview || `An extraordinary exploration through ${dest.name} curated by Voyage Specialists.`,
      itinerary: [
        {
          day: 1,
          title: `Arrival & Welcome in ${dest.name}`,
          description: 'Private airport transfer and boutique check-in with champagne reception.',
          activities: ['Private chauffeured transfer', 'Check-in and welcome dinner']
        },
        {
          day: 2,
          title: 'Highlights & Heritage Exploration',
          description: 'Guided master tour through key historic sites and culinary discoveries.',
          activities: ['Historic walking tour', 'Artisanal lunch tasting']
        }
      ],
      inclusions: pkgInclusions.split(',').map(s => s.trim()),
      exclusions: pkgExclusions.split(',').map(s => s.trim()),
      availableDates: ['2025-11-10', '2026-02-15', '2026-05-20'],
      status: 'active'
    });

    setShowAddPackageModal(false);
    setPkgTitle('');
    setPkgOverview('');
  };

  const handleUpdatePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage) return;

    updateTourPackage(editingPackage.id, {
      title: editingPackage.title,
      price: editingPackage.price,
      durationDays: editingPackage.durationDays,
      groupSize: editingPackage.groupSize,
      status: editingPackage.status
    });

    setEditingPackage(null);
  };

  // Filtered Bookings
  const filteredBookings = bookings.filter(b => {
    if (bookingFilterType !== 'all' && b.type !== bookingFilterType) return false;
    if (bookingFilterStatus !== 'all' && b.status !== bookingFilterStatus) return false;
    if (bookingSearch.trim()) {
      const q = bookingSearch.toLowerCase();
      return (
        b.bookingReference.toLowerCase().includes(q) ||
        b.userName.toLowerCase().includes(q) ||
        b.userEmail.toLowerCase().includes(q) ||
        b.itemTitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filtered Users
  const filteredUsers = users.filter(u => {
    if (userSearch.trim()) {
      const q = userSearch.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Admin Top Header Banner */}
      <div className="bg-[#1D1D1F] text-white rounded-[2rem] p-6 sm:p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-amber-400 text-[#1D1D1F]">
              <Shield className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
              Voyage Management Console
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Operations & Booking Control
          </h2>
          <p className="text-xs text-white/70">
            Real-time control over traveler accounts, reservations, tour inventory, and customer inquiries.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto bg-white/10 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
          <span className="text-xs text-white/90 px-2 font-mono">
            Admin: {currentUser?.name || 'Administrator'}
          </span>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-8 no-scrollbar bg-white p-1.5 rounded-2xl border border-[#E8E8ED] shadow-sm">
        <button
          onClick={() => setAdminTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            adminTab === 'overview' ? 'bg-[#1D1D1F] text-white shadow-xs' : 'text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]'
          }`}
        >
          Overview & Metrics
        </button>
        <button
          onClick={() => setAdminTab('bookings')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            adminTab === 'bookings' ? 'bg-[#1D1D1F] text-white shadow-xs' : 'text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]'
          }`}
        >
          <Ticket className="w-3.5 h-3.5" />
          <span>Bookings ({bookings.length})</span>
        </button>
        <button
          onClick={() => setAdminTab('packages')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            adminTab === 'packages' ? 'bg-[#1D1D1F] text-white shadow-xs' : 'text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Packages ({packages.length})</span>
        </button>
        <button
          onClick={() => setAdminTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            adminTab === 'users' ? 'bg-[#1D1D1F] text-white shadow-xs' : 'text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Users ({users.length})</span>
        </button>
        <button
          onClick={() => setAdminTab('inquiries')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            adminTab === 'inquiries' ? 'bg-[#1D1D1F] text-white shadow-xs' : 'text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Inquiries ({contactMessages.length})</span>
        </button>
      </div>

      {/* 1. OVERVIEW VIEW */}
      {adminTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metric Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 bg-white rounded-[2rem] border border-[#E8E8ED] shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B]">Total Gross Revenue</span>
              <h3 className="text-3xl font-bold text-[#1D1D1F] mt-1 tracking-tight">
                ${totalRevenue.toLocaleString()}
              </h3>
              <p className="text-xs text-emerald-600 font-medium mt-1">From confirmed bookings</p>
            </div>

            <div className="p-6 bg-white rounded-[2rem] border border-[#E8E8ED] shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B]">Active Bookings</span>
              <h3 className="text-3xl font-bold text-[#1D1D1F] mt-1 tracking-tight">
                {confirmedCount} <span className="text-sm font-normal text-[#86868B]">({pendingCount} pending)</span>
              </h3>
              <p className="text-xs text-[#86868B] font-medium mt-1">Tours, Stays & Flights</p>
            </div>

            <div className="p-6 bg-white rounded-[2rem] border border-[#E8E8ED] shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B]">Active Tour Packages</span>
              <h3 className="text-3xl font-bold text-[#1D1D1F] mt-1 tracking-tight">
                {activePackagesCount}
              </h3>
              <p className="text-xs text-[#86868B] font-medium mt-1">Live in client discovery</p>
            </div>

            <div className="p-6 bg-white rounded-[2rem] border border-[#E8E8ED] shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B]">Registered Travelers</span>
              <h3 className="text-3xl font-bold text-[#1D1D1F] mt-1 tracking-tight">
                {users.length}
              </h3>
              <p className="text-xs text-[#86868B] font-medium mt-1">All verified profiles</p>
            </div>
          </div>

          {/* Recent Reservations Quick List */}
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-[#E8E8ED] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#1D1D1F]">
                  Recent Booking Activity
                </h3>
                <p className="text-xs text-[#86868B]">Live feed of transactions placed by travelers</p>
              </div>
              <button
                onClick={() => setAdminTab('bookings')}
                className="text-xs font-semibold text-[#0066CC] hover:underline cursor-pointer"
              >
                View all bookings
              </button>
            </div>

            <div className="space-y-3">
              {bookings.slice(0, 4).map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E8E8ED] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1D1D1F] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                      {b.type.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#1D1D1F]">{b.bookingReference}</span>
                        <span className="text-xs text-[#86868B]">•</span>
                        <span className="text-xs text-[#86868B] font-semibold">{b.userName}</span>
                      </div>
                      <p className="text-xs text-[#1D1D1F] font-medium truncate max-w-sm">{b.itemTitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-start sm:self-auto">
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#1D1D1F]">${b.totalPrice.toLocaleString()}</p>
                      <p className="text-[10px] text-[#86868B]">{b.createdAt}</p>
                    </div>

                    <select
                      value={b.status}
                      onChange={(e) => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                      className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border cursor-pointer ${
                        b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                        b.status === 'pending' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                        'bg-rose-50 text-rose-800 border-rose-200'
                      }`}
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. BOOKINGS MANAGEMENT */}
      {adminTab === 'bookings' && (
        <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-[#E8E8ED] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-[#1D1D1F]">
                Manage Reservations
              </h3>
              <p className="text-xs text-[#86868B]">Inspect guest requests, update status, and manage itineraries</p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#86868B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search ref, guest, or title..."
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-[#F5F5F7] rounded-xl text-xs border border-[#E8E8ED] focus:outline-none focus:border-[#D2D2D7]"
                />
              </div>

              <select
                value={bookingFilterType}
                onChange={(e) => setBookingFilterType(e.target.value)}
                className="px-3 py-1.5 bg-[#F5F5F7] rounded-xl text-xs font-medium border border-[#E8E8ED] cursor-pointer text-[#1D1D1F]"
              >
                <option value="all">All Categories</option>
                <option value="tour">Tour Packages</option>
                <option value="hotel">Hotels & Stays</option>
                <option value="flight">Flights</option>
              </select>

              <select
                value={bookingFilterStatus}
                onChange={(e) => setBookingFilterStatus(e.target.value)}
                className="px-3 py-1.5 bg-[#F5F5F7] rounded-xl text-xs font-medium border border-[#E8E8ED] cursor-pointer text-[#1D1D1F]"
              >
                <option value="all">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F5F7] text-[#86868B] uppercase font-bold text-[10px] tracking-wider border-b border-[#E8E8ED]">
                <tr>
                  <th className="py-3 px-4">Reference</th>
                  <th className="py-3 px-4">Guest</th>
                  <th className="py-3 px-4">Item Details</th>
                  <th className="py-3 px-4">Dates / Pax</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8ED] font-medium">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#F5F5F7]/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#1D1D1F]">
                      {b.bookingReference}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-[#1D1D1F]">{b.userName}</p>
                      <p className="text-[11px] text-[#86868B]">{b.userEmail}</p>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <p className="font-semibold text-[#1D1D1F] truncate">{b.itemTitle}</p>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#F5F5F7] text-[#86868B] uppercase font-bold border border-[#E8E8ED]">
                        {b.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#86868B]">
                      <p>{b.date} {b.returnDate ? `➔ ${b.returnDate}` : ''}</p>
                      <p className="text-[11px] text-[#86868B]">{b.guestsOrPassengers} traveler{b.guestsOrPassengers > 1 ? 's' : ''}</p>
                    </td>
                    <td className="py-3 px-4 font-bold text-[#1D1D1F] text-sm">
                      ${b.totalPrice.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={b.status}
                        onChange={(e) => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                        className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xl border cursor-pointer ${
                          b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                          b.status === 'pending' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                          'bg-rose-50 text-rose-800 border-rose-200'
                        }`}
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. PACKAGES MANAGEMENT */}
      {adminTab === 'packages' && (
        <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-[#E8E8ED] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-[#1D1D1F]">
                Tour Packages Catalog ({packages.length})
              </h3>
              <p className="text-xs text-[#86868B]">Create, edit pricing, or toggle active status of all-inclusive tour packages</p>
            </div>

            <button
              onClick={() => setShowAddPackageModal(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-[#1D1D1F] hover:bg-[#2C2C2E] text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Tour Package</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="p-5 rounded-2xl bg-[#F5F5F7] border border-[#E8E8ED] hover:border-[#D2D2D7] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex gap-3">
                      <img src={pkg.coverImage} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#86868B]">{pkg.country}</span>
                        <h4 className="font-bold text-sm text-[#1D1D1F] leading-tight">{pkg.title}</h4>
                        <p className="text-xs text-[#86868B] mt-0.5">{pkg.durationDays} Days / {pkg.durationNights} Nights • {pkg.groupSize}</p>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      pkg.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-[#E8E8ED] text-[#86868B]'
                    }`}>
                      {pkg.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#86868B] line-clamp-2 mt-2">{pkg.overview}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8E8ED] flex items-center justify-between">
                  <span className="text-base font-bold text-[#1D1D1F]">
                    ${pkg.price.toLocaleString()} <span className="text-xs font-normal text-[#86868B]">/ traveler</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingPackage(pkg)}
                      className="p-2 rounded-lg bg-white border border-[#E8E8ED] text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors cursor-pointer"
                      title="Edit package"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteTourPackage(pkg.id)}
                      className="p-2 rounded-lg bg-white border border-[#E8E8ED] text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete package"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. USERS MANAGEMENT */}
      {adminTab === 'users' && (
        <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-[#E8E8ED] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-[#1D1D1F]">
                User Accounts & Access Control
              </h3>
              <p className="text-xs text-[#86868B]">Manage customer roles, permissions, and administrative staff</p>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#86868B] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search user by name or email..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="pl-8 pr-4 py-2 bg-[#F5F5F7] rounded-xl text-xs border border-[#E8E8ED] focus:outline-none focus:border-[#D2D2D7]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F5F7] text-[#86868B] uppercase font-bold text-[10px] tracking-wider border-b border-[#E8E8ED]">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Joined</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8ED] font-medium">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-[#F5F5F7]/60 transition-colors">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img src={u.avatar} alt="" className="w-8 h-8 rounded-full object-cover ring-1 ring-[#E8E8ED]" />
                      <span className="font-bold text-[#1D1D1F]">{u.name}</span>
                    </td>
                    <td className="py-3 px-4 text-[#86868B] font-mono text-[11px]">{u.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        u.role === 'admin' ? 'bg-amber-100 text-amber-900' : 'bg-[#E8E8ED] text-[#1D1D1F]'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#86868B]">{u.createdAt}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        u.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => updateUserStatus(u.id, u.status, u.role === 'admin' ? 'traveler' : 'admin')}
                        className="px-2.5 py-1 bg-[#F5F5F7] hover:bg-[#E8E8ED] rounded-lg text-[10px] font-semibold text-[#1D1D1F] cursor-pointer"
                      >
                        {u.role === 'admin' ? 'Demote to Traveler' : 'Make Admin'}
                      </button>
                      <button
                        onClick={() => updateUserStatus(u.id, u.status === 'active' ? 'suspended' : 'active', u.role)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold cursor-pointer ${
                          u.status === 'active'
                            ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        {u.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. INQUIRIES MANAGEMENT */}
      {adminTab === 'inquiries' && (
        <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-[#E8E8ED] shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#1D1D1F]">
                Traveler Inquiries & Concierge Messages ({contactMessages.length})
              </h3>
              <p className="text-xs text-[#86868B]">Messages received from the contact form</p>
            </div>
          </div>

          <div className="space-y-4">
            {contactMessages.map((msg) => (
              <div
                key={msg.id}
                className="p-5 rounded-2xl bg-[#F5F5F7] border border-[#E8E8ED] space-y-2 flex flex-col justify-between"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E8ED] pb-2.5">
                  <div>
                    <span className="text-xs font-bold text-[#1D1D1F]">{msg.name}</span>
                    <span className="text-xs text-[#86868B]"> ({msg.email}{msg.phone ? ` • ${msg.phone}` : ''})</span>
                    <p className="text-xs font-semibold text-[#1D1D1F] mt-0.5">Subject: {msg.subject}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      msg.status === 'new' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {msg.status}
                    </span>
                    {msg.status === 'new' && (
                      <button
                        onClick={() => resolveContact(msg.id)}
                        className="px-3 py-1 bg-[#1D1D1F] text-white rounded-xl text-xs font-semibold hover:bg-[#2C2C2E] cursor-pointer"
                      >
                        Mark Resolved
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-[#1D1D1F] leading-relaxed pt-1">
                  "{msg.message}"
                </p>
                <p className="text-[10px] text-[#86868B]">Received on {msg.createdAt}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Tour Package Modal */}
      {showAddPackageModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 max-w-lg w-full border border-[#E8E8ED] shadow-2xl">
            <h3 className="text-lg font-bold text-[#1D1D1F] mb-1">
              Create New Tour Package
            </h3>
            <p className="text-xs text-[#86868B] mb-4">Add a new curated itinerary to the public discovery catalog.</p>

            <form onSubmit={handleCreatePackage} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Package Title</label>
                <input
                  type="text"
                  placeholder="e.g. Icelandic Northern Lights & Ice Caves"
                  value={pkgTitle}
                  onChange={(e) => setPkgTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium focus:outline-none focus:border-[#D2D2D7]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Destination</label>
                  <select
                    value={pkgDestId}
                    onChange={(e) => setPkgDestId(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium focus:outline-none focus:border-[#D2D2D7] cursor-pointer"
                  >
                    {destinations.map(d => (
                      <option key={d.id} value={d.id}>{d.name}, {d.country}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Price per Traveler ($)</label>
                  <input
                    type="number"
                    value={pkgPrice}
                    onChange={(e) => setPkgPrice(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium focus:outline-none focus:border-[#D2D2D7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Duration Days</label>
                  <input
                    type="number"
                    value={pkgDays}
                    onChange={(e) => setPkgDays(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium focus:outline-none focus:border-[#D2D2D7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Duration Nights</label>
                  <input
                    type="number"
                    value={pkgNights}
                    onChange={(e) => setPkgNights(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium focus:outline-none focus:border-[#D2D2D7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Group Size</label>
                  <input
                    type="text"
                    value={pkgGroup}
                    onChange={(e) => setPkgGroup(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium focus:outline-none focus:border-[#D2D2D7]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={pkgImage}
                  onChange={(e) => setPkgImage(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium focus:outline-none focus:border-[#D2D2D7]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Overview Summary</label>
                <textarea
                  rows={2}
                  value={pkgOverview}
                  onChange={(e) => setPkgOverview(e.target.value)}
                  placeholder="Summary of the travel experience..."
                  className="w-full px-3 py-2 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium focus:outline-none focus:border-[#D2D2D7]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddPackageModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#86868B] hover:bg-[#F5F5F7] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#1D1D1F] text-white hover:bg-[#2C2C2E] cursor-pointer"
                >
                  Publish Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Package Modal */}
      {editingPackage && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 max-w-md w-full border border-[#E8E8ED] shadow-2xl">
            <h3 className="text-lg font-bold text-[#1D1D1F] mb-1">
              Edit Package: {editingPackage.title}
            </h3>

            <form onSubmit={handleUpdatePackage} className="space-y-3.5 mt-4">
              <div>
                <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Title</label>
                <input
                  type="text"
                  value={editingPackage.title}
                  onChange={(e) => setEditingPackage({ ...editingPackage, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium focus:outline-none focus:border-[#D2D2D7]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={editingPackage.price}
                    onChange={(e) => setEditingPackage({ ...editingPackage, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium focus:outline-none focus:border-[#D2D2D7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Status</label>
                  <select
                    value={editingPackage.status}
                    onChange={(e) => setEditingPackage({ ...editingPackage, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium focus:outline-none focus:border-[#D2D2D7] cursor-pointer"
                  >
                    <option value="active">Active</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingPackage(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#86868B] hover:bg-[#F5F5F7] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#1D1D1F] text-white hover:bg-[#2C2C2E] cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
