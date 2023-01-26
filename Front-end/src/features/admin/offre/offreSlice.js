import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offres: [],
  filtre: { name: "", marque: "", sortBy: "DESC", orderBy: "idOffre", page: 0 },
  nbrPages: 1,
};

export const offreSlice = createSlice({
  name: "offre",
  initialState,
  reducers: {
    reset: (state) => {
      state.filtre = {
        name: "",
        marque: "",
        sortBy: "DESC",
        orderBy: "idOffre",
        page: 0,
      };
    },

    setFiltre: (state, action) => {
      state.filtre = { ...state.filtre, ...action.payload };
    },

    setOffre: (state, action) => {
      state.offres = action.payload.offres;
      state.nbrPages = action.payload.nbrPages;
    },

    addOffre: (state, action) => {
      state.offres.unshift(action.payload);
    },

    removeOffre: (state, action) => {
      state.offres = state.offres.filter(
        (elt) => elt.idOffre !== action.payload
      );
    },

    updateOffre: (state, action) => {
      const tmp = state.offres.filter(
        (elt) => elt.idOffre !== action.payload.idOffre
      );
      tmp.unshift(action.payload);
      state.offres = tmp;
    },
  },
});

export const {
  setOffre,
  setFiltre,
  reset,
  addOffre,
  removeOffre,
  updateOffre,
  resetOffre,
} = offreSlice.actions;
export default offreSlice.reducer;
