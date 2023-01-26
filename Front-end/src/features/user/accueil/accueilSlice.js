import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offres: [],
  filtre: { name: "", marque: "", page: 0 },
  nbrPages: 1,
};

export const accueil = createSlice({
  name: "accueil",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.filtre = { name: "", marque: "", page: 0 };
    },
    setOffres: (state, action) => {
      state.offres = action.payload.offres;
      state.nbrPages = action.payload.nbrPages;
    },
    setFiltre: (state, action) => {
      state.filtre = { ...state.filtre, ...action.payload };
    },
  },
});

export const { setOffres, setFiltre, reset } = accueil.actions;
export default accueil.reducer;
