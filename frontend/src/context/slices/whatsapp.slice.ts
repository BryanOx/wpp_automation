import { createSlice } from "@reduxjs/toolkit";
import { messages } from "../../constants";

export interface Contact {
  name: string;
  phone: string;
  extras: { [key: string]: string }[];
};

export interface WhatsappStore {
  connected: boolean;
  contacts: Contact[];
  predefinedMessages: string[];
}

export const initialWhatsappState: WhatsappStore = {
  connected: false,
  contacts: [],
  predefinedMessages: [
    ...Object.keys(messages).map(k => messages[k]),
  ],
};

export const whatsappSlice = createSlice({
  initialState: initialWhatsappState,
  name: 'whatsapp',
  reducers: {
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    removeContact: (state, action) => {
      state.contacts = state.contacts.filter((_, index) => {
        return index !== action.payload;
      });
    },
    addPredefinedMessage: (state, action) => {
      state.predefinedMessages.push(action.payload);
    },
    removePredefinedMessage: (state, action) => {
      state.predefinedMessages = state.predefinedMessages.filter((_, index) => {
        return index !== action.payload;
      });},
  },
});

export const whatsappActions = whatsappSlice.actions;
