import { createSlice, nanoid } from '@reduxjs/toolkit';

// Load from localStorage or set defaults
const savedEvents = JSON.parse(localStorage.getItem('calendar_events')) || [];

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    selectedDate: new Date().toISOString().split('T')[0],
    viewDate: new Date().toISOString(), // Use string for serializable state
    events: savedEvents,
    isModalOpen: false,
  },
  reducers: {
    selectDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    changeMonth: (state, action) => {
      state.viewDate = action.payload; // Payload: new ISO string
    },
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    addEvent: (state, action) => {
      // action.payload: { title: 'Meet', type: 'Work' }
      state.events.push({
        id: nanoid(),
        date: state.selectedDate,
        ...action.payload
      });
      // Persistence logic
      localStorage.setItem('calendar_events', JSON.stringify(state.events));
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(e => e.id !== action.payload);
      localStorage.setItem('calendar_events', JSON.stringify(state.events));
    }
  }
});

export const { selectDate, changeMonth, toggleModal, addEvent, deleteEvent } = calendarSlice.actions;
export default calendarSlice.reducer;