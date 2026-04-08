import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CalendarGrid from '../components/calendar/CalendarGrid';
import EventModal from '../components/calendar/EventModal';
import { toggleModal, deleteEvent, makeSelectEventsByDate } from '../features/calendarSlice';

// Helper: get today's date string in local timezone
const getLocalDateStr = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

const CalendarPage = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.calendar.isModalOpen);

  const todayStr = getLocalDateStr();
  const selectTodayEvents = useMemo(() => makeSelectEventsByDate(todayStr), [todayStr]);
  const todayEvents = useSelector(selectTodayEvents);

  const typeColorMap = {
    Work: 'bg-blue-500',
    Personal: 'bg-emerald-500',
    Holiday: 'bg-rose-500',
    Milestone: 'bg-amber-500',
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-6">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
              <p className="uppercase tracking-[4px] text-sm font-medium text-cyan-500">Momentum</p>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-zinc-900 tracking-[-0.04em]">
              Wall Calendar
            </h1>
            <p className="mt-4 text-xl text-zinc-600 max-w-md">
              Your journey visualized.<br />One month at a time.
            </p>
          </div>

          <button
            onClick={() => dispatch(toggleModal())}
            className="group flex items-center gap-3 px-10 py-5 bg-white hover:bg-zinc-50 text-zinc-900 font-semibold rounded-3xl shadow-xl border border-zinc-100 transition-all hover:scale-[1.03]"
          >
            <span className="text-3xl leading-none group-active:rotate-12 transition-transform">+</span>
            <span className="text-lg">New Event</span>
          </button>
        </header>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Calendar */}
          <div className="lg:col-span-8">
            <CalendarGrid />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* Today's Focus — Now dynamic! */}
            <div className="bg-white rounded-3xl shadow-xl border border-zinc-100 p-8">
              <h3 className="text-2xl font-semibold text-zinc-900 mb-6">Today's Focus</h3>
              <div className="bg-zinc-50 rounded-2xl p-6 min-h-40">
                {todayEvents.length > 0 ? (
                  <div className="space-y-3">
                    {todayEvents.map((event) => (
                      <div
                        key={event.id}
                        className="group flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-zinc-100 shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full flex-shrink-0 ${typeColorMap[event.type] || 'bg-zinc-400'}`} />
                          <span className="text-sm font-medium text-zinc-800">{event.title}</span>
                        </div>
                        <button
                          onClick={() => dispatch(deleteEvent(event.id))}
                          className="opacity-0 group-hover:opacity-100 text-rose-400 hover:text-rose-600 text-lg transition-opacity leading-none"
                          title="Delete event"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <p className="text-zinc-400 text-sm">No events yet</p>
                    <button 
                      onClick={() => dispatch(toggleModal())}
                      className="mt-6 text-cyan-600 hover:text-cyan-700 text-sm font-medium flex items-center gap-1"
                    >
                      + Add something meaningful
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Legend — aligned with modal categories */}
            <div className="bg-white rounded-3xl shadow-xl border border-zinc-100 p-8">
              <h4 className="font-semibold text-zinc-900 mb-6">Event Types</h4>
              <div className="space-y-5">
                {[
                  { color: 'bg-blue-500', label: 'Work / Deep Focus' },
                  { color: 'bg-emerald-500', label: 'Personal Growth' },
                  { color: 'bg-rose-500', label: 'Rest / Holiday' },
                  { color: 'bg-amber-500', label: 'Milestone' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-5 h-5 ${item.color} rounded-2xl flex-shrink-0`} />
                    <p className="font-medium text-zinc-800">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Motivational Quote */}
            <div className="relative bg-zinc-950 rounded-3xl p-12 text-center border border-white/5 shadow-2xl overflow-hidden">
              <p className="text-[27px] leading-tight text-white/95 italic tracking-tight">
                The mountains are calling.<br />
                <span className="text-cyan-300">Keep moving forward.</span>
              </p>
              <div className="mt-10 flex justify-center items-center gap-4">
                <div className="h-px w-12 bg-cyan-400/30" />
                <span className="text-xs tracking-[3px] text-cyan-400/70 font-medium">MOMENTUM</span>
                <div className="h-px w-12 bg-cyan-400/30" />
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && <EventModal />}
      </div>
    </div>
  );
};

export default CalendarPage;
