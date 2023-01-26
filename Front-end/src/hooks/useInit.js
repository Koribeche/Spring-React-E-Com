import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { setPanier } from "../features/user/panier/panierSlice";
import { setCommande } from "../features/user/commandeUser/commandeSlice";
import axios from "axios";

const useInit = () => {
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setisLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .get("/api/user/getMe", config)
      .then((res) => {
        if (res.data.idUser) {
          dispatch(setUser(res.data));
          dispatch(
            setPanier(
              res.data.produitPanier.filter(
                (produit) => produit.statusPanier === "en cours"
              )
            )
          );

          dispatch(setCommande(res.data.commande));
        } else {
          dispatch(setUser(""));
        }
      })
      .catch((err) => dispatch(setUser("")))
      .finally(() => setisLoading(false));
  }, [dispatch]);

  return { isLoading };
};
export default useInit;
