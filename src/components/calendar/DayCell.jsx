import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDate, toggleModal, deleteEvent, makeSelectEventsByDate } from "../../features/calendarSlice";

const DayCell = ({ date, isToday }) => {
  const dispatch = useDispatch();

  // Memoized selector — prevents new array on every render
  const selectEvents = useMemo(() => makeSelectEventsByDate(date), [date]);
  const events = useSelector(selectEvents);

  const dayNumber = new Date(date).getDate();
  const isWeekend = [0, 6].includes(new Date(date).getDay());

  const typeColorMap = {
    Work: "bg-blue-500",
    Personal: "bg-emerald-500",
    Holiday: "bg-rose-500",
    Milestone: "bg-amber-500",
  };

  return (
    <div
      onClick={() => {
        dispatch(selectDate(date));
        // On mobile, tapping opens the modal directly (no hover available)
        if (window.innerWidth < 640) {
          dispatch(toggleModal());
        }
      }}
      className={`
        group relative min-h-10 sm:min-h-20 md:min-h-27 rounded-md sm:rounded-xl md:rounded-2xl 
        p-1 sm:p-2.5 md:p-4 cursor-pointer 
        transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.985]
        border border-[#e5d9c0] bg-[#f9f5eb] shadow-sm
        hover:shadow-md hover:border-[#d4c3a8]
        ${isToday 
          ? "ring-1 sm:ring-2 ring-offset-1 sm:ring-offset-4 ring-offset-[#f9f5eb] ring-amber-600 bg-[#fffdf0]" 
          : isWeekend 
            ? "bg-[#f5f0e6]" 
            : "bg-[#f9f5eb]"
        }
      `}
    >
      {/* Day Number + Event Dots */}
      <div className="flex justify-between items-start">
        <span
          className={`text-[11px] sm:text-lg md:text-2xl font-light tracking-tighter transition-colors leading-none
            ${isToday ? "text-amber-700 font-medium" : "text-[#3c2f1f]"}`}
        >
          {dayNumber}
        </span>

        {/* Event Indicator Dots — colored by type */}
        {events.length > 0 && (
          <div className="flex gap-px sm:gap-1">
            {events.slice(0, 3).map((event, i) => (
              <div
                key={i}
                className={`w-1 h-1 sm:w-2 sm:h-2 rounded-full ${typeColorMap[event.type] || "bg-amber-600/70"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Events List — hidden on mobile, visible on sm+ */}
      <div className="hidden sm:block mt-2 md:mt-4 space-y-1 md:space-y-1.5 min-h-0 md:min-h-13">
        {events.length > 0 ? (
          events.slice(0, 2).map((event) => (
            <div
              key={event.id}
              className="group/event flex items-center justify-between text-[10px] md:text-xs leading-tight text-[#4a3c2a] font-medium"
            >
              <span className="line-clamp-1">• {event.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteEvent(event.id));
                }}
                className="opacity-0 group-hover/event:opacity-100 ml-1 text-rose-400 hover:text-rose-600 
                           transition-opacity text-xs sm:text-sm leading-none flex-shrink-0"
                title="Delete event"
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <div className="text-[9px] md:text-[10px] text-[#a38b6e] italic opacity-60 hidden md:block">
            No plans yet
          </div>
        )}
      </div>

      {/* Mobile event count badge */}
      {events.length > 0 && (
        <div className="sm:hidden mt-0.5 text-[8px] text-[#8c6f47] font-medium text-center leading-none">
          {events.length} {events.length === 1 ? 'event' : 'events'}
        </div>
      )}

      {/* Add Button - Appears on Hover (desktop only) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(selectDate(date));
          dispatch(toggleModal());
        }}
        className="hidden sm:block absolute bottom-2 md:bottom-3 right-2 md:right-3 opacity-0 group-hover:opacity-100 
                   text-[10px] md:text-xs font-medium px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-white/80 hover:bg-white 
                   text-[#5c4730] shadow-sm transition-all hover:shadow active:scale-95"
      >
        + Add
      </button>

      {/* Today Highlight Accent */}
      {isToday && (
        <div className="absolute top-0.5 right-0.5 sm:top-2 sm:right-2 md:top-3 md:right-3 text-[6px] sm:text-[8px] md:text-[10px] font-semibold tracking-wider sm:tracking-widest text-amber-600">
          TODAY
        </div>
      )}
    </div>
  );
};

export default DayCell;
