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

  // Short day labels for mobile, full for desktop
  const dayLabelsFull = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayLabelsShort = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="max-w-3xl mx-auto pt-2 sm:pt-8 md:pt-12 pb-6 sm:pb-16 md:pb-20">
      {/* Main Calendar Container */}
      <div className="relative bg-[#f9f5eb] shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden border border-[#d4c3a8]">
        
        {/* Spiral Binding — hidden on mobile */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 hidden sm:flex gap-2 md:gap-3 -mt-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="w-4 h-5 md:w-5 md:h-6 bg-zinc-800 rounded-full shadow-inner flex items-center justify-center ring-1 ring-white/30"
            >
              <div className="w-0.5 h-2.5 md:w-1 md:h-3 bg-zinc-700 rounded" />
            </div>
          ))}
        </div>

        {/* Hero Image Section */}
        <div className="relative h-32 sm:h-56 md:h-80 bg-zinc-900">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://cdn.pixabay.com/photo/2017/03/07/14/19/mountain-climbing-2124113_1280.jpg')`,
            }}
          />
          
          <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-transparent" />

          <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 text-white">
            <p className="text-[9px] sm:text-xs md:text-sm uppercase tracking-[2px] sm:tracking-[3px] font-medium opacity-90">Momentum • {year}</p>
            <h2 className="text-2xl sm:text-5xl md:text-7xl font-black tracking-[-0.04em] leading-none text-white drop-shadow-md">
              {monthName}
            </h2>
          </div>

          <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 text-right">
            <p className="text-white/90 text-[9px] sm:text-xs md:text-sm font-medium">Keep climbing</p>
          </div>
        </div>

        {/* Calendar Grid Area */}
        <div className="p-2 sm:p-5 md:p-8 bg-[#f9f5eb]">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 mb-1.5 sm:mb-4">
            {dayLabelsFull.map((day, idx) => (
              <div
                key={day + idx}
                className="text-center text-[9px] sm:text-xs font-semibold text-[#8c6f47] tracking-wider sm:tracking-widest py-1 sm:py-3"
              >
                <span className="hidden sm:inline">{day}</span>
                <span className="sm:hidden">{dayLabelsShort[idx]}</span>
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-0.5 sm:gap-2 md:gap-3">
            {blanks.map((_, i) => (
              <div
                key={`blank-${i}`}
                className="min-h-10 sm:min-h-20 md:min-h-27 bg-[#f9f5eb] rounded-md sm:rounded-xl md:rounded-2xl border border-[#e5d9c0]/60"
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
        <div className="flex justify-between items-center px-3 sm:px-6 md:px-8 py-2.5 sm:py-4 md:py-6 border-t border-[#e5d9c0] bg-[#f9f5eb]">
          <button
            onClick={handlePrevMonth}
            className="flex items-center gap-1 sm:gap-2 text-[#8c6f47] hover:text-[#5c4730] active:text-[#3c2f1f] transition-colors font-medium text-xs sm:text-base md:text-lg px-2 py-1"
          >
            ← <span className="hidden sm:inline">Previous</span><span className="sm:hidden">Prev</span>
          </button>

          {/* Month/Year indicator — mobile only */}
          <span className="sm:hidden text-xs font-semibold text-[#5c4730] tracking-wide">
            {monthName.slice(0, 3)} {year}
          </span>

          <button
            onClick={handleNextMonth}
            className="flex items-center gap-1 sm:gap-2 text-[#8c6f47] hover:text-[#5c4730] active:text-[#3c2f1f] transition-colors font-medium text-xs sm:text-base md:text-lg px-2 py-1"
          >
            <span className="hidden sm:inline">Next</span><span className="sm:hidden">Next</span> →
          </button>
        </div>
      </div>

      {/* Wall hanging shadow */}
      <div className="h-3 sm:h-6 md:h-8 mx-auto max-w-[92%] bg-black/10 blur-lg sm:blur-2xl -mt-2 sm:-mt-4 md:-mt-6 rounded-full" />
    </div>
  );
};

export default CalendarGrid;
