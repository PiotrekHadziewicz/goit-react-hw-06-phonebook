import { createReducer } from "@reduxjs/toolkit";
import { addContact, deleteContact, filterContact, addFromLocalStorage } from "./actions";

const initialState = {
  items: [],
  filter: '',
};
export const contactsReducer = createReducer(initialState, builder => {
  builder
    .addCase(addContact, (state, action) => {
      state.items = [...state.items, action.payload];
    })
    .addCase(deleteContact, (state, action) => {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
    })
    .addCase(filterContact, (state, action) => {
      state.filter = action.payload;
    })
    .addCase(addFromLocalStorage, (state, action) => {
      state.items = [...state.items, ...action.payload];
    })
    .addDefaultCase((state, action) => {})
});