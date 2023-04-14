import { createSlice } from '@reduxjs/toolkit';

const EVENT_SLICE_NAME = 'events';

const parseJSON = (value) => {
  try {
    return JSON.parse(value).sort(
      (e1, e2) =>
        new Date(e1.endedAt).getTime() - new Date(e2.endedAt).getTime()
    );
  } catch (e) {
    localStorage.removeItem(EVENT_SLICE_NAME);
  }
};

const initialState = {
  events: localStorage.getItem(EVENT_SLICE_NAME)
    ? parseJSON(localStorage.getItem(EVENT_SLICE_NAME))
    : [],
};

const eventSlice = createSlice({
  name: EVENT_SLICE_NAME,
  initialState,
  reducers: {
    addEvent: (state, action) => {
      localStorage.setItem(EVENT_SLICE_NAME,JSON.stringify([...state.events, action.payload]));
      state.events = parseJSON(localStorage.getItem(EVENT_SLICE_NAME));
    },
    deleteEvent: (state, action) => {
      const events = state.events.filter((e) => e.createdAt !== action.payload);
      localStorage.setItem(EVENT_SLICE_NAME, JSON.stringify(events));
      state.events = parseJSON(localStorage.getItem(EVENT_SLICE_NAME));
    },
  },
});

export const { addEvent, deleteEvent } = eventSlice.actions;
export default eventSlice.reducer;
