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
    <div className="min-h-screen bg-[#f8fafc] py-4 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-12 md:mb-16 gap-4 sm:gap-6 md:gap-8">
          <div className="min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-3">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-cyan-400 rounded-full animate-pulse flex-shrink-0" />
              <p className="uppercase tracking-[2px] sm:tracking-[4px] text-[10px] sm:text-sm font-medium text-cyan-500 truncate">Momentum</p>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-zinc-900 tracking-[-0.04em] leading-[1.1]">
              Wall Calendar
            </h1>
            <p className="mt-1.5 sm:mt-4 text-sm sm:text-lg md:text-xl text-zinc-600 max-w-md">
              Your journey visualized.<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>One month at a time.
            </p>
          </div>

          <button
            onClick={() => dispatch(toggleModal())}
            className="group flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-white hover:bg-zinc-50 text-zinc-900 font-semibold rounded-2xl sm:rounded-3xl shadow-xl border border-zinc-100 transition-all hover:scale-[1.03] self-start sm:self-auto w-full sm:w-auto"
          >
            <span className="text-xl sm:text-3xl leading-none group-active:rotate-12 transition-transform">+</span>
            <span className="text-sm sm:text-lg">New Event</span>
          </button>
        </header>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 md:gap-12">
          
          {/* Calendar */}
          <div className="lg:col-span-8 order-1 min-w-0">
            <CalendarGrid />
          </div>

          {/* Sidebar — reorders on mobile: Today's Focus first, then legend */}
          <div className="lg:col-span-4 space-y-5 sm:space-y-8 md:space-y-10 order-2">
            
            {/* Today's Focus */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-zinc-100 p-4 sm:p-6 md:p-8">
              <h3 className="text-lg sm:text-2xl font-semibold text-zinc-900 mb-3 sm:mb-6">Today's Focus</h3>
              <div className="bg-zinc-50 rounded-xl sm:rounded-2xl p-3 sm:p-6 min-h-24 sm:min-h-40">
                {todayEvents.length > 0 ? (
                  <div className="space-y-2 sm:space-y-3">
                    {todayEvents.map((event) => (
                      <div
                        key={event.id}
                        className="group flex items-center justify-between bg-white rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 border border-zinc-100 shadow-sm"
                      >
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                          <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${typeColorMap[event.type] || 'bg-zinc-400'}`} />
                          <span className="text-xs sm:text-sm font-medium text-zinc-800 truncate">{event.title}</span>
                        </div>
                        <button
                          onClick={() => dispatch(deleteEvent(event.id))}
                          className="sm:opacity-0 sm:group-hover:opacity-100 text-rose-400 hover:text-rose-600 text-base sm:text-lg transition-opacity leading-none ml-2 flex-shrink-0"
                          title="Delete event"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <p className="text-zinc-400 text-xs sm:text-sm">No events yet</p>
                    <button 
                      onClick={() => dispatch(toggleModal())}
                      className="mt-3 sm:mt-6 text-cyan-600 hover:text-cyan-700 text-xs sm:text-sm font-medium flex items-center gap-1"
                    >
                      + Add something meaningful
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Legend + Quote — side by side on tablet, stacked on mobile & desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 sm:gap-8 md:gap-10">
              {/* Legend */}
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-zinc-100 p-4 sm:p-6 md:p-8">
                <h4 className="font-semibold text-zinc-900 mb-3 sm:mb-6 text-sm sm:text-base">Event Types</h4>
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-2.5 sm:gap-4 md:gap-5">
                  {[
                    { color: 'bg-blue-500', label: 'Work / Deep Focus' },
                    { color: 'bg-emerald-500', label: 'Personal Growth' },
                    { color: 'bg-rose-500', label: 'Rest / Holiday' },
                    { color: 'bg-amber-500', label: 'Milestone' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 sm:gap-4">
                      <div className={`w-3 h-3 sm:w-5 sm:h-5 ${item.color} rounded-lg sm:rounded-2xl flex-shrink-0`} />
                      <p className="text-xs sm:text-base font-medium text-zinc-800 leading-tight">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Motivational Quote */}
              <div className="relative bg-zinc-950 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 text-center border border-white/5 shadow-2xl overflow-hidden">
                <p className="text-base sm:text-xl md:text-[27px] leading-tight text-white/95 italic tracking-tight">
                  The mountains are calling.<br />
                  <span className="text-cyan-300">Keep moving forward.</span>
                </p>
                <div className="mt-4 sm:mt-8 md:mt-10 flex justify-center items-center gap-2 sm:gap-4">
                  <div className="h-px w-6 sm:w-12 bg-cyan-400/30" />
                  <span className="text-[9px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-cyan-400/70 font-medium">MOMENTUM</span>
                  <div className="h-px w-6 sm:w-12 bg-cyan-400/30" />
                </div>
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
