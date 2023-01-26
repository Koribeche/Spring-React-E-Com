import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  caracteristiques: [],
  filtre: { name: "", sortBy: "DESC", orderBy: "idCaracteristique", page: 0 },
  nbrPages: 1,
};

export const caracteristiqueSlice = createSlice({
  name: "caracteristique",
  initialState,
  reducers: {
    reset: (state) => {
      state.filtre = {
        name: "",
        sortBy: "DESC",
        orderBy: "idCaracteristique",
        page: 0,
      };
    },

    setFiltre: (state, action) => {
      state.filtre = { ...state.filtre, ...action.payload };
    },

    setCaracteristique: (state, action) => {
      state.caracteristiques = action.payload.caracteristiques;
      state.nbrPages = action.payload.nbrPages;
    },

    addCaracteristique: (state, action) => {
      state.caracteristiques.unshift(action.payload);
    },

    removeCaracteristique: (state, action) => {
      state.caracteristiques = state.caracteristiques.filter(
        (elt) => elt.idCaracteristique !== action.payload
      );
    },

    updateCaracteristique: (state, action) => {
      const tmp = state.caracteristiques.filter(
        (elt) => elt.idCaracteristique !== action.payload.idCaracteristique
      );
      tmp.unshift(action.payload);
      state.caracteristiques = tmp;
    },
  },
});

export const {
  setCaracteristique,
  setFiltre,
  reset,
  addCaracteristique,
  removeCaracteristique,
  updateCaracteristique,
} = caracteristiqueSlice.actions;
export default caracteristiqueSlice.reducer;
