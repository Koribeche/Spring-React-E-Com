import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const panierSlice = createSlice({
  name: "panier",
  initialState,
  reducers: {
    resetPanier: () => {
      return [];
    },
    setPanier: (state, action) => {
      return action.payload;
    },
    addPanier: (state, action) => {
      let tmp = state.find(
        (elt) => elt.idProduitPanier === action.payload.idProduitPanier
      );
      if (!tmp) {
        state.push(action.payload);
      } else {
        let temp = state.filter(
          (elt) => elt.idProduitPanier !== action.payload.idProduitPanier
        );
        temp.unshift(action.payload);
        return temp;
      }
    },
    removePanier: (state, action) => {
      return state.filter((elt) => elt.idProduitPanier !== action.payload);
    },
    updatePanier: (state, action) => {
      const tmp = state.filter(
        (elt) => elt.idProduitPanier !== action.payload.idProduitPanier
      );
      tmp.push(action.payload);
      return tmp;
    },
  },
});

export const { setPanier, addPanier, removePanier, updatePanier, resetPanier } =
  panierSlice.actions;
export default panierSlice.reducer;
