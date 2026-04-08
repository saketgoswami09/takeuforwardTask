import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDate, toggleModal } from "../../features/calendarSlice";

const DayCell = ({ date, isToday }) => {
  const dispatch = useDispatch();

  const events = useSelector((state) =>
    state.calendar.events.filter((e) => e.date === date)
  );

  const dayNumber = new Date(date).getDate();
  const isWeekend = [0, 6].includes(new Date(date).getDay());

  return (
    <div
      onClick={() => dispatch(selectDate(date))}
      className={`
        group relative min-h-27 rounded-2xl p-4 cursor-pointer 
        transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.985]
        border border-[#e5d9c0] bg-[#f9f5eb] shadow-sm
        hover:shadow-md hover:border-[#d4c3a8]
        ${isToday 
          ? "ring-2 ring-offset-4 ring-offset-[#f9f5eb] ring-amber-600 bg-[#fffdf0]" 
          : isWeekend 
            ? "bg-[#f5f0e6]" 
            : "bg-[#f9f5eb]"
        }
      `}
    >
      {/* Day Number */}
      <div className="flex justify-between items-start">
        <span
          className={`text-2xl font-light tracking-tighter transition-colors
            ${isToday ? "text-amber-700" : "text-[#3c2f1f]"}`}
        >
          {dayNumber}
        </span>

        {/* Event Indicator Dots */}
        {events.length > 0 && (
          <div className="flex gap-1">
            {events.slice(0, 3).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-amber-600/70"
              />
            ))}
          </div>
        )}
      </div>

      {/* Events List */}
      <div className="mt-4 space-y-1.5 min-h-13">
        {events.length > 0 ? (
          events.slice(0, 3).map((event) => (
            <div
              key={event.id}
              className="text-xs leading-tight text-[#4a3c2a] font-medium line-clamp-1"
            >
              • {event.title}
            </div>
          ))
        ) : (
          <div className="text-[10px] text-[#a38b6e] italic opacity-60">
            No plans yet
          </div>
        )}
      </div>

      {/* Add Button - Appears on Hover */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(selectDate(date));
          dispatch(toggleModal());
        }}
        className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 
                   text-xs font-medium px-3 py-1 rounded-full bg-white/80 hover:bg-white 
                   text-[#5c4730] shadow-sm transition-all hover:shadow active:scale-95"
      >
        + Add
      </button>

      {/* Today Highlight Accent */}
      {isToday && (
        <div className="absolute top-3 right-3 text-[10px] font-semibold tracking-widest text-amber-600">
          TODAY
        </div>
      )}
    </div>
  );
};

export default DayCell;