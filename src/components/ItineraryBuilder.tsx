import React, { useState } from 'react';
import {
  Calendar, Clock, MapPin, Plus, Trash2, DollarSign, Check,
  Printer, Sparkles, Compass, ArrowRight, Share2
} from 'lucide-react';
import { ItineraryPlan, ItineraryItem } from '../types';
import { useApp } from '../context/AppContext';

export const ItineraryBuilder: React.FC = () => {
  const {
    itineraries,
    addItinerary,
    updateItinerary,
    deleteItinerary,
    currentUser,
    openAuthModal,
    showToast,
    destinations
  } = useApp();

  const [activePlanId, setActivePlanId] = useState<string>(itineraries[0]?.id || '');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [showNewPlanModal, setShowNewPlanModal] = useState(false);

  // New activity form
  const [newActivityName, setNewActivityName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newTimeSlot, setNewTimeSlot] = useState<'Morning' | 'Afternoon' | 'Evening'>('Morning');
  const [newCost, setNewCost] = useState(25);
  const [newNotes, setNewNotes] = useState('');

  // New plan form
  const [newPlanTitle, setNewPlanTitle] = useState('My Dream Expedition');
  const [newPlanDestination, setNewPlanDestination] = useState(destinations[0].name);
  const [newPlanStartDate, setNewPlanStartDate] = useState('2025-11-01');
  const [newPlanEndDate, setNewPlanEndDate] = useState('2025-11-06');
  const [newPlanBudget, setNewPlanBudget] = useState(2000);

  const activePlan = itineraries.find(p => p.id === activePlanId) || itineraries[0];

  const planDays = activePlan ? Array.from(new Set(activePlan.items.map(i => i.day))).sort((a: number, b: number) => a - b) : [];
  const displayDays = planDays.length > 0 ? planDays : [1, 2, 3];

  const currentDayItems = activePlan ? activePlan.items.filter(item => item.day === selectedDay) : [];

  const totalSpent = activePlan ? activePlan.items.reduce((sum, item) => sum + (item.cost || 0), 0) : 0;
  const budgetProgress = activePlan ? Math.min(100, Math.round((totalSpent / (activePlan.totalBudget || 1)) * 100)) : 0;

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      openAuthModal('login');
      return;
    }

    const matchedDest = destinations.find(d => d.name === newPlanDestination);

    addItinerary({
      userId: currentUser.id,
      title: newPlanTitle,
      destinationName: newPlanDestination,
      coverImage: matchedDest?.coverImage || destinations[0].coverImage,
      startDate: newPlanStartDate,
      endDate: newPlanEndDate,
      totalBudget: newPlanBudget,
      items: [
        {
          id: `iti_${Date.now()}_1`,
          day: 1,
          timeSlot: 'Morning',
          activity: `Arrival & check-in at ${newPlanDestination}`,
          location: `${newPlanDestination} Central`,
          cost: 40,
          notes: 'Collect welcome keys and local transit pass'
        },
        {
          id: `iti_${Date.now()}_2`,
          day: 1,
          timeSlot: 'Evening',
          activity: 'Welcome Sunset Dinner',
          location: 'Old Town Waterfront',
          cost: 75,
          notes: 'Enjoy local seasonal dishes'
        }
      ]
    });

    setShowNewPlanModal(false);
  };

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePlan || !newActivityName.trim()) return;

    const newItem: ItineraryItem = {
      id: `act_${Date.now()}`,
      day: selectedDay,
      timeSlot: newTimeSlot,
      activity: newActivityName,
      location: newLocation || activePlan.destinationName,
      cost: Number(newCost) || 0,
      notes: newNotes
    };

    updateItinerary(activePlan.id, {
      items: [...activePlan.items, newItem]
    });

    setNewActivityName('');
    setNewLocation('');
    setNewNotes('');
    setNewCost(20);
    setShowAddActivityModal(false);
  };

  const handleDeleteActivity = (activityId: string) => {
    if (!activePlan) return;
    updateItinerary(activePlan.id, {
      items: activePlan.items.filter(i => i.id !== activityId)
    });
    showToast('Activity removed', 'info');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0066CC]">Interactive Trip Planner</span>
          <h2 className="text-3xl font-bold text-[#1D1D1F] mt-1 tracking-tight">
            Travel Itinerary Studio
          </h2>
          <p className="text-sm text-[#86868B] mt-1">
            Build custom day-by-day schedules, estimate daily budgets, and track activity milestones.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-[#E8E8ED] hover:bg-[#F5F5F7] text-xs font-semibold text-[#1D1D1F] transition-colors shadow-xs cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Itinerary</span>
          </button>
          <button
            onClick={() => setShowNewPlanModal(true)}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1D1D1F] hover:bg-[#2C2C2E] text-xs font-semibold text-white transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Custom Trip</span>
          </button>
        </div>
      </div>

      {/* Itineraries Selector Strip */}
      {itineraries.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
          {itineraries.map((itin) => (
            <button
              key={itin.id}
              onClick={() => {
                setActivePlanId(itin.id);
                setSelectedDay(1);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activePlan?.id === itin.id
                  ? 'bg-[#1D1D1F] text-white shadow-xs'
                  : 'bg-white border border-[#E8E8ED] text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]'
              }`}
            >
              {itin.title} ({itin.destinationName})
            </button>
          ))}
        </div>
      )}

      {activePlan && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Itinerary Overview & Budget Tracker */}
          <div className="lg:col-span-4 space-y-6">
            {/* Trip Card */}
            <div className="bg-white rounded-[2rem] border border-[#E8E8ED] overflow-hidden shadow-sm">
              {activePlan.coverImage && (
                <div className="h-44 w-full relative">
                  <img src={activePlan.coverImage} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-5 text-white">
                    <p className="text-xs font-semibold text-white/80">{activePlan.destinationName}</p>
                    <h4 className="text-xl font-bold leading-tight">{activePlan.title}</h4>
                  </div>
                </div>
              )}

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs text-[#86868B]">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#86868B]" />
                    {activePlan.startDate} to {activePlan.endDate}
                  </span>
                  <span className="font-semibold text-[#1D1D1F]">{activePlan.items.length} Activities</span>
                </div>

                {/* Budget Progress Bar */}
                <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E8E8ED] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#86868B] font-medium">Activity Budget</span>
                    <span className="font-bold text-[#1D1D1F]">${totalSpent} / ${activePlan.totalBudget}</span>
                  </div>
                  <div className="w-full h-2 bg-[#E8E8ED] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        budgetProgress > 90 ? 'bg-rose-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${budgetProgress}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-[#86868B]">
                    {activePlan.totalBudget - totalSpent >= 0
                      ? `$${activePlan.totalBudget - totalSpent} remaining within target budget`
                      : `Budget exceeded by $${totalSpent - activePlan.totalBudget}`}
                  </p>
                </div>

                {/* Days Selector */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B] mb-2 block">
                    Select Itinerary Day
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {displayDays.map((d) => (
                      <button
                        key={d}
                        onClick={() => setSelectedDay(d)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedDay === d
                            ? 'bg-[#1D1D1F] text-white shadow-xs'
                            : 'bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F]'
                        }`}
                      >
                        Day {d}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowAddActivityModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Activity to Day {selectedDay}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Day Schedule Timeline */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2rem] border border-[#E8E8ED] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E8ED] mb-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B]">Schedule</span>
                  <h3 className="text-xl font-bold text-[#1D1D1F]">
                    Day {selectedDay} Schedule
                  </h3>
                </div>

                <span className="text-xs text-[#86868B]">
                  {currentDayItems.length} planned items
                </span>
              </div>

              {currentDayItems.length === 0 ? (
                <div className="text-center py-12">
                  <Compass className="w-10 h-10 text-[#86868B]/40 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-[#1D1D1F]">No activities scheduled for Day {selectedDay}</p>
                  <p className="text-xs text-[#86868B] mt-0.5">Click below to add a morning walk, culinary tasting, or museum tour.</p>
                  <button
                    onClick={() => setShowAddActivityModal(true)}
                    className="mt-4 px-5 py-2.5 rounded-full bg-[#1D1D1F] text-white text-xs font-semibold hover:bg-[#2C2C2E] cursor-pointer shadow-xs"
                  >
                    + Add Day {selectedDay} Activity
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {currentDayItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 sm:p-5 rounded-2xl bg-[#F5F5F7] border border-[#E8E8ED] hover:border-[#D2D2D7] transition-all flex items-start justify-between gap-4 group"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full ${
                            item.timeSlot === 'Morning'
                              ? 'bg-amber-100 text-amber-900'
                              : item.timeSlot === 'Afternoon'
                              ? 'bg-sky-100 text-sky-900'
                              : 'bg-purple-100 text-purple-900'
                          }`}>
                            {item.timeSlot}
                          </span>
                          {item.cost !== undefined && item.cost > 0 && (
                            <span className="text-xs font-semibold text-[#1D1D1F]">
                              ${item.cost}
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm sm:text-base font-bold text-[#1D1D1F]">
                          {item.activity}
                        </h4>

                        <p className="text-xs text-[#86868B] flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#86868B] shrink-0" />
                          {item.location}
                        </p>

                        {item.notes && (
                          <p className="text-xs text-[#1D1D1F] bg-white p-3 rounded-xl border border-[#E8E8ED] mt-2 leading-relaxed">
                            💡 {item.notes}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteActivity(item.id)}
                        className="opacity-0 group-hover:opacity-100 text-[#86868B] hover:text-rose-600 p-1.5 transition-all cursor-pointer"
                        title="Remove activity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Activity Modal */}
      {showAddActivityModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-6 max-w-md w-full border border-[#E8E8ED] shadow-2xl">
            <h3 className="text-base font-bold text-[#1D1D1F] mb-1">
              Add Activity to Day {selectedDay}
            </h3>
            <p className="text-xs text-[#86868B] mb-4">Customize your travel timeline with visits and experiences.</p>

            <form onSubmit={handleAddActivity} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Activity Name</label>
                <input
                  type="text"
                  placeholder="e.g. Bamboo Grove Morning Stroll"
                  value={newActivityName}
                  onChange={(e) => setNewActivityName(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F] focus:outline-none focus:border-[#D2D2D7]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Time Slot</label>
                  <select
                    value={newTimeSlot}
                    onChange={(e) => setNewTimeSlot(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F] focus:outline-none cursor-pointer"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Estimated Cost ($)</label>
                  <input
                    type="number"
                    value={newCost}
                    onChange={(e) => setNewCost(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Location / Landmark</label>
                <input
                  type="text"
                  placeholder="e.g. Arashiyama, Kyoto"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F] focus:outline-none focus:border-[#D2D2D7]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Travel Notes / Tips</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Arrive early before 7 AM, bring camera tripod"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F] focus:outline-none focus:border-[#D2D2D7]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddActivityModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#86868B] hover:bg-[#F5F5F7] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#1D1D1F] text-white hover:bg-[#2C2C2E] cursor-pointer"
                >
                  Save Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Trip Plan Modal */}
      {showNewPlanModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-6 max-w-md w-full border border-[#E8E8ED] shadow-2xl">
            <h3 className="text-base font-bold text-[#1D1D1F] mb-1">
              Create New Custom Trip Plan
            </h3>
            <p className="text-xs text-[#86868B] mb-4">Plan an intentional itinerary from scratch.</p>

            <form onSubmit={handleCreatePlan} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Trip Name</label>
                <input
                  type="text"
                  value={newPlanTitle}
                  onChange={(e) => setNewPlanTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Destination</label>
                <select
                  value={newPlanDestination}
                  onChange={(e) => setNewPlanDestination(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F] focus:outline-none cursor-pointer"
                >
                  {destinations.map(d => (
                    <option key={d.id} value={d.name}>{d.name}, {d.country}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newPlanStartDate}
                    onChange={(e) => setNewPlanStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1D1D1F] mb-1">End Date</label>
                  <input
                    type="date"
                    value={newPlanEndDate}
                    onChange={(e) => setNewPlanEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Target Budget ($)</label>
                <input
                  type="number"
                  value={newPlanBudget}
                  onChange={(e) => setNewPlanBudget(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewPlanModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#86868B] hover:bg-[#F5F5F7] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#1D1D1F] text-white hover:bg-[#2C2C2E] cursor-pointer"
                >
                  Start Planning
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
