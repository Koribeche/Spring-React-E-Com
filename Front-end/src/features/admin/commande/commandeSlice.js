import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  commandes: [],
  filtre: { name: "", sortBy: "DESC", orderBy: "idCommande", page: 0 },
  nbrPages: 1,
};

export const commandeAdminSlice = createSlice({
  name: "commandeAdmin",
  initialState,
  reducers: {
    reset: (state) => {
      state.filtre = {
        name: "",
        sortBy: "DESC",
        orderBy: "idCommande",
        page: 0,
      };
    },

    setFiltre: (state, action) => {
      state.filtre = { ...state.filtre, ...action.payload };
    },

    setCommande: (state, action) => {
      state.commandes = action.payload.commandes;
      state.nbrPages = action.payload.nbrPages;
    },

    addCommande: (state, action) => {
      state.commandes.unshift(action.payload);
    },

    removeCommande: (state, action) => {
      console.log(state.commandes);
      state.commandes = state.commandes.filter((elt) => {
        console.log(elt);
        console.log(action.payload);
        console.log("-----------------------------------------");
        return elt.idCommande !== action.payload;
      });
    },

    updateCommande: (state, action) => {
      const tmp = state.commandes.filter(
        (elt) => elt.idCommande !== action.payload.idCommande
      );
      tmp.unshift(action.payload);
      state.commandes = tmp;
    },
  },
});

export const {
  setCommande,
  setFiltre,
  reset,
  addCommande,
  removeCommande,
  updateCommande,
  resetCommande,
} = commandeAdminSlice.actions;
export default commandeAdminSlice.reducer;
