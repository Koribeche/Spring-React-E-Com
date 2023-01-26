import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const commandeSlice = createSlice({
  name: "commande",
  initialState,
  reducers: {
    resetCommande: () => {
      return [];
    },
    setCommande: (state, action) => {
      return action.payload;
    },
    updateCommande: (state, action) => {
      const tmp = state.filter((elt) => elt._id !== action.payload._id);
      tmp.unshift(action.payload);
      return tmp;
    },
  },
});

export const { setCommande, updateCommande, resetCommande } =
  commandeSlice.actions;
export default commandeSlice.reducer;
