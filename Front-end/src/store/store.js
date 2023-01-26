import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import accueilReducer from "../features/user/accueil/accueilSlice";
import panierReducer from "../features/user/panier/panierSlice";
import commandeReducer from "../features/user/commandeUser/commandeSlice";
import offreReducer from "../features/admin/offre/offreSlice";
import produitReducer from "../features/admin/produit/produitSlice";
import caracteristiqueReducer from "../features/admin/caracteristique/caracteristiqueSlice";
import commandeAdminReducer from "../features/admin/commande/commandeSlice";
import usersSlice from "../features/admin/users/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    panier: panierReducer,
    accueil: accueilReducer,
    commande: commandeReducer,
    // admin
    offre: offreReducer,
    produit: produitReducer,
    caracteristique: caracteristiqueReducer,
    commandeAdmin: commandeAdminReducer,
    users: usersSlice,
  },
});
