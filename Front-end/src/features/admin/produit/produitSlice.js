import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  produits: [],
  filtre: { name: "", sortBy: "DESC", orderBy: "idProduit", page: 0 },
  nbrPages: 1,
};

export const produitSlice = createSlice({
  name: "produit",
  initialState,
  reducers: {
    reset: (state) => {
      state.filtre = {
        name: "",
        sortBy: "DESC",
        orderBy: "idProduit",
        page: 0,
      };
    },

    setFiltre: (state, action) => {
      state.filtre = { ...state.filtre, ...action.payload };
    },

    setProduit: (state, action) => {
      state.produits = action.payload.produits;
      state.nbrPages = action.payload.nbrPages;
    },

    addProduit: (state, action) => {
      state.produits.unshift(action.payload);
    },

    removeProduit: (state, action) => {
      state.produits = state.produits.filter(
        (elt) => elt.id !== action.payload
      );
    },

    updateProduit: (state, action) => {
      const tmp = state.produits.filter((elt) => elt.id !== action.payload.id);
      tmp.unshift(action.payload);
      state.produits = tmp;
    },
  },
});

export const {
  setProduit,
  setFiltre,
  reset,
  addProduit,
  removeProduit,
  updateProduit,
  resetProduit,
} = produitSlice.actions;
export default produitSlice.reducer;
