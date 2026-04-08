import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeMonth } from "../../features/calendarSlice";
import DayCell from "./DayCell";

// Helper: get today's date string in local timezone
const getLocalDateStr = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

const formatDate = (year, month, day) => {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

const CalendarGrid = () => {
  const dispatch = useDispatch();

  const viewDateStr = useSelector((state) => state.calendar.viewDate);
  const viewDate = new Date(viewDateStr);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const todayStr = getLocalDateStr();

  const handlePrevMonth = () => {
    dispatch(changeMonth(new Date(year, month - 1, 1).toISOString()));
  };

  const handleNextMonth = () => {
    dispatch(changeMonth(new Date(year, month + 1, 1).toISOString()));
  };

  const monthName = viewDate.toLocaleString("default", { month: "long" });

  return (
    <div className="max-w-3xl mx-auto pt-12 pb-20">
      {/* Main Calendar Container */}
      <div className="relative bg-[#f9f5eb] shadow-2xl rounded-3xl overflow-hidden border border-[#d4c3a8]">
        
        {/* Spiral Binding */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 flex gap-3 -mt-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="w-5 h-6 bg-zinc-800 rounded-full shadow-inner flex items-center justify-center ring-1 ring-white/30"
            >
              <div className="w-1 h-3 bg-zinc-700 rounded" />
            </div>
          ))}
        </div>

        {/* Hero Image Section */}
        <div className="relative h-80 bg-zinc-900">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://cdn.pixabay.com/photo/2017/03/07/14/19/mountain-climbing-2124113_1280.jpg')`,
            }}
          />
          
          <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-transparent" />

          <div className="absolute bottom-8 left-8 text-white">
            <p className="text-sm uppercase tracking-[3px] font-medium opacity-90">Momentum • {year}</p>
            <h1 className="text-7xl font-black tracking-[-0.04em] leading-none text-white drop-shadow-md">
              {monthName}
            </h1>
          </div>

          <div className="absolute bottom-8 right-8 text-right">
            <p className="text-white/90 text-sm font-medium">Keep climbing</p>
          </div>
        </div>

        {/* Calendar Grid Area */}
        <div className="p-8 bg-[#f9f5eb]">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-[#8c6f47] tracking-widest py-3"
              >
              {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-3">
            {blanks.map((_, i) => (
              <div
                key={`blank-${i}`}
                className="min-h-27 bg-[#f9f5eb] rounded-2xl border border-[#e5d9c0]/60"
              />
            ))}

            {days.map((day) => {
              const dateStr = formatDate(year, month, day);
              return (
                <DayCell
                  key={dateStr}
                  date={dateStr}
                  isCurrentMonth={true}
                  isToday={dateStr === todayStr}
                />
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center px-8 py-6 border-t border-[#e5d9c0] bg-[#f9f5eb]">
          <button
            onClick={handlePrevMonth}
            className="flex items-center gap-2 text-[#8c6f47] hover:text-[#5c4730] transition-colors font-medium text-lg"
          >
            ← Previous
          </button>

          <button
            onClick={handleNextMonth}
            className="flex items-center gap-2 text-[#8c6f47] hover:text-[#5c4730] transition-colors font-medium text-lg"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Wall hanging shadow */}
      <div className="h-8 mx-auto max-w-[92%] bg-black/10 blur-2xl -mt-6 rounded-full" />
    </div>
  );
};

export default CalendarGrid;
