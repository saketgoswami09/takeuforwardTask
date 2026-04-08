import { createSlice, nanoid, createSelector } from '@reduxjs/toolkit';

// Load from localStorage or set defaults
const savedEvents = JSON.parse(localStorage.getItem('calendar_events')) || [];

// Helper: get today's date string in local timezone (not UTC)
const getLocalDateStr = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    selectedDate: getLocalDateStr(),
    viewDate: new Date().toISOString(),
    events: savedEvents,
    isModalOpen: false,
  },
  reducers: {
    selectDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    changeMonth: (state, action) => {
      state.viewDate = action.payload;
    },
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    addEvent: (state, action) => {
      state.events.push({
        id: nanoid(),
        date: state.selectedDate,
        title: action.payload.title,
        type: action.payload.type,
      });
      localStorage.setItem('calendar_events', JSON.stringify(state.events));
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(e => e.id !== action.payload);
      localStorage.setItem('calendar_events', JSON.stringify(state.events));
    },
  },
});

// Memoized selector factory — one per date string
export const makeSelectEventsByDate = (date) =>
  createSelector(
    (state) => state.calendar.events,
    (events) => events.filter((e) => e.date === date)
  );

// Selector for today's events
export const selectTodayEvents = createSelector(
  (state) => state.calendar.events,
  (state) => state.calendar.selectedDate,
  (events, selectedDate) => events.filter((e) => e.date === selectedDate)
);

export const { selectDate, changeMonth, toggleModal, addEvent, deleteEvent } = calendarSlice.actions;
export default calendarSlice.reducer;
